const observe = (options, callback) => {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(callback);
    return observer.observe(document, options);
}

const check = (data, observations) => {
    const events = [];
    Object.keys(observations).forEach(observation => {
        const condition = observations[observation];
        const result = condition(data);
        if (result) {
            events.push({ 
                name: observation, 
                data: result,
                date: new Date(),
                mutation: data,
            });
        }
    });
    return events;
}

export default {
    observe,
    check,
};