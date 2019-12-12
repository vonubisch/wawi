import get from 'lodash/get';

export default function currentChatReducer(state = {}, action) {
    switch (action.type) {
        case 'onChatSwitch':
            const name = get(action, 'payload.event.name', null);
            const online = get(action, 'payload.event.online', false);
            const messages = get(action, 'payload.event.messages', {});
            return { name, online, messages };

        default:
            return state;
    }
}