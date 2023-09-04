import { dbConnect as knex } from "../db/connection";
import { Router } from "express";
import { Request, Response } from "express";
import { columnsName, tablesName } from "../table/arrayTables";
import { dataFormat } from "./format";
import { base64Encoded, sendToArmy } from "../app";
import dayjs from "dayjs";

const router = Router();

export const fileXML = async () => {
  let fileXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<mstns:oketz_in_records xmlns:mstns="oketz_in.xsd" xsi:schemaLocation="oketz_in.xsd Oketz_in.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n`;
  let counter = 0;

  for (let i = 0; i < tablesName.length; i++) {
    let dataFromDB = await knex(tablesName[i]).select(columnsName[i]);

    for (let j = 0; j < dataFromDB.length; j++) {
      fileXml += `    <mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;

      fileXml += await columnObject(dataFromDB[j], i);
      fileXml += `    </mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;

      counter++;

      //   if (counter >= 10000) {
      //     fileXml += `</mstns:oketz_in_records>`;
      //     counter = 0;
      //     //שליחת קובץ
      //     await sendToArmy(
      //       base64Encoded(fileXml),
      //       `oketz_${dayjs().format("YYYY-MM-DDTHH-mm-ss")}`
      //     );

      //     fileXml = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<mstns:oketz_in_records xmlns:mstns="oketz_in.xsd" xsi:schemaLocation="oketz_in.xsd Oketz_in.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n`;
      //   }
    }
  }
  fileXml += `</mstns:oketz_in_records>`;
  return fileXml;
};

const columnObject = (ob: {}, index: number) => {
  let xmlColumns = "";
  let arrColumns = dataFormat(ob, index);
  let item: string;

  for (let i = 0; i < arrColumns.length; i++) {
    //תנאי זה בגלל שבסכמה העמודה לא כתובה באותיות גדולות כמו כולם
    columnsName[index][i] == "fromId"
      ? (item = "fromId")
      : (item = columnsName[index][i].toLocaleUpperCase());

    xmlColumns += `        <mstns:${item}>${arrColumns[i]}</mstns:${item}>\n`;
  }
  return xmlColumns;
};

router.get("/", async (req: Request, res: Response) => {
  res.send(await fileXML());
});

export default router;
