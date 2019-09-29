import * as Azure from "@azure/storage-blob";
import IDailyDataProvider from "../../descriptors/IDailyDataProivder";
import Logger from "../../logger";
import IReadingData from "../../descriptors/IReadingData";
import { SharedKeyCredential, StorageURL, ServiceURL, ContainerURL, BlobURL, Aborter } from "@azure/storage-blob";
import { getDailyDataFileName } from "../../helpers/dateHelper";
import IDailyStorageReaderService from "../../descriptors/IDailyStorageReaderService";
import ConfigProvider from "../../config/ConfigProvider";

export default class AzureDailyStorage implements IDailyStorageReaderService
{
    constructor(
      private config: ConfigProvider,
      private logger: Logger
    ) {}

    fetchDailyData(month: number, date: number): Promise<IReadingData> {
        
        const account = this.config.get("AZURE_STORAGE_ACCOUNT_NAME");
        const creds = new SharedKeyCredential(account, this.config.get("AZURE_STORAGE_ACCOUNT_ACCESS_KEY"));
        const pipeline = StorageURL.newPipeline(creds);
        const fileName = getDailyDataFileName(month, date);

        const serviceUrl = new ServiceURL(
            `https://${account}.blob.core.windows.net`,
            pipeline
        );

        const containerURL = ContainerURL.fromServiceURL(serviceUrl, this.config.get("AZURE_STORAGE_CONTAINER_NAME"));
        const blobURL = BlobURL.fromContainerURL(containerURL, fileName);

        return blobURL.download(Aborter.none, 0)
        .then(response => {
            this.logger.debug(this.logger.modules.SERVICES_DAILYCONTENT_AZURE_STORAGE, `Download response from azure blob storage.  Stream readable: ${response.readableStreamBody.readable}`);
            return streamToString(response.readableStreamBody)
        })
        .then(data => {            
            return <IReadingData>JSON.parse(<string>data)
        })
    }
}

async function streamToString(readableStream : any) {
    return new Promise((resolve, reject) => {
      const chunks : any[] = [];
      readableStream.on("data", (data : any) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }