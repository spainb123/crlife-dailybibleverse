import * as express from 'express';
import loadEnvironment from './env';
import loadMetadata from './metaLoader';
//import passageRequestHandler from '../modules/passages';
import readingRequestHandler from '../modules/readings';
import PassagesStorage from '../services/passageStorage';
import PassageModule from '../modules/passages';

const app = express();

export default function config() {

   loadEnvironment();

   const passagesStorage = new PassagesStorage();
   const passagesModule = new PassageModule(passagesStorage, loadMetadata());

   app.use('/', express.static('public'))

   app.get('/health', (req, res) => res.send('OK: CRLife-DBV TS Server'))

   app.get('/passages', passagesModule.requestHandler.bind(passagesModule))

   app.get('/reading', readingRequestHandler)

   return app;
}