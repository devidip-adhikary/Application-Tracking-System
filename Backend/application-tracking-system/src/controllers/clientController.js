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

// Add new clients
const addClients = async (req, res) => {
  try {
    const { name } = req.body;
    const client = await Client.findOne({ where: { name: name } });
    if (client === null) {
      const newClient = await Client.create({ name, isActive: true });
      res.status(200).json(newClient);
    } else {
      res.status(409).send("Duplicate record found with the name.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Edit a existing client
const editClient = async (req, res) => {
  try {
    const { id, name } = req.body;
    const [updated] = await Client.update({ name }, { where: { id: id } });
    if (!updated) {
      return res.status(404).send({ message: "Client not found" });
    }
    const updatedClient = await Client.findByPk(id); // Retrieve updated client
    res.send(updatedClient);
  } catch (error) {
    res.status(500).send({ message: "Error updating client", error });
  }
};

// Delete an existing client
const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).send({ message: "Client not found" });
    }
    // Perform soft delete by setting isActive to false
    client.isActive = false;
    await client.save();
    res.send({ message: "Client marked as inactive successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getClients, addClients, editClient, deleteClient };
