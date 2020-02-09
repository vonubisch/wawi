import React from 'react';
import PropTypes from 'prop-types';

import { compose } from 'recompose';
import { connect } from 'react-redux';
// import { Grid } from 'semantic-ui-react';

import Log from './Log.jsx';

const Logger = ({ events }) => {
    const logs = [ ...events ];
    return (
        <Log logs={logs} />
    );
};

Logger.propTypes = {
    events: PropTypes.array,
};

Logger.defaultProps = {
    events: [undefined, undefined]
};

export default compose(
    connect(
        state => ({ 
            events: state && state.events, 
        }),
    )
)(Logger);