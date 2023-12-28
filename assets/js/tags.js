"use strict";
/* global $ */

window.addEventListener("load", () => {
  /* 手动生成各标签 */
  let tags_dict = {};
  let lines = Array.from($(".xz-postlist > tbody > tr")).map((x) => x.dataset["tags"].split(" "));
  lines.forEach((line) => {
    line.forEach((tag) => {
      tags_dict[tag] = (tags_dict[tag] || 0) + 1;
    });
  });
  let tags = Object.keys(tags_dict);
  tags.sort((a, b) => tags_dict[b] - tags_dict[a]);
  $(".xz-taglist")
    .empty()
    .append(
      $("<li />")
        .addClass("nav-item")
        .attr({
          id: "tag-",
          "data-sort": lines.length,
        })
        .html(`<a class="nav-link" href="#">全部 <span class="badge">${lines.length}</span></a>`)
    );
  tags.forEach((tag) => {
    if (!tag) return;
    let tag_count = tags_dict[tag];
    $("<li />")
      .addClass("nav-item")
      .attr({
        id: `tag-${tag}`,
        "data-sort": tag_count,
      })
      .html(`<a class="nav-link" href="#${tag}">${tag} <span class="badge">${tag_count}</span></a>`)
      .appendTo($(".xz-taglist"));
  });

  /* 标签页处理 */
  let handleHashChange = (e) => {
    if (e) e.preventDefault();
    let hash = decodeURIComponent(location.hash).slice(1);
    $(".xz-taglist > li > a").removeClass("active");
    $(`#tag-${hash} > a`).addClass("active");
    if (hash) {
      $(".xz-postlist > tbody > tr").each((i, row) => {
        if (
          $(row)
            .find(".post-tag-simp")
            .toArray()
            .some((x) => x.innerText == hash)
        ) {
          $(row).show();
        } else {
          $(row).hide();
        }
      });
    } else {
      $(".xz-postlist > tbody > tr").show();
    }
    window.windowScroll();
  };

  $(".xz-taglist > li")
    .sort((a, b) => b.dataset.sort - a.dataset.sort)
    .detach()
    .appendTo($(".xz-taglist"));
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
  $(".xz-taglist").addClass("show");
  $(".xz-postlist").addClass("show");
});
