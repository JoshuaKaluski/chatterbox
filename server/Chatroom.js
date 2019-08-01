module.exports = ({name, image}) => {
  const members = new Map();

//Non persistent storage
  let chatLog = [];

  function broadcastMessage(message) {
    members.map(client => client.emit('message', message))
  }

  function getChatLog() {
    //Return a copy of the array to avoid possible mutation
    return chatLog.slice();
  }

  function addEntry(entry) {
    chatLog = [...chatLog, entry];
  }

  function addClient(client) {
    members.set(client.id, client);
  }

  function removeClient(client) {
    members.delete(client.id);
  }

  //Returns general info about the chatroom
  function getChatroomInfo() {
    return ({
      name,
      image,
      numMembers: members.size
    })
  }

  return {
    broadcastMessage,
    getChatLog,
    addEntry,
    addClient,
    removeClient,
    getChatroomInfo
  }
};
