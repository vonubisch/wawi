import $ from 'modules/jquery';
import get from 'modules/lodash/get';

export default function getChats() {

    const contacts = [];

    $('#pane-side > div:first-child > div:first-child > div:first-child > div').each(function(index) {
        const data = this.innerText.split('\n');
        const name = get(data, [0], '').trim();
        const avatar = $(this).find('img:not(.emoji)').attr('src');
        const date = get(data, [1], '');
        const lastMessage = get(data, [2], '').trim();
        const unread = parseInt(get(data, [3], 0)) || 0;
        const group = get(data, [3], '').trim() === ':';
        const position = parseInt(this.style.transform.replace(/[^0-9]/g, ""));
        contacts.push({
            index,
            name,
            avatar,
            date,
            group,
            lastMessage,
            unread,
            position,
        });
    });

    contacts.sort((a, b) => (a.position > b.position) ? 1 : -1)

    return contacts;
};