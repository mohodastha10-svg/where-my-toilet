const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already exists' });

    const user = new User({ name, email });
    await user.save();
    return res.status(201).json({ message: 'User saved', user });
  } catch (err) {
    console.error('userController.createUser error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json({ users });
  } catch (err) {
    console.error('userController.getUsers error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    return res.status(200).json({ message: 'User deleted', id });
  } catch (err) {
    console.error('userController.deleteUser error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};
