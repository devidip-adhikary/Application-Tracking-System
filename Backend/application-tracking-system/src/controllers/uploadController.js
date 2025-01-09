const xlsx = require('xlsx');
const { sequelize } = require('../config/db');
const Candidates = require('../models/candidateModel');
const Vendors = require('../models/vendorsModel');
const Clients = require('../models/clientModel');
const Statuses = require('../models/statusModel');
const TechStack = require('../models/techStackModel');

const uploadMasterData = async (req, res) => {
  const BATCH_SIZE = 500; // Number of rows to process per batch
  const models = {
    'Vendor': Vendors,
    'Status': Statuses,
    'Client': Clients,
    'Tech Stack': TechStack,
  };

  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);

    await sequelize.transaction(async (transaction) => {
      // Process Vendor, Status, Client, and Tech Stack first
      // for (const [sheetName, Model] of Object.entries(models)) {
      //   const worksheet = workbook.Sheets[sheetName];
      //   if (!worksheet) continue; // Skip if sheet is not present

      //   const jsonData = xlsx.utils.sheet_to_json(worksheet);
      //   for (let i = 0; i < jsonData.length; i += BATCH_SIZE) {
      //     const batch = jsonData.slice(i, i + BATCH_SIZE);
      //     await Model.bulkCreate(batch, { transaction });
      //   }
      // }

      // Process Candidates separately to handle vendor ID mapping
      const candidateSheet = workbook.Sheets['Candidate'];
      if (candidateSheet) {
        const candidateData = xlsx.utils.sheet_to_json(candidateSheet);

        for (let i = 0; i < candidateData.length; i += BATCH_SIZE) {
          const batch = candidateData.slice(i, i + BATCH_SIZE);

          // Map vendor name to vendor ID
          for (const candidate of batch) {
            const vendor = await Vendors.findOne({
              where: { name: candidate.vendor_name },
              transaction,
            });

            if (vendor) {
              candidate.vendor_id = vendor.id;
            } else {
              throw new Error(`Vendor not found for candidate ${candidate.name}`);
            }
          }

          // Insert candidates with vendor_id mapped
          await Candidates.bulkCreate(batch, { transaction });
        }
      }
    });

    res.status(200).send('Data uploaded successfully for all sheets');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('Error uploading data');
  }
};

module.exports = { uploadMasterData };
