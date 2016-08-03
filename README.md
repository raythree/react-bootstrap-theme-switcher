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
    (these two files are the default bootstrap files)
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

[A demo is here](http://bst.ray3.io)

[Code for demo here](https://github.com/raythree/reactjs-bootstrap-table-demo)
