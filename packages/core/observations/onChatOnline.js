import get  from 'lodash/get';
import last from 'lodash/last';

export default function onChatOnline(mutations) {

    if (
        get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online' && 
        last(get(mutations, [0, 'target', 'innerText'], '').split('\n')) === 'Type a message'
    ) {
        return {
            type: 'switch'
        }
    }
    
    if (
        get(mutations, [0, 'target', 'innerText'], '').split('\n').length === 2 &&
        get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online'
    ) {
        return {
            type: 'idle'
        }
    }

    if (
        get(mutations, [0, 'type']) === 'characterData' &&
        get(mutations, [0, 'target', 'data']) === 'online' &&
        get(mutations, [1, 'type']) === 'attributes' &&
        get(mutations, [1, 'oldValue']) === 'click here for contact info'
    ) {
        return {
            type: 'initial'
        }
    }

    return false;

}
