declare class WriteToLogBaseClass {
    private file;
    private iterationTimes;
    private setTimeOutReference;
    private serviceName;
    constructor(filename: string, serviceName: string);
    writeToLog(value: any): void;
    getServiceName(): string;
}
export { WriteToLogBaseClass };
