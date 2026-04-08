import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock fetching function for SSR
async function getPostBySlug(slug) {
  const posts = {
    'future-of-ethereum-2027': {
      title: 'The Future of Ethereum in 2027',
      content: '# The Future is Rollups\n\nBy 2027, the Ethereum ecosystem has fully embraced modular architecture. **Zero-Knowledge rollups** are now processing 100,000 TPS, drastically reducing fees. \n\n## Key Advantages\n- Instant finalize\n- Trustless bridges\n- Data availability layers like Celestia taking the load off mainnet\n\n> "The shift from monolithic to modular is the greatest engineering feat in blockchain history."\n\n### Code Example\n```solidity\npragma solidity ^0.8.0;\ncontract Future {\n    function isOptimized() public pure returns (bool) {\n        return true;\n    }\n}\n```',
      isPremium: true,
      publishedAt: new Date().toISOString(),
      seoMetadata: { metaTitle: 'Ethereum 2027 Predictions', metaDescription: 'Analysis of ZK rollups on ETH.' }
    },
    'ai-driven-smart-contracts': {
      title: 'AI-Driven Smart Contract Auditing',
      content: '# Auditing with LLMs\n\nAI models have achieved a 99% accuracy rate in detecting standard re-entrancy bugs before code is even deployed. \n\nThis completely revolutionizes the speed at which DeFi protocols can ship updates.',
      isPremium: false,
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    'decentralized-cloud-gpu': {
      title: 'Decentralized Cloud GPUs: The Next Frontier',
      content: '# The Need for Compute\n\nWith AI models growing exponentially, the demand for GPU compute power has skyrocketed. Decentralized networks allow individuals to pool their unused resources.\n\n## The Shift from PoW\nMany former Ethereum miners are repurposing their rigs to provide raw compute for AI training, creating a lucrative new secondary market in Web3.',
      isPremium: false,
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      seoMetadata: { metaTitle: 'Decentralized Cloud GPUs', metaDescription: 'The intersection of crypto mining and AI compute.' }
    }
  };

  return posts[slug] || null;
}

// Generate Dynamic SEO Metadata
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: post.seoMetadata?.metaTitle || post.title,
    description: post.seoMetadata?.metaDescription || 'Read premium content on CryptoPulse.',
  };
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  // If premium, we can optionally check user session here (server side)
  // For now, we will render it but show a Paywall mockup if premium
  const hasAccess = false; // Mocking that user does not have a subscription

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <Link href="/" style={{ color: 'var(--accent-color)', marginBottom: '2rem', display: 'inline-block' }}>
        &larr; Back to Explore
      </Link>
      
      <article className="glass-panel" style={{ padding: '3rem' }}>
        {post.isPremium && <div className="premium-badge">Premium Exclusive</div>}
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.2 }}>{post.title}</h1>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </div>

        {post.isPremium && !hasAccess ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
            <h2>Premium Content Locked</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem' }}>
              You need a CryptoPulse Premium Subscription to read this full article.
            </p>
            <Link href="/pricing" className="btn btn-primary">Subscribe Now</Link>
          </div>
        ) : (
          <div className="markdown-content" style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        )}
      </article>
      
      <style>{`
        .markdown-content h1, .markdown-content h2, .markdown-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-content pre {
          background: rgba(0,0,0,0.5);
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .markdown-content blockquote {
          border-left: 4px solid var(--accent-color);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
