import React from 'react';

const Header = (props) =>
  pug`
    .header
      .container
        h1.header__title ${props.title}
        ${props.subtitle && pug`h2.header__subtitle ${props.subtitle}`}`;

Header.defaultProps = {
  title: 'some default'
}

export { Header as default };