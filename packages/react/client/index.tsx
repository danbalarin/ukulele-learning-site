import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../App';

const render = () => {
    const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
    renderMethod(
        <Router>
            <App />
        </Router>,
        document.getElementById('app')
    );
};

render();

if ((module as any).hot) {
    (module as any).hot.accept('../App.tsx', () => render());
}
