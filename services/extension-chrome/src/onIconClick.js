import $ from "jquery";

function simulateMouseClick(element) {
    const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
    console.log('Clicking', element);
    mouseClickEvents.forEach(mouseEventType =>
        element.dispatchEvent(
            new MouseEvent(mouseEventType, {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
        )
    );
}

const getContactElement = index => {
    return document.querySelector(`#pane-side > div:first-child > div:first-child > div:first-child > div:nth-child(${index})`);
}

const getClickableElement = (_contactElement, _first = false) => {
    if (_first) {
        console.log('First');
        const result = _contactElement.querySelector(`div:first-child > div:first-child > div:first-child > div:first-child`);    
        return result;
    }
    return _contactElement.querySelector(`div:first-child > div:first-child`);
}

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

const findIndexByName = (_list, _name) => {
    return _list.find(_c => _c.name === _name).index + 1;
}

console.log(makeIndexedList());

const contacts = makeIndexedList();

let clickContacts = ['John'];

let currentIntervalIndex = 0;

let timerId = setInterval(() => {

    let contactIndex = findIndexByName(contacts, clickContacts[currentIntervalIndex]);
    let contact = getContactElement(contactIndex);
    console.log(contactIndex, contact, (contactIndex === 1));
    simulateMouseClick(getClickableElement(contact, (contactIndex === 1)));

    currentIntervalIndex++;

}, 4000);


setTimeout(() => { clearInterval(timerId); console.log('stopped'); }, 22000);
