const { WriteToLogBaseClass } = require('common-lib');
const json_p  = require('./../../package.json');


class writeToLog extends WriteToLogBaseClass {

            constructor(fileName:string,serviceName:string){
                super(fileName,serviceName)
                
            }
            public writeToLog(value:string)
            {
                      super.writeToLog(value);
            }
            public getServiceName(){
                   
                return super.getServiceName();
            }
}

export default new writeToLog('log',json_p.name);