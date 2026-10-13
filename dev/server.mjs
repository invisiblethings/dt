#!/usr/bin/env node
/**
 * Local dev server: runs the REAL Worker code (worker/src/index.js) inside Node and serves the demo page.
 *
 *   npm run dev            -> http://localhost:8787/demo/index.html?mock=1
 *
 * - With no GEMINI_API_KEY in your shell, Gemini is replaced by a scripted fake (dev/fake-gemini.mjs).
 *   Set GEMINI_API_KEY=... to talk to the real model locally.
 * - With no LEAD_WEBHOOK_URL, leads are captured in memory: GET /__leads shows them.
 */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import worker from '../worker/src/index.js';
import { fakeGemini } from './fake-gemini.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const MOCK_WEBHOOK = 'http://mock-webhook.local/exec';
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
};

export function createDevServer({
  port = Number(process.env.PORT) || 8787,
  latencyMs = Number(process.env.FAKE_LATENCY ?? 400),
  quiet = false,
} = {}) {
  const leads = [];
  const realFetch = globalThis.fetch;
  const useRealGemini = !!process.env.GEMINI_API_KEY;

  globalThis.fetch = async (url, init = {}) => {
    const u = String(url);
    if (!useRealGemini && u.includes('generativelanguage.googleapis.com')) {
      await new Promise((r) => setTimeout(r, latencyMs));
      const out = fakeGemini(JSON.parse(init.body));
      if (out.__status) return new Response('{"error":"fake outage"}', { status: out.__status });
      return new Response(JSON.stringify(out), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    if (u === MOCK_WEBHOOK) {
      const payload = JSON.parse(init.body);
      const i = leads.findIndex((l) => l.conversationId === payload.conversationId);
      if (i >= 0) leads[i] = { ...payload, updates: (leads[i].updates || 1) + 1 };
      else leads.push({ ...payload, updates: 1 });
      if (!quiet)
        console.log(
          `[lead] ${payload.status} ${payload.source} ${payload.lead.firstName || '?'} ${payload.lead.phone || payload.lead.email}`,
        );
      return new Response('{"ok":true}', { status: 200 });
    }
    return realFetch(url, init);
  };

  const server = http.createServer(async (req, res) => {
    const origin = `http://localhost:${server.address().port}`;
    const env = {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'fake-key',
      GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite',
      LEAD_WEBHOOK_URL: process.env.LEAD_WEBHOOK_URL || MOCK_WEBHOOK,
      LEAD_WEBHOOK_SECRET: process.env.LEAD_WEBHOOK_SECRET || 'dev-secret',
      ALLOWED_ORIGINS: `${origin},http://127.0.0.1:${server.address().port}`,
      CHAT_DISABLED: process.env.CHAT_DISABLED || '0',
      RATE_PER_MINUTE: '60',
      PHONE_DISPLAY: '(929) 370-1552',
    };
    try {
      const url = new URL(req.url, origin);
      if (url.pathname === '/__leads') {
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(leads, null, 2));
      }
      if (url.pathname === '/__reset') {
        leads.length = 0;
        res.writeHead(204);
        return res.end();
      }
      if (['/chat', '/lead', '/widget.js', '/health'].includes(url.pathname)) {
        const chunks = [];
        for await (const c of req) chunks.push(c);
        const headers = new Headers();
        for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v);
        headers.set('cf-connecting-ip', req.socket.remoteAddress || '127.0.0.1');
        const request = new Request(url, {
          method: req.method,
          headers,
          body: ['GET', 'HEAD'].includes(req.method) ? undefined : Buffer.concat(chunks),
        });
        const pending = [];
        const response = await worker.fetch(request, env, { waitUntil: (p) => pending.push(p) });
        res.writeHead(response.status, Object.fromEntries(response.headers));
        res.end(Buffer.from(await response.arrayBuffer()));
        await Promise.allSettled(pending);
        return;
      }
      // Static files (demo page + widget source)
      let p = url.pathname === '/' ? '/demo/index.html' : url.pathname;
      p = normalize(decodeURIComponent(p)).replace(/^(\.\.[/\\])+/, '');
      if (!/^\/(demo|widget|docs)\//.test(p)) {
        res.writeHead(404);
        return res.end('not found');
      }
      const data = await readFile(join(root, p));
      res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream', 'cache-control': 'no-store' });
      res.end(data);
    } catch (e) {
      res.writeHead(e.code === 'ENOENT' ? 404 : 500);
      res.end(String(e.message));
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      const p = server.address().port;
      if (!quiet) {
        console.log(`Dev server: http://localhost:${p}/demo/index.html?mock=1`);
        console.log(
          useRealGemini
            ? 'Using the REAL Gemini API (GEMINI_API_KEY set).'
            : 'Using the scripted fake Gemini (set GEMINI_API_KEY to use the real one).',
        );
      }
      resolve({
        server,
        port: p,
        leads,
        close: () =>
          new Promise((r) => {
            globalThis.fetch = realFetch;
            server.closeAllConnections?.();
            server.close(r);
          }),
      });
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) createDevServer();
