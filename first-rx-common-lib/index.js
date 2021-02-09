"use strict";
//import   WriteToLogBaseClass  from './classes/writeToLogBaseClass';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteToLogBaseClass = void 0;
// export * from './enum/subjects.enum';
// export * from './interfaces/dosage.interface';
// export * from './interfaces/prescritpion.interface';
// export * from './interfaces/events/coupon.interface';
// export * from './interfaces/events/location.interface';
// export * from './interfaces/events/prescription.interface';
// export * from './events/base-listener';
// export * from './events/base-publisher';
exports.WriteToLogBaseClass = __importStar(require("./classes/writeToLogBaseClass"));
