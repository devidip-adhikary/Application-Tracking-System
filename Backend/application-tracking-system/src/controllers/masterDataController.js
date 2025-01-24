const Statuses = require("../models/statusModel");

// Fetch all status
const getStatus = async (req, res) => {
  try {
    const status = await Statuses.findAll();
    return res.status(200).json(status);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getStatus };
