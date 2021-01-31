const request = require('postman-request');
const { response } = require('express');

//https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding
//https://developers.google.com/places/web-service/autocomplete#location_biasing


module.exports = {
    Mutation: {
        GetLocationFromZipOrCity: async (parent: any, args: any, context: any, info: any) => {

             const getAddressByGeoLocation = (bodyfromplaces:any,place_id:string,resolve:any)=>{

                let url="https://maps.googleapis.com/maps/api/geocode/json?";   

                url += 'place_id=';
                url += place_id;
                 url +=  '&key= AIzaSyAhJjZH6lxSraVwcjLBB9O2DfHF0PFJD5Q'

                request(url, (error: any, response: any, body: any) => {
                    if (error)
                    {
                        console.log(error);
                        throw { code: '500', error: 'Internal Server Error', message: 'Something went wrong' };

                    }    
                    else {
                        let b;

                        if(Object.keys(body).length !== 0)
                        {                                        

                            body = JSON.parse(body);
                            if (body.error !== undefined) {
                                Object.assign(body, { code: 400, message: body.error });
                            }
                            else {
                                Object.assign(body, { code: 200 });
                            }
                            

                        }
                        else{
                          b = new Error("there is an error");                                      
                        }
                        console.log("inside geo",body);
                        resolve(body);
                    }

                });

             }  


            return await new Promise((resolve, reject) => {
                

                try {
                    const value = args.value;

                    //if(!(value.match(/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g) !== null || !(value.match(/[A-Za-z]/) === null || value.match(/[0-9]/) === null )))



                    let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';   //process.env.CITY_AUTO_COMPLETE;

                    url += '?';
                    url += `input=${value}`;
                    url += '&types=(regions)';
                    url += '&components=country:us';
                    url += '&radius=500';
                    url += '&key= AIzaSyAhJjZH6lxSraVwcjLBB9O2DfHF0PFJD5Q'   //`&key=${process.env.GOOGLE_API_MAPS_KEY}`;
                    request(url, (error: any, response: any, body: any) => {
                        if (error) {
                            console.log(error);
                            throw { code: '500', error: 'Internal Server Error', message: 'Something went wrong' };

                        }
                        else {


                            if (Object.keys(body = JSON.parse(body)).length !== 0 || body['predictions'].length > 0) {
                                // console.log(body);
                                // console.log('inside predictions',body['predictions']);
                                // console.log('inside predictions1',body.predictions);
                                // console.log('inside predictions1',body.predictions.length);
                                if (body['predictions'].length === 1) {                                    
                                    getAddressByGeoLocation(body,body.predictions[0].place_id,resolve)    
                                }
                                else {

                                    if (body.error !== undefined) {
                                        Object.assign(body, { code: 400, message: body.error });
                                    }
                                    else {
                                        Object.assign(body, { code: 200 });
                                    }
                                    resolve(body);
                                }
                                

                            }
                            else {
                                resolve({ code: 400, message: 'Returned no response' });
                            }

                        }

                    });
                    // }
                    // else{
                    //     resolve({code:'404',error:'Not Found',message:'Value not found'});
                    // }




                }
                catch (e) {
                    resolve({ code: '500', error: 'Internal Server Error', message: e.message });
                }

            }).then((response) => { console.log('inside response', response); return response; });

        }

    },
    Query: {
        hello: () => "Hello world",
    }
}
