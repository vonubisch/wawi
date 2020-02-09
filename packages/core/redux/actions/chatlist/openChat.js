import instr_openChat    from '../../../instructions/chatlist/openChat';

const type = '@chatlist/openChat';

const beginOpening = (data) => {

    instr_openChat(data);

    return {
        type: `${type}/begin`,
        payload: { 
            data,
        }
    };
};

const endOpening = () => ({
    type: `${type}/end`,
    payload: {}
});

export default function openChat(data) {
    return function(dispatch) {
        return dispatch(beginOpening(data)).then(() => setTimeout(() => dispatch(endOpening()), 1500));
    };
};

export { type };