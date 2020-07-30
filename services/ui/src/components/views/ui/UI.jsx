import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import { Menu, Modal, Image } from 'semantic-ui-react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import Modules from './Modules.jsx';

import logo from 'images/logo.png';

const UI = ({ closeUI, activeModules, ...props }) => {
    const subscription = 'free';
    return (
        <Modal
            open={true}
            closeOnEscape={true}
            closeOnDimmerClick={true}
            closeIcon={true}
            onClose={closeUI}
        >
            <Modal.Content style={{ paddingTop: 85 }}>
                <Menu fixed="top">
                    <Menu.Item style={{padding: 10}}>
                        <Image 
                            src={logo}
                        />
                    </Menu.Item>
                    {/* <Menu.Menu position="right">
                        <Menu.Item>
                            <Label 
                                content="beta"
                                color="gray" 
                            />
                        </Menu.Item>
                    </Menu.Menu> */}
                </Menu>
                <Modules 
                    activeModules={activeModules} 
                    subscription={subscription}
                    moduleEnable={props.enableModule}
                    moduleDisable={props.disableModule}
                />
            </Modal.Content>
        </Modal>
    );
};

UI.propTypes = {
    activeModules: PropTypes.array,
    closeUI: PropTypes.func,
    enableModule: PropTypes.func,
    disableModule: PropTypes.func,
};

export default compose(
    connect(
        state => ({ 
            activeModules: get(state, 'modules.active', []), 
        }),
        dispatch => ({
            enableModule: key => dispatch({ type: '@modules/enable', payload: { key } }),
            disableModule: key => dispatch({ type: '@modules/disable', payload: { key } }),
        }) 
    )
)(UI);
