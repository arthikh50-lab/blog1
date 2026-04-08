'use client';
import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Save, Send } from 'lucide-react';

export default function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [published, setPublished] = useState(false);

  const handlePublish = () => {
    if (!title || !content) {
      alert("Please enter a title and content before publishing!");
      return;
    }
    setPublished(true);
    alert("Post published successfully! (Mocked)");
  };

  // Mocking the backend call to avoid needing Express running locally during tests
  const handleAiSuggest = async () => {
    if (!aiPrompt) return;
    setLoadingAI(true);
    
    setTimeout(() => {
      let suggestion = `AI Drafted content covering: ${aiPrompt}\n\n*The integration of decentralized computing is reshaping...*`;
      setContent((prev) => prev + (prev ? '\n\n' : '') + suggestion);
      setLoadingAI(false);
      setAiPrompt('');
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      {/* Editor Panel */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Draft a New Post</h2>
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={handlePublish}>
            <Save size={18} /> {published ? 'Published!' : 'Publish'}
          </button>
        </div>

        <input
          type="text"
          className="input-field"
          style={{ fontSize: '1.5rem', fontWeight: 600, padding: '1rem', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-color)', borderRadius: 0 }}
          placeholder="Catchy Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          className="input-field"
          style={{ flex: 1, resize: 'none', fontFamily: 'monospace', fontSize: '1.1rem', background: 'rgba(0,0,0,0.1)' }}
          placeholder="Write your markdown content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* AI Assistant Side Panel */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'linear-gradient(180deg, rgba(123, 66, 255, 0.05) 0%, rgba(18, 18, 26, 0.8) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <Sparkles className="gradient-text" />
          <h3>AI Co-Pilot</h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Stuck on a paragraph? Need an SEO meta description? Let AI help you write.
          </p>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <textarea
            className="input-field"
            style={{ minHeight: '100px', fontSize: '0.95rem', background: 'var(--surface-hover)' }}
            placeholder="Ask AI to expand on a topic, e.g. 'Write a section about zero-knowledge rollups'"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          />
          <button 
            className="btn btn-outline" 
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            onClick={handleAiSuggest}
            disabled={loadingAI}
          >
            {loadingAI ? 'Generating...' : <><Send size={16} /> Generate Content</>}
          </button>
        </div>
      </div>
    </div>
  );
}
