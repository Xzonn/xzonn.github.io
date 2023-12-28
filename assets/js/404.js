"use strict";
/* global $ */

(() => {
  let url = location.pathname.replace(/\/posts\//, "/study/").replace(/-To-/g, "-to-");
  if (url == location.pathname) {
    return;
  }
  $.ajax({
    type: "HEAD",
    url: url,
  }).done((_, __, jqXHR) => {
    if (jqXHR.status == 200) {
      location.href = url;
    }
  });
})();
