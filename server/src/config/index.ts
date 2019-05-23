import * as express from 'express';
const app = express();

export default function config() {
   app.get('/', (req, res) => res.send('CRLife-DBV TS Server'))
   return app;
}