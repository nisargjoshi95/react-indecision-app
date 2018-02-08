console.log("Indecision app.js running");

const object = {
  title: 'Indecision App',
  subtitle: "Can't decide? I will for you.",
  options: []
};

const onFormSubmit = (event) => {
  event.preventDefault();

  const option = event.target.elements.option.value;

  if(option) {
    object.options.push(option);
    event.target.elements.option.value = '';
    renderApp();
  }
}

const removeAll = () => {
  object.options = [];
  renderApp();
}

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * object.options.length);
  const option = object.options[randomNum];
  alert(option);
}

const appRoot = document.getElementById('app');

const renderApp = () => {
  const template = pug`
    div
      h1 ${object.title}
      ${object.subtitle && pug`h4 ${object.subtitle}`}
      p ${object.options.length > 0 ? 'Here are your options:' : 'No options'}
      button(onClick=${makeDecision}, disabled=${object.options.length === 0}) What should I do?
      button(onClick=${removeAll}) Remove All
      ol
        ${
          object.options.map((option) => pug`li(key=${option}) ${option}`) 
        }
      form(onSubmit=${onFormSubmit})
        input(type='text', name='option')
        button Add Option
  `;

  ReactDOM.render(template, appRoot);
}

renderApp();