const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// Get all published posts (for SSR list)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 }).populate('author', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single post by slug (for SSR page)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'name email');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post (Mock auth omitted for brevity, would normally use JWT middleware)
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, excerpt, seoMetadata, isPremium } = req.body;
    // author should be taken from req.user decoded from token
    const newPost = new Post({ title, slug, content, excerpt, seoMetadata, isPremium });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
