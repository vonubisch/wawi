import { Store, applyMiddleware } from 'webext-redux';
import thunkMiddleware from 'redux-thunk';
import get from 'lodash/get';
import throttle from 'lodash/throttle';

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

const store = applyMiddleware(new Store() , ...[thunkMiddleware]);

store.ready().then(() => {

    // WAWI.logger.log('Store ready', getState());

    WAWI.observer.observe(observerOptions, throttle(() => {
        store.dispatch(actions.app.render());
    }, 1000));

    WAWI.observer.observe(observerOptions, mutations => {

        WAWI.logger.mutations(mutations);
    
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
    
    chrome.runtime.onMessage.addListener(function(message) {
        console.log('message: ', message);
        switch (true) {
            case message === 'hide_ui': {
                iframe.classList.remove('wawi-ui-open');
                appRoot.classList.remove('wawi-approot-blur');
                button.classList.remove('wawi-button-hidden');
            } break;
    
            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/openChat'): {
                store.dispatch(actions.chatlist.openChat({ 
                    name: get(message, 'payload.name'),
                }));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/sendMessage'): {
                store.dispatch(actions.chat.typeMessage({ message: get(message, 'payload.text', 'foo') }))
                    .then(() => store.dispatch(actions.chat.sendMessage()));
            } break;
    
            default: 
        }
    });

});


const iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL('ui/index.html');
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