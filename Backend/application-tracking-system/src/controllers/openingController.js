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
    });
    return res.status(200).json(opening);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

// Fetch opening by id
const getOpeningById = async (req, res) => {
  try {
    const id = req.params.id;
    const opening = await Opening.findByPk(id, {
      include: [
        { model: Clients, required: true },
        { model: TechStack, required: true },
      ],
    });

    if (!opening) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json(opening);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Add a new opening
const addOpenings = async (req, res) => {
  try {
    const {
      name,
      client,
      tech_stack,
      job_description,
      location,
      number_of_requiremnts,
      work_mode,
    } = req.body;
    const opening = await Opening.findOne({
      where: { client_id: client, tech_stack_id: tech_stack },
    });
    if (opening === null) {
      const newOpening = await Opening.create({
        name: name,
        client_id: client,
        tech_stack_id: tech_stack,
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

// Update an existing opening
const editOpenings = async (req, res) => {
  try {
    const {
      id,
      name,
      client_id,
      tech_stack_id,
      job_description,
      location,
      number_of_requiremnts,
      work_mode,
    } = req.body;

    const [updated] = await Opening.update(
      {
        name: name,
        client_id: client_id,
        tech_stack_id: tech_stack_id,
        job_description: job_description,
        location: location,
        number_of_requiremnts: number_of_requiremnts,
        work_mode: work_mode,
      },
      { where: { id: id } }
    );
    res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete an existing candidate
const deleteOpening = async (req, res) => {
  try {
    const id = req.params.id;
    const opening = await Opening.findByPk(id);
    if (!opening) {
      return res.status(404).send({ message: "Opening not found" });
    }
    // Perform soft delete by setting isActive to false
    opening.isActive = false;
    await opening.save();
    res.send({ message: "Opening marked as inactive successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getOpenings,
  getOpeningById,
  addOpenings,
  editOpenings,
  deleteOpening,
};
