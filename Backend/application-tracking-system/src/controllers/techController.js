const Tech = require("../models/techStackModel");

// Fetch all tech
const getTechList = async (req, res) => {
  try {
    const tech = await Tech.findAll();
    res.status(200).json(tech);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getTechList };
