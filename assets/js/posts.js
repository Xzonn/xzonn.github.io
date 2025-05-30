"use strict";
/* global $, xzLocalStorage */

window.addEventListener("load", () => {
  const getURLParameters = (rawSearch = location.search) => {
    const search = new Map(
        rawSearch
          .slice(1)
          .split("&")
          .map((x) => x.split("=").map((y) => decodeURIComponent(y)))
          .filter((x) => x.length == 2)
      ),
      searchObject = {};
    search.forEach((val, key) => {
      searchObject[key] = val;
    });
    return searchObject;
  };

  const renderPagination = (pageNumber, maxPageNumber, clickEvent) => {
    const paginationList = $("<ul/>").addClass("pagination"),
      addPage = (page, text, addClass) => {
        $("<a/>")
          .addClass("page-link")
          .text(text || page)
          .attr("href", "#")
          .data("page", addClass ? NaN : page)
          .appendTo($("<li/>").addClass("page-item").addClass(addClass).appendTo(paginationList));
      };
    addPage(pageNumber - 1, "\xab", pageNumber == 1 ? "disabled" : "");
    pageNumber > 3 && addPage(1);
    pageNumber > 4 && addPage(1, "\u2026", "disabled");
    for (let i = Math.max(1, pageNumber - 2); i <= Math.min(maxPageNumber, pageNumber + 2); i++) {
      addPage(i, i, pageNumber == i ? "active" : "");
    }
    pageNumber < maxPageNumber - 3 && addPage(1, "\u2026", "disabled");
    pageNumber < maxPageNumber - 2 && addPage(maxPageNumber);
    addPage(pageNumber + 1, "\xbb", pageNumber == maxPageNumber ? "disabled" : "");
    paginationList.find("a").on("click", clickEvent);
    return paginationList;
  };

  const refresh = (page) => {
    $.get({
      url: "/pages.json?d=" + +new Date(),
      timeout: 5000,
    }).done((data) => {
      localStorage.setItem(
        "xz-post-list",
        JSON.stringify({
          update: +new Date(),
          list: data,
        })
      );
      renderPages(data, page);
    });
  };

  const renderPages = (data, page) => {
    const pageCount = xzLocalStorage.get("page-count", 10),
      pageNumber = +(page || getURLParameters().page || 1),
      isWeChat = /MicroMessenger/.test(navigator.userAgent),
      maxPageNumber = Math.ceil(data.length / pageCount),
      sortBy = $(`input[name="post-block-radio"]:checked`).val();
    data.sort((a, b) => {
      if (sortBy == "update") {
        if (a["update"] < b["update"]) {
          return 1;
        } else if (a["update"] > b["update"]) {
          return -1;
        } else if (a["date"] < b["date"]) {
          return 1;
        } else if (a["date"] > b["date"]) {
          return -1;
        }
      } else if (sortBy == "create") {
        if (a["date"] < b["date"]) {
          return 1;
        } else if (a["date"] > b["date"]) {
          return -1;
        } else if (a["update"] < b["update"]) {
          return 1;
        } else if (a["update"] > b["update"]) {
          return -1;
        }
      }
      return 0;
    });
    if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
    if (pageNumber > maxPageNumber) pageNumber = maxPageNumber;
    $(".post-block-list").empty();
    for (let i = (pageNumber - 1) * pageCount; i < Math.min(pageNumber * pageCount, data.length); i++) {
      const post = data[i],
        post_link = isWeChat && post.wechat_link ? post.wechat_link : post.link,
        title = $("<h3/>")
          .addClass("post-title")
          .append(
            $("<a/>").text(post.title).attr({
              href: post_link,
              title: post.title,
            })
          ),
        date = $("<ul/>")
          .addClass("post-time")
          .append([
            $("<li/>").addClass("post-create").text(post.date),
            $("<li/>").addClass("post-update").text(post.update),
          ]),
        tag = post.tags.length
          ? $("<ul/>")
              .addClass("post-tags")
              .append(
                post.tags.map((x) =>
                  $("<li/>")
                    .addClass("post-tag")
                    .append(
                      $("<a/>")
                        .text(x)
                        .attr("href", "/posts/#" + encodeURIComponent(x))
                    )
                )
              )
          : null,
        image = post.head_image
          ? $("<a/>")
              .addClass("post-image-link")
              .attr({
                href: post_link,
                title: post.title,
              })
              .append($("<img/>").addClass("post-image").attr("src", post.head_image))
          : null,
        info = $("<p/>").addClass("post-summary").html(post.info);
      $("<div/>")
        .addClass(["post-block", post.head_image ? "post-block-with-image" : null])
        .append([
          $("<div/>").addClass("post-block-header").append([title, date, tag]),
          post.head_image ? $("<div/>").addClass("post-block-image").append([image]) : null,
          $("<div/>").addClass("post-block-summary").append([info]),
        ])
        .appendTo($(".post-block-list"));
    }
    $(".page-list-title").text("页面列表 - 第" + pageNumber + "页");
    $(".post-total").text(data.length);
    $(".page-total").text(maxPageNumber);
    $(".xz-pagination-input").val(pageNumber);
    const paginationList = renderPagination(pageNumber, maxPageNumber, (e) => {
      e.preventDefault();
      const pageNumber = +$(e.target).data("page");
      if (!isNaN(pageNumber)) {
        window.changePage(pageNumber);
      }
    });
    paginationList.appendTo($(".xz-pagination-list").empty());
    Han($(".xz-content")[0]).render();
    if (page) {
      history.pushState(
        {
          url: location.href,
        },
        "page" + pageNumber,
        pageNumber == 1 ? "/" : "?page=" + pageNumber
      );
      window.scrollTo({
        top: $(".page-block-heading").offset().top,
        left: $(".page-block-heading").offset().left,
        behavior: "smooth",
      });
    }
  };

  window.changePage = (page = 0) => {
    let hashedPostList = JSON.parse(localStorage.getItem("xz-post-list"));
    if (!hashedPostList || new Date() - hashedPostList["update"] > 30 * 60 * 1000) {
      refresh(page);
    } else {
      renderPages(hashedPostList["list"], page);
    }
  };

  const postBlockRadio = xzLocalStorage.get("post-block-radio", "update");
  $(`input[name="post-block-radio"]`).each((i, x) => {
    x.checked = x.value == postBlockRadio;
  }).on("change", (e) => {
    xzLocalStorage.set("post-block-radio", e.target.value);
    window.changePage();
  });
  $(".xz-pagination-form").on("submit", (e) => {
    e.preventDefault();
    let pageNumber = +$(".xz-pagination-input").val();
    if (!isNaN(pageNumber)) {
      window.changePage(pageNumber);
    }
  });
  window.changePage();

  $(".page-list-refresh").on("click", (e) => {
    e.preventDefault();
    refresh();
  });
});
