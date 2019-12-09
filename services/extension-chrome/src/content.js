import observer from 'packages/core/observer';
import logger from 'packages/core/logger';

import { 
    onAppLoad, onChatSwitch, onChatOnline, onChatTyping, onChatOffline 
} from 'packages/core/observations';

observer.observe({
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['title']
}, (mutations) => {

    if (mutations && mutations.length)
        logger.log(mutations);

    // if (get(mutations, [0, 'target', 'innerText'], '').length > 0) {
    //     console.log('0.target.innerText', get(mutations, [0, 'target', 'innerText'], '').split('\n'), mutations);
    //     if (get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], '').length > 0) {
    //         console.log('0.target.innerText.split.1', get(get(mutations, [0, 'target', 'innerText'], '').split('\n'), [1], ''), mutations);
    //     }
    // }

    const events = observer.check(mutations, {
        onChatSwitch,
        onChatOnline,
        onChatOffline,
        onChatTyping,
        onAppLoad,
        // onActiveListHover,
    });

    if (!events.length) {
        return;
    }
    
    events.forEach(event => {
        switch (event.name) {

            // case 'onActiveListHover':
            //     logger.event('Hovered over chat', event);
            //     break;

            case 'onChatSwitch':
                logger.event('Switched chat', event);
                break;

            case 'onChatOnline':
                logger.event('Current chat contact online', event);
                break;

            case 'onChatOffline':
                logger.event('Current chat contact offline', event);
                break;

            case 'onChatTyping':
                logger.event('Entered character', event);
                break;

            case 'onAppLoad':
                logger.event('App loaded', event);
                break;
        }
    });

})