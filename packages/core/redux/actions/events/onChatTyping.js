export default function onChatTyping(event) {
    return {
        type: '@event/onChatTyping',
        payload: { event }
    }
}