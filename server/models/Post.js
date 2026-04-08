const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // Markdown content
  excerpt: { type: String },
  coverImage: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPremium: { type: Boolean, default: false }, // true if this post requires a subscription
  seoMetadata: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  publishedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
