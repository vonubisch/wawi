import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Menu } from 'semantic-ui-react';
import groupBy from 'lodash/groupBy';

import Simulation from '../../modules/simulation/index.js';
import Logger from '../../modules/logger/Logger.jsx';
import Module from './Module.jsx';

import modules from '../../modules.js';

const installedModules = {
    simulation: Simulation,
    logger: Logger,
};

const EmptyModule = () => (<div />);

const Modules = ({ subscription, moduleEnable, moduleDisable /* activeModules */ }) => {

    const panes = [];
    const grouped = groupBy(Object.entries(modules).map(([key, m]) => ({...m, key})), n => n.subscription.includes(subscription));
    
    grouped.true.forEach(({ key, title, description, ...module }) => {
        const Component = installedModules[key] || EmptyModule;
        const enabled = true; // activeModules.includes(key);
        panes.push({
            menuItem: {
                key,
                icon: enabled ? 'circle' : 'circle outline',
                content: title,
            },
            render: () => (
                <Module
                    enabled={enabled}
                    available={module.subscription.includes(subscription)}
                    title={title}
                    description={description}
                    moduleEnable={() => moduleEnable(key)}
                    moduleDisable={() => moduleDisable(key)}
                >
                    <Component />
                </Module>
            )
        });
    });

    panes.push({
        menuItem: {
            key: 'a',
            header: true,
            // content: 'Coming soon',
            render: () => <Menu.Item>ddd</Menu.Item>
        },
        render: () => <EmptyModule />
    });

    grouped.false.forEach(({ key, title }) => {
        panes.push({
            menuItem: {
                key,
                // icon: enabled ? 'circle' : 'circle outline',
                content: title,
                disabled: true
            },
            render: () => <EmptyModule />
        });
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
