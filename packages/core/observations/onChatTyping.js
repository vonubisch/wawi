import get  from 'lodash/get';

export default function onChatTyping(mutations) {

    const text = get(mutations, [0, 'target', 'textContent']);

    if (!text) return false;

    if (
        get(mutations, [0, 'type']) === 'characterData' &&
        get(mutations, [0, 'target', 'nodeName']) === '#text' &&
        get(mutations, [0, 'target', 'parentElement', 'isContentEditable']) === true
    ) {
        return {
            text,
            initial: false,
        };
    }

    if (
        get(mutations, [1, 'type']) === 'characterData' &&
        get(mutations, [1, 'target', 'nodeName']) === '#text' &&
        get(mutations, [1, 'target', 'parentElement', 'isContentEditable']) === true
    ) {
        return {
            text,
            initial: true,
        };
    }

    return false;

}
