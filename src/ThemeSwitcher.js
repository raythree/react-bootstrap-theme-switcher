import React from 'react';
import Lazyloader from './lazyloader';

const log = {
  debug(msg) {
    console.log('ThemeSwitcher: ' + msg);
  }
}

// check if boootstrap and jquery javascript files are loaded
function isJsLoaded() {
  log.debug('checking for js loaded');
  const head = document.getElementsByTagName('head')[0];
  const nodes = head.childNodes;
  let loaded = false;
  for (let ix = 0; ix < nodes.length; ix++) {
    let node = nodes.item(ix);
    if (node.href && node.href.indexOf('jquery.min.js') > -1) {
      loaded = true;
      log.debug('js is loaded')
    }
  }
  return loaded;
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
    this.loadDefault = this.loadDefault.bind(this);

    this.state = {loaded: false};
  }

  componentDidMount() {
    // load bootstrap javascript just at first mount
    if (!isJsLoaded()) {
      Lazyloader.load('/themes/js/jquery.min.js', function () {
        Lazyloader.load('/themes/js/bootstrap.min.js', function () {
          this.loadDefault(); // load default theme
        }.bind(this));
      }.bind(this));
    }
  }

  loadDefault() {
    Lazyloader.load('/themes/default/bootstrap.min.css', function () {
      Lazyloader.load('/themes/default/bootstrap-theme.min.css', function () {
        this.setState({loaded: true});
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
    if (!this.state.loaded) return null;
    return this.props.children || <span/>
  }
}

ThemeSwitcher.childContextTypes = {
  themeSwitcher: React.PropTypes.object
};

export { ThemeSwitcher };
