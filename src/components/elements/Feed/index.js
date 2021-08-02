import React from 'react';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';

import {Spinner, Box} from '@chakra-ui/react';
import Postagem from '../Postagem';

const Feed = ({
  value,
  user,
  avatar,
  canVerifyPost,
  fetchComments,
  onCreateComment,
  onAddSelo,
} = {}) => {
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
        <Postagem
          key={postagem?.id}
          item={postagem}
          user={user}
          avatar={avatar}
          verifiable={canVerifyPost}
          fetchComments={fetchComments}
          onCreateComment={onCreateComment}
          onAddSelo={onAddSelo}
        />
      ))}
    </>
  );
};

Feed.displayName = 'Feed';
Feed.defaultProps = {
  value: [],
  user: '????',
  avatar: 'https://bit.ly/dan-abramov',
  canVerifyPost: false,
  fetchComments: async () => [],
  onCreateComment: () => {},
  onAddSelo: () => {},
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
      dateTime: PropTypes.object.isRequired, // TODO: invoke moment object type
    }),
  ),
  user: PropTypes.string,
  avatar: PropTypes.string,
  canVerifyPost: PropTypes.bool,
  fetchComments: PropTypes.func,
  onCreateComment: PropTypes.func,
  onAddSelo: PropTypes.func,
};

export default Feed;
