import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { wrapStore } from 'webext-redux';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from 'config/firebase';

import { appReducer, currentChatReducer, chatlistReducer } from 'packages/core/redux/reducers';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

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
    chatlist: [],
};

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(
    combineReducers({
        app: appReducer,
        currentChat: currentChatReducer,
        chatlist: chatlistReducer,
    }),
    initialState,
    composeEnhancers(
        applyMiddleware(...middlewares),
    )
);

const createInstructionEvent = (type = 'default', payload = {}) => ({
    type,
    payload,
});

wrapStore(store);

firestore.collection('instructions').onSnapshot(snap => {
    snap.docs.forEach(doc => {
        const data = doc.data();
        store.dispatch(createInstructionEvent(data.type, {}));
    });
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: 'onIconClick.js' });
});

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(function () {
    console.log('Hello, world!', new Date())
});