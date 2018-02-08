import React from 'react';
import Header from './Header.component';
import Action from './Action.component';
import Options from './Options.component';
import AddOption from './AddOption.component';
import ChoiceModal from './ChoiceModal.component';

class IndecisionApp extends React.Component {
  //////////////////////
  // LIFECYCLE METHODS//
  //////////////////////
  constructor(props) {
    super(props);
    this.state = {
      title: 'Indecision',
      subtitle: 'Let a computer decide.',
      options: props.options,
      selectedeOption: undefined
    }
  }

  render() {

    return pug`
      .app
        Header(title=${this.state.title}, subtitle=${this.state.subtitle})
        .container
          Action(onPick=${this.chooseOption}, optionsLength=${this.state.options.length})
          .widget
            Options(options=${this.state.options}, onClear=${this.clearOptions}, removeOption=${this.deleteOption})
            AddOption(onAdd=${this.addOption})
            ChoiceModal(selectedOption=${this.state.selectedOption},  clear=${this.clearSelected})
    `;
  }

  componentDidMount = () => {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if(options)
        this.setState(() => ({ options }));
    } catch(e) {
      // Do nothing
    }
  }
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  ////////////////////
  // CUSTOM METHODS //
  ////////////////////
  addOption = (option) => {
    if(!option) {
      return 'ERROR: Enter a valid value.';
    } else if(this.state.options.indexOf(option) > -1) {
      return 'ERROR: This option already exists.';
    }

    this.setState((prevState) => ({
      // WE DONT USE .push HERE BC WE WANT ALL OBJECTS
      // TO BE **IMMUTABLE**. CALCULATE THE VALUE FROM
      // WHAT IS GIVEN, DO NOT MODIFY IT
      options: prevState.options.concat(option)
    }));
  }

  clearOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  chooseOption = () => {
    // alert(this.state.options[Math.floor(Math.random() * this.state.options.length)])
    this.setState(() => ({ selectedOption: (this.state.options[Math.floor(Math.random() * this.state.options.length)]) }))
  }

  clearSelected = () => {
    this.setState(() => ({ selectedOption: undefined }))
  }

  deleteOption = (option) => {
    this.setState((prevState) => ({ options: prevState.options.filter((item) => item !== option) }));
  }
};

IndecisionApp.defaultProps = {
  options: []
};

export { IndecisionApp as default };