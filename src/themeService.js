import Lazyloader from './lazyloader';

const log = {
  debug: (msg) => {
    console.log('themeService: ' + msg);
  }
}

function ThemeService() {
  let onLoadedCallbacks = [];
  let onLoadingCallbacks = [];

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

  function loadTheme(name) {
    Lazyloader.load('/themes/yeti/bootstrap.min.css', function () {
      log.debug('theme loaded ' + name);
      onLoadedCallbacks.forEach(callback => { callback(); });
    }.bind(this));
  }

  this.on = (which, callback) => {
    if (!(callback && typeof callback === 'function')) return;
    if (which === 'loading') onLoadingCallbacks.push(callback);
    else if (which === 'loaded') onLoadedCallbacks.push(callback);
  }

  this.configure = (opts) => {
  };

  this.load = (theme) => {
    log.debug('starting load of ' + theme);
    onLoadingCallbacks.forEach(callback => { callback(); });
    removeCurrentTheme();
    loadTheme(theme);
  };
}

const themeService = new ThemeService();

export {themeService};
