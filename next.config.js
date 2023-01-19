const ContentSecurityPolicy = `
  default-src 'self';
  img-src 'self' data:;
  script-src 'self' cdnjs.cloudflare.com ${
    process.env.NODE_ENV !== "production" && "'unsafe-eval'"
  };
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  worker-src 'self' blob: cdnjs.cloudflare.com;
`;

/** @type {import('next').NextConfig} */
module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
