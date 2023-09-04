"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormat = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const arrayTables_1 = require("../table/arrayTables");
const dataFormat = (ob, index) => {
    let dataColumn = [];
    for (let [key, value] of Object.entries(ob)) {
        if (key == "birthDate" ||
            key == "nextFeedingDate" ||
            key == "startDate" ||
            key == "endDate" ||
            key == "sendDate" ||
            (arrayTables_1.tablesName[index] == "Round" && key == "date")) {
            dataColumn.push((0, dayjs_1.default)(`${value}`).format("YYYY-MM-DD"));
        }
        else if (key == "cleaningDate" ||
            key == "feedingDate" ||
            key == "medicineRecieved" ||
            key == "reporttime" ||
            key == "walkingDate") {
            if (value == null) {
                dataColumn.push("2023-05-08T00:00:00.000000000");
            }
            else
                dataColumn.push((0, dayjs_1.default)(`${value}`).format("YYYY-MM-DDTHH:mm:ss.000000000"));
        }
        else if ((key == "time" && arrayTables_1.tablesName[index] == "Round") ||
            (key == "date" && arrayTables_1.tablesName[index] == "Notification")) {
            dataColumn.push(`${value}:00`);
        }
        else if ((key == "treatment" || key == "entryRules" || key == "madness") &&
            value == null) {
            dataColumn.push(`אין דרישה`);
        }
        else if (typeof value == "boolean" && value == true) {
            dataColumn.push(1);
        }
        else if (typeof value == "boolean" && value == false) {
            dataColumn.push(0);
        }
        else if (key == "group" &&
            (value == null || value == undefined || value == "")) {
            dataColumn.push("");
        }
        else if (key == "userId" && value == null) {
            dataColumn.push("");
        }
        else if (arrayTables_1.tablesName[index] == "Notification" && key == "notification") {
            // let char ="'"
            typeof value == "string" && dataColumn.push(value.split("'").join(""));
        }
        else {
            dataColumn.push(value);
        }
    }
    return dataColumn;
};
exports.dataFormat = dataFormat;
