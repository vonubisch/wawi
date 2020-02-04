import instr_getChats from '../../../instructions/chatlist/getChats';

const type = '@app/render';

const beginRender = () => {
    const chatlist = instr_getChats();
    return {
        type: `${type}/begin`,
        payload: {
            chatlist
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