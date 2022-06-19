/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = require('next-compose-plugins')(
  [
    [
      require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      }),
    ],
  ],
  {
    images: {
      domains: ['localhost', 'api.bibelstudiet.no'],
    },
    redirects: require('./next.redirects.js'),
  }
);
