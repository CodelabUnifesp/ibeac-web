const questions = [
  {
    id: 1,
    name: 'Nome completo da representante da família (sem abreviações)',
    placeholder: 'Nome Completo',
    type: 'text',
    mask: null,
    alternatives: null,
  },
  {
    id: 2,
    name: 'Quantas pessoas tem na família?',
    placeholder: 'Ex: 3',
    type: 'text',
    mask: /\D/,
    alternatives: null,
  },
  {
    id: 3,
    name: 'Gestante?',
    placeholder: null,
    type: 'radio',
    mask: null,
    alternatives: [
      {id: 1, value: 'Sim'},
      {id: 2, value: 'Não'},
    ],
  },
  {
    id: 4,
    name: 'Sexo?',
    placeholder: null,
    type: 'select',
    mask: null,
    alternatives: [
      {id: 3, value: 'Masculino'},
      {id: 4, value: 'Feminino'},
    ],
  },
];

export default questions;
