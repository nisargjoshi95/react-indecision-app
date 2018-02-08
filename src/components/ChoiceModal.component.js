import React from 'react';
import Modal from 'react-modal';

const ChoiceModal = (props) => 
  pug`
    Modal.modal(isOpen=${!!props.selectedOption}, contentLabel='Selected Option', closeTimeoutMS=${200})
      h3.modal__title Selected Option
      ${ props.selectedOption && pug`p.modal__body ${props.selectedOption}`}
      button.button(onClick=${props.clear}) Okay`;

export { ChoiceModal as default };