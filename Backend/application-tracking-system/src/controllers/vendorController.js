const Vendor = require("../models/vendorsModel");

// Fetch all vendors
const getVendors = async (req, res) => {
  try {
    const vendor = await Vendor.findAll({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getVendors };
