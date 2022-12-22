/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "randomuser.me"],
  },
  experimental: {
    appDir: true,
  },
};
