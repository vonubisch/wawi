import get from 'lodash/get';

export default function chatlistReducer(state = {}, action) {
    switch (action.type) {
        case 'onAppLoad':
            return get(action, 'payload.event.contacts', []);

        default:
            return state;
    }
}

