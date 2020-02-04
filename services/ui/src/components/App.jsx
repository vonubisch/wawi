import React from 'react';
import PropTypes from 'prop-types';

import UI from './views/ui/UI.jsx';

const App = ({ closeUI }) => {
    return (
        <div className="wawi-ui-app">
            <UI closeUI={closeUI} />
        </div>
    );
};

App.propTypes = {
    closeUI: PropTypes.func,
};

export default App;
