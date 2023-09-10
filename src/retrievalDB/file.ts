import { dbConnect as knex } from "../db/connection";
import { Router } from "express";
import { Request, Response } from "express";
import { columnsName, tablesName } from "../table/arrayTables";
import { dataFormat } from "./format";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";


const router = Router();

export const fileXML = async () => {
  let fileXml = `<?xml version="1.0" encoding="UTF-8" ?>\n<mstns:oketz_in_records xsi:schemaLocation="oketz_in.xsd oketz_in.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mstns="oketz_in.xsd">\n`;

  for (let i = 0; i < tablesName.length; i++) {
    let dataFromDB = await knex(tablesName[i]).select(columnsName[i]);
    // console.log(dataFromDB);

    let couner = 0;

    for (let j = 0; j < dataFromDB.length; j++) {
      fileXml += `    <mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
      fileXml += await columnObject(dataFromDB[j], i);
      fileXml += `    </mstns:${tablesName[i].toLocaleUpperCase()}_TABLE>\n`;
      couner++;

      if (couner == 2499) {
        break;
      }
    }
  }
  fileXml += `</mstns:oketz_in_records>`;


  // const filePath = path.join(__dirname, '../xml', `oketz_${Date.now()}.xml`);
  const filePath = `C:\\Users\\Administrator\\Desktop\\okezt_project\\tzoar\\in-To-Army\\dist\\xml\\oketz_${dayjs().format("DD-MM-YYYYTHH-mm")}.xml`
  fs.writeFileSync(filePath, fileXml);
  

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


