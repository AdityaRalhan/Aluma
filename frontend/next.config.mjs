/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['lastfm.freetls.fastly.net'],
    },
    allowedDevOrigins: ['http://127.0.0.1:3001', 'http://localhost:3001'],
  };
  
  export default nextConfig;
  