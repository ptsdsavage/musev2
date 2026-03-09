/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  basePath: isProd ? "/musev2" : "",
  assetPrefix: isProd ? "/musev2/" : "",
  images: { unoptimized: true },
  devIndicators: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/musev2" : "",
  },
};
export default nextConfig;
