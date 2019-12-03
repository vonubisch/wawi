import $ from "jquery";

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

        setFavicon( online ? (currentSeconds % 2 === 0) ? redFavicon : avatar : fallbackFavicon);

    }, 500);

});