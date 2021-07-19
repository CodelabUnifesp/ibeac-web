import React from 'react';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';

import {Spinner, Box} from '@chakra-ui/react';
import Postagem from '../Postagem';

const Feed = ({value, user, avatar, canVerifyPost, onCreateComment} = {}) => {
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
          user={user.name}
          avatar={avatar}
          verifiable={user.user_type === 1}
          onCreateComment={onCreateComment}
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
  onCreateComment: () => {},
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
      dateTime: PropTypes.string.isRequired,
    }),
  ),
  user: PropTypes.shape({
    user_type: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  avatar: PropTypes.string,
  canVerifyPost: PropTypes.bool,
  onCreateComment: PropTypes.func,
};

export default Feed;
