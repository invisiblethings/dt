/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * Every route in this site prerenders — there are no server components that
   * need a runtime, no route handlers and no ISR — so it ships as a plain
   * static export. Netlify serves the `out/` directory straight from its CDN
   * with no serverless functions involved.
   *
   * If you later add something that needs a server (an API route, ISR, image
   * optimisation), drop this line and add the @netlify/plugin-nextjs runtime;
   * see the README.
   */
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  /*
   * Security headers live in netlify.toml rather than here: next.config
   * headers() has no effect on a static export, because there is no Next
   * server left to apply them.
   */
};

export default nextConfig;
