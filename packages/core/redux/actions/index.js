import openChat from './chatlist/openChat';
import typeMessage from './chat/typeMessage';

import onChatSwitch from './events/onChatSwitch';
import onChatOnline from './events/onChatOnline';
import onChatOffline from './events/onChatOffline';
import onChatTyping from './events/onChatTyping';
import onAppLoad from './events/onAppLoad';

const actions = {
    events: {
        onChatSwitch,
        onChatOnline,
        onChatOffline,
        onChatTyping,
        onAppLoad,
    },
    chatlist: {
        openChat,
    },
    chat: {
        typeMessage,
    }
};

export default actions;