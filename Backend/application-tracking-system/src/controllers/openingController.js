const Clients = require("../models/clientModel");
const Opening = require("../models/openingModel");
const TechStack = require("../models/techStackModel");

// Fetch all openings
const getOpenings = async (req, res) => {
  try {
    const opening = await Opening.findAll({
      include: [
        { model: Clients, required: true, attributes: ["name"] },
        { model: TechStack, required: true, attributes: ["name"] },
      ],
      where: {
        isActive: true,
      },
    });
    return res.status(200).json(opening);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

const addOpenings = async (req, res) => {
  try {
    const {
      name,
      client,
      tech,
      job_description,
      location,
      number_of_requiremnts,
      work_mode,
    } = req.body;
    const opening = await Opening.findOne({
      where: { client_id: client, tech_stack_id: tech },
    });
    if (opening === null) {
      const newOpening = await Opening.create({
        name: name,
        client_id: client,
        tech_stack_id: tech,
        job_description: job_description,
        location: location,
        number_of_requiremnts: number_of_requiremnts,
        work_mode: work_mode,
      });
      res.status(201).json(newOpening);
    } else {
      res.status(409).send("Duplicate record found with the same requirement.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getOpenings, addOpenings };
