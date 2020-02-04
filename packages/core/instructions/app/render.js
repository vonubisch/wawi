// import input from '../input';

import $ from 'modules/jquery';

export default function render() {

    console.log('render.js', new Date());

    const contacts = [];

    $('#pane-side > div:first-child > div:first-child > div:first-child > div').each(function(index) {
        const [name, date, lastMessage, unread] = this.innerText.split('\n');
        contacts.push({
            index,
            name,
            date,
            lastMessage,
            unread,
            position: parseInt(this.style.transform.replace('translateY(', '').replace('px)', '')),
        });
    });

    contacts.sort((a, b) => (a.position > b.position) ? 1 : -1)

    console.log(contacts);
};