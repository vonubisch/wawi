const log = (...args) => {
    console.group(`%cWATurbo`, 'color: green');
    args.forEach(console.log);
    console.groupEnd();
}

const mutations = data => {
    console.group(`%cWATurbo: Mutation`, 'color: green');
    console.log(data);
    console.groupEnd();
}

const event = (message, event) => {
    console.group(`%cWATurbo`, 'color: green', message);
    console.log(`%cName:`, 'color: gray', event.name);
    console.log(`%cDate:`, 'color: gray', event.date);
    console.log(`%cData:`, 'color: gray', event.data);
    console.log(`%cMutation:`, 'color: gray', event.mutation);
    console.groupEnd();
}

const logger = {
    log,
    event,
    mutations
};;

export default logger;