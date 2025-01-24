const Candidate = require("../models/candidateModel");
const Clients = require("../models/clientModel");
const Openings = require("../models/openingModel");
const OpeningVsCandidates = require("../models/openingsVsCandidatesModel");
const Statuses = require("../models/statusModel");
const TechStack = require("../models/techStackModel");
const Vendors = require("../models/vendorsModel");
const { Op } = require("sequelize");

// Fetch all candidates
const getCandidates = async (req, res) => {
  try {
    const users = await Candidate.findAll({
      include: [
        { model: Vendors, required: true, attributes: ["name"] },
        { model: Statuses, required: true, attributes: ["name"] },
        {
          model: OpeningVsCandidates,
          as: "openings",
          include: [
            {
              model: Openings,
              include: [
                {
                  model: Clients,
                },
                {
                  model: TechStack,
                },
              ],
            },
          ],
        },
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

// Fetch candidate by id
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

// Add new candidate
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

    const duplicate_candidate = await Candidate.findOne({
      where: {
        [Op.or]: [
          { email: email },
          { ph_no: ph_no },
          {
            [Op.and]: [
              { name: name },
              { current_company: current_company },
              { current_ctc: current_ctc },
              { cur_location: cur_location },
            ],
          },
        ],
      },
    });

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
      status: duplicate_candidate === null ? 1 : 14,
    });

    await OpeningVsCandidates.create({
      opening_id: opening,
      candidate_id: newUser.id,
      status_id: duplicate_candidate === null ? 1 : 14,
      sub_status_id: null,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// Edit a existing candidate
const editCandidate = async (req, res) => {
  try {
    const {
      id,
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
      opening_id,
      status,
    } = req.body;

    const user = await Candidate.findByPk(id);
    const resume = req.file ? req.file.path : user.resume;

    const [updated] = await Candidate.update(
      {
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
        status,
      },
      { where: { id: id } }
    );

    await OpeningVsCandidates.update(
      {
        opening_id: opening,
      },
      { where: { id: opening_id } }
    );

    if (!updated) {
      return res.status(404).send({ message: "Candidate not found" });
    }
    const updatedCandidate = await Candidate.findByPk(id); // Retrieve updated user
    res.send(updatedCandidate);
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error });
  }
};

// Delete an existing candidate
const deleteCandidate = async (req, res) => {
  try {
    const id = req.params.id;
    const candidate = await Candidate.findByPk(id);
    console.log("ncb", id, candidate);
    // return;
    if (!candidate) {
      return res.status(404).send({ message: "Candidate not found" });
    }
    // Perform soft delete by setting isActive to false
    candidate.isActive = false;
    await candidate.save();
    await OpeningVsCandidates.update(
      {
        status_id: 9,
      },
      { where: { candidate_id: id } }
    );
    res.send({ message: "Candidate marked as inactive successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCandidates,
  getCandidateById,
  addCandidate,
  editCandidate,
  deleteCandidate,
};
