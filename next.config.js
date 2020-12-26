// const withCSS = require('@zeit/next-css')

// module.exports = withCSS({
//   cssLoaderOptions: {
//     url: true
//   }
// });
module.exports = {
    env: {
        LOCATION_API: process.env.LOCATION_API,
    },
  };