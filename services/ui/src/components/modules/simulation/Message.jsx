import React from 'react';
import PropTypes from 'prop-types';

import parseHTML from 'html-react-parser';
import { Comment } from 'semantic-ui-react';

const Message = ({ type, name, text, date }) => {
    return (
        <Comment className={`message-${type}`}>
            <Comment.Content>
                <Comment.Author as="a">{type === 'in' ? name : 'You'}</Comment.Author>
                <Comment.Metadata>
                    <div>{date}</div>
                </Comment.Metadata>
                <Comment.Text>{parseHTML(text)}</Comment.Text>
            </Comment.Content>
        </Comment>
    );
};

Message.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
};

Message.defaultProps = {
    type: 'in',
    name: 'Test',
    text: 'Test',
    date: '12/12/12'
};

export default Message;