function simulateMouseClick(element) {
    const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
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

const getClickableElement = _contactElement => {
    return _contactElement.querySelector(`div:first-child  > div:first-child`);
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
