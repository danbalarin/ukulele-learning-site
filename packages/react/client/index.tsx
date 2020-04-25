import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import dotenv from 'dotenv';

import createApolloClient from './ApolloClient';
import App from '../App';

const render = () => {
    // const renderMethod = !module.hot ? ReactDOM.render : ReactDOM.hydrate;
    dotenv.config();

    const ApolloClient = createApolloClient();

    ReactDOM.hydrate(
        <ApolloClient>
            <Router>
                <App />
            </Router>
        </ApolloClient>,
        document.getElementById('app')
    );
};

render();

if ((module as any).hot) {
    (module as any).hot.accept('../App.tsx', () => {
        render();
    });
}
