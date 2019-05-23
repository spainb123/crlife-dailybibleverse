import * as express from 'express';
import * as path from 'path';
const app = express();

export default function config() {
   app.use('/', express.static('public'))

   app.get('/health', (req, res) => res.send('OK: CRLife-DBV TS Server'))

   return app;
}