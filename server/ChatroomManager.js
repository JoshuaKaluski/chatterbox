const Chatroom = require('./Chatroom');
const ChatroomTemplates = require('../config/chatrooms');

module.exports = () => {
  //Mapping all chatrooms
  const chatrooms = new Map(
    ChatroomTemplates.map(chatroom => [
      chatroom.name,
      Chatroom(chatroom)
    ])
  );

  function getChatroom(name) {
    return chatrooms.get(name);
  }
  
  function removeClient(client) {
    chatrooms.forEach(chatroom => chatroom.removeClient(client));
  }

  function serialize() {
    return Array.from(chatrooms.map(chatroom => chatroom.getChatroomInfo()))
  }

  return {
    getChatroom,
    removeClient,
    serialize
  }
};