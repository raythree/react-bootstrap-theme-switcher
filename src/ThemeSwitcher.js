import React from 'react';
import PropTypes from 'prop-types';
import Lazyloader from './lazyloader';

function setItem(key, obj) {
  if (!key) return null;
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  }
  catch (err) {
    return null;
  }
}

function getItem(key) {
  if (!key) return null;
  try {
    var item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null;
  }
  catch (err) {
    return null;
  }
}

// check if boootstrap and jquery javascript files are loaded
function isJsLoaded() {
  const head = document.getElementsByTagName('head')[0];
  const nodes = head.childNodes;
  let loaded = false;
  for (let ix = 0; ix < nodes.length; ix++) {
    let node = nodes.item(ix);
    if (node.href && node.href.indexOf('jquery.min.js') > -1) {
      loaded = true;
    }
  }
  return loaded;
}

// remove any bootstrap links
function removeCurrentTheme() {
  const head = document.getElementsByTagName('head')[0];
  const nodes = head.childNodes;
  const list =[]
  for (let ix = 0; ix < nodes.length; ix++) {
    let node = nodes.item(ix);
    if (node.href && node.href.indexOf('bootstrap') > -1) {
      list.push(node)
    }
  }
  list.forEach((node) => { head.removeChild(node) });
}

//------------------------------------------------------------------------------
// Top level ThemeSwitcher Component
//------------------------------------------------------------------------------
class ThemeSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.load = this.load.bind(this);
    this.loadDefault = this.loadDefault.bind(this);

    this.themePath = props.themePath || '/themes/';
    if (this.themePath.charAt(this.themePath.length - 1) !== '/') {
      this.themePath = this.themePath + '/';
    }
    this.state = {loaded: false, currentTheme: null};
  }

  componentDidMount() {
    // load bootstrap javascript just at first mount
    if (!isJsLoaded()) {
      Lazyloader.load(this.themePath + 'js/jquery.min.js', function () {
        Lazyloader.load(this.themePath + 'js/bootstrap.min.js', function () {
          this.load(); // load default theme
        }.bind(this));
      }.bind(this));
    }
  }

  loadDefault() {
    Lazyloader.load(this.themePath + 'default/bootstrap.min.css', function () {
      Lazyloader.load(this.themePath + 'default/bootstrap-theme.min.css', function () {
        setItem(this.props.storeThemeKey, 'default');
        this.setState({loaded: true, currentTheme: 'default'});
      }.bind(this));
    }.bind(this));
  }

  load(theme) {
    this.setState({loaded: false})
    removeCurrentTheme();

    let name = theme;
    if (!name) {
      // see if a theme was previously stored, will return null if storedThemeKey not set
      name = getItem(this.props.storeThemeKey);
    }
    if (!name) {
      name = this.props.defaultTheme;
    }
    if (name === 'default') {
      return this.loadDefault();
    }

    Lazyloader.load(this.themePath + name + '/bootstrap.min.css', function () {
      setItem(this.props.storeThemeKey, name);
      this.setState({loaded: true, currentTheme: name})
    }.bind(this));
  }

  // pass reference to this down to ThemeChooser component
  getChildContext() {
    return {
      themeSwitcher: this,
      themes: this.props.themes,
      currentTheme: this.state.currentTheme
    };
  }

  render() {
    if (!this.state.loaded) return null;
    return this.props.children || <span/>
  }
}

ThemeSwitcher.childContextTypes = {
  themeSwitcher: PropTypes.object,
  themes: PropTypes.array,
  currentTheme: PropTypes.string
};

ThemeSwitcher.propTypes = {
  themePath: PropTypes.string,
  defaultTheme: PropTypes.string,
  storeThemeKey: PropTypes.string,
  themes: PropTypes.array
};

ThemeSwitcher.defaultProps = {
  themePath: '/themes',
  defaultTheme: 'default',
  storeThemeKey: null,
  themes: ['default', 'yeti', 'superhero', 'paper', 'lumen', 'darkly',
           'simplex', 'cerulean', 'sandstone', 'cosmo', 'cyborg', 'slate',
           'flatly', 'journal', 'readable', 'spacelab', 'united']
};

export { ThemeSwitcher };
