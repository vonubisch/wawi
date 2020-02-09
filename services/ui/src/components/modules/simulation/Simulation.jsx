import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Grid, Menu, Button, Icon } from 'semantic-ui-react';

import Contact from './Contact.jsx';
import Chat from './Chat.jsx';

const Simulation = ({ chatlist, currentChat, openChat, openNewChat, sendMessage, scrollTo, chatlistScrollTo }) => {
    return (
        <Grid>
            <Grid.Column width={6}>
                <Menu secondary vertical style={{height: 450, overflowY: 'scroll'}}>
                    {chatlist.map((chat, i) => (
                        <Contact 
                            key={i}
                            chat={chat}
                            currentChatName={currentChat.name}
                            openChat={openChat}
                        />
                    ))}
                </Menu>
                <Button onClick={() => openNewChat({ name: 'Nrc' })}>
                    <Icon name="plus" />
                    New chat
                </Button>
                <Button icon onClick={() => chatlistScrollTo({ top: 2000 })}>
                    <Icon name="angle double down" />
                </Button>
            </Grid.Column>
            <Grid.Column width={10}>
                <Chat 
                    name={currentChat.name} 
                    online={currentChat.online} 
                    messages={currentChat.messages} 
                    avatar={currentChat.avatar}
                    sendMessage={sendMessage}
                    scrollTo={scrollTo}
                />
            </Grid.Column>
        </Grid>
    );
};

Simulation.propTypes = {
    openChat: PropTypes.func,
    openNewChat: PropTypes.func,
    scrollTo: PropTypes.func,
    chatlistScrollTo: PropTypes.func,
    sendMessage: PropTypes.func,
    chatlist: PropTypes.array,
    currentChat: PropTypes.object,
};

Simulation.defaultProps = {
    chatlist: [{ name: 'Test', lastMessage: 'Hello', unread: 0, date: 'yesterday', group: true, index: 0 }],
    currentChat: { name: 'Test', online: false, avatar: null, messages: [{ type: 'in', date: '12/12/12', text: 'Test'}, { type: 'out', date: '12/12/12', text: 'Test'}] },
};

export default compose(
    connect(
        state => ({ 
            chatlist: state && state.chatlist, 
            currentChat: state && state.currentChat 
        }),
        dispatch => ({
            openChat: data => dispatch({ type: '@ui/instruction/openChat', data }),
            scrollTo: data => dispatch({ type: '@ui/instruction/scrollTo', data }),
            chatlistScrollTo: payload => dispatch({ type: '@ui/instruction/chatlist/scrollTo', payload }),
            openNewChat: data => dispatch({ type: '@ui/instruction/openNewChat', data }),
            sendMessage: text => dispatch({ type: '@ui/instruction/sendMessage', text })
        }) 
    )
)(Simulation);