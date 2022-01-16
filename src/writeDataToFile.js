import ObjectsToCsv from "objects-to-csv";

export const generateMergedCatalog = async (productBarcodeDataForCatlogA) => {

    const csv = new ObjectsToCsv(productBarcodeDataForCatlogA);
    
    await csv.toDisk(process.env.OUTPUTFILE);

}