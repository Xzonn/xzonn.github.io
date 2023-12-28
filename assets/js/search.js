"use strict";
/* global $ */

window.addEventListener("load", () => {
  let root = location.pathname.replace(/\/[^\/]+$/, "");
  $.getScript("https://cdn.jsdelivr.net/npm/algoliasearch@4.17.2/dist/algoliasearch-lite.umd.js", () => {
    $.getScript("https://cdn.jsdelivr.net/npm/instantsearch.js@4.56.2/dist/instantsearch.production.min.js", () => {
      let search = instantsearch({
        indexName: "xzonn_top",
        searchClient: algoliasearch("ZVIOW9GL6U", "335c8667308137ed2d846141b842d730"),
      });

      let hitTemplate = (hit) => {
        let url = hit.external_url || hit.url,
          anchor = hit.anchor || "",
          title = hit._highlightResult.title.value,
          heading = ((hit._highlightResult.headings || []).slice(-1)[0] || {}).value || "",
          tags = (hit._highlightResult.tags || []).map((x) => x.value),
          content = (hit._highlightResult.content || []).value;

        let defineList = $("<dl/>").addClass("xz-search-list-item"),
          _title = $("<dt/>")
            .addClass("xz-search-list-title")
            .append(
              $("<a/>")
                .attr({
                  "href": `${root}${url}${anchor ? "#" : ""}${anchor}`,
                })
                .html(title)
            )
            .appendTo(defineList),
          _heading = heading ? $("<span/>").addClass("xz-search-list-heading").html(heading).appendTo(_title) : null,
          _tags = tags.length
            ? $("<dd/>")
                .addClass("xz-search-list-tags")
                .append($("<ul/>").append(tags.map((x) => $("<li/>").html(`<a href="${root}/posts/#${x}">#${x}</a>`))))
                .appendTo(defineList)
            : null,
          _content = $("<dd/>").addClass("xz-search-list-content").html(content).appendTo(defineList);

        Han(defineList[0]).render();
        return defineList[0].outerHTML;
      };

      search.addWidget(
        instantsearch.widgets.searchBox({
          container: ".xz-search-searchbar",
          placeholder: "请输入关键词",
          cssClasses: {
            "form": "input-group",
            "input": "form-control",
            "submit": "btn btn-primary",
            "reset": "btn btn-primary",
          },
          searchAsYouType: false,
        })
      );
      search.addWidget(
        instantsearch.widgets.hits({
          container: ".xz-search-hits",
          templates: {
            item: hitTemplate,
            empty: "无结果",
          },
        })
      );
      search.addWidget(
        instantsearch.widgets.poweredBy({
          container: ".xz-search-poweredby",
        })
      );
      search.start();
    });
  });

  let submitTimeout;
  $(".xz-search-searchbar").on("keyup", (e) => {
    if (!$(e.target).is(".ais-SearchBox-input")) {
      return;
    }
    if (submitTimeout) {
      clearTimeout(submitTimeout);
    }
    submitTimeout = setTimeout(() => {
      $(".ais-SearchBox-submit").trigger("click");
      $(".ais-SearchBox-input")[0].focus();
    }, 500);
  }).on("keydown", (e) => {
    if (!$(e.target).is(".ais-SearchBox-input")) {
      return;
    }
    if (submitTimeout) {
      clearTimeout(submitTimeout);
    }
  });

  let observer = new MutationObserver(window.windowScroll);
  let observerConfig = { attributes: true, childList: true, subtree: true };
  observer.observe(document.querySelector(".xz-search-hits"), observerConfig);
});
