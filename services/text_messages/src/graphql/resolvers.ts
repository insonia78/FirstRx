const request = require('postman-request');
const { response } = require('express');
const dotenv = require('dotenv');
dotenv.config();

//https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
//https://developers.google.com/places/web-service/autocomplete#location_biasing


const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

module.exports = {
    Mutation: {
        SendTextMessageMutation: async (parent: any, args: any, context: any, info: any) => {


            let phone_number = args.value;

            return await new Promise((resolve, reject) => {
                client.messages
                    .create({
                        from: process.env.TWILIO_PHONE_NUMBER,
                        to: phone_number,
                        body: 'this is a test from FirstRx'
                    })
                    .then(() => {
                        resolve({ code: 200, message: `Coupon sent to phone number ${phone_number}` });
                    })
                    .catch((err: any) => {
                        console.log(err);
                        resolve({ code: 400, message: `there was an error${err}` });
                    });

            }).then((response) => { console.log('inside response', response); return response; });

        }

    },
    Query: {
        hello: () => "Hello world",
    }
}
