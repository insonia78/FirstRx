module.exports = { target: 'serverless' };
module.exports = {
    env: {
      locationUrl: 'https://api.bigdatacloud.net/data/reverse-geocode-client',
      LOCATION_SERVICE_API_URL: '/location',      
      PRESCRIPTIONS_SERVICE_API_URL: '/prescriptions',
      COUPON_SERVICE_API_URL: '/coupon',
      TEXT_MESSAGE_SERVICE_API_URL: '/text-message',
      GOOGLE_MAPS_API_KEY: 'AIzaSyAhJjZH6lxSraVwcjLBB9O2DfHF0PFJD5Q'

    },
  }