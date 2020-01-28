export default function onChatOffline(event) {
    return {
        type: '@event/onChatOffline',
        payload: { event }
    }
}