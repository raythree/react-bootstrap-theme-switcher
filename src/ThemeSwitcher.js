import React from 'react';
const Lazyloader = require('./lazyloader');

const log = {
  debug: (msg) => {
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
  constructor(props, context) {
    super(props, context);
    this.state = {loaded: false};
  }

  //----------------------------------------------------------------------------
  // Lifecycle
  //----------------------------------------------------------------------------

  componentDidMount() {
    log.debug('mounted');
    removeCurrentTheme();
    log.debug('loading theme');
    Lazyloader.load('/themes/yeti/bootstrap.min.css', function () {
      log.debug('theme loaded');
      this.setState({loaded: true});
    }.bind(this));
  }

  componentWillReceiveProps(newProps) {
  }

  componentWillUnmount() {
  }

  render() {
    if (this.state.loaded) {
      return this.props.children || <span/>
    }
    else {
      return null;
    }
  }
}

//ThemeSwitcher.propTypes = { children: React.PropTypes.node };


export { ThemeSwitcher };
