const express = require('express');
const app = express();

function bootstrap() {
    app.get('/', (req, res) => res.send('CRLife-DBV Server Example!'))
    return { app };
}

module.exports = {
    Server: {
        bootstrap
    }
}