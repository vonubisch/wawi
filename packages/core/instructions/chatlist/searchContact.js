// import get from 'modules/lodash/get';
// import $ from 'modules/jquery';

// import input from '../input';

import ReactTestUtils from 'react-dom/test-utils';

export default function searchContact(data) {
    const newChatInput = document.querySelector('input[title="Search contacts"]');
    console.log('newChatInput', newChatInput, data);

    ReactTestUtils.Simulate.change(node);
    ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
}