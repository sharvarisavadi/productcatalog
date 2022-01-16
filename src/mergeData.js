
import {getCatalogAData, getCatalogBData, getBarcodeAData, getBarcodeBData} from "./readInputFiles.js"

const catalogAFileContents = await getCatalogAData();
const catalogBFileContents = await getCatalogBData();
const barcodeADataFileContents = await getBarcodeAData();
const barcodeBDataFileContents = await getBarcodeBData();

const checkProductIsSame = async (productBarcodeDataA, productBarcodeDataB) => {

    const mergeproduct = [];
    catalogAFileContents.map(obj => obj.duplicate = false);
    catalogBFileContents.map(obj => obj.duplicate = false);

    catalogAFileContents.forEach(productA => {
       catalogBFileContents.forEach(productB => {
                const barcodesA = [];
                const barcodesB = [];
                barcodeADataFileContents.forEach(barcodedata=> {
                if (productA.SKU == barcodedata.SKU) {
                    barcodesA.push(barcodedata.Barcode);
                }})

                barcodeBDataFileContents.forEach(barcodedata => {
                    if (productB.SKU == barcodedata.SKU) {{
                        barcodesB.push(barcodedata.Barcode);
                    }
                }})

                const isSame = barcodesA.some(barcode => 
                    barcodesB.includes(barcode)
                )
  
                if(isSame){
                    productB.duplicate = true;
                }
        })

    });

    catalogAFileContents.forEach(productA => {
    const productAExists = mergeproduct.some(obj => obj.SKU === productA.SKU && obj.Description === productA.Description && obj.Source === "A")
        if(!productAExists) {
            mergeproduct.push({"SKU":productA.SKU, "Description":productA.Description,"Source":"A"})
        }
    });

    catalogBFileContents.forEach(productB => {
        const productBExists = mergeproduct.some(obj => obj.SKU === productB.SKU && obj.Description === productB.Description && obj.Source === "B")
        if(!productB.duplicate && !productBExists)
            mergeproduct.push({"SKU":productB.SKU, "Description":productB.Description,"Source":"B"})
    });

    return mergeproduct;

}

export const mergeCatalog = async () => {

    const mergeCatalogs = await checkProductIsSame();
    return mergeCatalogs

}