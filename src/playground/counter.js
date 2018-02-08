/**
let count = 0;
const addOne = () => {
  count++;
  renderApp();
  console.log('add', count);
}
const subtractOne = () => {
  count--;
  renderApp();
  console.log('subtract', count);
}
const reset = () => {
  count = 0;
  renderApp();
  console.log('reset', count);
}

const renderApp = () => {
  const counterTemplate = pug`
    div
      h1 Count: ${count}
      button(onClick=${addOne}) +1
      button(onClick=${subtractOne}) -1
      button(onClick=${reset}) Reset
  `;
  ReactDOM.render(counterTemplate, appRoot)
}

renderApp();
**/

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return pug`
    div
      h1 Count: ${this.state.count}
      button(onClick=${this.addOne}) +1
      button(onClick=${this.subtractOne}) -1
      button(onClick=${this.reset}) Reset
  `;
  }

  componentDidMount = () => {
    const count = parseInt(localStorage.getItem('count'));
    if(!isNaN(count))
      this.setState(() => ({ count }));
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.count !== this.state.count)
      localStorage.setItem('count', this.state.count);
  }

  addOne = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  subtractOne = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  reset = () => {
    this.setState(() => ({
      count: 0
    }));
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));