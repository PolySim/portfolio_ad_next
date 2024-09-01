/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "api.angelinedesdevises.fr",
      "127.0.0.1",
      "141.94.205.91",
      "141.94.205.91:5066",
    ],
    unoptimized: true,
  },
};

export default nextConfig;
