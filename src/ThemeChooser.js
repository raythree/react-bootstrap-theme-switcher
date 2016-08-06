import React from 'react';

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

class ThemeChooser extends React.Component {
  constructor(props, context) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.doCallback = this.doCallback.bind(this);

    // get themes from context and sort them for display
    this.themes = [];
    context.themes.forEach(theme => {
      this.themes.push(theme);
    });
    this.themes.sort();
  }

  doCallback() {
  }

  onSelect(e) {
    e.preventDefault();
    let chosenTheme = e.target.getAttribute('data-theme');
    this.context.themeSwitcher.load(chosenTheme);
  }

  render() {
    let style = this.props.style || {};
    const menu =
      <div className="dropdown dropdown-menu-right" style={style}>
        <button className="btn btn-default dropdown-toggle" type="button" id="theme-menu"
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          Select Theme
          &nbsp;<span className="caret"></span>
      </button>
        <ul className="dropdown-menu">
          {this.themes.map((theme) => {
            var active = (theme === this.context.currentTheme ? 'active' : '');
            return <li key={theme} className={active}>
              <a href="#" data-theme={theme} onClick={this.onSelect}>{capitalize(theme)}</a>
            </li>
          })}
        </ul>
      </div>

    return menu;
  }
}

ThemeChooser.contextTypes = {
  themeSwitcher: React.PropTypes.object,
  themes: React.PropTypes.array,
  currentTheme: React.PropTypes.string
};

export { ThemeChooser };
