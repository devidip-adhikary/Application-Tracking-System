const Client = require("../models/clientModel");

// Fetch all clients
const getClients = async (req, res) => {
  try {
    const client = await Client.findAll({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getClients };
