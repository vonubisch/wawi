import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Menu, Checkbox, Segment, Header, Dimmer } from 'semantic-ui-react';

const Module = ({ available, enabled, title, description, children, ...props }) => {

    const onToggle = enabled ? props.moduleDisable : props.moduleEnable;
    return (
        <Tab.Pane>
            <Dimmer.Dimmable dimmed={!available}>
                <Menu>
                    <Menu.Item>
                        <Header
                            as="h4"
                            content={title}
                            subheader={description}
                            style={{marginTop: 0}}
                        />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Checkbox toggle checked={enabled} onChange={onToggle} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Dimmer active={!available} inverted>
                    <Header as="h2" color="grey">
                        Module not available
                    </Header>
                </Dimmer>
            </Dimmer.Dimmable>


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
    description: PropTypes.string,
    children: PropTypes.node,
    available: PropTypes.bool,
    enabled: PropTypes.bool,
    moduleDisable: PropTypes.func,
    moduleEnable: PropTypes.func,
};

export default Module;