// Node modules
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import AddOption from './components/AddOption.component';
import IndecisionApp from './components/IndecisionApp.component';

// Styles
import 'normalize.css/normalize.css'
import './styles/styles.sass';

ReactDOM.render(pug`IndecisionApp`, document.getElementById('app'));