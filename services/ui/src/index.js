 /*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import getStore from './store';
import './scss/index.scss';

const closeUI = () => {
    try {
        chrome.runtime.sendMessage('hide_ui'); // eslint-disable-line no-undef
    } catch (e) {
        console.warn('Not in chrome env');
    }
};

getStore(store => {
    ReactDOM.render(
        <Provider store={store}>
            <App store={store} closeUI={closeUI} />
        </Provider>,
        document.getElementById('wawi-ui-root')
    );
});
