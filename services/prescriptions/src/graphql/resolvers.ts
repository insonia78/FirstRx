const request = require('postman-request');
import { response } from 'express';
//import  {writeToLog}  from './../../src/helper/writeToLog';


//https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
//https://developers.google.com/places/web-service/autocomplete#location_biasing


module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {

             
          console.log(process.env.MEDIMPACT_URL);
          console.log('medimapctkey', process.env.MEDIMPACT_APIKEY);
          console.log('medimapctkey1', process.env.MEDIMPACT_APIKEY1);

            return await new Promise((resolve, reject) => {
                

                try {
                    const value = args.value;

                    //if(!(value.match(/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g) !== null || !(value.match(/[A-Za-z]/) === null || value.match(/[0-9]/) === null )))

                    let envVariables = process.env.APIKEYS;
                    envVariables = JSON.parse(JSON.stringify(envVariables));
                    console.log('envVariables',envVariables);    
                    let url = process.env.MEDIMPACT_URL;    //`&key=${process.env.GOOGLE_API_MAPS_KEY}`;
                    
                    console.log('url',url);
                    return 'error';
                    // request(url, (error: any, response: any, body: any) => {
                    //     if (error) {
                    //         // console.log(`${writeToLog.getServiceName()} = ${error}`);
                    //         // writeToLog.writeToLog(`code:500, error:InternalServerError, message:${error}`);
                    //         resolve({ code: '500', error: 'Internal Server Error', message: 'Something went wrong' });

                    //     }
                    //     else {

                    //         console.log(body); 
                    //         // if (Object.keys(body = JSON.parse(body)).length !== 0 || body['predictions'].length > 0) {
                    //         //     // console.log(body);
                    //         //     // console.log('inside predictions',body['predictions']);
                    //         //     // console.log('inside predictions1',body.predictions);
                    //         //     // console.log('inside predictions1',body.predictions.length);
                    //         //     if (body['predictions'].length === 1) {                                    
                    //         //         getAddressByGeoLocation(body,body.predictions[0].place_id,resolve)    
                    //         //     }
                    //         //     else {

                    //         //         if (body.error !== undefined) {
                    //         //             console.log(`${writeToLog.getServiceName()} = ${body.error}`);
                    //         //             writeToLog.writeToLog(`code:400, error:InternalServerError, message:${body.error}`);
                    //         //             Object.assign(body, { code: 400, message: body.error });
                    //         //         }
                    //         //         else {
                    //         //             Object.assign(body, { code: 200 });
                    //         //         }
                    //         //         resolve(body);
                    //         //     }
                                

                    //         // }
                    //         // else {
                    //         //     console.log(`${writeToLog.getServiceName()} = Returned no response`);
                    //         //     writeToLog.writeToLog(`code:400, message: ${url} returned no response`);
                    //         //     resolve({ code: 400, message: 'Returned no response' });
                    //         // }

                    //     }

                    // });
                    // }
                    // else{
                    //     resolve({code:'404',error:'Not Found',message:'Value not found'});
                    // }




                }
                catch (e) {
                    // console.log(`${writeToLog.getServiceName()} =${e.message}`);
                    // writeToLog.writeToLog(`code:500, error:'Internal Server Error' messase:${e.message}`);
                    resolve({ code: '500', error: 'Internal Server Error', message: e.message });
                }

            }).then((response) => { console.log('inside response', response); return response; });

        }

    },
    Query: {
        hello: () => "Hello world",
    }
}
