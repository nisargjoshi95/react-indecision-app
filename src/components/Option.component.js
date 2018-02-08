import React from 'react';

class Option extends React.Component {
  render() {
    return pug`
      .option
        p.option__text ${this.props.count}) ${this.props.text}
        button.button.button--plain(onClick=${this.delete}) 
          b X
    `;
  }

  delete = (event) => {
    this.props.onDelete(this.props.text);
  }
};

export { Option as default };