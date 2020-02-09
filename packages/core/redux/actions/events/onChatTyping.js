const type = '@event/onChatTyping';

export default function onChatTyping(event) {
    return {
        type,
        payload: { event }
    }
}

export { type }