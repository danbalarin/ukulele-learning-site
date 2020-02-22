import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';

import App from '../App';
import html from './html';

const port = 3000;
const server = express();

server.use(express.static('build'));

server.get('/', (req, res) => {
    const context: any = {};

    const body = renderToString(
        <Router location={req.url} context={context}>
            <App />
        </Router>
    );

    if (context.url) {
        res.writeHead(301, {
            Location: context.url,
        });
        res.end();
    } else {
        res.send(html({}, body));
    }
});

server.listen(port, () => console.log(`SSR app listening on port ${port}!`));
