"use strict";
/* global $ */
const lang_default = "zh-cn";
const i18n = {
  "zh-cn": {
    "search-input-placeholder": "请输入关键词",
    "search-no-results": "无结果",
    "posts-link": "/posts/"
  },
  "en": {
    "search-input-placeholder": "Please enter keywords",
    "search-no-results": "No results",
    "posts-link": "/posts/en/"
  },
};

window.addEventListener("load", () => {
  const lang = document.body.lang || document.querySelector("html").lang || lang_default;
  const t = function (key, _lang = lang) {
    return (i18n[_lang] || i18n[lang_default])[key] || i18n[lang_default][key] || key;
  }

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
      content = (hit._highlightResult.content || []).value,
      hit_lang = hit.lang || lang_default,
      posts_link = t("posts-link", hit_lang);

    let defineList = $("<dl/>").addClass("xz-search-list-item"),
      _title = $("<dt/>")
        .addClass("xz-search-list-title")
        .append(
          $("<a/>")
            .attr({
              "href": `${url}${anchor ? "#" : ""}${anchor}`,
            })
            .html(title)
        )
        .appendTo(defineList),
      _heading = heading ? $("<span/>").addClass("xz-search-list-heading").html(heading).appendTo(_title) : null,
      _tags = tags.length
        ? $("<dd/>")
            .addClass("xz-search-list-tags")
            .append($("<ul/>").append(tags.map((x) => $("<li/>").html(`<a href="${posts_link}#${x.replace(/<\/?mark>/g, "")}">#${x}</a>`))))
            .appendTo(defineList)
        : null,
      _content = $("<dd/>").addClass("xz-search-list-content").html(content).appendTo(defineList);

    Han(defineList[0]).render();
    return defineList[0].outerHTML;
  };

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: ".xz-search-searchbar",
      placeholder: t("search-input-placeholder"),
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
        empty: t("search-no-results"),
      },
    })
  );
  search.addWidget(
    instantsearch.widgets.pagination({
      container: ".xz-search-pagination",
      cssClasses: {
        root: "d-flex justify-content-center",
        list: "pagination",
        item: "page-item",
        link: "page-link",
        previousPageItem: "d-none",
        nextPageItem: "d-none",
        selectedItem: "active",
        disabledItem: "disabled",
      },
    })
  );
  search.addWidget(
    instantsearch.widgets.configure({
      hitsPerPage: 10,
      filters: `lang:${lang}`,
    })
  );
  search.addWidget(
    instantsearch.widgets.poweredBy({
      container: ".xz-search-poweredby",
    })
  );
  search.start();

  let submitTimeout;
  $(".xz-search-searchbar")
    .on("keyup", (e) => {
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
    })
    .on("keydown", (e) => {
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
