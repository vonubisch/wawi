import get  from 'lodash/get';
import last from 'lodash/last';

export default function onChatSwitch(mutations) {
    
    if (
        last(get(mutations, [0, 'target', 'innerText'], '').split('\n')) === 'Type a message'
    ) {
        const name = get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [0], '');

        if (name === 'Search or start new chat' || name === 'Contact info') {
            return false;
        }
        
        const online = get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online';

        const headerImage = document.querySelector('#main header img');

        const avatar = headerImage && headerImage.src || null;

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

        return {
            name,
            online,
            avatar,
            messages,
        };
    }

    return false;

}
