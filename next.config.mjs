/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "japan-dakwah-foundation.s3.amazonaws.com",
			},
		],
	},
};

export default nextConfig;
