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
    redirects: require('./next.redirects.js'),
    images: {
      domains: ['localhost'],
    },
    future: {
      webpack5: true,
    },
  }
);
