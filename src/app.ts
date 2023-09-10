import axios from "axios";
import express from "express";
import  { fileXML } from "./retrievalDB/file";
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
      `oketz_${dayjs().format("DD-MM-YYYYTHH-mm")}`
    );
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(500, () => {
  console.log("Server is listening on port 500.");
});
