import * as express from 'express';
import { renderClientHost } from './client-host';
const app = express();

export function bootstrap() {
   app.get('/', (req, res) => {
    res.send(renderClientHost('CRLifeDBV-ClientHost'));
   });

   return app;
}