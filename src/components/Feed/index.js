import React from 'react';
import PropTypes from 'prop-types';
import Postagem from '../Postagem/index.js';

const Feed = ({value} = {}) => (
  <>
    {value.map((postagem) => (
      <Postagem item={postagem} />
    ))}
  </>
);

Feed.displayName = 'Feed';
Feed.defaultProps = {
  value: [],
};
Feed.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      },
      userName: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
    }),
  ),
};

export default Feed;
