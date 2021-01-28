module.exports = { target: 'serverless' };
module.exports = {
    env: {
      locationUrl: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
      LOCATION_SERVICE_API_URL: 'http://localhost:5000',
      PRESCRIPTIONS_SERVICE_API_URL: 'http://localhost:4000',
      COUPON_SERVICE_API_URL: 'http://localhost:6000',
      TEXT_MESSAGE_SERVICE_API_URL: 'http://Localhost:7000'
    },
  }