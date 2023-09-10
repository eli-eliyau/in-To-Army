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
exports.base64Encoded = exports.sendToArmy = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const file_1 = require("./retrievalDB/file");
const dayjs_1 = __importDefault(require("dayjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const sendToArmy = (encodedXmlBase64, file_name) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default
        .post("https://api.digital.idf.il/external/hatch/func-upload", {
        nameToRed: file_name,
        filebase64: encodedXmlBase64,
        FileProperties: {
            FileName: `test`,
            FileType: "xml",
        },
    }, {
        headers: {
            "Archive-Api-Key": process.env.PRE_PROD_EXTERNAL_HATCH,
        },
    })
        .then((res) => {
        // console.log(res.data)
        console.log("moved to army");
    })
        .catch((error) => {
        //   console.log(error);
        console.log("not moved to army");
    });
});
exports.sendToArmy = sendToArmy;
const base64Encoded = (data) => {
    return Buffer.from(data, "utf8").toString("base64");
};
exports.base64Encoded = base64Encoded;
(0, file_1.fileXML)()
    .then((data) => {
    (0, exports.sendToArmy)((0, exports.base64Encoded)(data), `oketz_${(0, dayjs_1.default)().format("DD-MM-YYYYTHH-mm")}`);
})
    .catch((err) => {
    console.log(err);
});
app.listen(500, () => {
    console.log("Server is listening on port 500.");
});
