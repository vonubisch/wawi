import instr_getChats from '../../../instructions/chatlist/getChats';
import instr_getMessages from '../../../instructions/chat/getMessages';

const type = '@app/render';

const beginRender = () => {
    const chatlist = instr_getChats();
    const messages = instr_getMessages();
    return {
        type: `${type}/begin`,
        payload: {
            chatlist,
            messages
        }
    };
};

const endRender = () => ({
    type: `${type}/end`,
    payload: {}
});

export default function render() {
    return function(dispatch) {
        return dispatch(beginRender()).then(() => setTimeout(() => dispatch(endRender()), 1000));
    };
};

export { type }