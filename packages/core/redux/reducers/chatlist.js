import get from 'lodash/get';

import { type as onAppLoad } from '../actions/events/onAppLoad';

export default function chatlistReducer(state = {}, action) {
    switch (action.type) {
        case onAppLoad:
            return get(action, 'payload.event.contacts', []);

        default:
            return state;
    }
}

