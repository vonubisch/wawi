import React, { useState, useRef, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import parseHTML from 'html-react-parser';
import { Grid, Menu, Comment, Header, Input, Icon, Image } from 'semantic-ui-react';

const Chat = ({ name, avatar, online, messages, sendMessage }) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const el = useRef(null);
    useEffect(() => {
        el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    });
    return (
        <>
            <Comment.Group>
                <Header as="h3" dividing>
                    {avatar ? <Image src={avatar} /> : null}
                    <Header.Content>
                        <Icon 
                            size="small" 
                            name={online ? 'circle' : 'circle outline'} 
                            color={online ? 'green' : 'grey'} 
                        />
                    </Header.Content>
                    {name}
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
};

Chat.defaultProps = {
    name: 'Test',
    avatar: null,
    online: false,
    messages: [{}]
};

const Message = ({ type, name, text, date }) => {
    return (
        <Comment className={`message-${type}`}>
            <Comment.Content>
                <Comment.Author as="a">{type === 'in' ? name : 'You'}</Comment.Author>
                <Comment.Metadata>
                    <div>{date}</div>
                </Comment.Metadata>
                <Comment.Text>{parseHTML(text)}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
};

Message.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
};

Message.defaultProps = {
    type: 'in',
    name: 'Test',
    text: 'Test',
    date: '12/12/12'
};

const Simulation = ({ chatlist, currentChat, openChat, sendMessage }) => {
    return (
        <Grid>
            <Grid.Column width={6}>
                <Menu secondary vertical style={{height: 400, overflowY: 'scroll'}}>
                    {chatlist.map((chat, i) => (
                        <Menu.Item 
                            key={i} 
                            active={chat.name === currentChat.name} 
                            name={chat.name} 
                            onClick={() => openChat(chat.name)}
                        />
                    ))}
                </Menu>
            </Grid.Column>
            <Grid.Column width={10}>
                <Chat 
                    name={currentChat.name} 
                    online={currentChat.online} 
                    messages={currentChat.messages} 
                    avatar={currentChat.avatar}
                    sendMessage={sendMessage}
                />
            </Grid.Column>
        </Grid>
    );
};

Simulation.propTypes = {
    openChat: PropTypes.func,
    sendMessage: PropTypes.func,
    chatlist: PropTypes.array,
    currentChat: PropTypes.object,
};

Simulation.defaultProps = {
    openChat: e => e,
    sendMessage: e => e,
    chatlist: [{ name: 'Test' }],
    currentChat: { name: 'Test', online: false, avatar: null, messages: [{ type: 'in', date: '12/12/12', text: 'Test'}, { type: 'out', date: '12/12/12', text: 'Test'}] },
};

export default compose(
    connect(
        state => ({ 
            chatlist: state && state.chatlist, 
            currentChat: state && state.currentChat 
        }),
        dispatch => ({
            openChat: name => dispatch({ type: '@ui/instruction/openChat', name }),
            sendMessage: text => dispatch({ type: '@ui/instruction/sendMessage', text })
        }) 
    )
)(Simulation);