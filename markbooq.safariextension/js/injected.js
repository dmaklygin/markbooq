var
  hostname = location.hostname,
  activeTab = safari.self.tab;

if (activeTab && hostname == 'markbooq.ru') {
  setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET',
      'http://markbooq.ru/apibrowser/gate.php?action=IsAuthorized', false);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          activeTab.dispatchMessage('isAuth', eval('(' + xhr.responseText + ')'));
        }
      }
    };
    xhr.send(null);

  }, 1000);
}

