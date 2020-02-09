// import get from 'modules/lodash/get';
import $ from 'modules/jquery';

import input from '../input';

export default function openContacts() {
    const newChatButton = $('div[title="New chat"]')[0];
    input.click(newChatButton);
}