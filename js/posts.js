---
---
{% include js/getURLParameters.js %}

{% include js/pagination.js %}

window.changePage = function (page) {
    let pageCount = (Cookies.get("page-count") || 10),
        pageNumber = +(page || getURLParameters().page || 1),
        isWeChat = /MicroMessenger/.test(navigator.userAgent),
        i;
    $.get("/pages.json?d=" + new Date().getDate()).done(function (data) {
        let maxPageNumber = Math.ceil(data.length / pageCount);
        data = data.sort(function (a, b) {
            if (a["update"] < b["update"]) {
                return 1;
            } else if (a["update"] > b["update"]) {
                return -1;
            } else if (a["date"] < b["date"]) {
                return 1;
            } else if (a["date"] > b["date"]) {
                return -1;
            }
            return 0;
        });
        if (isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;
        if (pageNumber > maxPageNumber) pageNumber = maxPageNumber;
        $(".page-block-list").empty();
        for (i = (pageNumber - 1) * pageCount; i < Math.min(pageNumber * pageCount, data.length); i ++) {
            let post = data[i],
                title = $("<h3/>").addClass("post-title").append($("<a/>").text(post.title).attr({
                    "href": (isWeChat && post.wechatLink) ? post.wechatLink : post.link,
                    "title": post.title
                })),
                date = $("<ul/>").addClass("xz-meta-time").append([$("<li/>").addClass("xz-meta-create").text(post.date), $("<li/>").addClass("xz-meta-update").text(post.update)]),
                tag = (post.tags.length ? $("<ul/>").addClass("xz-meta-tags").append(post.tags.map(x => $("<li/>").addClass("post-tag").append($("<a/>").text(x).attr("href", "/pages/#" + encodeURIComponent(x))))) : null),
                image = $("<img/>").addClass("post-image").attr("src", post.headImage),
                info = $("<p/>").addClass("post-meta-info").text(post.info);
            $("<div/>").addClass(["post-block", post.headImage ? "post-block-with-image" : null]).append([title, date, tag, post.headImage ? image : null, info]).appendTo($(".page-block-list"));
        }
        $(".page-list-title").text("页面列表 - 第" + pageNumber + "页");
        $(".post-total").text(data.length);
        $(".page-total").text(maxPageNumber);
        $(".xz-pagination-input").val(pageNumber);
        let paginationList = renderPagination(pageNumber, maxPageNumber, function (e) {
            e.preventDefault();
            let pageNumber = +$(this).data("page");
            if (!isNaN(pageNumber)) {
                window.changePage(pageNumber);
            }
        });
        paginationList.appendTo($(".xz-pagination-list").empty());
        Han($(".xz-content")[0]).render();
        window.tocRender();
        if (page) {
            history.pushState({
                "url": location.href
            }, "page" + pageNumber, pageNumber == 1 ? "/" : "?page=" + pageNumber);
            window.scrollTo({
                "top": $(".page-block-heading").offset().top - 80, 
                "left": $(".page-block-heading").offset().left, 
                "behavior": "smooth"
            });
        }
    });
};

$(function () {
    $(".xz-pagination-form").on("submit", function (e) {
        e.preventDefault();
        let pageNumber = +$(".xz-pagination-input").val();
        if (!isNaN(pageNumber)) {
            window.changePage(pageNumber);
        }
    });
    window.changePage();
});