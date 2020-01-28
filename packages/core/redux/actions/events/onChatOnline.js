export default function onChatOnline(event) {
    return {
        type: '@event/onChatOnline',
        payload: { event }
    }
}