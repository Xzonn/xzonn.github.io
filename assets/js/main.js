"use strict";
/* global $ */

window.addEventListener("load", () => {
  /* 目录监听 */
  (() => {
    let toc = $(".xz-sidenav-list");
    let links = Array.from(toc.find("a.nav-link"));
    let targets = links.map((link) => $(link.attributes.href.value)[0]);
    targets.forEach((target, target_index) => {
      let observer = new IntersectionObserver(
        () => {
          toc.find("a.nav-link.active").removeClass("active");
          for (let i = target_index; i > -1; i--) {
            let target = targets[i];
            if ($(target).offset().top - screen.availHeight / 4 <= window.scrollY) {
              let parents = $(links[i]).parentsUntil(".xz-sidenav-list");
              parents.children().filter("a.nav-link").addClass("active");
              return;
            }
          }
        },
        {
          threshold: [0, 0.5, 0.95, 1.0],
        }
      );
      observer.observe(target);
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
    $("span.footnote").each((index, footnote) => {
      let footnote_icon = $("<a/>")
        .addClass("footnote-icon")
        .text(index + 1)
        .attr({
          href: "",
        })
        .on("click", (e) => e.preventDefault());
      $(footnote).addClass("d-none d-print-inline").after(footnote_icon);
      new bootstrap.Popover(footnote_icon, {
        content: footnote.innerHTML,
        html: true,
        placement: "bottom",
        toggle: "popover",
        trigger: "focus",
      });
    });
  })();

  /* 返回页面顶端 */
  (() => {
    $(".xz-navtop").on("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    $(".xz-navbottom").on("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: $(document.body).height(),
        behavior: "smooth",
      });
    });
  })();

  /* scroll */
  (() => {
    let scroll_timer;
    window.windowScroll = () => {
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
      scroll_timer = setTimeout(() => {
        $(".xz-footer-navtop").fadeOut(500);
      }, 2000);
    };
    $(".xz-footer-navtop").on({
      mouseenter: () => {
        clearTimeout(scroll_timer);
        $(".xz-footer-navtop").stop().fadeIn(200);
      },
      mouseleave: () => {
        scroll_timer = setTimeout(() => {
          $(".xz-footer-navtop").fadeOut(500);
        }, 2000);
      },
    });
    windowScroll();
    $(window).on("scroll", windowScroll);
  })();

  /* 图片预览 */
  (() => {
    let modal = new bootstrap.Modal($(".xz-modal"));
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
            allow: "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
          })
          .appendTo($(".xz-modal-content").empty());
      }
      modal.show();
    });
    $(".xz-modal").on("hidden.bs.modal", () => {
      $(".xz-modal-content").empty();
    });
  })();

  /* 复制源代码 */
  (() => {
    const copyToClipboard = (text) =>
      new Promise(function (resolve, reject) {
        navigator.clipboard.writeText(text).then(resolve).catch(reject);
      });

    $(".button-copy").on("click", (e) => {
      e.preventDefault();
      const divBlock = $(e.target).closest("div.highlight");

      copyToClipboard(divBlock.find("pre")[0].innerText)
        .then(function () {
          const spanBlock = divBlock.find("span.button-copy-text");
          const originalText = spanBlock.text();
          divBlock.addClass("copy-success");
          spanBlock.text("已复制！");
          setTimeout(() => {
            divBlock.removeClass("copy-success");
            spanBlock.text(originalText);
          }, 2000);
        })
        .catch(function (err) {
          console.error(`复制失败：${err}`);
        });
    });
  })();

  /* Han.js */
  (() => {
    if (!window.MathJax) {
      Han(document.body).render();
      window.mathjaxRendered = true;
    }
  })();
});
