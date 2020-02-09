import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, Icon, Label, Header } from 'semantic-ui-react';

const Entry = ({ active, onToggle, log }) => {
    const d = new Date(log.date);
    const datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear() + " , " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
    return (
        <>
            <Accordion.Title active={active} onClick={onToggle} style={{overflow: 'hidden', height: 35, wordBreak: 'break-all'}}>
                <Icon name="dropdown" />
                <Label size="mini">{datestring}</Label>
                <Header
                    as="h4"
                    content={log.type.replace('@event/', '')}
                    style={{margin: 0, marginLeft: 10, display: 'inline'}}
                />
                {!active ? 
                    <Header
                        as="h6"
                        disabled
                        content={JSON.stringify(log.payload)}
                        style={{margin: 0, marginLeft: 10, height: 15, display: 'inline'}}
                    />
                    : null
                }
            </Accordion.Title>
            <Accordion.Content active={active}>
                <Header
                    as="pre"
                    size="tiny"
                    disabled
                    content={JSON.stringify(log.payload)}
                    style={{margin: 0, marginLeft: 10, height: 15, display: 'inline', fontFamily: 'monospace, monospace'}}
                />
            </Accordion.Content>
        </>
    );
};

Entry.propTypes = {
    onToggle: PropTypes.func,
    active: PropTypes.bool,
    log: PropTypes.object,
};

Entry.defaultProps = {
    active: false,
    log: {
        type: '@event/chat/onSwitch',
        date: '2020-02-08T15:54:24.805Z',
        payload: {
            test: true,
            foo: 'bar',
        }
    }
};

export default Entry;