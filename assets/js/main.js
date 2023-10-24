"use strict";
/* global $ */

window.addEventListener("load", () => {
  window.pageInfo = window.pageInfo || {};
  /* 目录 */
  (() => {
    $(".xz-sidenav").on("click", (e) => {
      let target = e.target;
      if (target.tagName.toLowerCase() == "a") {
        e.preventDefault();
        e.stopPropagation();
        let hash = "#" + decodeURIComponent(target.href.split("#")[1]);
        history.pushState(
          {
            url: location.href,
          },
          hash,
          location.href.split("#")[0] + hash
        );
        $("html").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          300
        );
      }
    });
    $("body").scrollspy({
      target: ".xz-sidenav",
    });
  })();

  /* 代码高亮 */
  (() => {
    $(".xz-content pre code").each((n, code) => {
      let inner = $(code).html().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\n/g, "</li><li>");
      while (inner.search(/(<span class="[^"]+">)([^<>]+)(<\/li><li>)/) > -1) {
        inner = inner.replace(/(<span class="[^"]+">)([^<>]+)(<\/li><li>)/, "$1$2</span>$3$1");
      }
      $(code)
        .html(`<ul><li>${inner}</li></ul>`)
        .find("li:last-child")
        .each(() => {
          if (!code.innerHTML) {
            $(code).remove();
          }
        });
    });
  })();

  /* 表注 */
  (() => {
    $("table").each((i, table) => {
      let caption = $(table).find("caption");
      if (caption.length) {
        caption
          .addClass("caption-table")
          .attr("id", table.dataset["id"] || `table-${i + 1}`)
          .prependTo(table);
      }
    });
  })();

  /* 表格 */
  (() => {
    $(".xz-content-main article > table:not(.no-table)").each((i, table) => {
      $(table).addClass("table");
      if (!$(table).parentsUntil(".xz-content-main article").find("div.table-responsive").length) {
        $(table).wrap($("<div/>").addClass("table-responsive"));
      }
    });
  })();

  /* 交叉引用显示 */
  (() => {
    /* 图注 */
    let figure_caption_id = {};
    $(".caption-figure").each((n, caption) => {
      if (caption.id) {
        figure_caption_id[caption.id] = n + 1;
      }
    });
    $("a.xref-figure").each((n, link) => {
      let hash = link.href.split("#").slice(-1)[0];
      if (figure_caption_id[hash]) {
        $(link).text(`图{figure_caption_id[hash]}`);
      }
    });

    /* 表注 */
    let table_caption_id = {};
    $(".caption-table").each((n, caption) => {
      if (caption.id) {
        table_caption_id[caption.id] = n + 1;
      }
    });
    $("a.xref-table").each((n, link) => {
      let hash = link.href.split("#").slice(-1)[0];
      if (table_caption_id[hash]) {
        $(link).text(`表{table_caption_id[hash]}`);
      }
    });

    /* 参考文献 */
    let endnote_id = {};
    $(".list-endnote li").each((n, item) => {
      if (item.id) {
        endnote_id[item.id] = n + 1;
      }
    });
    $(".ref-endnote > a").each((n, link) => {
      let hash = link.href.split("#").slice(-1)[0];
      if (endnote_id[hash]) {
        $(link).text(endnote_id[hash]);
      }
    });
  })();

  /* 注释 */
  (() => {
    $("span.footnote").each((count, footnote) => {
      $(footnote)
        .addClass("visible-print-inline")
        .after(
          $("<a/>")
            .addClass("footnote-icon")
            .text(count + 1)
            .attr({
              href: "",
            })
            .on("click", (e) => e.preventDefault())
            .popover({
              content: footnote.innerHTML,
              html: true,
              placement: "bottom",
              toggle: "popover",
              trigger: "focus",
            })
        );
    });
  })();

  /* 返回页面顶端 */
  (() => {
    $(".xz-navtop").on("click", (e) => {
      e.preventDefault();
      $("html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });
    $(".xz-navbottom").on("click", (e) => {
      e.preventDefault();
      $("html").animate(
        {
          scrollTop: $(document.body).height(),
        },
        500
      );
    });
  })();

  /* resize */
  (() => {
    window.windowResize = () => {
      $(".xz-footer").css("position", "initial");
      if ($("body").height() == $(window).height()) {
        $(".xz-footer").css("position", "absolute");
      }
      $(".xz-sidenav-list").affix({
        offset: {
          top: $(".xz-content-main").offset().top,
          bottom: $(".xz-footer").outerHeight(),
        },
      });
    };
    windowResize();
    $(window).on("resize", windowResize);
  })();

  /* scroll */
  (() => {
    let scroll_timer;
    window.windowScroll = function () {
      $(".xz-footer-navtop")
        .css({
          bottom: Math.max(
            $(window).scrollTop() +
              $(window).innerHeight() -
              ($(".xz-content-main").offset().top + $(".xz-content-main").outerHeight()),
            25
          ),
        })
        .fadeIn(200);
      clearTimeout(scroll_timer);
      scroll_timer = setTimeout(function () {
        $(".xz-footer-navtop").fadeOut(500);
      }, 2000);
    };
    $(".xz-footer-navtop").on({
      mouseenter: function () {
        clearTimeout(scroll_timer);
      },
      mouseleave: function () {
        scroll_timer = setTimeout(function () {
          $(".xz-footer-navtop").fadeOut(500);
        }, 2000);
      },
    });
    windowScroll();
    $(window).on("scroll", windowScroll);
  })();

  /* 图片预览 */
  (() => {
    $(".figure-link, .video-link").on("click", (e) => {
      e.preventDefault();
      let link = $(e.target).attr("href") || "";
      if (link.match(/\.mp4$/)) {
        $(`<video/>`)
          .addClass("xz-modal-video")
          .attr({
            src: link,
            controls: "controls",
            autoplay: "autoplay",
          })
          .appendTo($(".xz-modal-content").empty());
      } else if (link.match(/\.(?:bmp|jpe?g|gif|png|webp)$/)) {
        $(`<img/>`).addClass("xz-modal-image").attr("src", link).appendTo($(".xz-modal-content").empty());
      } else if (link.match(/youtube\.com\/watch/)) {
        let video_id = link.match(/(?<=\/watch\?v=)[^\?&]+/)[0];
        let video_args = (link.match(/(?<=[\?&]).+$/) || "")[0];
        console.log(video_id, video_args);
        $(`<iframe/>`)
          .addClass("xz-modal-youtube")
          .attr({
            src: `https://youtube.com/embed/${video_id}?autoplay=1&controls=1&${video_args}`,
            allowfullscreen: "allowfullscreen",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          })
          .appendTo($(".xz-modal-content").empty());
      }
      $(".xz-modal").modal("show");
    });
    $(".xz-modal").on("hide.bs.modal", () => $(".xz-modal-content").empty());
  })();

  /* Han.js */
  (() => {
    if (!window.MathJax) {
      Han(document.body).render();
      window.mathjaxRendered = true;
    }
  })();
});
