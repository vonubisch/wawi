import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from 'semantic-ui-react';

import Simulation from '../../modules/simulation/index.js';
import Logger from '../../modules/logger/Logger.jsx';
import Module from './Module.jsx';

import modules from '../../modules.js';

const installedModules = {
    simulation: Simulation,
    logger: Logger,
};

const EmptyModule = () => (<div />);

const Modules = ({ activeModules, subscription, moduleEnable, moduleDisable }) => {

    const panes = Object.entries(modules).map(([key, module]) => {
        const Component = installedModules[key] || EmptyModule;
        const enabled = activeModules.includes(key);
        const available = module.subscription.includes(subscription);
        return {
            menuItem: { 
                key, 
                icon: enabled ? 'circle' : 'circle outline', 
                content: module.title,
                disabled: !available
            },
            render: () => (
                <Module 
                    enabled={enabled}
                    available={available}
                    title={module.title}
                    description={module.description}
                    moduleEnable={() => moduleEnable(key)}
                    moduleDisable={() => moduleDisable(key)}
                >
                    <Component />
                </Module>
            )
        };
    });

    return (
        <Tab
            menu={{ fluid: true, vertical: true, pointing: true }}
            panes={panes}
            renderActiveOnly
        />
    );
};

Modules.propTypes = {
    activeModules: PropTypes.array,
    subscription: PropTypes.string,
    moduleEnable: PropTypes.func,
    moduleDisable: PropTypes.func,
};

export default Modules;
