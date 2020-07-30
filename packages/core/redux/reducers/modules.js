import get from 'lodash/get';

export default function modulesReducer(state = { active: [] }, action) {
    switch (action.type) {
        case `@modules/enable`:
            return {
                ...state,
                active: !state.active.includes(get(action, 'payload.key')) ? [...state.active, get(action, 'payload.key')] : state.active
            }

        case `@modules/disable`:
            return {
                ...state,
                active: state.active.filter(v => v !== get(action, 'payload.key'))
            }

        default:
            return state;
    }
}

