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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileXML = void 0;
const connection_1 = require("../db/connection");
const express_1 = require("express");
const arrayTables_1 = require("../table/arrayTables");
const format_1 = require("./format");
const router = (0, express_1.Router)();
const fileXML = () => __awaiter(void 0, void 0, void 0, function* () {
    let fileXml = `<?xml version="1.0" encoding="UTF-8" ?>\n<mstns:oketz_in_records xsi:schemaLocation="oketz_in.xsd oketz_in.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mstns="oketz_in.xsd">\n`;
    for (let i = 0; i < arrayTables_1.tablesName.length; i++) {
        let dataFromDB = yield (0, connection_1.dbConnect)(arrayTables_1.tablesName[i]).select(arrayTables_1.columnsName[i]);
        // console.log(dataFromDB);
        let couner = 0;
        for (let j = 0; j < dataFromDB.length; j++) {
            fileXml += `    <mstns:${arrayTables_1.tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
            fileXml += yield columnObject(dataFromDB[j], i);
            fileXml += `    </mstns:${arrayTables_1.tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
            couner++;
            if (couner == 2499) {
                break;
            }
        }
    }
    fileXml += `</mstns:oketz_in_records>`;
    return fileXml;
});
exports.fileXML = fileXML;
const columnObject = (ob, index) => {
    let xmlColumns = "";
    let arrColumns = (0, format_1.dataFormat)(ob, index);
    let item;
    for (let i = 0; i < arrColumns.length; i++) {
        //תנאי זה בגלל שבסכמה העמודה לא כתובה באותיות גדולות כמו כולם
        arrayTables_1.columnsName[index][i] == "fromId"
            ? (item = "fromId")
            : (item = arrayTables_1.columnsName[index][i].toLocaleUpperCase());
        xmlColumns += `        <mstns:${item}>${arrColumns[i]}</mstns:${item}>\n`;
    }
    return xmlColumns;
};
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield (0, exports.fileXML)());
}));
exports.default = router;
