import fs from "fs";
import csv from "csv-parser";


let catlogA = [];
let catlogB = [];
let barcodeA = [];
let barcodeB = [];


const catalogAFile = process.env.CATALOGAFILE;
const catalogBFile = process.env.CATALOGBFILE;
const barcodeAFile = process.env.BARCODEAFILE;
const barcodeBFile = process.env.BARCODEBFILE;

const processFile = async (filename) => {
    const records = [];
    const parser = fs
      .createReadStream(`${filename}`)
      .pipe(csv());
      for await (let record of parser){
          records.push(record);
      }
    return records;
  }


  export const getCatalogAData = async () => {
    catlogA = await processFile(catalogAFile);
    console.log("Read Catalog A contents");
    return catlogA;
  };

  export const getCatalogBData = async () => {
    catlogB = await processFile(catalogBFile);
    console.log("Read Catalog B contents");
    return catlogB;
  };

  export const getBarcodeAData = async () => {
    barcodeA = await processFile(barcodeAFile);
    console.log("Read barcode A contents");
    return barcodeA;
  };

  export const getBarcodeBData = async () => {
    barcodeB = await processFile(barcodeBFile);
    console.log("Read barcode B contents");
    return barcodeB;
  };
