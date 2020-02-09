import React from 'react';
import PropTypes from 'prop-types';

import { Accordion } from 'semantic-ui-react';

import Entry from './Entry.jsx';

const Log = ({ logs }) => {
    const [activeEntries, setActiveEntries] = React.useState([]);
    const onTitleClick = index => {
        return setActiveEntries(
            activeEntries.includes(index) 
                ? 
                activeEntries.filter(e => e === index) && activeEntries
                : 
                [...activeEntries, index]
        );
    };
    return (
        <Accordion 
            exclusive={false}
            fluid
            style={{height: 500, overflowY: 'scroll'}}
        >
            {logs.map((log, i) => (
                <Entry 
                    key={i} 
                    log={log} 
                    active={activeEntries.includes(i)} 
                    onToggle={() => onTitleClick(i)}
                />
            ))}
        </Accordion>
    );
};

Log.propTypes = {
    logs: PropTypes.array,
};

Log.defaultProps = {
    logs: [],
};

export default Log;