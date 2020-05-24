import React from 'react';
import express from 'express';
import compression from 'compression';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router';
import { Helmet } from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import configChecker from '../utils/configChecker';
import { Logger, LoggerLevel } from '../utils/Logger';

import { inlineCSS } from '@uls/look-react';

import App from '../App';
import html from './html';
import ApolloServer from './ApolloServer';

(async function() {
    const logger = new Logger(LoggerLevel.Info);

    configChecker(logger).check();

    const port = 3000;
    const server = express();
    server.use(compression());

    server.use('/static', express.static('build/client/static/'));
    server.get('*', (req, res) => {
        const context: any = {};

        const statsFile = path.resolve('build/client/loadable-stats.json');
        const extractor = new ChunkExtractor({ statsFile });

        const helmet = Helmet.renderStatic();

        const body = renderToString(
            <ChunkExtractorManager extractor={extractor}>
                <ApolloServer>
                    <Router location={req.url} context={context}>
                        <App />
                    </Router>
                </ApolloServer>
            </ChunkExtractorManager>
        );

        const scriptTags = extractor.getScriptTags();
        const linkTags = extractor.getLinkTags();

        if (context.url) {
            res.writeHead(301, {
                Location: context.url,
            });
            res.end();
        } else {
            res.send(
                html({
                    body,
                    helmet,
                    style: inlineCSS,
                    scripts: scriptTags,
                    links: linkTags,
                })
            );
        }
    });

    server.listen(port, () =>
        logger.success(`SSR app listening on port ${port}!`)
    );
})();
