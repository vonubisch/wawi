// import get from 'modules/lodash/get';
import $ from 'modules/jquery';

// import input from '../input';

import { simulate } from 'modules/react-dom-testing';

export default function searchContact(data) {

    const newChatInput = document.querySelector('input[title="Search contacts"]');
    // console.log('parent', newChatInput.parentNode);
    // simulate(newChatInput.parentNode, [
    //     { type: 'click' },
    // ]);
    // simulate(document.querySelector('._2F_Gi._3I7nT span'), [
    //     { type: 'click' },
    // ]);
    // newChatInput.value = data.name;

    newChatInput.dispatchEvent(new Event('focus', { bubbles: true }));

    setTimeout(() => {
        // newChatInput.value = data.name;
        simulate(newChatInput, [
            { type: 'change', value: data.name },
            // { type: 'input', value: data.name },
            {
                type: "keyDown",
                data: {
                    keyCode: 13
                }
            }
        ]);

        const event = document.createEvent("UIEvents");
        event.initUIEvent("input", true, true, window, 1);
        newChatInput.dispatchEvent(event);

        setTimeout(() => {


            const item = $(`span[title="${data.name}"]`)[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
            console.log(item);

            simulate(item, 'click');


        }, 1000);


        // setValue.call(newChatInput, value)
        // newChatInput.dispatchEvent(new Event('input', { bubbles: true}))
    }, 1000);
    
}