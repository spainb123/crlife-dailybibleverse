import * as express from 'express';
const app = express();

export function bootstrap() {
   app.get('/', (req, res) => res.send('CRLife-DBV TS Server'))
   return app;
}