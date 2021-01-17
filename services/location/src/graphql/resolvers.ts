const request = require('postman-request');

const { response } = require('express');

module.exports = {
    Query: {
        GetLocationFromZip: (parent: any, args: any, context: any, info: any) => {
            return new Promise((resolve, reject) => {
                try {
                    const zip = args.zip;
                    let url = process.env.ZIP_LOOKUP_ADDRESS;


                    if (!isNaN(zip)) {
                        let url = process.env.ZIP_LOOKUP_ADDRESS;
                        url +="/"+zip;
                        if (zip.length === 5) {

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
                        else if( zip.length > 5)
                        {
                            resolve({code:400,message:"invalid zip"});

                        }
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
