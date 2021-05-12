import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
} from '@chakra-ui/react';

import {get} from 'lodash';
import Textarea from '../Textarea';

const EditablePostagem = ({value, onChange} = {}) => (
  <div>
    <FormControl id="title">
      <FormLabel>Título</FormLabel>
      <Input
        colorScheme="primary"
        type="text"
        value={get(value, 'title')}
        onChange={(event) => onChange('title', event.target.value)}
      />
      {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
    </FormControl>
    <FormControl id="description">
      <FormLabel>Descrição</FormLabel>
      <Textarea
        colorScheme="primary"
        value={get(value, 'description')}
        onChange={(event) => onChange('description', event.target.value)}
      />
      {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
    </FormControl>

    <FormControl id="category">
      <FormLabel>Categoria</FormLabel>
      <Select
        colorScheme="primary"
        value={get(value, 'category')}
        onChange={(event) => onChange('category', event.target.value)}>
        <option hidden selected />
        <option value="Saúde">Saúde</option>
        <option value="Rrocas">Trocas</option>
        <option value="Cultura e Lazer">Cultura e Lazer</option>
      </Select>
      {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
    </FormControl>
  </div>
);

EditablePostagem.displayName = 'EditablePostagem';
EditablePostagem.propTypes = {};

export default EditablePostagem;
