import React from 'react';
import Lazyloader from './lazyloader';

const log = {
  debug(msg) {
    console.log('ThemeSwitcher: ' + msg);
  }
}

function removeCurrentTheme() {
  const head = document.getElementsByTagName('head')[0];
  const nodes = head.childNodes;
  const list =[]
  for (let ix = 0; ix < nodes.length; ix++) {
    let node = nodes.item(ix);
    if (node.href && node.href.indexOf('bootstrap') > -1) {
      log.debug('REMOVE: ' + node.href);
      list.push(node)
    }
  }
  if (!list.length) log.debug('NO bootstrap elements');
  list.forEach((node) => { head.removeChild(node) });
}

class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.state = {loaded: false};
  }

  componentDidMount() {
    // load bootstrap javascript just at first mount
    Lazyloader.load('/themes/js/jquery.min.js', function () {
      log.debug('jquery loaded');
      Lazyloader.load('/themes/js/bootstrap.min.js', function () {
        log.debug('bootstrap js loaded');
        this.load();
      }.bind(this));
    }.bind(this));
  }

  load(theme) {
    this.setState({loaded: false})
    removeCurrentTheme();
    Lazyloader.load('/themes/yeti/bootstrap.min.css', function () {
      log.debug('theme loaded ' + name);
      this.setState({loaded: true})
    }.bind(this));
  }

  getChildContext() {
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
