import { applyMiddleware, createStore, combineReducers } from 'redux';
import { wrapStore } from 'webext-redux';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunkMiddleware from 'redux-thunk';
// import * as firebase from 'firebase/app';
// import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';

// import firebaseConfig from 'config/firebase';

import { appReducer, currentChatReducer, chatlistReducer, eventsReducer } from 'packages/core/redux/reducers';

// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();

const middlewares = [
    thunkMiddleware,
    reduxLogger,
];

const initialState = {
    currentChat: {
        name: null,
        online: null,
        messages: [],
    },
    app: {
        loaded: false,
    },
    events: [],
    chatlist: [],
};

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });

const store = createStore(
    combineReducers({
        app: appReducer,
        currentChat: currentChatReducer,
        chatlist: chatlistReducer,
        events: eventsReducer,
    }),
    initialState,
    composeEnhancers(
        applyMiddleware(...middlewares),
    )
);

// const createInstructionEvent = (type = 'default', payload = {}) => ({
//     type,
//     payload,
// });

wrapStore(store);

// firestore.collection('instructions').onSnapshot(snap => {
//     snap.docs.forEach(doc => {
//         const data = doc.data();
//         store.dispatch(createInstructionEvent(data.type, {}));
//     });
// });

chrome.runtime.onMessage.addListener(function(message, sender) {
    chrome.tabs.sendMessage(sender.tab.id, message);
});

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: 'onIconClick.js' });
});

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(function () {
    console.log('Hello, world!', new Date())
});