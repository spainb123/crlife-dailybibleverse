import * as express from 'express';
//import * as path from 'path';

const app = express();

export function bootstrap() {
    app.get('/', (req, res) => res.send('CRLife-DBV TS Server'))

    return app;
}