const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    const token = generateToken(user);
    const response = {
      name: user.name,
      email: user.email,
      token: token,
    };
    res.json(response);
    // res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
