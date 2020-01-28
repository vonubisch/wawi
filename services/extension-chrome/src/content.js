import { Store, applyMiddleware } from 'webext-redux';
import thunkMiddleware from 'redux-thunk';
import reduxLogger from 'redux-logger';
import get from 'lodash/get';

import WhatsAppWebInterface from 'packages/core';

import {
    onAppLoad, onChatSwitch, onChatOnline, onChatTyping, onChatOffline
} from 'packages/core/observations';

import actions from 'packages/core/redux/actions';

const observerOptions = {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['title']
};

const WAWI = new WhatsAppWebInterface();

const store = applyMiddleware(new Store() , ...[reduxLogger, thunkMiddleware]);

store.ready().then(() => {

    // WAWI.logger.log('Store ready', getState());

    WAWI.observer.observe(observerOptions, mutations => {

        // WAWI.logger.log(mutations);
    
        WAWI.observer.check(mutations, {
            onChatSwitch,
            onChatOnline,
            onChatOffline,
            onChatTyping,
            onAppLoad,
        }).forEach(event => {

            const func = get(actions, ['events', event.name]);

            if (!func) return;

            store.dispatch(func(event.data));

        });
    
    });

});


const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('ui.html');
iframe.className = 'wawi-ui';
iframe.frameBorder = 0;

const appRoot = document.getElementById('app');

const button = document.createElement('img');
button.src = chrome.extension.getURL('button.png');
button.className = 'wawi-button';
button.onclick = () => {
    iframe.classList.add('wawi-ui-open');
    appRoot.classList.add('wawi-approot-blur');
    button.classList.add('wawi-button-hidden');
}

document.body.prepend(iframe);
document.body.prepend(button);

chrome.runtime.onMessage.addListener(function(message) {
    if (message == 'hide_ui') {
        iframe.classList.remove('wawi-ui-open');
        appRoot.classList.remove('wawi-approot-blur');
        button.classList.remove('wawi-button-hidden');
    }
});