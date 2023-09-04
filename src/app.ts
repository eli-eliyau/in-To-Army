import axios from "axios";
import { btoa, isUtf8 } from "buffer";
import express from "express";
import { open, readFile } from "fs";
import { Request, Response } from "express";
import { dbConnect as knex } from "./db/connection";
import router, { fileXML } from "./retrievalDB/file";
import dayjs from "dayjs";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

export const sendToArmy = async (
  encodedXmlBase64: string,
  file_name: string
) => {
  await axios
    .post(
      "https://api.digital.idf.il/external/hatch/func-upload",
      {
        nameToRed: file_name,
        filebase64: encodedXmlBase64,
        FileProperties: {
          FileName: `test`,
          FileType: "xml",
        },
      },
      {
        headers: {
          "Archive-Api-Key": process.env.PRE_PROD_EXTERNAL_HATCH,
        },
      }
    )
    .then((res) => {
      // console.log(res.data)
      console.log("moved to army");
    })
    .catch((error) => {
      //   console.log(error);
      console.log("not moved to army");
    });
};
export const base64Encoded = (data: string) => {
  return Buffer.from(data, "utf8").toString("base64");
};

fileXML()
  .then((data) => {
    sendToArmy(
      base64Encoded(data),
      `oketz_${dayjs().format("DD-MM-YYYYTss-mm-HH")}`
    );
  })
  .catch((err) => {
    console.log(err);
  });
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

app.use("/", router);

app.listen(500, () => {
  console.log("Server is listening on port 500.");
});
