import $ from 'jquery';

// import sendMessage from 'packages/core/actions/chat/sendMessage';
import typeMessage from 'packages/core/actions/chat/typeMessage';
import openChat    from 'packages/core/actions/chatlist/openChat';

const getNameFromContactElement = _contactElement => {
    return $(_contactElement).find(`div:nth-child(2) > div:first-child > div:first-child > span > span`).html();
}
const makeIndexedList = () => {
    const contactList = [];
    let i = 0;
    const contacts = document.querySelectorAll("#pane-side > div:first-child > div:first-child > div:first-child > div");
	for (const contact of contacts) {
        contactList.push({
            name: getNameFromContactElement(contact),
            index: i,
            position: parseInt(contact.style.transform.replace(/[^0-9]/g, ""))
        })
        i++;
    }
    return contactList.sort((a, b) => a.position - b.position);
}

const contacts = makeIndexedList();

openChat(contacts, 'Papa');
setTimeout(() => {
    typeMessage('test');
    // sendMessage();
}, 2000);
