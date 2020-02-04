const log = (...args) => {
    console.group(`%cWhatsPlus`, 'color: green');
    args.forEach(console.log);
    console.groupEnd();
}

const event = (message, event) => {
    console.group(`%cWhatsPlus`, 'color: green', message);
    console.log(`%cName:`, 'color: gray', event.name);
    console.log(`%cDate:`, 'color: gray', event.date);
    console.log(`%cData:`, 'color: gray', event.data);
    console.log(`%cMutation:`, 'color: gray', event.mutation);
    console.groupEnd();
}

const logger = {
    log,
    event
};;

export default logger;