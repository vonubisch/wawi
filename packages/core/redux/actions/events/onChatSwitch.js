const type = '@event/onChatSwitch';

export default function onChatSwitch(event) {
    return {
        type,
        payload: { event }
    }
}
    
export { type }