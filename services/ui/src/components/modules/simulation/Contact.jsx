import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Label, Icon, Image, Header } from 'semantic-ui-react';

const Contact = ({ chat, currentChatName, openChat }) => {
    return (
        <Menu.Item 
            active={chat.name === currentChatName}
            onClick={() => openChat({ index: chat.index })}
        >
            {chat.group ? <Icon name="group" /> : null}
            {chat.unread > 0 ? <Label>{chat.unread}</Label> : null}
            <Image floated="left" src={chat.avatar} circular float="left" style={{ width: 32, height: 32 }} />
            {/* {chat.name} */}
            <Header
                as="h5"
                content={chat.name}
                subheader={chat.lastMessage}
                style={{marginTop: 0}}
            />
            {/* <Menu.Menu>
                <Menu.Item style={{ overflow: 'hidden', height: 20 }}>
                    {`(${chat.date}): ${chat.lastMessage}`}
                </Menu.Item>
            </Menu.Menu> */}
        </Menu.Item>
    );
};

Contact.propTypes = {
    chat: PropTypes.object,
    currentChatName: PropTypes.string,
    openChat: PropTypes.func,
};

Contact.defaultProps = {
    chat: { 
        name: 'John', 
        unread: 1, 
        date: 'yesterday', 
        lastMessage: 'Hello', 
        position: 0, 
        index: 0,
        group: true
    },
    currentChatName: '',
};

export default Contact;