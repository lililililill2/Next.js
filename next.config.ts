import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // :path* 뜻: 뒤에 오는 경로를 전부 변수처럼 받는다
        destination: "https://jsonplaceholder.typicode.com/:path*",
      },
    ];
  },
};

export default nextConfig;
