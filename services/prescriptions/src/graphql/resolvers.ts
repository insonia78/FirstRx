const request = require('postman-request');
const crypto = require('crypto');
import { response } from 'express';
import { writeToLog } from './../../src/helper/writeToLog';
var soap = require('soap');
const fs = require('fs');
import path from 'path';

let private_key: string;

fs.readFile(path.join(process.cwd(), "firstrx.key"), (err: any, data: any) => {
    private_key = data;

});

module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {
            const signer = crypto.createSign('RSA-SHA256');
            signer.write(new Date().toISOString());
            signer.end();
            const signature = signer.sign(private_key, 'base64')
           
            return await new Promise((resolve, reject) => {
                try {
                    const value = args.value;
                    let url = `${process.env.MEDIMPACT_URL}?wsdl`;
                    let envVariables = process.env.APIKEYS;
                    let obj = JSON.parse(JSON.stringify(envVariables));
                    // const xml = `
                    // <?xml version = "1.0"?>
                    // <soapenv:Envelope 
                    // xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                   
                    // soapenv:encodingStyle="http://www.w3.org/2003/05/soap-encoding">

                    // xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance" 
                    // xmlns:xsd="http://www.w3.org/1999/XMLSchema"
                    // >
                    // <soapenv:Header>
                    //  <v1:clientAccountCode>${process.env.MEDIMPACT_CLIENT_CODE}</v1:clientAccountCode>
                    //  <v1:token>${obj['medimpact-token']}</v1:token>
                    //  <v1:timeStamp>${new Date().toISOString()}</v1:timeStamp>
                    // </soapenv:Header> 
                    // <soapenv:Body>
                    //     <v1:opFindDrugByName xmlns:v1="https://rxsavings-ws.medimpact.com/cashcard-ws-v1_0/soap/cashcard">
                    //           <v1:prefixText>Att</v1:prefixText>
                    //     </v1:opFindDrugByName>
                    //   </soapenv:Body>
                    // </soapenv:Envelope>`;
                    // const options = {
                    //     url: url,
                    //     headers: {                            
                    //         'CC-Timestamp-Signature': signature,
                    //         'Content-Type': 'text/xml',
                    //     },
                    //     body:xml
                    // }
                    const soapOptions = {
                            token:obj['medimpact-token'],
                            timeStamp:new Date().toISOString(),
                            clientAccountCode:process.env.MEDIMPACT_CLIENT_CODE,                            
                            'CC-Timestamp-Signature': signature,
                            'Content-Type': 'text/xml',
                        
                    }
                    let data={prefixText:'Att'}
                    soap.createClient(url, function(err:any, client:any) {
                        console.log('error1',err);
                        if(err)
                        {
                            resolve({ code: '500', error: 'Internal Server Error', message: err });
                        }
                        client.addSoapHeader(soapOptions);
                        console.log(client.describe());
                        client.opFindDrugByName(data, function(err:any, result:any) {
                            
                            console.log('error2',err);
                            console.log('result',result);
                            if(err)
                        {
                            resolve({ code: '500', error: 'Internal Server Error', message: err });
                        }

                        });

                    });
                    console.log('date 2/24/2021',new Date().toISOString());
                    // request(options, (error: any, response: any, body: any) => {
                    //     if (error) {
                    //         console.log(`${writeToLog.getServiceName()} = ${error}`);
                    //         writeToLog.writeToLog(`code:500, error:InternalServerError, message:${error}`);
                    //         resolve({ code: '500', error: 'Internal Server Error', message: 'Something went wrong' });

                    //     }
                    //     else {

                    //         console.log('response from server', body);
                    //         if (Object.keys(body = JSON.parse(body)).length !== 0) {
                    //             // console.log(body);
                    //             // console.log('inside predictions',body['predictions']);
                    //             // console.log('inside predictions1',body.predictions);
                    //             // console.log('inside predictions1',body.predictions.length);
                    //             // if (body['predictions'].length === 1) {
                    //             //     getAddressByGeoLocation(body, body.predictions[0].place_id, resolve)
                    //             // }
                    //             // else {

                    //             //     if (body.error !== undefined) {
                    //             //         console.log(`${writeToLog.getServiceName()} = ${body.error}`);
                    //             //         writeToLog.writeToLog(`code:400, error:InternalServerError, message:${body.error}`);
                    //             //         Object.assign(body, { code: 400, message: body.error });
                    //             //     }
                    //             //     else {
                    //             //         Object.assign(body, { code: 200 });
                    //             //     }
                    //             //     resolve(body);
                    //             // }


                    //         }
                    //         else {
                    //             console.log(`${writeToLog.getServiceName()} = Returned no response`);
                    //             writeToLog.writeToLog(`code:400, message: ${url} returned no response`);
                    //             resolve({ code: 400, message: 'Returned no response' });
                    //         }

                    //     }

                    // });
                }catch (e) {
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
