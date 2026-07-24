import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Runs the /api/hackathon/* serverless functions in-process during `vite
 * dev`, so plain `npm run dev` works end-to-end without needing the
 * Vercel CLI locally. In production these files are deployed as real
 * Vercel Serverless Functions — this plugin only exists for the dev
 * server and has no effect on `vite build` / the deployed site.
 */
function hackathonApiDevMiddleware() {
  const routes = {
    '/api/hackathon/booked-dates': '/api/hackathon/booked-dates.js',
    '/api/hackathon/register': '/api/hackathon/register.js',
  };

  return {
    name: 'hackathon-api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        const modulePath = url && routes[url];
        if (!modulePath) return next();

        if (req.method === 'POST') {
          let raw = '';
          await new Promise((resolve, reject) => {
            req.on('data', (chunk) => { raw += chunk; });
            req.on('end', resolve);
            req.on('error', reject);
          });
          try {
            req.body = raw ? JSON.parse(raw) : {};
          } catch {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            return;
          }
        }

        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (payload) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(payload));
        };

        try {
          const mod = await server.ssrLoadModule(modulePath);
          await mod.default(req, res);
        } catch (err) {
          console.error(`[hackathon-api-dev-middleware] ${modulePath} failed:`, err);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Dev API error — check the terminal running `npm run dev`.' }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Third arg '' loads ALL env vars (not just VITE_-prefixed) into `env`,
  // so DATABASE_URL is available to the serverless handlers above via
  // process.env — mirroring how Vercel injects it in production.
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), hackathonApiDevMiddleware()],
  };
});
