const questions = [
  {
    name: 'Nome completo da representante da família (sem abreviações)',
    placeholder: 'Nome Completo',
    type: 'text',
    mask: null,
    alternatives: null,
  },
  {
    name: 'Quantas pessoas tem na família?',
    placeholder: 'Ex 3',
    type: 'text',
    mask: null,
    alternatives: null,
  },
  {
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
