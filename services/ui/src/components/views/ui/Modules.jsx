import React from 'react';

import { Tab } from 'semantic-ui-react';

import Simulation from '../../modules/Simulation.jsx';
import Module from './Module.jsx';

const installedModules = {
    simulation: Simulation,
};

const EmptyModule = () => (<div />);

const Modules = () => {
    const panes = [{
        menuItem: { key: 'simulation', icon: 'circle outline', content: 'Simulation' },
    }, {
        menuItem: { key: 'dev', icon: 'check circle outline', content: 'Development' },
    }, {
        menuItem: { key: 'logger', icon: 'check circle outline', content: 'Logger' },
    }, {
        menuItem: { key: 'autoreply', icon: 'circle outline', content: 'Auto reply' },
    }, {
        menuItem: { key: 'quickreplies', icon: 'circle outline', content: 'Quick replies' },
    }, {
        menuItem: { key: 'customflows', icon: 'circle outline', content: 'Custom flows' },
    }, {
        menuItem: { key: 'contact', icon: 'circle outline', content: 'Contact management' },
    }, {
        menuItem: { key: 'export', icon: 'circle outline', content: 'Export data' },
    }, {
        menuItem: { key: 'sync', icon: 'circle outline', content: 'API' },
    }].map(item => {
        const Component = installedModules[item.menuItem.key] || EmptyModule;
        return {
            ...item,
            render: () => (
                <Module title={item.menuItem.content}>
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

export default Modules;
