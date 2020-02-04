import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Modal } from 'semantic-ui-react';

import Modules from './Modules.jsx';

const UI = ({ closeUI }) => {
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
                        <Menu.Item name="Upgrade" />
                    </Menu.Menu>
                </Menu>
                <Modules />
            </Modal.Content>
        </Modal>
    );
};

UI.propTypes = {
    closeUI: PropTypes.func,
};

export default UI;
