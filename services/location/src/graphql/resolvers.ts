const request = require('postman-request');

const { response } = require('express');

module.exports = {
    Mutation: {
        GetLocationFromZipOrCity: (parent: any, args: any, context: any, info: any) => {
            return new Promise((resolve, reject) => {
                try {
                    const value = args.value;
                    
                    if(!(value.match(/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g) !== null || !(value.match(/[A-Za-z]/) === null || value.match(/[0-9]/) === null )))
                    {

                        
                        let url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';   //process.env.CITY_AUTO_COMPLETE;

                        url +='?';
                        url += `input=${value}`;
                        url += '&types=(regions)';
                        url +=  '&key= AIzaSyAhJjZH6lxSraVwcjLBB9O2DfHF0PFJD5Q'   //`&key=${process.env.GOOGLE_API_MAPS_KEY}`;
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
                                    console.log('getting body', body);
                                    b = JSON.parse(body);
                                    if(b.error !== undefined)
                                     { 
                                        Object.assign(b,{code:400,message:b.error});                                                                                        
                                     }
                                     else{
                                        Object.assign(b,{code:200});                                            
                                     }
                                     
                                }
                                else{
                                  b = new Error("there is an error");                                      
                                }
                                resolve(b);
                            }

                        });
                    }
                    else{
                        resolve({code:'404',error:'Not Found',message:'Value not found'});
                    }

                    


                }
                catch (e) {
                    resolve({ code: '500', error: 'Internal Server Error', message: e.message });
                }

            }).then((response) => response)
        }
    },
    Query: {
        hello: () => "Hello world",
    }
}
