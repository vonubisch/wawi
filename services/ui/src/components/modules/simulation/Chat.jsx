import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Comment, Header, Input, Icon, Image, Button } from 'semantic-ui-react';

import Message from './Message.jsx';

const Chat = ({ name, avatar, online, messages, sendMessage, scrollTo }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
    return (
        <>
            <Comment.Group>
                <Header as="h3" dividing>
                    <Image src={avatar} circular style={{width: 32, height: 32}} />
                    <Header.Content>
                        <Icon 
                            size="small" 
                            name={online ? 'circle' : 'circle outline'} 
                            color={online ? 'green' : 'grey'} 
                        />
                        {name}
                        <Button icon size="tiny" floated="right" onClick={() => scrollTo({ top: 0 })}>
                            <Icon name="angle double up" />
                            more
                        </Button>
                    </Header.Content>
                </Header>
                <div style={{height: 400, overflowY: 'scroll'}} ref={el}>
                    {messages.map((message, i) => (
                        <Message 
                            key={i} 
                            type={message.type} 
                            name={name} 
                            text={message.text} 
                            date={message.date} 
                        />
                    ))}
                </div>
            </Comment.Group>
            <Input 
                fluid
                action={{ icon: 'send', onClick: () => sendMessage(currentMessage) }} 
                value={currentMessage} 
                onChange={(_, event) => setCurrentMessage(event.value)} 
                placeholder="Type message" 
            />
        </>
    );
};

Chat.propTypes = {
    name: PropTypes.string,
    online: PropTypes.bool,
    avatar: PropTypes.string,
    messages: PropTypes.array,
    sendMessage: PropTypes.func,
    scrollTo: PropTypes.func,
};

Chat.defaultProps = {
    name: 'Test',
    avatar: null,
    online: false,
    messages: [{}]
};

export default Chat;