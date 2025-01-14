const Candidate = require("../models/candidateModel");

// Fetch all candidates
const getCandidates = async (req, res) => {
  try {
    const users = await Candidate.findAll({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addCandidate = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await Candidate.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {}
};

module.exports = { getCandidates };
