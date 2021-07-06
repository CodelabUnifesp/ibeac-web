import React from 'react';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';

import {Spinner, Box} from '@chakra-ui/react';
import Postagem from '../Postagem/index.js';

const Feed = ({value, username, avatar} = {}) => {
  if (isNull(value)) {
    return (
      <Box w="100%" textAlign="center" mt={5}>
        <Spinner colorScheme="primary" />
      </Box>
    );
  }

  return (
    <>
      {value.map((postagem) => (
        <Postagem item={postagem} username={username} avatar={avatar} />
      ))}
    </>
  );
};

Feed.displayName = 'Feed';
Feed.defaultProps = {
  value: [],
  username: 'Unknown',
  avatar: 'https://bit.ly/dan-abramov',
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
  username: PropTypes.string,
  avatar: PropTypes.string,
};

export default Feed;
