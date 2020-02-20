import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import Counter from '../components/Counter';
import html from './html';

const port = 3000;
const server = express();

server.use(express.static('dist'));

server.get('/', (req, res) => {
    const body = renderToString(React.createElement(Counter));

    res.send(html({}, body));
});

server.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
