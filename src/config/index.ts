import * as express from 'express';
import ConfigProvider from './ConfigProvider';
import MetadataProvider from './MetadataProvider';
import NotesStorage from '../services/noteStorage';
import ReadingModule from '../modules/readings';
import PassagesStorage from '../services/passageStorage';
import DailyStorage from '../services/dailyStorage';
import AzureDailyStorage from '../services/azureDailyStorage';
import HealthModule from '../modules/health';
import PassageModule from '../modules/passages';
import DailyModule from '../modules/daily';
import ClientModule from '../modules/client';
import DailyDataProvider from '../services/dailyDataProvider';
import Logger from '../logger';

const app = express();
const adminApp = express();

export default function config(logger: Logger) {

   const config = new ConfigProvider();

   const metadataProvider = new MetadataProvider(config);
   const passagesStorage = new PassagesStorage(logger);
   const notesStorage = new NotesStorage(logger);
   const azureDailyStorage = new AzureDailyStorage(config, logger);
   const dailyStorage = new DailyStorage(logger);
   const healthModule = new HealthModule(logger);
   const passagesModule = new PassageModule(config, passagesStorage, metadataProvider, logger);
   const readingsModule = new ReadingModule(passagesStorage, notesStorage, dailyStorage, metadataProvider, logger);

   const dailyDataProvider = new DailyDataProvider((config.get("azure_storage")) ? azureDailyStorage : dailyStorage, metadataProvider, logger);

   const dailyModule = new DailyModule(dailyDataProvider, logger);
   const clientModule = new ClientModule(dailyDataProvider, logger);


   // App routes
   app.use('/public', express.static('public'))
   app.get('/', clientModule.requestHandler.bind(clientModule))
   app.get('/health', healthModule.requestHandler.bind(healthModule))

   // Admin routes
   adminApp.get('/health', healthModule.requestHandler.bind(healthModule))
   adminApp.get('/daily', dailyModule.requestHandler.bind(dailyModule))
   adminApp.get('/health', healthModule.requestHandler.bind(healthModule))
   adminApp.get('/passages', passagesModule.requestHandler.bind(passagesModule))
   adminApp.get('/reading', readingsModule.requestHandler.bind(readingsModule))

   return { app, adminApp, config };
}