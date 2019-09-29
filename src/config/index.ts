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

export default function config(logger: Logger) {

   const config = new ConfigProvider();

   const metadataProvider = new MetadataProvider();
   const passagesStorage = new PassagesStorage(logger);
   const notesStorage = new NotesStorage(logger);
   const azureDailyStorage = new AzureDailyStorage(logger);
   const dailyStorage = new DailyStorage(logger);
   const healthModule = new HealthModule(logger);
   const passagesModule = new PassageModule(passagesStorage, metadataProvider, logger);
   const readingsModule = new ReadingModule(passagesStorage, notesStorage, dailyStorage, metadataProvider, logger);

   const dailyDataProvider = new DailyDataProvider((process.env._DAILY_AZURE) ? azureDailyStorage : dailyStorage, metadataProvider, logger);

   const dailyModule = new DailyModule(dailyDataProvider, logger);
   const clientModule = new ClientModule(dailyDataProvider, logger);

   // Setup app ports
   app.set("port", normalizePort(config.get("port")));

   app.use('/public', express.static('public'))

   app.get('/', clientModule.requestHandler.bind(clientModule))

   app.get('/daily', dailyModule.requestHandler.bind(dailyModule))

   app.get('/health', healthModule.requestHandler.bind(healthModule))

   app.get('/passages', passagesModule.requestHandler.bind(passagesModule))

   app.get('/reading', readingsModule.requestHandler.bind(readingsModule))

   return { app, config };
}

function normalizePort(val: any) {
   const port = parseInt(val, 10);

   if (isNaN(port)) {
       return val;
   }

   if (port >= 0) {
       return port;
   }

   return false;
}
