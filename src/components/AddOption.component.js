import React from 'react';

class AddOption extends React.Component {

  state = {
    error: undefined
  };

  render() {
    console.log(this.props)
    return pug`
      div
        ${this.state.error && pug`p.add-option-error ${this.state.error}`}
        form.add-option(onSubmit=${this.addOption})
          input.add-option__input(type='text', name='option')
          button.button Add Option
    `;
  }

  addOption = (event) => {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    const error = this.props.onAdd(option);
    if(!error)
      event.target.elements.option.value = '';

    this.setState(() => ({ error }));
  }
}

export { AddOption as default };