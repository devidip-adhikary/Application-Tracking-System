const Candidate = require("../models/candidateModel");
const Openings = require("../models/openingModel");
const OpeningVsCandidates = require("../models/openingsVsCandidatesModel");
const Statuses = require("../models/statusModel");
const Vendors = require("../models/vendorsModel");

// Fetch all candidates
const getCandidates = async (req, res) => {
  try {
    const users = await Candidate.findAll({
      include: [
        { model: Vendors, required: true, attributes: ["name"] },
        { model: Statuses, required: true, attributes: ["name"] },
      ],
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

const getCandidateById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Candidate.findByPk(userId, {
      include: [
        { model: Vendors, required: true },
        { model: Statuses, required: true },
        {
          model: OpeningVsCandidates,
          as: "openings",
          include: [
            {
              model: Openings,
              required: true,
            },
          ],
        },
      ],
      where: {
        isActive: true,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const addCandidate = async (req, res) => {
  try {
    const {
      name,
      email,
      ph_no,
      current_company,
      YOE,
      RYOE,
      notice_period,
      cur_location,
      pref_location,
      current_ctc,
      expected_ctc,
      lwd,
      opening,
      vendor_id,
    } = req.body;
    const resume = req.file ? req.file.path : null;

    const newUser = await Candidate.create({
      name,
      email,
      ph_no,
      current_company,
      YOE,
      RYOE,
      notice_period,
      cur_location,
      pref_location,
      current_ctc,
      expected_ctc,
      resume,
      lwd,
      vendor_id,
      status: 1,
    });
    const newOpeningVSCandidate = await OpeningVsCandidates.create({
      opening_id: opening,
      candidate_id: newUser.id,
      status_id: 1,
      sub_status_id: null,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = { getCandidates, getCandidateById, addCandidate };
