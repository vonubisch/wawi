import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { wrapStore } from 'webext-redux';
import reduxLogger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import get from 'lodash/get';

const currentChatReducer = (state = {}, action) => {
    switch (action.type) {
        case 'onChatSwitch':
            const name = get(action, 'payload.event.name', null);
            const online = get(action, 'payload.event.online', false);
            const messages = get(action, 'payload.event.messages', {});
            return { name, online, messages };

        default:
            return state;
    }
}

const appReducer = (state = {}, action) => {
    switch (action.type) {
        case 'onAppLoad':
            return { loaded: true };

        default:
            return state;
    }
}

const contactsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'onAppLoad':
            return get(action, 'payload.event.contacts', []);

        default:
            return state;
    }
}

const middlewares = [
    thunkMiddleware,
    reduxLogger,
];

const initialState = {
    currentChat: {
        name: null,
    },
    app: {
        loaded: false,
    },
    contacts: [],
};

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    combineReducers({
        app: appReducer,
        currentChat: currentChatReducer,
        contacts: contactsReducer,
    }),
    initialState,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    )
);

wrapStore(store);

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "onIconClick.js" });
});

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(function () {
    console.log("Hello, world!", new Date())
});