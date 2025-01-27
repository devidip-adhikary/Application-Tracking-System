const { Op } = require("sequelize");
const Candidates = require("../models/candidateModel");
const Clients = require("../models/clientModel");
const Opening = require("../models/openingModel");
const OpeningVsCandidates = require("../models/openingsVsCandidatesModel");
const Statuses = require("../models/statusModel");
const TechStack = require("../models/techStackModel");
const Vendors = require("../models/vendorsModel");

// Fetch all openingsVScandidate
const getOpeningsVScandidate = async (req, res) => {
  try {
    const opening = await OpeningVsCandidates.findAll({
      include: [
        {
          model: Opening,
          required: true,
          include: [
            {
              model: Clients,
            },
            {
              model: TechStack,
            },
          ],
        },
        {
          model: Candidates,
          required: true,
          include: [
            {
              model: Vendors,
            },
          ],
        },
        { model: Statuses, required: true },
      ],
    });
    return res.status(200).json(opening);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

// Fetch all openingsVScandidate status count
const getDashboardStat = async (req, res) => {
  try {
    const req_status = req.params.status;
    // Find the status_id from the status_master table
    const status = await Statuses.findOne({
      where: { name: req_status },
      attributes: ["id"],
    });

    // Count the records in the opening_vs_candidate table for the status_id
    const count = await Candidates.count({
      where: { status: status.id },
    });

    res.json({ req_status, count });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
};

module.exports = { getOpeningsVScandidate, getDashboardStat };
