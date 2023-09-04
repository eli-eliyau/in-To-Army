"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileXML = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const connection_1 = require("../db/connection");
const express_1 = require("express");
const router = (0, express_1.Router)();
const tablesName = [
    "User",
    "Dog",
    "Pair",
    "Walking",
    "Cleaning",
    "Food",
    "MedicalTreatment",
    "MoveDog",
    "Round",
    "RoundNote",
    "UserLogs",
];
const columns = [
    ["id", "name", "role", "email", "roundResponsible", "group"],
    [
        "id",
        //"userId", //לפי הדרישה צריך לשלוח לפי הטופס שהדס שלחה זה לא נשלח
        "cellId",
        "foodTypeId",
        "abilityId",
        "name",
        "walkingNumber",
        "birthDate",
        "weight",
        //"madness", //לפי הדרישה צריך לשלוח לפי הטופס שהדס שלחה זה לא נשלח
        //"entryRules",
        "foodAmount",
        "status",
        "fit",
        "rest",
        "nextFeeding",
        "treatment",
        "nextFeedingDate",
    ],
    [
        "id",
        "dogId",
        "userId",
        "startDate",
        "endDate",
        "limitTimeMorning",
        "limitTimeEvening",
    ],
    ["id", "pairId", "isDone", "isActive"],
    [
        "id",
        "pairId",
        "isDone",
        "cleaningDate",
        "isActive",
    ],
    ["id", "pairId", "isDone", "feedingDate", "isActive"],
    ["id", "pairId", "isDone", "medicineRecieved", "isActive"],
    ["id", "fromId", "toId", "sendDate", "dogId", "isActive"],
    [
        "id",
        "userId",
        "time",
        "date",
        "number",
        "isdone",
        "isactive",
        "team",
    ],
    ["id", "note", "team", "number"],
    [
        "id",
        "userId",
        "date",
        "location",
        "time",
    ],
];
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
        else if (key == "time" && tablesName[index] == "Round") {
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
const columnObject = (ob, index) => {
    let xmlColumns = "";
    let arrColumns = dataFormat(ob, index);
    let item;
    for (let i = 0; i < arrColumns.length; i++) {
        //תנאי זה בגלל שבסכמה העמודה לא כתובה באותיות גדולות כמו כולם
        columns[index][i] == "fromId"
            ? (item = "fromId")
            : (item = columns[index][i].toLocaleUpperCase());
        xmlColumns += `        <mstns:${item}>${arrColumns[i]}</mstns:${item}>\n`;
    }
    return xmlColumns;
};
const fileXML = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<mstns:oketz_in_records xmlns:mstns="oketz_in.xsd" xsi:schemaLocation="oketz_in.xsd Oketz_in.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n`;
    for (let i = 0; i < tablesName.length; i++) {
        let dataFromDB = yield (0, connection_1.dbConnect)(tablesName[i]).select(columns[i]);
        for (let j = 0; j < dataFromDB.length; j++) {
            fileXml += `    <mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
            fileXml += yield columnObject(dataFromDB[j], i);
            fileXml += `    </mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
        }
    }
    fileXml += `</mstns:oketz_in_records>`;
    return fileXml;
});
exports.fileXML = fileXML;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, exports.fileXML)());
}));
exports.default = router;
