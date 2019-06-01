import * as express from 'express';
import loadEnvironment from './env';
import passageRequestHandler from '../modules/passages';
import readingRequestHandler from '../modules/readings';

const app = express();

export default function config() {

   loadEnvironment();

   app.use('/', express.static('public'))

   app.get('/health', (req, res) => res.send('OK: CRLife-DBV TS Server'))

   app.get('/passages', (req, res) => {      
      passageRequestHandler(req).then(data => {
         res.send(data);
      });
   })

   app.get('/reading', readingRequestHandler)

   return app;
}