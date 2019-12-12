// import get from 'lodash/get';

export default function appReducer(state = {}, action) {
    switch (action.type) {
        case 'onAppLoad':
            return { loaded: true };

        default:
            return state;
    }
}
