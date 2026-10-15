# Ask Luis AI Worker

This Cloudflare Worker securely calls an LLM through OpenRouter. It deliberately keeps API keys out of the GitHub Pages site.

## One-time deployment

1. In this folder, run `npm install`.
2. Sign in to the Cloudflare account that manages `luisalcina.com`: `npx wrangler login`.
3. Add the OpenRouter key: `npx wrangler secret put OPENROUTER_API_KEY`.
4. Add the OpenRouter model identifier you want to use: `npx wrangler secret put OPENROUTER_MODEL`.
5. Deploy: `npm run deploy`.
6. Copy the resulting Worker URL. Rebuild the portfolio site with `VITE_LUIS_AI_ENDPOINT` set to that URL.

The Worker only accepts requests from `https://www.luisalcina.com` and `https://luisalcina.com`, limits each IP to ten requests per minute, and restricts the model to public portfolio context.
