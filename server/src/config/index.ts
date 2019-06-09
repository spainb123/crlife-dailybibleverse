import * as express from 'express';
import loadEnvironment from './env';
import loadMetadata from './metaLoader';
import NotesStorage from '../services/noteStorage';
import ReadingModule from '../modules/readings';
import PassagesStorage from '../services/passageStorage';
import DailyStorage from '../services/dailyStorage';
import PassageModule from '../modules/passages';
import DailyModule from '../modules/daily';
import ClientModule from '../modules/client';
import Logger from '../logger';

const app = express();

export default function config(logger: Logger) {

   loadEnvironment();

   const metadata = loadMetadata();

   const passagesStorage = new PassagesStorage(logger);
   const notesStorage = new NotesStorage(logger);
   const dailyStorage = new DailyStorage(logger);
   const passagesModule = new PassageModule(passagesStorage, metadata, logger);
   const readingsModule = new ReadingModule(passagesStorage, notesStorage, dailyStorage, metadata, logger);
   const dailyModule = new DailyModule(dailyStorage, logger);
   const clientModule = new ClientModule(dailyStorage, logger);

   app.use('/public', express.static('public'))

   app.get('/client', clientModule.requestHandler.bind(clientModule))

   app.get('/daily', dailyModule.requestHandler.bind(dailyModule))

   app.get('/health', (req, res) => {
      logger.debug(logger.modules.SERVER, 'Health check request')
      res.send('OK: CRLife-DBV TS Server')
   })

   app.get('/passages', passagesModule.requestHandler.bind(passagesModule))

   app.get('/reading', readingsModule.requestHandler.bind(readingsModule))

   return app;
}