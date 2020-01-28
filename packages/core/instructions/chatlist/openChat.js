import input from '../input';

const getContactElement = index => {
    return document.querySelector(`#pane-side > div:first-child > div:first-child > div:first-child > div:nth-child(${index})`);
}

const getClickableElement = (_contactElement, _first = false) => {
    if (_first) {
        const result = _contactElement.querySelector(`div:first-child > div:first-child > div:first-child > div:first-child`);    
        return result;
    }
    return _contactElement.querySelector(`div:first-child > div:first-child`);
}

const findIndexByName = (_list, _name) => {
    return _list.find(_c => _c.name === _name).index + 1;
}

export default function openChat(contacts, name) {
    const contactIndex = findIndexByName(contacts, name);
    const contact = getContactElement(contactIndex);
    return input.click(getClickableElement(contact, (contactIndex === 1)));
}