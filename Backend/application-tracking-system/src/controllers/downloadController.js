const express = require("express");
const path = require("path");
const fs = require("fs");

const Candidates = require("../models/candidateModel");

// API endpoint to download a resume
const downloadResume = async (req, res) => {
  const id = req.params.id;

  try {
    // Query the database to get the resume file path
    const candidate = await Candidates.findByPk(id);

    if (!candidate) {
      return res.status(404).send("Candidate not found");
    }
    const resumePath = candidate.resume;
    const absolutePath = path.resolve(__dirname, "../..", resumePath);

    // Check if the file exists
    if (fs.existsSync(absolutePath)) {
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${path.basename(absolutePath)}`
      );
      res.setHeader("Content-Type", "application/pdf");
      fs.createReadStream(absolutePath).pipe(res);
    } else {
      res.status(404).send("Resume file not found");
    }
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { downloadResume };
