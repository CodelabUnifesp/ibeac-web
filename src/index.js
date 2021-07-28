import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import moment from 'moment';
import 'moment/locale/pt-br'; // without this line it didn't work
import App from './App';

moment.locale('pt-br');

ReactDOM.render(<App />, document.getElementById('root'));
