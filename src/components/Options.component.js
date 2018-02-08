import React from 'react';
import Option from './Option.component';

const Options = (props) =>
  pug`
    div
      .widget-header
        h3.widget-header__title Options
        button.button.button--plain(onClick=${props.onClear}) Remove All
      ${ props.options.length === 0 && pug`p.widget-message Add an option to get started:`}
      ${
        props.options.map((option, index) => 
          pug`Option(key=${option}, count=${index + 1}, text=${option}, onDelete=${props.removeOption})`
        )
      }`;

export { Options as default };