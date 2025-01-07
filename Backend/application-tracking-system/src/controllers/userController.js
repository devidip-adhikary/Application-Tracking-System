const User = require("../models/userModel");

// Fetch all users
const getUsers = async (req, res) => {
  console.log("get all user");
  try {
    const users = await User.findAll({
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

// Add a new user
const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await User.create({ name, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

//Get user by id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send({ message: "Error fetching user", error });
  }
};

// Edit a existing user
const editUser = async (req, res) => {
  try {
    const { name, email, id, role, password } = req.body;
    const [updated] = await User.update(
      { name, email, role, password },
      { where: { id: id } }
    );
    if (!updated) {
      return res.status(404).send({ message: "User not found" });
    }
    const updatedUser = await User.findByPk(id); // Retrieve updated user
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ message: "Error updating user", error });
  }
};

// Delete a existing user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    // Perform soft delete by setting isActive to false
    user.isActive = false;
    await user.save();
    res.send({ message: "User marked as inactive successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { getUsers, addUser, editUser, getUserById, deleteUser };
