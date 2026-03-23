import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/editor-preview" : "",
  assetPrefix: isGitHubPages ? "/editor-preview/" : "",
};

export default nextConfig;
