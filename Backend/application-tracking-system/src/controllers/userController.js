const User = require('../models/userModel');

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { getUsers, addUser };