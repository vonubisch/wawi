export default function getMessage() {
    const messages = [];
    document.querySelectorAll('#main .message-in, #main .message-out').forEach(el => {
        const type = (el.className.includes('-in')) ? 'in' : 'out';
        const potentialText = el.querySelector('.selectable-text span');
        const text = potentialText ? potentialText.innerHTML : '';
        const potentialPreText = el.querySelector('div[data-pre-plain-text]');
        const preText = potentialPreText ? potentialPreText.getAttribute('data-pre-plain-text') : '';
        const date = preText.substring(
            preText.lastIndexOf('[') + 1, 
            preText.lastIndexOf(']')
        );
        messages.push({ 
            text,
            type,
            date
        });
    });
    return messages;
}