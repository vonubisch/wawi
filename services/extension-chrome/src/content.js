import $ from "jquery";
import get from 'lodash/get';
import last from 'lodash/last';

import { test } from 'packages/core/interface';

test();

const fallbackFavicon = $('#favicon').attr('href');
const redFavicon = 'https://colourlex.com/wp-content/uploads/2015/08/Cadmium_red_nr_2_painted_swatch_Lipscher-225-opt.jpg';

const setFavicon = icon => $('#favicon').attr('href', icon);
const consoleLog = (...args) => console.log(`WhatsPlus: `, ...args);

// Add currentViewed contact when switching
// Database for logging multiple
// Changed profile picture
// Is typing

$(document).ready(function() {

    let online = false;
    let loaded = false;

    let timerId = setInterval(() => {

        if ($('#startup').length === 1) {
            return;
        }

        if (loaded === false && $('#startup').length === 0) {
            consoleLog('Loaded');
            loaded = true;
        }

        const currentDate = new Date();
        const currentSeconds = currentDate.getSeconds();
        
        const avatar = $('#main header img').attr('src');
        
        const name = $('#main header div:nth-child(2) div:nth-child(1) span').html();

        const currentStatus = ($('#main header div:nth-child(2) div:nth-child(2) span').html() === 'online');

        if (currentStatus === true && online === false) {
            consoleLog(`'${name}' is online on ${new Date()}`);
        }

        if (currentStatus === false && online === true) {
            consoleLog(`'${name}' went offline on ${new Date()}`);
        }

        online = currentStatus;

        // setFavicon( online ? (currentSeconds % 2 === 0) ? redFavicon : avatar : fallbackFavicon);

    }, 500);

});

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    // console.log(mutations, observer);

    if (get(mutations, [0, 'target', 'innerText'], '').length > 0) {
        console.log('0.target.innerText', get(mutations, [0, 'target', 'innerText'], '').split('\n'), mutations);
        if (get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '').length > 0) {
            console.log('0.target.innerText.split.1', get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], ''), mutations);
        }
    }

    if (
        last(get(mutations, [0, 'target', 'innerText'], '').split('\n')) === 'Type a message'
    ) {
        const contactName = get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [0], '');
        const contactStatus = get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online';
        console.log(`!! Switched chat to '${contactName}' who is ${contactStatus ? 'online' : 'offline'}`, new Date(), mutations);
    }

    if (
        get(mutations, [0, 'type']) === 'characterData' &&
        get(mutations, [0, 'target', 'data']) === 'online' &&
        get(mutations, [1, 'type']) === 'attributes' &&
        get(mutations, [1, 'oldValue']) === 'click here for contact info'
    ) {
        console.log('!! Contact online (initial)', new Date(), mutations);
    }

    if (
        get(mutations, [0, 'target', 'innerText'], '').split('\n').length === 2 &&
        get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online'
    ) {
        console.log('!! Contact online (idle)', new Date(), mutations);
    }

    if (
        get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '') === 'online' && 
        last(get(mutations, [0, 'target', 'innerText'], '').split('\n')) === 'Type a message'
    ) {
        console.log('!! Contact online (switch)', new Date(), mutations);
    }

    mutations.forEach(mutation => {
        console.log(mutation.target.title);
    });

    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['title']
});