import instr_typeMessage from '../../../instructions/chat/typeMessage';

const type = '@chat/typeMessage';

const beginTyping = (message) => {
    instr_typeMessage(message);
    return {
        type: `${type}/begin`,
        payload: { 
            message,
        }
    };
};

const endTyping = () => ({
    type: `${type}/end`,
    payload: {}
});

export default function typeMessage({ message }) {
    return function(dispatch) {
        return dispatch(beginTyping(message)).then(() => setTimeout(() => dispatch(endTyping()), 5000));
    };
};