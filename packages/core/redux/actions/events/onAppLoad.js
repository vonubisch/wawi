const type = '@event/onAppLoad';

export default function onAppLoad(event) {
    return {
        type,
        payload: { event }
    }
};

export { type };