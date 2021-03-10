const request = require('postman-request');
const crypto = require('crypto');
import { TimeStampUTC } from "first-rx-common-lib";
import { writeToLog } from './../../src/helper/writeToLog';
//const soap = require('soap');
const fs = require('fs');
import path from 'path';
const soap = require('strong-soap').soap;
const soapRequest = require('easy-soap-request');

let private_key: string;

fs.readFile(path.join(process.cwd(), "firstrx.key"), (err: any, data: any) => {
    private_key = data;

});

module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {

            return await new Promise((resolve, reject) => {
                const makeSoapRequest = async (xml: string, url: string, soapOptions: any) => {
                    const { response } = await soapRequest({ url: url, headers: soapOptions, xml: xml, timeout: 5000 }); // Optional timeout parameter(milliseconds)
                    const { headers, body, statusCode } = response;
                    console.log('response', response);
                    console.log('headers', headers);
                    console.log('body', body);
                    console.log('statusCode', statusCode);

                }
                //     <soapenv:Header>
                //     <v1:RequestHeader soapenv:actor="http://schemas.xmlsoap.org/soap/actor/next" soapenv:mustUnderstand="0" xmlns:v1="https://rxsavings-ws.medimpact.com/cashcard-ws-v1_0/soap/cashcard">
                //         <v1:clientAccountCode>${process.env.MEDIMPACT_CLIENT_CODE}</v1:clientAccountCode>
                //         <v1:token>${obj["medimpact-token"]}</v1:token>
                //         <v1:timeStamp>${new Date().toISOString()}</v1:timeStamp>
                //     </v1:RequestHeader>
                // </soapenv:Header>
                // <soapenv:Body>
                //             <v1:opFindDrugByName xmlns:v1="https://rxsavings-ws.medimpact.com/cashcard-ws-v1_0/soap/cashcard">
                //                 <v1:prefixText>Att</v1:prefixText>
                //             </v1:opFindDrugByName>
                //         </soapenv:Body>
                //     </soapenv:Envelope>`; 
                try {
                    const signer = crypto.createSign('RSA-SHA256');
                    const timeStampUTC = new TimeStampUTC();
                    const timeStamp = timeStampUTC.getTimeStampUTC();
                    console.log('test');
                    console.log('timeStamp', timeStamp);
                    signer.write(timeStamp);
                    signer.end();
                    const signature = signer.sign(private_key, 'base64')
                    const value = args.value;
                    let url = `${process.env.MEDIMPACT_URL}?WSDL`;
                    let envVariables: string = process.env.APIKEYS === undefined ? "" : process.env.APIKEYS.toString();
                    let obj = JSON.parse(envVariables);

                    const xml = `<?xml version="1.0"?>
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://rx-savings.medimpact.com/contract/PricingEngine/v1.0">
                    <soapenv:Header/>
                    <soapenv:Body>
                       <v1:findDrugByNameRequest>
                          <v1:clientAccountCode>${process.env.MEDIMPACT_CLIENT_CODE}</v1:clientAccountCode>
                          <v1:token>${obj["medimpact-token"]}</v1:token>
                          <v1:timestamp>${new Date().toISOString()}</v1:timestamp>
                          <v1:prefixText>ben</v1:prefixText>
                          <!--Optional:-->
                          <v1:count>10</v1:count>
                       </v1:findDrugByNameRequest>
                    </soapenv:Body>
                 </soapenv:Envelope>`;

                    const soapOptions = {
                        'CC-Timestamp-Signature': [signature],
                        'Content-Type': 'text/xml',

                    }
                    console.log(xml);
                    //makeSoapRequest(xml, `${url}`, soapOptions);


                    // }
                    let data = {
                        clientAccountCode: `${process.env.MEDIMPACT_CLIENT_CODE}`,
                        token: `${obj["medimpact-token"]}`,
                        timestamp: `${new Date().toISOString()}`,
                        prefixText: "tyl"
                    };
                    // soap.createClient(url, soapOptions, function(err:any, client:any) {
                    //     console.log('err',err);
                    //     var method = client['opFindDrugByName'];
                    //     method(data, function(err:any, result:any, envelope:any, soapHeader:any) {

                    //        console.log('err1',err);
                    //        //response envelope
                    //       console.log('Response Envelope: \n' + envelope);
                    //       //'result' is the response body
                    //       console.log('Result: \n' + JSON.stringify(result));
                    //     });
                    //   });

                    //  let data2={opFindDrugByName:{prefixText:"tyl"}};
                    soap.createClient(url, function (err: any, client: any) {
                        console.log('error1', err);
                        if (err) {
                            resolve({ code: '500', error: 'Internal Server Error', message: err });
                        }
                        client.addSoapHeader(soapOptions);
                        console.log('client.opFindDrugByName.toString()', client.opFindDrugByName.toString(), client.opFindDrugByName);
                        client.opFindDrugByName(data, function (err: any, result: any) {

                            console.log('error2', err);
                            console.log('result', result);
                            if (err) {
                                resolve({ code: '500', error: 'Internal Server Error', message: err });
                            }

                        });
                        // client.opFindDrugByN(data2, function(err:any, result:any) {

                        //     console.log('error3',err);
                        //     console.log('result',result);
                        //     if(err)
                        // {
                        //     resolve({ code: '500', error: 'Internal Server Error', message: err });
                        // }

                    });


                });
            // console.log('date 2/24/2021',new Date().toISOString());
            // const options={
            //     url:`${url}`,
            //     headers:
            //     {
            //         'CC-Timestamp-Signature': signature,
            //         'Content-Type': 'text/xml'
            //     },
            //     body:xml         
            // };
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
        }catch(e) {
            console.log("error message" + e.message);
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
