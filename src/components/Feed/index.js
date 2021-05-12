import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@chakra-ui/layout';

import {get} from 'lodash';

const Feed = ({value} = {}) => (
  <>
    {value.map((postagem) => (
      <Box my={4} p={4} bg="lightgrey">
        {get(postagem, 'title', '???')}
      </Box>
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
    }),
  ),
};

export default Feed;
