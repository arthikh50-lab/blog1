const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey_for_dev_only';

// Mock Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });

    user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role, isPremium: user.isPremium }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name, isPremium: user.isPremium } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mock Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role, isPremium: user.isPremium }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name, isPremium: user.isPremium } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
