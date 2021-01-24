const request = require('postman-request');

const { response } = require('express');

module.exports = {
    Query: {
        GetLocationFromZipOrCity: (parent: any, args: any, context: any, info: any) => {
            return new Promise((resolve, reject) => {
                try {
                    const value = args.value;
                    let url = process.env.ZIP_LOOKUP_ADDRESS;


                    if (!isNaN(value)) {
                        let url = process.env.ZIP_LOOKUP_ADDRESS;
                        // url +="/"+zip;
                        
                        url +='?';
                        url += `address=${value}`;
                        url += `&key=${process.env.GOOGLE_API_MAPS_KEY}`;
                        if (value.length === 5) {
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
                        else if( value.length > 5 && !isNaN(value))
                        {
                            //throw { code: '500', error: 'Invalid Zip', message: 'Something went wrong' };
                            resolve({code:400,message:"invalid zip"});

                        }
                    }
                    else if(isNaN(value) && value.match(/[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g)  == null && value.match(/\d+/g) == null )
                    {

                        
                        let url = process.env.CITY_AUTO_COMPLETE;

                        url +='?';
                        url += `input=${value}`;
                        url += '&types=(cities)';
                        url += `&key=${process.env.GOOGLE_API_MAPS_KEY}`;
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
                    throw { code: '500', error: 'Internal Server Error', message: e.message };
                }

            }).then((response) => response)
        }
    },
    Mutation: {
        hello: () => "Hello world",
    }
}
