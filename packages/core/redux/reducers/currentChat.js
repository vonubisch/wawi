import get from 'lodash/get';

import { type as onChatSwitch } from '../actions/events/onChatSwitch';
import { type as onChatOnline } from '../actions/events/onChatOnline';
import { type as onChatOffline } from '../actions/events/onChatOffline';

export default function currentChatReducer(state = {}, action) {
    switch (action.type) {
        case onChatSwitch:
            const name = get(action, 'payload.event.name', null);
            const online = get(action, 'payload.event.online', false);
            const avatar = get(action, 'payload.event.avatar', false);
            const messages = get(action, 'payload.event.messages', {});
            return { ...state, name, avatar, online, messages };

        case onChatOnline:
            return { ...state, online: true };

        case onChatOffline:
            return { ...state, online: false };

        default:
            return state;
    }
}