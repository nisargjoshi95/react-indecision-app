class IndecisionApp extends React.Component {
  //////////////////////
  // LIFECYCLE METHODS//
  //////////////////////
  constructor(props) {
    super(props);
    this.state = {
      title: 'Indecision App',
      subtitle: 'Let a computer decide.',
      options: props.options
    }
  }

  render() {

    return pug`
      div
        StatelessHeader(title=${this.state.title}, subtitle=${this.state.subtitle})
        StatelessAction(onPick=${this.chooseOption}, optionsLength=${this.state.options.length})
        StatelessOptions(options=${this.state.options}, onClear=${this.clearOptions}, removeOption=${this.deleteOption})
        AddOption(onAdd=${this.addOption})
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
    alert(this.state.options[Math.floor(Math.random() * this.state.options.length)])
  }

  deleteOption = (option) => {
    this.setState((prevState) => ({ options: prevState.options.filter((item) => item !== option) }));
  }
}

IndecisionApp.defaultProps = {
  options: []
}

// Stateful Header Component
class Header extends React.Component {

  render() {
    return pug`
      header
        h1 ${this.props.title}
        h3 ${this.props.subtitle}
    `;
  }
}

// Stateless Header Component
const StatelessHeader = (props) => {
  return pug`
    header
      h1 ${props.title}
      ${props.subtitle && pug`h2 ${props.subtitle}`}
  `;
}

StatelessHeader.defaultProps = {
  title: 'some default'
}

// Stateful Action
class Action extends React.Component {
  render() {
    return pug`
      div
        ${this.props.options > 0  && pug`button(onClick=${this.props.onPick}) What should I do?`}
    `;
  }
}

// Stateless Action Component
const StatelessAction = (props) => {
  return pug`
    div
      ${props.optionsLength > 0 && pug`button(onClick=${props.onPick}) What should I do?`}
  `;
}

class Options extends React.Component {
  render() {
    return pug`
      div
        button(onClick=${this.props.onClear}) Remove All
        ${
          this.props.options.map((option) => 
            pug`StatelessOption(key=${option}, text=${option})`
          )
        }
    `;
  }
}

// Stateless Options
const StatelessOptions = (props) => {
  return pug`
    div
      button(onClick=${props.onClear}) Remove All
      ${ props.options.length === 0 && pug`p Add an option to get started:`}
      ${
        props.options.map((option) => 
          pug`Option(key=${option}, text=${option}, onDelete=${props.removeOption})`
        )
      }
  `;
}

class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return pug`
      div ${this.props.text}
        button(onClick=${this.delete}) X
    `;
  }

  delete = (event) => {
    this.props.onDelete(this.props.text);
  }
}

const StatelessOption = (props) => {
  return pug`
    div ${this.props.text}
      button(onClick=${this.props.onDelete(this.props.text)}) Remove
  `;
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    }
  }

  render() {
    console.log(this.props)
    return pug`
      div
        ${this.state.error && pug`p ${this.state.error}`}
        form(onSubmit=${this.addOption})
          input(type='text', name='option')
          button Add Option
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

ReactDOM.render(pug`IndecisionApp`, document.getElementById('app'));