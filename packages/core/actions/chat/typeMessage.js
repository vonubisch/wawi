import input from '../input';

export default function typeMessage(message = null) {

    if (!message) return;

    const textbox = document.querySelector('#main footer div[contenteditable="true"]');

    input.type(textbox, message);

}