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
class TimeStampUTC {

    constructor() {

    }
    public getTimeStampUTC(): string {

        return `${this.getDateTime()}${this.getTimeZone()}`;

    }
    private getTimeZone() {
        let timezone_offset_min = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'})).getTimezoneOffset(),
            
            
            offset_hrs = parseInt(Math.abs(timezone_offset_min / 60).toString()).toString(),
            offset_min = Math.abs(timezone_offset_min % 60).toString(),
            timezone_standard;

        if (parseInt(offset_hrs) < 10)
            offset_hrs = '0' + offset_hrs;

        if (parseInt(offset_min) < 10)
            offset_min = '0' + offset_min;

        // Add an opposite sign to the offset
        // If offset is 0, it means timezone is UTC
        if (timezone_offset_min < 0)
            timezone_standard = '+' + offset_hrs + ':' + offset_min;
        else if (timezone_offset_min > 0)
            timezone_standard = '-' + offset_hrs + ':' + offset_min;
        else if (timezone_offset_min == 0)
            timezone_standard = '+00:00';


        return '+00:00' ;
        

    }
    private getDateTime() {
        let dt = new Date(),//new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'})),
            current_date = dt.getDate().toString(),
            current_month = (dt.getMonth() + 1).toString(),
            current_year = dt.getFullYear().toString(),
            current_hrs = dt.getHours().toString(),
            current_mins = dt.getMinutes().toString(),
            current_secs = dt.getSeconds().toString(),
            current_millisecs = dt.getMilliseconds().toString(),
            current_datetime;

        // Add 0 before date, month, hrs, mins or secs if they are less than 0
        current_date = parseInt(current_date) < 10 ? '0' + current_date : current_date;
        current_month = parseInt(current_month) < 10 ? '0' + current_month : current_month;
        current_hrs = parseInt(current_hrs) < 10 ? '0' + current_hrs : current_hrs;
        current_mins = parseInt(current_mins) < 10 ? '0' + current_mins : current_mins;
        current_secs = parseInt(current_secs) < 10 ? '0' + current_secs : current_secs;
        if(current_millisecs.length < 3 && current_millisecs.length > 1)
            current_millisecs = '0'+ current_millisecs;
        else if(current_millisecs.length  < 2)
            current_millisecs = '00'+ current_millisecs;       
       
        
        current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs //+'.'+current_millisecs;

        return current_datetime;

    }
}

