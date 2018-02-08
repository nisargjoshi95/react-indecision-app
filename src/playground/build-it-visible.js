const appRoot = document.getElementById('app');
/*
const data = {
  title: 'Visibility Toggle',
  info: 'Some information about something.'
}

let toggle = false;

const toggleDetails = () => {
  toggle = toggle ? false : true;
  render();
}

const render = () => {
  const template = pug`
    div
      h1 ${data.title}
      button(onClick=${toggleDetails}) ${toggle ? 'Hide details' : 'Show details'}
      ${ pug`p ${toggle && data.info}`}
  `;
  ReactDOM.render(template, appRoot);
} **/

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Visibility Toggle',
      info: 'Info about something',
      visible: false
    }
  }

  render() {
    return pug`
      div
        h1 ${this.state.title}
        button(onClick=${this.toggleDetails}) ${this.state.visible ? 'Hide details' : 'Show details'}
        ${ pug`p ${this.state.visible && this.state.info}`}
    `;
  }

  toggleDetails = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible
    }))
  }
}

ReactDOM.render(<Toggle />, appRoot);