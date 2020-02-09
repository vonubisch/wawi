import input from '../input';

export default function typeMessage(message = null) {
    if (!message) return;
    const textbox = document.querySelector('#main footer div[contenteditable="true"]');
    textbox.innerHTML = message.replace(/  /gm,'');
    const event = document.createEvent("UIEvents");
    event.initUIEvent("input", true, true, window, 1);
    textbox.dispatchEvent(event);
}