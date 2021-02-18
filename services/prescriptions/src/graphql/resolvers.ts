const request = require('postman-request');
import { response } from 'express';
import  {writeToLog}  from './../../src/helper/writeToLog';
const soapRequest = require('easy-soap-request');
const fs = require('fs');

let private_key;
fs.readFile('./../../firstrx.key',(err:any,data:any)=>{
    private_key = data;

    console.log('private_key', data);

});


module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {
         const xml =`
            <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
            <soapenv:Header>
                <mkt:AuthenticationHeader>
                    <mktowsUserId>mktodemoaccount881_536240405411DF5316D5C9</mktowsUserId>
                    <requestSignature>3f4b21eb586063dc65774a2733713cac342e9c81</requestSignature>
                    <requestTimestamp>2017-03-09T17:40:00-08:00</requestTimestamp>
                </mkt:AuthenticationHeader>
            </soapenv:Header>
            <SOAP-ENV:Body>
               <ns1:LatLonListZipCodeResponse xmlns:ns1="https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl">
                  <listLatLonOut xsi:type="xsd:string">&lt;?xml version='1.0'?&gt;&lt;dwml version='1.0' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='https://graphical.weather.gov/xml/DWMLgen/schema/DWML.xsd'&gt;&lt;latLonList&gt;32.9612,-96.8372&lt;/latLonList&gt;&lt;/dwml&gt;</listLatLonOut>
               </ns1:LatLonListZipCodeResponse>
                </SOAP-ENV:Body>
            </SOAP-ENV:Envelope>`;   
         return await new Promise((resolve, reject) => {
                         try {
                    const value = args.value;
                    let url = process.env.MEDIMPACT_URL;    
                    let envVariables = process.env.APIKEYS;
                    let obj = JSON.parse(JSON.stringify(envVariables));
                   const options ={
                       url: url,
                       headers:{
                           authorization: obj['medimpact-token'],
                       }
                   }
                    
                    
                    // request(options, (error: any, response: any, body: any) => {
                    //     if (error) {
                    //         console.log(`${writeToLog.getServiceName()} = ${error}`);
                    //         writeToLog.writeToLog(`code:500, error:InternalServerError, message:${error}`);
                    //         resolve({ code: '500', error: 'Internal Server Error', message: 'Something went wrong' });

                    //     }
                    //     else {

                    //         console.log(body); 
                    //         if (Object.keys(body = JSON.parse(body)).length !== 0 || body['predictions'].length > 0) {
                    //             // console.log(body);
                    //             // console.log('inside predictions',body['predictions']);
                    //             // console.log('inside predictions1',body.predictions);
                    //             // console.log('inside predictions1',body.predictions.length);
                    //             if (body['predictions'].length === 1) {                                    
                    //                 getAddressByGeoLocation(body,body.predictions[0].place_id,resolve)    
                    //             }
                    //             else {

                    //                 if (body.error !== undefined) {
                    //                     console.log(`${writeToLog.getServiceName()} = ${body.error}`);
                    //                     writeToLog.writeToLog(`code:400, error:InternalServerError, message:${body.error}`);
                    //                     Object.assign(body, { code: 400, message: body.error });
                    //                 }
                    //                 else {
                    //                     Object.assign(body, { code: 200 });
                    //                 }
                    //                 resolve(body);
                    //             }
                                

                    //         }
                    //         else {
                    //             console.log(`${writeToLog.getServiceName()} = Returned no response`);
                    //             writeToLog.writeToLog(`code:400, message: ${url} returned no response`);
                    //             resolve({ code: 400, message: 'Returned no response' });
                    //         }

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
