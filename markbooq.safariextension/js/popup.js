$(document).ready(function() {

  $.getJSON("http://markbooq.ru/apibrowser/gate.php", {action: "IsAuthorized"},
    function(data) {
      if (data.responseAuth == "no") {
        $(".loadajax").hide();
        $(".noauth").show();
      }
      if (data.responseAuth == "yes") {
        $(".loadajax").hide();
        $(".yesauth").show();

        $.getJSON("http://markbooq.ru/apibrowser/gate.php",
          { action: "listSection" }, function(data) {

            var data2 = data.list;
            for (var i in data2) {
              if (data2[i].COLOR == "") {
                data2[i].COLOR = "#66ab6c";
              }
              $(".list-section ul").append(
                $('<li>')
                  .attr("class", "secblock")
                  .attr("data-sid", data2[i].ID)
                  .attr("data-ussec", data2[i].USER)
                  .css("backgroundImage", "url('http://markbooq.ru" + data2[i].ICONPATH + "')")
                  .css("backgroundColor", data2[i].COLOR).text(data2[i].NAME)
              );
            }
          });

      }
    });

  $(".noauth b").click(function() {
    chrome.tabs.create({url: "http://markbooq.ru/", active: true});
  });

  $(document).on("click", ".secblock", function() {
    $(".loadajax").show();
    $(".yesauth").hide();
    $(".sectionr-title").text($(this).text());

    $.getJSON("http://markbooq.ru/apibrowser/gate.php", {
      action: "getSecBookmarks",
      sid: $(this).attr("data-sid"),
      ussec: $(this).attr("data-ussec")
    }, function(data) {
      $(".loadajax").hide();
      $(".sectionr").show();

      var data2 = data.rows;
      if (data2) {

        $(".sectionr-value").append('<ul>');

        for (var i in data2) {
          if (data2[i].COLOR == "") data2[i].COLOR = "66ab6c";
          if (data2[i].COLOR == null) data2[i].COLOR = "66ab6c";
          $(".sectionr-value ul").append($('<li>').attr("class",
            "booksblock").attr("data-id", data2[i].ID).attr("data-url",
            data2[i].URL).css("backgroundColor",
            "#" + data2[i].COLOR).text(data2[i].NAME));
        }

      } else {
        $('.sectionr-value').html("<br>Нету ссылок<br><br>");
      }
    });

  });

  $(document).on("click", ".booksblock", function() {
    chrome.tabs.create({url: $(this).attr("data-url")});
  });

  $(document).on("click", ".addbookmarks", function() {
    $(".loadajax").show();
    $(".yesauth").hide();
    $(".sectionr").hide();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      var current = tabs[0];

      $.getJSON("http://markbooq.ru/apibrowser/gate.php",
        {action: "listSection"}, function(data3) {
          $(".loadajax").hide();
          $(".addbookmarksb").show();

          var data = data3.list;

          if (data3.idLastSect === null && data3.idUserSect === null) {
            $("#sectbook").append('<option value="-1" data-ussec="2">Мой раздел</option>');
          }
          $("#namebook").val(current.title);
          $("#urlbook").val(current.url);

          for (var i in data) { //.css("backgroundColor", data[i].COLOR)

            $("#sectbook").append($('<option>').attr("value",
              data[i].ID).attr("data-ussec", data[i].USER).text(data[i].NAME));
            if (data3.idLastSect !== null && data3.idLastSect == data[i].ID &&
              data3.idUserSect !== null && data3.idUserSect ==
              data[i].USER) $("#sectbook option:last-child").attr("selected",
              "selected");
          }

        });
    });
  });

  $(document).on("click", ".sectionr-back", function() {
    $(".yesauth").show();
    $(".sectionr-value").empty();
    $(".sectionr").hide();
  });
  $(document).on("click", ".cancelbt", function() {
    $(".yesauth").show();
    $(".addbookmarksb").hide();
  });

  $(document).on("click", ".list-section-title span", function() {
    if ($(".list-section").css("display") ==
      "none") $(this).text("Закрыть мои закладки"); else $(this).text("Открыть мои закладки");
    $(".list-section").toggle("slow");

  });

  $(document).on("click", ".logoi", function() {

    chrome.tabs.create({url: "http://markbooq.ru/", active: true});
  });

  $(document).on("click", ".savelbt", function() {
    $(".addbookmarksb").hide();
    $(".loadajax").show();
    $.getJSON("http://markbooq.ru/apibrowser/gate.php", {
      action: "addBookmarks",
      urlname: $("#namebook").val(),
      url: $("#urlbook").val(),
      cid: $("#sectbook option:selected").val(),
      usersec: $("#sectbook option:selected").attr("data-ussec")
    }, function(data) {

      $(".loadajax").hide();

      if (data.add == "yes") {
        $(".resultadd").show();
        $(".resultadd").html("<br><br>Закладка добавлена<br><br>");
        setTimeout(function() { window.close(); }, 2000);

      } else {
        $(".resultadd").show();
        $(".resultadd").html("<br><br>Ошибка при добавление<br><br>");
      }
    });

  });

});