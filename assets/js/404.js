"use strict";
/* global $ */

(() => {
  let url = location.pathname;
  if (/-To-/.test(url)) {
    url = url.replace(/-To-/, "-to-");
  } else if (/\/posts\//.test(url)) {
    url = url.replace(/\/posts\//, "/study/");
  } else if (/\/ParanormasightChsLocalization\//.test(url)) {
    url = "//7.xzonn.top" + url;
  } else {
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
