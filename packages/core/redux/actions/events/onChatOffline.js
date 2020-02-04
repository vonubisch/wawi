const type = '@event/onChatOffline';

export default function onChatOffline(event) {
    return {
        type,
        payload: { event }
    }
}

export {
    type,
}