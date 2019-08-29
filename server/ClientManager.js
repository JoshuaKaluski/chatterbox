const avatars = require('../config/avatars');

module.exports = () => {
  const clients = new Map();

  function addClient(client) {
    clients.set(client.id, {client});
    console.log(clients);
  }

  function registerClient(client, user) {
    clients.set(client.id, {client, user});
  }

  function getClientById(clientId) {
    return clients.get(clientId);
  }
  
  function removeClient(client) {
    clients.delete(client.id);
  }

  return {
    addClient,
    registerClient,
    getClientById,
    removeClient
  }
};