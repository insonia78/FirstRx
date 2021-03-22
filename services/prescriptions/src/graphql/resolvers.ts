//const request = require('postman-request');
const request = require('request');
const crypto = require('crypto');
const DOMParser = require("xmldom").DOMParser;

import { writeToLog } from './../../src/helper/writeToLog';
const soap = require('soap');
const fs = require('fs');
import path from 'path';
//const soap = require('strong-soap').soap;
const soapRequest = require('easy-soap-request');
const moment = require('moment')

let private_key: string;

fs.readFile(path.join(process.cwd(), "firstrx.key"), (err: any, data: any) => {
    private_key = data;

});

let public_key: string;

fs.readFile('firstrx.crt', (err: any, data: any) => {
    if (err) {
        console.error(err)
        return
    }
    public_key = data;
});


module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {
             let prescription = args.prescription.trim();
            
            if(prescription.length < 3)
            {
                console.log(`code:422, message:"Request is not valid`);
                return {code:422, message:"Request is not valid"}
            }
            return await new Promise((resolve, reject) => {

                try {
                    const query = (Temp: any, elementToParse: any) => {
                        let envVariables: string = process.env.APIKEYS === undefined ? "" : process.env.APIKEYS.toString();
                        let obj = JSON.parse(envVariables);
                        const signer = crypto.createSign('RSA-SHA256');

                        var myTimeStamp = moment().utcOffset('-0700').format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');


                        signer.write(myTimeStamp);
                        signer.end();
                        const signature = signer.sign(private_key, 'base64');
                        let xml = `
                        <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" 
                        xmlns:v1=\"http://rx-savings.medimpact.com/contract/PricingEngine/v1.0\">
                        <soapenv:Header/>
                        <soapenv:Body>
                            <v1:findDrugByNameRequest>
                            <!--                   <v1:clientAccountCode>MA01</v1:clientAccountCode> 
                                <v1:token>cHHHT2hI/BDAUt9SEnloLwMF8MKgXY2YiBHUlsMU5FTJCBZqj5mgRQB5CtITinZUXm3jlCz4vCzwcSPabjJuhKCjhPd71w0L/K8qlMyXLemxJnZ8s6UZrJm2y0QGdCwr47A8SHYF50gNq13DvZfVtktsaoafrc1QylbsV0UMX43tRm0Ew2BE5lMc/6aqgQlgMMWeiELkTWPf+pJFPpABqBKazRvCXgVd1cCi++BmYIkT1IUqxvrPdVuiVZOu266NM4H88WhGMaeylIo9iKCvPZt3FE3JTIwS9lZCZyRgILdWKnp+w+krwGYPyYBew2oLEnyIogFP0ISdWrY1Xk1BTw==</v1:token> -->
                                            <v1:clientAccountCode>MIC61</v1:clientAccountCode>
                                <v1:clientAccountCode>${process.env.MEDIMPACT_CLIENT_CODE}</v1:clientAccountCode>
                                <v1:token>${obj["medimpact-token"]}</v1:token>
                                <v1:timestamp>${myTimeStamp}</v1:timestamp>
                                <v1:prefixText>${Temp}</v1:prefixText>
                                <!--Optional:-->
                                <v1:count>10</v1:count>
                            </v1:findDrugByNameRequest>
                        </soapenv:Body>
                    </soapenv:Envelope>`;


                        const verify = crypto.createVerify('RSA-SHA256');

                        verify.write(myTimeStamp);
                        verify.end();

                        console.log("--verification-->>>>>>>>>>>>", verify.verify(public_key, signature, 'base64'));


                        let options = {
                            method: "POST",
                            url: `${process.env.MEDIMPACT_URL}`,
                            headers: {
                                'Content-Type': 'text/xml',
                                'CC-Timestamp-Signature': signature
                            },
                            body: xml
                        };
                        request(options, function (error: any, response: any) {
                            if (error) {
                                console.log(error);
                                reject(new Error(error)); // reject instead of throwing, handle with `catch`
                                return;
                            }
                            if (response.statusCode === 200 && response.body !== '') 
                            {
                                let text = response.body;

                                let parser = new DOMParser();
                                let xmlDoc = parser.parseFromString(text, "text/xml");
                                let xmlResult:string|any = "";
                                console.log('text',response.body);
                                if( xmlDoc.getElementsByTagName(`${elementToParse}`).length === 1)
                                {


                                }
                                else if( xmlDoc.getElementsByTagName(`${elementToParse}`).length > 1)
                                {
                                    for (let i = 0; i < xmlDoc.getElementsByTagName(`${elementToParse}`).length; i++) {
                                        xmlResult += xmlDoc.getElementsByTagName(`${elementToParse}`)[i].childNodes[0].nodeValue + ",";
                                    }
                                    xmlResult = xmlResult.split(',');
                                    resolve({code:response.statusCode,prescription:xmlResult});
                               }
                               else{
                                resolve({code:204,message:`No Data for ${args.prescription}`});
                               }
                               console.log(xmlResult);
                            }
                            else{
                                resolve({code:204,message:`No Data for ${args.prescription}`});
                            }
                        });


                    }
                    query(prescription, 'drugNameSuggestion');


                } catch (e) {
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
