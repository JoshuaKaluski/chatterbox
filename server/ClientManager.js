const avatars = require('../config/avatars');

module.exports = () => {
  const clients = new Map();

  function addClient(client) {
    clients.set(client.id, {client})
  }
  
  function removeClient(client) {
    client.delete(client.id)
  }

  return {
    addClient,
    removeClient
  }
};