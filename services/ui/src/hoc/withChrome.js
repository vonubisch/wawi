import { compose, withProps } from 'recompose';

const chrome = {
    sendMessage: data => {
        try {
            chrome.runtime.sendMessage(data); // eslint-disable-line no-undef
        } catch (e) {
            console.warn('Not in chrome env');
        }
    }
};

const withChrome = compose(
    withProps({
        chrome
    })
);

export default withChrome;