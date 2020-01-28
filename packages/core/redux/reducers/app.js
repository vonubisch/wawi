// import get from 'lodash/get';

import { type as onAppLoad } from '../actions/events/onAppLoad';

export default function appReducer(state = {}, action) {
    switch (action.type) {
        case onAppLoad:
            return { loaded: true };

        default:
            return state;
    }
}
