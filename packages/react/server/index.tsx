import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import App from '../App';
import html from './html';
import ApolloServer from './ApolloServer';

const port = 3000;
const server = express();

server.use(express.static('build'));

server.get('/*', (req, res) => {
    const context: any = {};

    const sheet = new ServerStyleSheet();
    const body = renderToString(
        <ApolloServer>
            <Router location={req.url} context={context}>
                <StyleSheetManager sheet={sheet.instance}>
                    <App />
                </StyleSheetManager>
            </Router>
        </ApolloServer>
    );

    const styleTags = sheet.getStyleTags();
    sheet.seal();

    if (context.url) {
        res.writeHead(301, {
            Location: context.url,
        });
        res.end();
    } else {
        res.send(html({ body, helmet: {}, styles: styleTags }));
    }
});

server.listen(port, () => console.log(`SSR app listening on port ${port}!`));
