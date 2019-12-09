import get  from 'lodash/get';

export default function onAppLoad(mutations) {

    if (get(mutations, [0, 'removedNodes', '0', 'id']) === 'startup') {
        return {
            unread: 0,
        };
    }

    return false;

}
