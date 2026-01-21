/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzdy7ps8k/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      // Add your own API/backend domain if avatars are stored there
      {
        protocol: "https",
        hostname:
          process.env.NEXT_PUBLIC_API_URL?.replace("https://", "") ||
          "your-api-domain.com",
      },
    ],
  },
};

export default nextConfig;
