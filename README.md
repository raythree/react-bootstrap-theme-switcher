#react-bootstrap-theme-switcher

A React component for dynamically switching between Bootstrap and [Bootswatch](https://bootswatch.com/) themes. Two lines of code and copy themes to your Web server.

<img src="http://demo.ray3.io/theme-switcher/theme-switcher.png" />

[A live demo is here](http://demo.ray3.io/theme-switcher)

[Code for demo here](https://github.com/raythree/theme-switcher-demo)

**NOTE:** [LazyLoader](https://github.com/LukasBombach/Lazyloader) is used to dynamically load stylesheets and re-render after they have been loaded. The theme switcher requires Bootstrap themes and JQuery. Do not load these files either via Webpack or via links in your index.html. Configure the file structure described below (or use the versions included) and the ```ThemeSwitcher``` will automatically load them as needed.

### Install
```
npm install react-bootstrap-theme-switcher
```
### Setup
The theme switcher works by dynamically modifying the document's stylesheet link elements to switch between the default Bootstrap theme or one of the selected Bootswatch themes. There are two components:

 * A ```ThemeSwitcher``` component that wraps your top-level component. This is responsible for theme loading and hiding your app during the load.
 * A ```ThemeChooser``` component that displays a dropdown button select menu allowing the user to choose a theme.

The ThemeSwitcher will make sure your app is not displayed until the selected theme is loaded, and will also hide it whenever the ThemeChooser selects a new theme. Here is an example of an app that uses the Redux Provider and React Router rendered in index.js:

```javascript
import { ThemeSwitcher } from 'react-bootstrap-theme-switcher';
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
      <ThemeSwitcher themePath="/themes" defaultTheme="yeti">
        <Router history={history} routes={routes} />
      </ThemeSwitcher>
    </Provider>, document.getElementById('app')
);
```
**NOTE:** You can wrap any top level component with the ```ThemeSwitcher``` *except* for ```Provider``` (Router or any other component is fine). ```Provider``` is special, and you'll get a blank screen if you place it inside the ```ThemeSwitcher```.

To let users swich themes add the ```ThemeChooser``` to one of your pages (e.g. a Settings page). The ```ThemeChooser``` gets passed a reference to the ```ThemeSwitcher``` via the ```React Context``` mechanism, so it can trigger a re-render and not display the children components during theme unloading and reloading.

###ThemeSwitcher props
* ```themePath``` - location of theme files on server (default '/themes')
* ```defaultTheme``` - default theme to use if user has not selected one (default ```'default'```, the Bootstrap theme)
* ```storeThemeKey``` - name of localStorage key used to save the last theme (default ```null```)
* ```themes``` - array of themes to display in the ```ThemeChooser``` (default is all Bootswatch themes)

### Theme files (and required Bootstrap and JQuery javascript)

For convenience the theme switcher comes bundled with the [Bootswatch](https://bootswatch.com/) themes, a copy of [Bootstrap 3.3.7](http://getbootstrap.com/), and [JQuery 3.1.0](https://jquery.com/) located in the themes folder. These files MUST be copied to your distribution folder of your Web server. The structure is:

```
themes
  /js
    jquery.min.js
    bootstrap.min.js
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

The theme switcher will add and remove themes by adding and deleting links to the document. For example, if you configure it to locate the themes in '/themes' it will generate links like:

```
<link rel="stylesheet" type="text/css" href="/themes/default/bootstrap.min.css"
<link rel="stylesheet" type="text/css" href="/themes/default/bootstrap-theme.min.css"
```

for the default bootstrap theme, or:

```
<link rel="stylesheet" type="text/css" href="/themes/<themeName>/bootstrap.min.css"
```

for any of the other themes.

Here is a sample Webpack config that uses the [CopyWebpackPlugin](https://github.com/kevlened/copy-webpack-plugin) to copy the theme files provided with the distribution into your bundle:

```javascript
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  ...
  plugins: [
    new CopyWebpackPlugin([
        {context: 'node_modules/react-bootstrap-theme-switcher/themes/', from: '**/*', to: 'themes/'}
      ],
      {copyUnmodified: true}
    ),
  ...  
```

You can use the versions provided by the theme switcher from ```node_modules/react-bootstrap-theme-switcher/themes``` or you generate your own files using different versions of JQuery or Bootstrap. However, the structure and file naming must exactly match what is provided in the distribution. Instructions on downloading/customizing Bootswatch themes can be [found here](https://github.com/thomaspark/bootswatch).

**NOTE:** If you put them in a directory other than ```/themes``` you can specify the ```themePath``` property of the ```ThemeSwitcher```.

**NOTE:** Do NOT load the default Bootstrap theme or JQuery as you might normally do with webpack, e.g. ```require('node_modules/.../bootstrap')```, because the ```ThemeSwitcher``` looks for specifically named stylesheet links when removing the current theme. Let the ThemeSwitcher load both Bootstrap and JQuery at startup.

### Auto reload last theme used

If you want the last theme used to be automatically loaded in the future you can provide the ThemeSwitcher with the name of a localStorage key to use to save the theme name:

```javascript
<ThemeSwitcher defaultTheme="yeti" themePath="/themes" storeThemeKey="theme" />
```
This way, if no theme is currently loaded 'yeti' will be used, but if the user selects another theme it's name will be saved in localStorage under the ```theme``` key and used in the future until it is changed again.

### Theme selection
By default the ```ThemeChooser``` displays all Bootswatch themes. However, if you only want to use a subset you can specify the theme names via the ```themes``` property of the ```ThemeSwitcher```, for example:

```javascript
let themes = ['default', 'cerulean', 'darkly'];

render(
    <Provider store={store}>
      <ThemeSwitcher defaultTheme='default' storeThemeKey="theme" themes={themes}>
        <Router history={history} routes={routes} />
      </ThemeSwitcher>
    </Provider>, document.getElementById('app')
);
```
Make sure that the themes provided include the ```defaultTheme```, if set, and use the lower case theme names. The ```ThemeChooser``` will capitalize them and show them in alphabetical order.
