import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import ResizeTextarea from 'react-textarea-autosize';

import {Textarea as CTextarea} from '@chakra-ui/react';

const Textarea = forwardRef((props, ref) => (
  <CTextarea
    ref={ref}
    minH="unset"
    overflow="hidden"
    w="100%"
    resize="none"
    minRows={5}
    as={ResizeTextarea}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
Textarea.propTypes = {};

export default Textarea;
