const type = '@event/onChatOnline';

export default function onChatOnline(event) {
    return {
        type,
        payload: { event }
    }
}

export {
    type,
}