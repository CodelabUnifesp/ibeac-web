const questions = [
  {
    id: 1,
    name: 'Data de nascimento',
    placeholder: '',
    type: 'date',
    mask: null,
    alternatives: null,
  },
  {
    id: 2,
    name: 'Sexo?',
    placeholder: null,
    type: 'radio',
    mask: null,
    alternatives: [
      {id: 1, value: 'Masculino'},
      {id: 2, value: 'Feminino'},
    ],
  },
  {
    id: 3,
    name: 'Telefone (De preferência Whatsapp)',
    placeholder: '(XX)XXXXX-XXXX',
    type: 'text',
    mask: null,
    alternatives: null,
  },
  {
    id: 4,
    name: 'Cor',
    placeholder: null,
    type: 'select',
    mask: null,
    alternatives: [
      {id: 3, value: 'Branco'},
      {id: 4, value: 'Preto'},
      {id: 5, value: 'Pardo'},
      {id: 6, value: 'Amarelo'},
      {id: 7, value: 'Indígena'},
    ],
  },
  {
    id: 5,
    name: 'Endereco da família (Informar apenas o nome da rua)',
    placeholder: 'Nome da rua',
    type: 'text',
    mask: null,
    alternatives: null,
  },
  {
    id: 6,
    name: 'Número',
    placeholder: 'Número da casa',
    type: 'text',
    mask: /\D/,
    alternatives: null,
  },
];

export default questions;