module.exports = {
    Mutation: {
        prescription: async (parent: any, args: any, context: any, info: any) => {

            return await new Promise((resolve, reject) => {
                const makeSoapRequest = async (xml: string, url: string, soapOptions: any) => {
                    const { response } = await soapRequest({ url: url, headers: soapOptions, xml: xml, timeout: 5000 })
                                              .catch((err:any) => console.log('error',err)); // Optional timeout parameter(milliseconds)
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
                    console.log('UTC',new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles'})));
                    const signer = crypto.createSign('RSA-SHA256');
                    const timeStampUTC = new TimeStampUTC();
                    //const timeStamp = moment().utcOffset('-0800').format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
                    const timeStamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
                    
                    console.log('timeStamp', timeStamp);
                    signer.write(timeStamp);
                    signer.end();
                    const signature = signer.sign(private_key, 'base64')
                    const value = args.value;
                    let url = `${process.env.MEDIMPACT_URL}`;
                    let envVariables: string = process.env.APIKEYS === undefined ? "" : process.env.APIKEYS.toString();
                    let obj = JSON.parse(envVariables);
                    //<v1:token>SwciN4Xq6jRhVqSGWYoV6H4cg8ZceZeEB5FUO76SK/VhqWQyhlCDQxhtpUKNLtVX1mpgngmfueCmZHJI8JZ78C+NPbMYWR/DPlDa8ptVFTpDx1vrX/7vhNf7PTD1LzIk52JIQ2vcdgb17z+DO4khe7ZPQ8v4oZaOqIxKLd4WoU7QNj+R0jcwWp5F8SOBfHu2trnAkAXgyoOmbO81Fiye4Lay+XrSDUTpR68GZzQGp/Wqnk25bM0oqBKV/QEm74k2kfpxVoIDrQx1m1Zs2OkYP36BdrBVWsHPLm9jLJZg196eD/PhNh5KhRM/jvlO4e6OHf/YpMP8b0ERdktEHgyblg==</v1:token>
                           
                    let xml = `<?xml version="1.0"?>
                    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://rx-savings.medimpact.com/contract/PricingEngine/v1.0">
                    <soapenv:Header/>
                    <soapenv:Body>
                       <v1:findDrugByNameRequest>
                          <v1:clientAccountCode>${process.env.MEDIMPACT_CLIENT_CODE}</v1:clientAccountCode>
                          <v1:token>${obj["medimpact-token"]}</v1:token>
                          <v1:timestamp>${timeStamp}</v1:timestamp>
                          <v1:prefixText>ben</v1:prefixText>
                          <!--Optional:-->
                          <v1:count>10</v1:count>
                       </v1:findDrugByNameRequest>
                    </soapenv:Body>
                 </soapenv:Envelope>`;

                    const soapOptions = {
                        'CC-Timestamp-Signature': signature,
                        'Content-Type': 'text/xml',

                    }
                    console.log(xml);
                    //makeSoapRequest(xml, `${url}`, soapOptions);
                    xml = xml.trim();

                    // }
                    // let data = {
                    //     findDrugByNameRequest:{
                    //     clientAcc
                    //     ountCode: `${process.env.MEDIMPACT_CLIENT_CODE}`,
                    //     token: `${obj["medimpact-token"]}`,
                    //     timestamp: `${new Date().toISOString()}`,
                    //     prefixText: "tyl"}
                    // };
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
                    // soap.createClient(url, function (err: any, client: any) {
                    //     console.log('error1', err);
                    //     if (err) {
                    //         resolve({ code: '500', error: 'Internal Server Error', message: err });
                    //     }
                    //     client.addSoapHeader(soapOptions);
                    //     console.log('client.opFindDrugByName.toString()', client);
                    //     client.opFindDrugByName(data, function (err: any, result: any) {

                    //         console.log('error2', err);
                    //         console.log('result', result);
                    //         if (err) {
                    //             resolve({ code: '500', error: 'Internal Server Error', message: err });
                    //         }

                    //     });
                        // client.opFindDrugByN(data2, function(err:any, result:any) {

                        //     console.log('error3',err);
                        //     console.log('result',result);
                        //     if(err)
                        // {
                        //     resolve({ code: '500', error: 'Internal Server Error', message: err });
                        // }

                   // });


               
            //console.log('date 2/24/2021',new Date().toISOString());
            const options={ 
                method:"POST",     
                url:url,                         
                headers:
                {
                    'CC-Timestamp-Signature': signature,
                    'Content-Type': 'text/xml'
                },
                body:xml         
            };
            console.log('options', options);
            request(options, (error: any, response: any) => {
                if (error) {
                    console.log(`${writeToLog.getServiceName()} = ${error}`);
                    writeToLog.writeToLog(`code:500, error:InternalServerError, message:${error}`);
                    resolve({ code: '500', error: 'Internal Server Error', message: 'Something went wrong' });

                }
                else {
                             
                    //console.log('response from server', body);
                    console.log('response headers',response.headers);
                    console.log('response body',response.body);
                    console.log('response statusCode',response.statusCode);
                    let text = response.body;
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text, "text/xml");
                    let xmlResult = xmlDoc.getElementsByTagName(`prefixText`)[0]
                      .childNodes[0].nodeValue;
                      console.log('xmlResult',xmlResult);
                    resolve(xmlResult);
                    // if (Object.keys(body = JSON.parse(body)).length !== 0) {
                    //     // console.log(body);
                    //     // console.log('inside predictions',body['predictions']);
                    //     // console.log('inside predictions1',body.predictions);
                    //     // console.log('inside predictions1',body.predictions.length);
                    //     // if (body['predictions'].length === 1) {
                    //     //     getAddressByGeoLocation(body, body.predictions[0].place_id, resolve)
                    //     // }
                    //     // else {

                    //     //     if (body.error !== undefined) {
                    //     //         console.log(`${writeToLog.getServiceName()} = ${body.error}`);
                    //     //         writeToLog.writeToLog(`code:400, error:InternalServerError, message:${body.error}`);
                    //     //         Object.assign(body, { code: 400, message: body.error });
                    //     //     }
                    //     //     else {
                    //     //         Object.assign(body, { code: 200 });
                    //     //     }
                    //     //     resolve(body);
                    //     // }


                    // }
                    // else {
                    //     console.log(`${writeToLog.getServiceName()} = Returned no response`);
                    //     writeToLog.writeToLog(`code:400, message: ${url} returned no response`);
                    //     resolve({ code: 400, message: 'Returned no response' });
                    // }

                }

            });
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
