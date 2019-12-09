import get  from 'lodash/get';

export default function onActiveListHover(mutations) {
    
    if (
        get(mutations, [0, 'type']) === 'childList' &&
        get(mutations, [0, 'target', 'tagName']) === 'SPAN' &&
        get(mutations, [0, 'target', 'parentNode', 'tagName']) === 'DIV' &&
        get(mutations, [0, 'target', 'parentNode', 'parentNode', 'tagName']) === 'DIV' &&
        get(mutations, [0, 'target', 'parentNode', 'parentNode', 'parentNode', 'tagName']) === 'DIV'
    ) {
        const data = get(mutations, [0, 'target', 'parentNode', 'parentNode', 'parentNode', 'innerText']).split('\n');
        if (data.length === 3) {
            return {
                name: data[0],
                date: data[1],
                lastMessage: data[2]
            }
        }

        return false;

    }

    return false;

}
