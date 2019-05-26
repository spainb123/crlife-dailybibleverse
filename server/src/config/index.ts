import * as express from 'express';
import loadEnvironment from './env';
import requestHandler from './../modules/ntl-api';

const app = express();

export default function config() {

   loadEnvironment();

   app.use('/', express.static('public'))

   app.get('/health', (req, res) => res.send('OK: CRLife-DBV TS Server'))

   app.get('/passages', (req, res) => {      
      requestHandler(req).then(data => {
         res.send(data);
      });
   })

   return app;
}