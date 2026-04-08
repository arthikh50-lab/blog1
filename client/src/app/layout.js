import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CryptoPulse-Wallet-Tr9 - AI-Powered Web3 Blogging',
  description: 'The premier destination for premium Web3 formatting, markdown authorship, and AI-assisted technical content.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="container navbar-inner">
            <Link href="/" className="navbar-logo gradient-text">
              CryptoPulse<span style={{color: 'var(--text-primary)'}}>-Tr9</span>
            </Link>
            <div className="navbar-links">
              <Link href="/">Explore</Link>
              <Link href="/editor">Write a Post</Link>
              <Link href="/pricing" className="btn btn-primary">Subscribe</Link>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
