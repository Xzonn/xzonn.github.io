"use strict";
/* global $ */

window.addEventListener("load", () => {
  /* 手动生成各标签 */
  let tags_dict = {};
  let lines = $(".xz-postlist > tbody > tr")
    .toArray()
    .map((x) => x.dataset["tags"].split(" "));
  for (let line = 0; line < lines.length; line++) {
    for (let tag = 0; tag < lines[line].length; tag++) {
      let tag_name = lines[line][tag];
      tags_dict[tag_name] = (tags_dict[tag_name] || 0) + 1;
    }
  }
  let tags = Object.keys(tags_dict);
  tags.sort((a, b) => tags_dict[b] - tags_dict[a]);
  $(".xz-taglist")
    .empty()
    .append(
      $("<li />")
        .attr({
          id: "tag-",
          "data-sort": lines.length,
        })
        .html(`<a href="#">全部<span class="badge">${lines.length}</span></a>`)
    );
  for (let tag = 0; tag < tags.length; tag++) {
    let tag_name = tags[tag],
      tag_count = tags_dict[tag_name];
    if (!tag_name) continue;
    $("<li />")
      .attr({
        id: "tag-" + tag_name,
        "data-sort": tag_count,
      })
      .html(`<a href="#${tag_name}">${tag_name}<span class="badge">${tag_count}</span></a>`)
      .appendTo($(".xz-taglist"));
  }

  /* 标签页处理 */
  let handleHashChange = (e) => {
    if (e) e.preventDefault();
    let hash = decodeURIComponent(location.hash).slice(1);
    $(".xz-taglist > li").removeClass("active");
    $("#tag-" + hash).addClass("active");
    if (hash) {
      $(".xz-postlist > tbody > tr").each((n, row) => {
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
    windowResize();
  };

  $(".xz-taglist > li")
    .sort((a, b) => b.dataset.sort - a.dataset.sort)
    .detach()
    .appendTo($(".xz-taglist"));
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
  $(".xz-taglist").addClass("in");
  $(".xz-postlist").addClass("in");
});
