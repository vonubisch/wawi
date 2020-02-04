import { createStore, applyMiddleware, compose } from 'redux';
import { Store, applyMiddleware as applyMiddlewareWebext } from 'webext-redux';
import reduxLogger from 'redux-logger';

export default function getStore(callback) {
    try {
        const store = applyMiddlewareWebext(new Store({ extensionId: 'jlibdffnonfbchlfclpkihabnchigiai'}), ...[reduxLogger]);
        store.ready().then(() => callback(store));
    } catch (e) {
        const store = createStore(e => e, compose(
            applyMiddleware(reduxLogger),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        ));
        callback(store);
    }
};