import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Modal, Label } from 'semantic-ui-react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Modules from './Modules.jsx';

const UI = ({ closeUI, ...props }) => {
    const subscription = 'free';
    const defaultActiveModules = ['simulation', 'logger'];
    const [activeModules, setActiveModule] = React.useState(defaultActiveModules);
    const moduleEnable = key => {
        props.enableModule(key);
        return setActiveModule(!activeModules.includes(key) ? [...activeModules, key] : activeModules);
    };
    const moduleDisable = key => {
        props.disableModule(key);
        return setActiveModule(activeModules.filter(v => v !== key));
    };
    return (
        <Modal
            open={true}
            closeOnEscape={true}
            closeOnDimmerClick={true}
            closeIcon={true}
            onClose={closeUI}
        >
            <Modal.Content style={{ paddingTop: 60 }}>
                <Menu fixed="top">
                    <Menu.Item name="WAWI" header />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Label 
                                content="Free Edition" 
                                icon="star" 
                                color="red" 
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Modules 
                    activeModules={activeModules} 
                    subscription={subscription}
                    moduleEnable={moduleEnable}
                    moduleDisable={moduleDisable}
                />
            </Modal.Content>
        </Modal>
    );
};

UI.propTypes = {
    closeUI: PropTypes.func,
    enableModule: PropTypes.func,
    disableModule: PropTypes.func,
};

export default compose(
    connect(
        state => ({ 
            modules: state && state.modules || [], 
        }),
        dispatch => ({
            enableModule: key => dispatch({ type: '@ui/modules/enable', key }),
            disableModule: key => dispatch({ type: '@ui/modules/disable', key }),
        }) 
    )
)(UI);
