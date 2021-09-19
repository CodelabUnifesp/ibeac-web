import React, {useRef, useState} from 'react';
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

const EditablePostagem = ({value} = {}) => {
  return (
    value && (
      <div>
        <FormControl id="title">
          <FormLabel>Título</FormLabel>
          <Input
            colorScheme="primary"
            type="text"
            value={value.title}
            onChange={(event) => {
              value.title = event.target.value;
              console.log(value.title);
            }}
          />
          {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
        </FormControl>
        <FormControl id="description">
          <FormLabel>Descrição</FormLabel>
          <Textarea
            colorScheme="primary"
            value={value.description}
            onChange={(event) => {
              value.description = event.target.value;
              console.log(value.description);
            }}
          />
          {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
        </FormControl>

        <FormControl id="category">
          <FormLabel>Categoria</FormLabel>
          <Select
            colorScheme="primary"
            value={value.category}
            onChange={(event) => {
              value.category = event.target.value;
              console.log(value.category);
            }}>
            <option hidden selected />
            <option value={1}>Saúde</option>
            <option value={2}>Trocas</option>
            <option value={3}>Cultura e Lazer</option>
          </Select>
          {/* <FormHelperText>Título da sua postagem.</FormHelperText> */}
        </FormControl>
      </div>
    )
  );
};

EditablePostagem.displayName = 'EditablePostagem';
EditablePostagem.propTypes = {};

export default EditablePostagem;
