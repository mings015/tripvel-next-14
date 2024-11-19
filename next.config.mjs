/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "travel-journal-api-bootcamp.do.dibimbing.id", // Sesuaikan dengan domain gambar Anda
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
