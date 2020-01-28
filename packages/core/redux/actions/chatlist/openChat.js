import instr_openChat    from '../../../instructions/chatlist/openChat';

import $ from 'modules/jquery';

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

const type = '@chatlist/openChat';

const beginOpening = (name) => {

    const contacts = makeIndexedList();
    
    instr_openChat(contacts, name);

    setTimeout(() => dispatch(endOpening()), 1500)

    return {
        type: `${type}/begin`,
        payload: { 
            name,
        }
    };
};

const endOpening = () => ({
    type: `${type}/end`,
    payload: {}
});

export default function openChat({ name }) {
    return function(dispatch) {
        return dispatch(beginOpening(name)).then(() => setTimeout(() => dispatch(endOpening()), 1500));
    };
};

export { type };