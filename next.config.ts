import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  transpilePackages: ["@tsparticles/react", "@tsparticles/slim", "@tsparticles/engine"],
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
