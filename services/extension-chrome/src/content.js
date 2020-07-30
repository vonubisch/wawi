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

const createIFrame = () => {
    const iframe = document.createElement('iframe');
    iframe.src = chrome.extension.getURL('ui/index.html');
    iframe.className = 'wawi-ui';
    iframe.frameBorder = 0;
    return iframe;
}

const iframe = createIFrame();
document.body.prepend(iframe);

const appRoot = document.getElementById('app');

const createButton = () => {
    const button = document.createElement('img');
    button.src = chrome.extension.getURL('button.png');
    button.title = 'Turbo';
    button.className = 'wawi-button';
    button.onclick = () => {
        iframe.classList.add('wawi-ui-open');
        appRoot.classList.add('wawi-approot-blur');
    }
    return button;
}

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
            
            switch (event.name) {
                case 'onAppLoad': {
                    // document.querySelector('head').innerHTML += `<link rel="stylesheet" href="${chrome.extension.getURL('theme-dark.css')}" type="text/css"/>`;
                    document.querySelector("#side > header > div:nth-child(2) > div > span").prepend(createButton());
                } break;

                default: 
            }

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
            } break;

            case message === 'show_ui': {
                iframe.classList.add('wawi-ui-open');
                appRoot.classList.add('wawi-approot-blur');
            } break;
    
            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/openChat'): {
                store.dispatch(actions.chatlist.openChat({ 
                    index: get(message, 'payload.data.index', null),
                    name: get(message, 'payload.data.name', null),
                }));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/openNewChat'): {
                store.dispatch(actions.chatlist.openNewChat({ 
                    // index: get(message, 'payload.data.index', null),
                    name: get(message, 'payload.data.name', null),
                }));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/scrollTo'): {
                store.dispatch(actions.chat.scrollTo({ 
                    top: get(message, 'payload.data.top', null),
                }));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/chatlist/scrollTo'): {
                store.dispatch(actions.chatlist.scrollTo({ 
                    top: get(message, 'payload.payload.top', null),
                }));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@ui/instruction/sendMessage'): {
                store.dispatch(actions.chat.typeMessage({ message: get(message, 'payload.text', '') }))
                    .then(() => store.dispatch(actions.chat.sendMessage()));
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@modules/enable'): {
                switch (get(message, 'payload.payload.key')) {
                    case 'darkmode':
                        document.querySelector('head').innerHTML += `<link id="wawi-darkmode" rel="stylesheet" href="${chrome.extension.getURL('theme-dark.css')}" type="text/css"/>`;
                        break;
                }
            } break;

            case (get(message, 'type') === 'chromex.dispatch' && get(message, 'payload.type') === '@modules/disable'): {
                switch (get(message, 'payload.payload.key')) {
                    case 'darkmode':
                        document.querySelector('link#wawi-darkmode').remove();
                        break;
                }
            } break;
    
            default: 
        }
    });

});
