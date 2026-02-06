import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: ["public/static/scripts/**"],
  },
  ...nextConfig,
];

export default config;
