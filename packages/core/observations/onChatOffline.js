import get  from 'lodash/get';

export default function onChatOffline(mutations) {

    if (
        get(mutations, [0, 'type']) === 'childList' &&
        get(mutations, [0, 'removedNodes', '0', 'innerText']) === 'online'
    ) {
        const name = get(mutations, [0, 'target', 'innerText'], '')
        return {
            name,
        }
    }

    return false;

}
