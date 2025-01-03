const { sequelize } = require('../config/db');

require('../models/userModel');
require('../models/roleModel');
require('../models/vendorsModel');
require('../models/statusModel');
require('../models/clientModel');
require('../models/techStackModel');
require('../models/rolesVsUsers');
require('../models/candidateModel');
require('../models/openingModel');
require('../models/subStatusModel');
require('../models/openingsVsCandidatesModel');

const syncDatabase = async () => {
  try {
    // loadModels(); // Load and register all models
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
};

syncDatabase();
