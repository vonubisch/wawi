import WhatsAppWebInterface from 'packages/core';
import { Store, applyMiddleware } from 'webext-redux';
import thunkMiddleware from 'redux-thunk';

import {
    onAppLoad, onChatSwitch, onChatOnline, onChatTyping, onChatOffline
} from 'packages/core/observations';

const observerOptions = {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['title']
};

const createActionEvent = (type, event = null) => ({
    type,
    payload: { event },
});

const WAWI = new WhatsAppWebInterface();

const store = applyMiddleware(new Store() , ...[thunkMiddleware]);

store.ready().then(() => {
    
    store.dispatch((dispatchEvent, getState) => {
        
        WAWI.logger.log('Store ready', getState());

        WAWI.observer.observe(observerOptions, mutations => {
        
            WAWI.observer.check(mutations, {
                onChatSwitch,
                onChatOnline,
                onChatOffline,
                onChatTyping,
                onAppLoad,
            }).forEach(event => {

                dispatchEvent(createActionEvent(event.name, event.data));

                WAWI.logger.event(event.name, event);

            });
        
        })

    });

});
