const Statuses = require("../models/statusModel");
const TechStack = require("../models/techStackModel");

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

// Fetch all tech
const getTechList = async (req, res) => {
  try {
    const tech = await TechStack.findAll();
    res.status(200).json(tech);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getStatus, getTechList };
