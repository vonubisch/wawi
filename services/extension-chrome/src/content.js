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
