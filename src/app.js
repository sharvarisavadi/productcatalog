import { mergeCatalog } from "./mergeData.js"
import {generateMergedCatalog} from "./writeDataToFile.js"
import dotenv from 'dotenv'

dotenv.config();

const productBarcodeDataForCatlogA = await mergeCatalog();

await generateMergedCatalog(productBarcodeDataForCatlogA);
