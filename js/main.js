"use strict";

$(function () {
    window.pageInfo = window.pageInfo || {};
    /* 目录 */
    window.tocRender = (window.tocRender || function() {
        $(".mw-parser-output #toc").remove();
        let toc = $("<div/>"),
            lastRank = 1,
            tocID = [],
            headings = $(".xz-content").find("h2, h3, h4"),
            headingIds = 0;
        if (!headings) {
            return;
        }
        headings.each(function(n, t) {
            if (this.classList.contains("visible-print-block") || this.classList.contains("no-toc")) {
                return;
            }
            if (!this.id) {
                this.id = "heading-" + (++headingIds);
            } else if (this.id.slice(0, 5) == "fake-") {
                $(this).find("span.xz-fake-bookmark").remove();
                this.id = this.id.slice(5);
            }
            var thisRank = +this.tagName[1];
            while (thisRank > lastRank) {
                tocID.push(0);
                if (toc.children().length == 0) {
                    toc = $("<li/>").addClass("no-list-style").appendTo($(toc));
                }
                toc = $("<ul/>").addClass("nav nav-stacked").appendTo($(toc.children()[toc.children().length - 1] || toc));
                thisRank--;
            }
            while (lastRank > thisRank) {
                tocID.pop();
                toc = toc.parent().parent();
                thisRank++;
            }
            tocID.push(tocID.pop() + 1);
            let headingContent = this.innerHTML;
            if ($(this).find(".mw-headline").length > 0) {
                headingContent = $(this).find(".mw-headline").html();
            }
            headingContent = headingContent.replace(/<a [^<>]+>(.*?)<\/a>/g, "$1");
            toc.append($("<li/>").append($("<a/>").attr({
                href: "#" + this.id
            }).html(headingContent)));
            lastRank = +this.tagName[1];
        });
        while (toc.parent()[0]) {
            toc = toc.parent();
        }
        while (toc.children().length == 1 && (!(toc.children()[0].tagName.toLowerCase() == "li") || toc.children()[0].classList.contains("no-list-style"))) {
            toc = toc.children();
        }
        toc.find(".no-list-style").each(function () {
            $(this).parent().replaceWith($(this).children());
        });
        toc.children().prependTo($(".xz-sidenav-list").empty()).bind("click", function(e) {
            let target = e.target;
            if (target.tagName.toLowerCase() == "a") {
                e.preventDefault();
                e.stopPropagation();
                let hash = "#" + decodeURIComponent(target.href.split("#")[1]);
                history.pushState({
                    "url": location.href
                }, hash, target.href);
                $("html").animate({
                    scrollTop: $(hash).offset().top
                }, 300);
            }
        });
        $("body").scrollspy("refresh");
    });
    $("body").scrollspy({
        "target": ".xz-sidenav"
    });
    window.tocRender();

    /* 代码高亮 */
    $(".xz-content pre code").each(function() {
        $(this).html("<ul><li>" + $(this).html().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\n/g, "</li><li>") + "</li></ul>");
        $(this).find("li:last-child").each(function () {
            if (!this.innerHTML) {
                $(this).remove();
            }
        });
    });

    /* 表注 */
    (function() {
        let tables = $("table"),
            i;
        for (i = 0; i < tables.length; i++) {
            let table = tables[i],
                caption = table.dataset["caption"],
                id = table.dataset["id"];
            if (caption) {
                $("<caption/>").addClass("caption-table").html(caption).attr("id", id).prependTo(table);
            }
        }
    })();

    /* 表格 */
    $(".xz-content-main article > table:not(.no-table)").each(function () {
        $(this).addClass("table");
        if (!$(this).parentsUntil(".xz-content-main article").find("div.table-responsive").length) {
            $(this).wrap($("<div/>").addClass("table-responsive"));
        }
    });

    /* 图注、表注显示 */
    (function() {
        let figureCaptionId = {};
        $(".caption-figure").each(function (n) {
            if (this.id) {
                figureCaptionId[this.id] = n + 1;
            }
        });
        $("a.xref-figure").each(function() {
            let hash = this.href.split("#").slice(-1)[0];
            if (figureCaptionId[hash]) {
                $(this).text("图 " + figureCaptionId[hash]);
            }
        });
        let tableCaptionId = {};
        $(".caption-table").each(function (n) {
            if (this.id) {
                tableCaptionId[this.id] = n + 1;
            }
        });
        $("a.xref-table").each(function() {
            let hash = this.href.split("#").slice(-1)[0];
            if (tableCaptionId[hash]) {
                $(this).text("表 " + tableCaptionId[hash]);
            }
        });
    })();

    /* 参考文献显示 */
    (function() {
        let endnoteId = {};
        $(".list-endnote li").each(function (n) {
            if (this.id) {
                endnoteId[this.id] = n + 1;
            }
        });
        $(".ref-endnote > a").each(function() {
            let hash = this.href.split("#").slice(-1)[0];
            if (endnoteId[hash]) {
                $(this).text(endnoteId[hash]);
            }
        });
    })();

    /* 注释 */
    $("span.footnote").each(function(count) {
        $(this).addClass("visible-print-inline").after($("<a/>").addClass("footnote-icon").text(count + 1).attr({
            "href": ""
        }).bind("click", function (e) {
            e.preventDefault();
        }).popover({
            "content": this.innerHTML,
            "html": true,
            "placement": "bottom",
            "toggle": "popover",
            "trigger": "focus"
        }));
    });

    /* 返回页面顶端 */
    $(".xz-navtop").click(function(e) {
        e.preventDefault();
        $("html").animate({
            scrollTop: 0
        }, 500);
    });
    $(".xz-navbottom").click(function(e) {
        e.preventDefault();
        $("html").animate({
            scrollTop: $(document.body).height()
        }, 500);
    });

    /* resize */
    window.windowResize = function () {
        $(".xz-footer").css("position", "initial");
        if ($("body").height() == $(window).height()) {
            $(".xz-footer").css("position", "absolute");
        }
        $(".xz-sidenav-list").affix({
            "offset": {
                "top": $(".xz-content-main").offset().top,
                "bottom": $(".xz-footer").outerHeight()
            }
        });
    };
    windowResize();
    $(window).bind("resize", windowResize);

    /* scroll */
    let scrollTimer;
    window.windowScroll = function () {
        $(".xz-footer-navtop").css({
            "bottom": Math.max(($(window).scrollTop() + $(window).innerHeight()) - ($(".xz-content-main").offset().top + $(".xz-content-main").outerHeight()), 25)
        }).fadeIn(200);
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(function () {
            $(".xz-footer-navtop").fadeOut(500);
        }, 2000);
    }
    $(".xz-footer-navtop").bind({
        "mouseenter": function () {
            clearTimeout(scrollTimer);
        },
        "mouseleave": function () {
            scrollTimer = setTimeout(function () {
                $(".xz-footer-navtop").fadeOut(500);
            }, 2000);
        }
    })
    windowScroll();
    $(window).bind("scroll", windowScroll);


    /* Lazyload */
    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });
    lazyLoadInstance.update();

    /* Han.js */
    if (!window.MathJax) {
        Han(document.body).render();
        window.mathjaxRendered = true;
    }
});