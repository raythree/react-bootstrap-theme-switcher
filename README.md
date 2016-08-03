# react-bootstrap-theme-switcher

A React component for dynamically switching between Bootstrap (Bootswatch) themes.

### Install
```
npm install react-bootstrap-theme-switcher
```
### Setup
The theme switcher works by dynamically modifying the main document's stylesheet link elements between the default Bootstrap theme or one of the selected Bootswatch themes. There are two components:

 * A themeService used by your App to load themes
 * A ThemeChooser component that displays a select menu allowing the user to choose a theme.

For convenience the theme switcher comes bundled with the Bootswatch themes and a copy of Bootstrap 3.3.x located in the themes folder. These files MUST be copied to your distribution folder of your Web server, for example if using Webpack you can use the Copy Webpack Plugin to copy the files. You can use the versions provided by the theme switcher from 'node_modules/react-bootstrap-theme-switcher/themes' or you generate your own and pass the root directory to the theme switcher. The structure of this this folder must be setup exactly as provided in the distribution:

```
themes
  /fonts
    ...bootstrap Glyphicon fonts
  /default
    (these two files are the default bootstrap theme)
    bootstrap.min.css
    bootstrap-theme.min.css
  /yeti
    bootstrap.min.css (yeti theme)
  /cerulean
    bootstrap.min.css (cerulean theme)
  other themes    
```

The theme switcher will add and remove themes by adding links to the document. For example, if you configure it to locate the themes in '/themes' it will generate links like:

```
<link rel="stylesheet" type="text/css" href="/themes/default/bootstrap.min.css"
<link rel="stylesheet" type="text/css" href="/themes/default/bootstrap-theme.min.css"
```

for the default bootstrap theme, or:

```
<link rel="stylesheet" type="text/css" href="/themes/<themeName>/bootstrap.min.css"
```

for any of the other themes.

When a theme is chosen and loaded, the themeService will save a cookie (named theme by default) so that the theme will be automatically loaded in the future.

### Using the themeService

The themeService provides a ```load``` method to load either a specified or default theme (or the last theme saved in a cookie)
Your App should import the themeService and configure it as follows:

```javascript
import { themeService, ThemeChooser } from 'react-bootstrap-theme-switcher';


class App extends React.Component {

  constructor(props) {
    super(props);
    // these are all the defaults, you only need to call configure if using other values
    themeService.configure({
      themeDir: '/themes'
      defaultTheme: 'default'
      themeCookie: 'theme'
    });
    this.state={themeLoaded: false}; // don't render until theme loaded
    this.onThemeLoading = this.onLoading.bind(this);
    this.onThemeLoaded = this.onLoaded.bind(this);

    themeService.onLoading(this.onThemeLoading);
    themeService.onLoaded(this.onThemeLoaded);
  }  

  componentDidMount() {
    themeService.load(); // load default or last theme
  }

  onThemeLoading() {
    this.setState({themeLoaded: false});
  }

  onThemeLoaded() {
    this.setState({themeLoaded: true});
  }

  render() {
    if (!this.state.themeLoaded) return null;

    let app =
      <App ...>
        <div>
          <ThemeChooser themeService={themeService} />
          ....
        </div>  
      </App>    

    return app
  }
```
The ThemeChooser component is passed the instance of the themeService and will automatically call it's ```load``` method when a theme is selected. In order to avoid displaying unstyled content your App should respond to the onLoaded and onLoading callbacks by setting it's state accordingly.

[A demo is here](http://bst.ray3.io)

[Code for demo here](https://github.com/raythree/reactjs-bootstrap-table-demo)
