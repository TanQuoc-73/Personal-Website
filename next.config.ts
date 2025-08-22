import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'picsum.photos',
      'localhost',
      'res.cloudinary.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'template.canva.com',
      'example.com'
    ],
  },
};

export default nextConfig;
