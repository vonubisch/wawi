import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tab, Menu, Checkbox, Segment, Header, Dimmer } from 'semantic-ui-react';

const Module = ({ title, children }) => {
    const [enabled, setEnabled] = useState(true);
    return (
        <Tab.Pane>
            <Menu>
                <Menu.Item name={title} header />
                <Menu.Menu position="right">
                    <Menu.Item>
                        Disabled
                        &nbsp;&nbsp;&nbsp;
                        <Checkbox toggle checked={enabled} onChange={() => setEnabled(!enabled)} />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            <Dimmer.Dimmable as={Segment} segment={{ attached: true }} dimmed={!enabled} style={{minHeight: 300}}>
                {children}
                <Dimmer active={!enabled} inverted>
                    <Header as="h2" color="grey">
                        Module disabled
                    </Header>
                </Dimmer>
            </Dimmer.Dimmable>
        </Tab.Pane>
    );
};

Module.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};

export default Module;