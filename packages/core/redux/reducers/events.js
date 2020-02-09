import { type as onAppLoad } from '../actions/events/onAppLoad';
import { type as onChatOffline } from '../actions/events/onChatOffline';
import { type as onChatOnline } from '../actions/events/onChatOnline';
import { type as onChatSwitch } from '../actions/events/onChatSwitch';
import { type as onChatTyping } from '../actions/events/onChatTyping';

export default function eventsReducer(state = [], action) {
    const events = [onAppLoad, onChatOffline, onChatOnline, onChatSwitch, onChatTyping];
    if (!events.includes(action.type)) return state;
    action.date = new Date();
    return [...state, action];
}

