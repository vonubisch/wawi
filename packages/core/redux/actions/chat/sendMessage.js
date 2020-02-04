import instr_sendMessage from '../../../instructions/chat/sendMessage';

const type = '@chat/sendMessage';

const beginSendMessage = () => {
    instr_sendMessage();
    return {
        type: `${type}/begin`,
        payload: {}
    };
};

const endSendMessage = () => ({
    type: `${type}/end`,
    payload: {}
});

export default function sendMessage() {
    return function(dispatch) {
        return dispatch(beginSendMessage()).then(() => setTimeout(() => dispatch(endSendMessage()), 1000));
    };
};