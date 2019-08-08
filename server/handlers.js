function makeHandleEvent(client, clientManager, chatroomManager) {
  async function ensureExists(getter, rejectionMessage) {
    const res = await getter();

    return res ? res : rejectionMessage;
  }

  function ensureValidChatroom(chatroomName) {
    return ensureExists(
      () => chatroomManager.getChatroom(chatroomName),
      `Invalid chatroom name: ${chatroomName}`
    )
  }

  function ensureUserExists(clientId) {
    return ensureExists(
      () => clientManager.getClientById(clientId),
      'Client does not exist'
    )
  }

  async function ensureValidChatroomAndUser(chatroomName) {
    const chatroom = await ensureValidChatroom(chatroomName);
    const user = await ensureUserExists(client.id);

    return {chatroom, user};
  }
  
  async function handleEvent(chatroomName, createEntry) {
    const {chatroom, user} = await ensureValidChatroomAndUser(chatroomName);

    //Append event to chat log
    const entry = {user, ...createEntry()};
    chatroom.addEntry(entry);

    //Broadcast notification to other clients in chatroom
    chatroom.broadcastMessage({chat: chatroomName, ...entry});

    return chatroom;
  }

  return handleEvent;
}

module.exports = (client, clientManager, chatroomManager) => {
  const handleEvent = makeHandleEvent(client, clientManager, chatroomManager);

  async function handleJoin(chatroomName, callback) {
    const createEntry = () => ({event: `Joined ${chatroomName}`});

    //Get chatroom and add client to it
    const chatroom = await handleEvent(chatroomName, createEntry);
    chatroom.addClient(client);

    //Send chat log to client
    callback(null, chatroom.getChatLog());
  }

  async function handleLeave(chatroomName, callback) {
    const createEntry = () => ({event: `Left ${chatroomName}`});

    const chatroom = await handleEvent(chatroomName, createEntry);
    chatroom.removeClient(client);

    callback(null);
  }

  async function handleMessage({chatroomName, message} = {}, callback) {
    const createEntry = () => ({message});

    //Send message
    await handleEvent(chatroomName, createEntry);
    
    callback(null);
  }
  
  function handleGetChatrooms(_, callback) {
    console.log(_);
    return callback(null, chatroomManager.serialize());
  }

  function handleDisconnect() {
    //Remove user profile
    clientManager.removeClient(client);

    //Remove from all chatrooms
    chatroomManager.removeClient(client)
  }

  return {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleDisconnect
  }
};