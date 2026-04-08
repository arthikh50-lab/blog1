import Link from 'next/link';

export const metadata = {
  title: 'Subscribe to Premium - CryptoPulse-Tr9',
  description: 'Unlock AI content generation and premium web3 articles.',
};

export default function PricingPage() {
  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Unlock <span className="gradient-text">Premium Features</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
        Get full access to exclusive blockchain insights, AI co-pilot tools, and priority support.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
        <div className="glass-panel" style={{ border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Basic</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Free</p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, marginBottom: '2rem', listStyle: 'none' }}>
            <li>✓ Read free articles</li>
            <li>✓ Basic markdown editor</li>
            <li style={{ opacity: 0.5 }}>✗ AI Co-pilot generation</li>
            <li style={{ opacity: 0.5 }}>✗ Premium deep-dives</li>
          </ul>
          <Link href="/" className="btn btn-outline" style={{ width: '100%' }}>Current Plan</Link>
        </div>

        <div className="glass-panel" style={{ border: '2px solid var(--accent-color)', position: 'relative', transform: 'scale(1.05)' }}>
          <div className="premium-badge" style={{ position: 'absolute', top: '-12px', right: '1rem' }}>Most Popular</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>$19<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/mo</span></p>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: 2, marginBottom: '2rem', listStyle: 'none' }}>
            <li>✓ Read <strong>all</strong> locked premium articles</li>
            <li>✓ <strong>Unlimited</strong> AI Co-pilot content generation</li>
            <li>✓ Advanced SEO Analytics dashboard</li>
            <li>✓ Direct Stripe Integration</li>
          </ul>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Subscribe via Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
