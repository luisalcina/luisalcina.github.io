# Ask Luis AI Worker

This Cloudflare Worker keeps the OpenRouter key server-side. Before deployment:

1. Install dependencies with `npm install` in this folder.
2. Authenticate Wrangler with the Luis Alcina Cloudflare account.
3. Set the secret: `npx wrangler secret put OPENROUTER_API_KEY`.
4. Deploy with `npm run deploy` and copy the Worker URL into the site's `VITE_LUIS_AI_ENDPOINT` build variable.

The Worker uses a small verified profile prompt. Expand it only with reviewed content from the site's content files.
