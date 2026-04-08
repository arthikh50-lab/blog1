# Goal Description

The goal is to build **CryptoPulse-Wallet-Tr9**, an AI-Powered Blogging Platform, using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Server-Side Rendering (SSR) capabilities. The platform will support markdown editing, AI-assisted content generation, SEO tools, and user subscriptions.

## User Review Required

> [!IMPORTANT]
> **Architecture Decision:** Next.js vs Custom Express SSR
> To implement Server-Side Rendering (SSR) effectively with React for SEO, **Next.js** is the industry standard. I recommend using **Next.js** for the frontend (React + SSR) and a standalone **Express.js / Node.js** app for the backend API. Does this Next.js + Express approach sound good to you, or did you specifically want to build custom SSR from scratch using Express to serve raw React? (Next.js is highly recommended for stability and modern developer experience).

> [!WARNING]
> **API Keys:**
> We will need an **OpenAI API Key** for AI suggestions and a **Stripe API Key** for handling user subscriptions/monetization. Please let me know if you would like me to set up mock functionalities for these or if you have test keys ready.

## Proposed Changes

### 1. Backend Service (Node.js & Express)
A RESTful API built with Express, securely connecting to MongoDB via Mongoose.

#### [NEW] `server/package.json`
Dependencies for Express, Mongoose, OpenAI SDK, Stripe, JWT, CORS, dotenv.

#### [NEW] `server/models/`
- `User.js`: User data, subscription status, and role.
- `Post.js`: Blog post data (markdown content, metadata, SEO fields, author).

#### [NEW] `server/routes/`
- `authRoutes.js`: User authentication & JWT generation.
- `postRoutes.js`: CRUD for blog posts.
- `aiRoutes.js`: Endpoint for OpenAI integration (`/api/ai/suggest`).
- `paymentRoutes.js`: Endpoint for Stripe webhooks and checkout sessions.

### 2. Frontend Application (React via Next.js)
A Next.js application handling Server-Side Rendering of public blog pages for SEO, alongside client-side editing interfaces for authenticated users.

#### [NEW] `client/package.json`
Dependencies for Next.js, React, TailwindCSS, Axios, Markdown renderer (`react-markdown`), Stripe client.

#### [NEW] `client/src/pages/`
- `index.js`: Home page listing recent blog posts (SSR).
- `post/[slug].js`: Individual blog post view (SSR).
- `editor.js`: Authenticated markdown editor.
- `dashboard.js`: Analytics and subscription management.

#### [NEW] `client/src/components/`
- `MarkdownEditor.js`: Integrating a markdown text editor.
- `AISuggestions.js`: Component to trigger OpenAI suggestions within the editor.
- `SubscriptionModal.js`: Stripe UI flow.

## Open Questions

1. **Database:** Would you like to use a local MongoDB instance, or do you have a MongoDB Atlas URI ready?
2. **Styling:** The guidelines mention preferring Vanilla CSS or custom styles except when requested, but Next.js integrates beautifully with TailwindCSS. Shall we use modern standard CSS Modules or TailwindCSS?
3. **Monetization model:** Should the monetization restrict certain blog posts behind a "Premium" paywall, or does the subscription just provide authoring benefits (like AI tools)?

## Verification Plan

### Automated Tests
- Running `node server.js` to ensure the Express REST API initializes without failures.
- Running `npm run build` on the Next.js project to verify SSR pages compile successfully.

### Manual Verification
- Testing the AI content generation by hitting the API and displaying results in the React UI.
- Verifying page HTML sources on blog posts to confirm SSR (checking that meta tags and markdown content are rendered directly into the HTML tree).
- Creating a mocked subscription flow to test Stripe elements behavior.
