import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'enlinea.unapiquitos.edu.pe',
      },
      {
        protocol: 'https',
        hostname: 'diariolaregion.com',
      },
      {
        protocol: 'https',
        hostname: 'http://192.168.16.182:8000/',
      },
    ],
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    // local APIs
    SESSION_SECRET: process.env.SESSION_SECRET,
    API_URL_RENIEC: process.env.API_URL_RENIEC,
    URL_API_LOCAL: process.env.APP_URL_API_LOCAL,
    // production APIs
    URL_API_PRODUCTION: process.env.APP_URL_API_PRODUCTION,
  },
}

export default nextConfig
