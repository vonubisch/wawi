import instr_scrollTo   from '../../../instructions/chat/scrollTo';

const type = '@chat/scrollTo';

const beginOpening = (data) => {
    instr_scrollTo(data);
    return {
        type: `${type}/begin`,
        payload: { 
            data,
        }
    };
};

const endOpening = () => {
    return {
        type: `${type}/end`,
        payload: {}
    }
};

export default function scrollTo(data) {
    return function(dispatch) {
        return dispatch(beginOpening(data)).then(() => setTimeout(() => dispatch(endOpening(data)), 1500));
    };
};

export { type };