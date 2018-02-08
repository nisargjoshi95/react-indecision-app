import React from 'react';

const Action = (props) => 
  pug`
    div
      button.big-button(onClick=${props.onPick}, disabled=${!props.optionsLength > 0}) What should I do?`;

export { Action as default };