const request = require('postman-request');
const crypto = require('crypto');
import { response } from 'express';
import { writeToLog } from './../../src/helper/writeToLog';
const soapRequest = require('easy-soap-request');
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
            const xml = `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
            <soapenv:Header/> 
            <soapenv:Body>
                <opFindDrugByName>
                       <prefixText>ATT</prefixText>
                <opFindDrugByName>
              </soapenv:Body>
            </soapenv:Envelope>`;
            return await new Promise((resolve, reject) => {
                try {
                    const value = args.value;
                    let url = process.env.MEDIMPACT_URL;
                    let envVariables = process.env.APIKEYS;
                    let obj = JSON.parse(JSON.stringify(envVariables));
                    const options = {
                        url: url,
                        headers: {
                            authorization: obj['medimpact-token'],
                            'CC-Timestamp-Signature': signature,
                            'Content-Type': 'text/xml',

                        },
                        body:xml
                    }


                    request(options, (error: any, response: any, body: any) => {
                        if (error) {
                            console.log(`${writeToLog.getServiceName()} = ${error}`);
                            writeToLog.writeToLog(`code:500, error:InternalServerError, message:${error}`);
                            resolve({ code: '500', error: 'Internal Server Error', message: 'Something went wrong' });

                        }
                        else {

                            console.log('response from server', body);
                            if (Object.keys(body = JSON.parse(body)).length !== 0) {
                                // console.log(body);
                                // console.log('inside predictions',body['predictions']);
                                // console.log('inside predictions1',body.predictions);
                                // console.log('inside predictions1',body.predictions.length);
                                // if (body['predictions'].length === 1) {
                                //     getAddressByGeoLocation(body, body.predictions[0].place_id, resolve)
                                // }
                                // else {

                                //     if (body.error !== undefined) {
                                //         console.log(`${writeToLog.getServiceName()} = ${body.error}`);
                                //         writeToLog.writeToLog(`code:400, error:InternalServerError, message:${body.error}`);
                                //         Object.assign(body, { code: 400, message: body.error });
                                //     }
                                //     else {
                                //         Object.assign(body, { code: 200 });
                                //     }
                                //     resolve(body);
                                // }


                            }
                            else {
                                console.log(`${writeToLog.getServiceName()} = Returned no response`);
                                writeToLog.writeToLog(`code:400, message: ${url} returned no response`);
                                resolve({ code: 400, message: 'Returned no response' });
                            }

                        }

                    });
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
