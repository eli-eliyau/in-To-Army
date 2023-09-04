"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormat = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const arrayTables_1 = require("../arrayTables");
const dataFormat = (ob, index) => {
    let dataColumn = [];
    for (let [key, value] of Object.entries(ob)) {
        if (key == "birthDate" ||
            key == "nextFeedingDate" ||
            key == "startDate" ||
            key == "endDate" ||
            key == "sendDate" ||
            key == "date") {
            dataColumn.push((0, dayjs_1.default)(`${value}`).format("YYYY-MM-DD"));
        }
        else if (key == "cleaningDate" ||
            key == "feedingDate" ||
            key == "medicineRecieved" ||
            key == "reporttime") {
            dataColumn.push((0, dayjs_1.default)(`${value}`).format("YYYY-MM-DDTHH:mm:ss.000000000"));
        }
        else if (key == "time" && arrayTables_1.tablesName[index] == "Round") {
            dataColumn.push(`${value}:00`);
        }
        else if ((key == "treatment" || key == "entryRules" || key == "madness") &&
            value == null) {
            dataColumn.push(`אין דרישה`);
        }
        else if (typeof value == "boolean" && value == true) {
            dataColumn.push(0);
        }
        else if (typeof value == "boolean" && value == false) {
            dataColumn.push(1);
        }
        else {
            dataColumn.push(value);
        }
    }
    return dataColumn;
};
exports.dataFormat = dataFormat;
