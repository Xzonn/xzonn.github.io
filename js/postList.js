window.getURLParameters = function () {
    let search = location.search.slice(1),
        array = search.split("&").map(x => x.split("=").map(y => decodeURIComponent(y))),
        data = {},
        i;
    if (search) {
        for (i = 0; i < array.length; i++) {
            data[array[i][0]] = array[i][1];
        }
    }
    window.URLParameters = data;
    return data;
}

window.changePage = function (page) {
    let pageCount = (Cookies.get("pageCount") || 10),
        pageNumber = +(page || (window.URLParameters || window.getURLParameters()).page || 1),
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
        $(".pageBlockList").empty();
        for (i = (pageNumber - 1) * pageCount; i < Math.min(pageNumber * pageCount, data.length); i ++) {
            let post = data[i],
                title = $("<a/>").addClass("postTitle").text(post.title).attr({
                    "href": (isWeChat && post.wechatLink) ? post.wechatLink : post.link,
                    "title": post.title
                }),
                date = $("<div/>").addClass("postDates").append([$("<div/>").addClass("postCreateDate").text(post.date), $("<div/>").addClass("postUpdateDate").text(post.update)]),
                tag = $("<ul/>").addClass("postTagList").append(post.tags.map(x => $("<li/>").addClass("postTag").append($("<a/>").text(x).attr("href", "/tags/#" + encodeURIComponent(x))))),
                image = $("<img/>").addClass("postImage").attr("src", post.headImage),
                info = $("<p/>").addClass("postInfo").text(post.info),
                block = $("<div/>").addClass(["postBlock", post.headImage ? "postBlockWithImage" : null]).append([title, date, tag, post.headImage ? image : null, info]).appendTo($(".pageBlockList"));
        }
        $(".pageListTitle").text("页面列表 - 第" + pageNumber + "页");
        $(".postTotal").text(data.length);
        $(".pageTotal").text(maxPageNumber);
        $(".pageNumber").val(pageNumber);
        if (pageNumber > 1) {
            $(".pagePrevLink").attr("href", "/" + (pageNumber == 2 ? "" : "?page=" + (pageNumber - 1))).data("page", pageNumber - 1);
            $(".pageFirstLink").attr("href", "/").data("page", 1);
            $(".pagePrev").show();
        } else {
            $(".pagePrev").hide();
        }
        if (pageNumber < maxPageNumber) {
            $(".pageNextLink").attr("href", "/?page=" + (pageNumber + 1)).data("page", pageNumber + 1);
            $(".pageLastLink").attr("href", "/?page=" + maxPageNumber).data("page", maxPageNumber);
            $(".pageNext").show();
        } else {
            $(".pageNext").hide();
        }
        if (page) {
            history.pushState({
                "url": location.href
            }, "page" + pageNumber, pageNumber == 1 ? "/" : "?page=" + pageNumber);
            window.scrollTo({
                "top": $(".pageListTitle").offset().top, 
                "left": $(".pageListTitle").offset().left, 
                "behavior": "smooth" 
            });
        }
        Han($("#content")[0]).render();
        window.tocRender();
    });
};

$(function () {
    $(".pageEnter").bind("submit", function (e) {
        e.preventDefault();
        let pageNumber = +$(".pageNumber").val();
        if (!isNaN(pageNumber)) {
            window.changePage(pageNumber);
        }
    });
    $(".pageFirstLink, .pagePrevLink, .pageNextLink, .pageLastLink").bind("click", function (e) {
        e.preventDefault();
        let pageNumber = +$(this).data("page");
        if (!isNaN(pageNumber)) {
            window.changePage(pageNumber);
        }
    });
    window.changePage();
});