const express = require('express');
const router = express.Router();

// Mock AI Endpoint using placeholder data, instead of actually calling OpenAI API
router.post('/suggest', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock response based on the prompt
    let suggestion = '';
    if (prompt.toLowerCase().includes('title')) {
      suggestion = '1. The Future of Crypto\n2. Decentralized Finance Explained\n3. CryptoPulse Wallet Updates';
    } else if (prompt.toLowerCase().includes('seo')) {
      suggestion = 'Meta Description: Discover the latest analysis and insights on cryptocurrency trends, DeFi, and blockchain technology.\nKeywords: crypto, blockchain, DeFi, finance';
    } else {
      suggestion = `Here is a drafted paragraph based on your prompt:\n\n*The integration of blockchain technology into traditional finance is accelerating. Smart contracts ensure trustless transactions, while decentralized ledgers offer transparency. As we look towards 2027, the focus shifts towards interoperability and scalable Layer-2 solutions...*`;
    }

    res.json({ suggestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
