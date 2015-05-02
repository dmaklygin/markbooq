
var BrowserAPI = {
  openTab: function(data) {
    var tab = safari.application.activeBrowserWindow.openTab();
    tab.url = data.url;
    tab.activate();
  },

  getActiveTab: function() {
    return safari.application.activeBrowserWindow.activeTab;
  },

  storage: {
    get: function(cb) {
      try {
        var options = localStorage.getItem('markbooq');
      } catch (e) {
        alert('error!');
      }
      //var options = localStorage.markbooq;//localStorage.getItem('markbooq');
      try {
        options && (options = eval('(' + options + ')'));
      } catch (e) {
        alert('JSON error');
      }
      cb && cb(options);
    },
    set: function(options, cb) {
      localStorage.markbooq = JSON.stringify(options);
      cb && cb();
    }
  },

  default_options: {
    // one key for every option
  }
};
