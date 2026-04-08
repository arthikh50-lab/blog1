import Link from 'next/link';

// Normally, data generation happens securely here during SSR
// We'll mock SSR data fetching to illustrate SEO and data handling
async function getPosts() {
  // In a real app, this would be: 
  // const res = await fetch('http://localhost:5000/api/posts', { cache: 'no-store' });
  // return res.json();
  
  // Return mocked data to ensure it runs correctly without requiring the express server to be active concurrently
  return [
    {
      _id: '1',
      slug: 'future-of-ethereum-2027',
      title: 'The Future of Ethereum in 2027',
      excerpt: 'Analyzing the impacts of fully operational modular blockchains and zero-knowledge rollups on Ethereum network efficiency.',
      isPremium: true,
      publishedAt: new Date().toISOString()
    },
    {
      _id: '2',
      slug: 'ai-driven-smart-contracts',
      title: 'AI-Driven Smart Contract Auditing',
      excerpt: 'How large language models are transforming Web3 security by predicting vulnerabilities before deployment.',
      isPremium: false,
      publishedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      _id: '3',
      slug: 'decentralized-cloud-gpu',
      title: 'Decentralized Cloud GPUs: The Next Frontier',
      excerpt: 'Why computing power might become the most valuable cryptocurrency and how PoW is evolving.',
      isPremium: false,
      publishedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    }
  ];
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="animate-fade-in">
      <header style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
          Discover <span className="gradient-text">Web3 Insights</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Explore curated content on blockchain technology, DeFi, and AI with our premium community.
        </p>
      </header>

      <div className="post-grid">
        {posts.map((post) => (
          <Link href={`/post/${post.slug}`} key={post._id}>
            <article className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {post.isPremium && <span className="premium-badge">Premium Content</span>}
              <h2 className="post-card-title">{post.title}</h2>
              <p className="post-card-excerpt" style={{ flex: 1 }}>{post.excerpt}</p>
              <div className="post-card-meta">
                <span>By CryptoPulse Team</span>
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
