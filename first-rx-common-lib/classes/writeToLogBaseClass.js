"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteToLogBaseClass = void 0;
var fs_1 = __importDefault(require("fs"));
var WriteToLogBaseClass = /** @class */ (function () {
    function WriteToLogBaseClass(filename, serviceName) {
        this.iterationTimes = 0;
        this.file = process.cwd() + "/" + filename;
        this.serviceName = serviceName;
    }
    WriteToLogBaseClass.prototype.writeToLog = function (value) {
        var _this = this;
        var time = new Date().toISOString();
        fs_1.default.appendFile(this.file, time + ":" + this.serviceName + " " + value, function (err) {
            if (err) {
                if (_this.iterationTimes++ > 5) {
                    clearTimeout(_this.setTimeOutReference);
                    _this.iterationTimes = 0;
                    console.log(time + ":" + _this.serviceName + " can't write to log " + err);
                    // to be handled when finished writting nats bus 
                }
                else {
                    _this.setTimeOutReference = setTimeout(_this.writeToLog, 1000, value);
                }
            }
            ;
            console.log(time + ":" + _this.serviceName + " The  was appended to log!");
            _this.iterationTimes = 0;
        });
    };
    WriteToLogBaseClass.prototype.getServiceName = function () {
        return this.serviceName;
    };
    return WriteToLogBaseClass;
}());
exports.WriteToLogBaseClass = WriteToLogBaseClass;
