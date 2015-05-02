
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
      var options = localStorage.getItem('markbooq');
      if (options) {
        options = JSON.parse(options)
      }
      cb && cb(options);
    },
    set: function(options, cb) {
      localStorage.setItem('markbooq', JSON.stringify(options));
      cb && cb();
    }
  },

  default_options: {
    // one key for every option
  }
};
