/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "googleusercontent.com",
      },
      { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
      { hostname: "cdn.openai.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: '/code',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
      {
        source: '/conversation',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
      {
        source: '/dashboard',  // this path will be redirected to 404 
        destination: '/',
        permanent: true,
      },
      {
        source: '/image',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
      {
        source: '/music',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
      {
        source: '/setting',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
      {
        source: '/video',  // this path will be redirected to 404 
        destination: '/404',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
