import * as express from 'express';
import loadEnvironment from './env';

const app = express();

export default function config() {

   loadEnvironment();

   app.use('/', express.static('public'))

   app.get('/health', (req, res) => res.send('OK: CRLife-DBV TS Server'))

   return app;
}