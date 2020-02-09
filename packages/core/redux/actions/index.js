import render from './app/render';

import openChat from './chatlist/openChat';
import openNewChat from './chatlist/openNewChat';
import chatlistScrollTo from './chatlist/scrollTo';
import typeMessage from './chat/typeMessage';
import sendMessage from './chat/sendMessage';
import scrollTo from './chat/scrollTo';

import onChatSwitch from './events/onChatSwitch';
import onChatOnline from './events/onChatOnline';
import onChatOffline from './events/onChatOffline';
import onChatTyping from './events/onChatTyping';
import onAppLoad from './events/onAppLoad';

const actions = {
    app: {
        render,
    },
    events: {
        onChatSwitch,
        onChatOnline,
        onChatOffline,
        onChatTyping,
        onAppLoad,
    },
    chatlist: {
        openChat,
        openNewChat,
        scrollTo: chatlistScrollTo,
    },
    chat: {
        typeMessage,
        sendMessage,
        scrollTo,
    }
};

export default actions;