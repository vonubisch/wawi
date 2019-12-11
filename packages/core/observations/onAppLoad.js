import get  from 'lodash/get';

export default function onAppLoad(mutations) {

    if (get(mutations, [0, 'removedNodes', '0', 'id']) === 'startup') {

        const contacts = [];

        let unread = 0;
        let chatListContact = null;

        const lang = document.querySelector('html').getAttribute('loc');

        mutations.forEach(mutation => {
            // Contactlist mutation
            if (
                get(mutation, 'type') === 'childList' &&
                get(mutation, 'target.offsetParent.id') === 'pane-side' &&
                get(mutation, ['addedNodes', '0', 'parentElement', 'parentElement', 'parentElement', 'parentElement', 'id']) === 'pane-side'
            ) {
                const potentialData = get(mutation, ['addedNodes', '0', 'innerText']);
                if (!potentialData || typeof potentialData !== 'string') return;
                chatListContact = get(mutation, ['addedNodes', '0', 'className'], null);
                const [name, date, lastMessage] = potentialData.split('\n');
                contacts.push({
                    name,
                    date,
                    lastMessage
                });
                return;
            }

            // Title mutation
            if (get(mutation, 'target.tagName') === 'TITLE') {
                const title = get(mutation, 'target.textContent');
                if (!title) return;
                unread = parseInt(title.substring(
                    title.lastIndexOf('(') + 1, 
                    title.lastIndexOf(')')
                ));
                return;
            }
        });

        contacts.reverse();

        return {
            unread,
            contacts,
            lang,
            learn: {
                classNames: {
                    chatListContact
                }
            }
        };

    }

    return false;

}
