const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mock a payment creation for premium subscription
router.post('/create-checkout-session', async (req, res) => {
  // Normally this would interact with Stripe API
  try {
    res.json({ 
      sessionId: 'cs_test_' + Math.random().toString(36).substring(7),
      message: 'This is a mocked checkout session for the CryptoPulse premium subscription'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mock webhook to activate premium status
router.post('/webhook/success', async (req, res) => {
  try {
    const { email } = req.body;
    await User.findOneAndUpdate({ email }, { isPremium: true });
    res.json({ success: true, message: 'Premium activated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
