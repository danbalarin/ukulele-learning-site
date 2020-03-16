import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import ApolloClient from './ApolloClient';
import App from '../App';

const render = () => {
    // const renderMethod = !module.hot ? ReactDOM.render : ReactDOM.hydrate;

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
        console.log('hot');
        render();
    });
}
