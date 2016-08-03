import React from 'react';

const log = {
  debug(msg) {
    console.log('ThemeSwitcher: ' + msg);
  }
}

class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    log.debug('returning context types');
    return { themeSwitcher: this };
  }

  render() {
    return this.props.children || <span/>
  }
}

ThemeSwitcher.childContextTypes = {
  themeSwitcher: React.PropTypes.object
};

export { ThemeSwitcher };
