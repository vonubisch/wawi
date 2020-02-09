import instr_openContacts   from '../../../instructions/chatlist/openContacts';
import instr_searchContact from '../../../instructions/chatlist/searchContact';

const type = '@chatlist/openNewChat';

const beginOpening = (data) => {
    instr_openContacts();
    return {
        type: `${type}/begin`,
        payload: { 
            data,
        }
    };
};

const endOpening = (data) => {
    instr_searchContact(data);
    return {
        type: `${type}/end`,
        payload: {}
    }
};

export default function openNewChat(data) {
    return function(dispatch) {
        return dispatch(beginOpening(data)).then(() => setTimeout(() => dispatch(endOpening(data)), 1500));
    };
};

export { type };