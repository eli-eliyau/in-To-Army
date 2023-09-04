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
const file_1 = __importDefault(require("./retrievalDB/file"));
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
// fileXML()
//   .then((data) => {
//     sendToArmy(
//       base64Encoded(data),
//       `oketz_${dayjs().format("YYYY-MM-DDTHH-mm-ss")}`
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// readFile("src/xml.xml", (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const buffer = Buffer.from(data.toString(), "utf8");
//     console.log("1--------------", buffer);
//     const base64Encoded = buffer.toString("base64");
//     console.log("2--------------", base64Encoded);
// const encodedToUTF8 = Buffer.from(data.toString(), "utf-8");
// const xmlToBasse64 = Buffer.from(encodedToUTF8).toString("base64");
// const today = new Date();
// const date = today.toLocaleDateString();
// const time = today.toLocaleTimeString();
//     sendToArmy(base64Encoded, `oketz_${date}_${time}`);
//   }
// });
// const sending = async () => {
//   const base64Encoded = Buffer.from(await fileXML(), "utf8").toString("base64");
//   sendToArmy(base64Encoded, `oketz_${dayjs().format("YYYY-MM-DDTHH-mm-ss")}`);
// };
// sending();
app.use("/", file_1.default);
app.listen(500, () => {
    console.log("Server is listening on port 500.");
});
