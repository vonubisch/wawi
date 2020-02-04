import get from 'lodash/get';

import { type as onAppLoad } from '../actions/events/onAppLoad';
import { type as onAppRender } from '../actions/app/render';

export default function chatlistReducer(state = {}, action) {
    switch (action.type) {
        case onAppLoad:
            return get(action, 'payload.event.contacts', []);

        case `${onAppRender}/begin`:
            return get(action, 'payload.chatlist', []);

        default:
            return state;
    }
}

