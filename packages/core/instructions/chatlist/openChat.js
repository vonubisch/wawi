import get from 'modules/lodash/get';
import $ from 'modules/jquery';

import input from '../input';

const getNameFromContactElement = _contactElement => {
    return $(_contactElement).find(`div:nth-child(2) > div:first-child > div:first-child > span > span`).text().trim();
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

const getContactElement = index => {
    if (index === 0)  {
        return document.querySelector(`#pane-side > div:first-child > div:first-child > div:first-child > div:first-child`);
    }
    return document.querySelector(`#pane-side > div:first-child > div:first-child > div:first-child > div:nth-child(${index || 1})`);
}

const getClickableElement = (_contactElement, _first = false) => {
    if (_first) {
        return _contactElement.querySelector(`div:first-child > div:first-child > div:first-child > div:first-child > div:first-child`);    
    }
    return _contactElement.querySelector(`div:first-child > div:first-child`);
}

const findIndexByName = (_list, _name) => {
    return get(_list.find(_c => _c.name === _name), 'index', -1) + 1;
}

const getContactIndex = (data) => {
    let index = 0;
    if (get(data, 'index')) {
        if (get(data, 'index') === 0) return 0;
        index = get(data, 'index', -1) + 1;
    }
    if (get(data, 'name')) {
        index = findIndexByName(makeIndexedList(), get(data, 'name', ''));
    }
    return index;
}

export default function openChat(data) {
    const contacts = makeIndexedList();
    console.log('****', contacts, data);
    const contactIndex = getContactIndex(data);
    console.log('contactIndex', contactIndex);
    const contactElement = getContactElement(contactIndex);
    console.log('contactElement', contactElement);
    const clickableContactElement = getClickableElement(contactElement, (contactIndex === 0));
    console.log('clickableContactElement', clickableContactElement);
    return input.click(clickableContactElement);
}