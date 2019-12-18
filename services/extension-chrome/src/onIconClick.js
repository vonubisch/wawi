import { Store, applyMiddleware } from 'webext-redux';
import thunkMiddleware from 'redux-thunk';
import reduxLogger from 'redux-logger';

import actions from 'packages/core/redux/actions';

const store = applyMiddleware(new Store() , ...[reduxLogger, thunkMiddleware]);

store.ready().then(() => {

    const dispatch = store.dispatch;

        dispatch(actions.chatlist.openChat({ 
            name: 'Telegraaf',
        })).then(() => 
            dispatch(actions.chat.typeMessage({ 
                message: 'test',
            }))
        );

});
