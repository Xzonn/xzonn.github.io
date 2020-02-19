$(function (){
    var bilibiliVideo = function(boxBlock, aid, cid, page, title, subTitle = "") {
        boxBlock.empty();
        var fullTitle = (title || "av" + aid) + " - " + (subTitle || "p" + page),
            titleBlock = $("<a/>").addClass("bilibiliTitle").attr({
                "href": "https://www.bilibili.com/video/av" + aid + "?p=" + page,
                "title": fullTitle
            }).text(fullTitle).appendTo(boxBlock),
            iframeBlock = $("<iframe/>").addClass("bilibiliVideo").attr({
                 allowfullscreen: "true"
            }).appendTo(boxBlock),
            hideBlock = $("<a/>").addClass("bilibiliHideButton").text("显示").attr({
                "href": "",
                "data-status": "hide"
            }).click(function(e) {
                switch (this.dataset.status) {
                    case "show":
                        boxBlock.removeClass("bilibiliBoxShow");
                        this.dataset.status = "hide";
                        this.innerHTML = "显示";
                        break;
                    case "hide":
                        if (!iframeBlock.attr("src")) {
                            iframeBlock.attr({
                                "src": "https://player.bilibili.com/player.html?aid=" + aid + "&cid=" + cid + "&page=" + page
                            })
                        }
                        boxBlock.addClass("bilibiliBoxShow");
                        this.dataset.status = "show";
                        this.innerHTML = "隐藏";
                        break;
                }
                e.preventDefault();
            }).appendTo($("<span/>").addClass("bilibiliHide").appendTo(boxBlock));
    }
    $(".bilibiliBox").each(function() {
        var boxBlock = $(this),
            aid = +this.dataset.aid,
            cid = +this.dataset.cid,
            page = +this.dataset.page || 1,
            title = this.dataset.title,
            subTitle = this.dataset.subTitle;
        if (!aid) {
            return false;
        }
        $.ajax({
            dataType: "json",
            url: "https://mgwbcprd.azureedge.net/BilibiliMeta/Index/av" + aid,
            type: "get",
            success: function(data) {
                var entry = data["VideoEntities"][page - 1];
                title = title || data["Title"];
                subTitle = subTitle || entry["Title"];
                cid = entry["VideoCid"];
                bilibiliVideo(boxBlock, aid, cid, page, title, subTitle);
            },
            error: function(data) {
                bilibiliVideo(boxBlock, aid, cid, page, title, subTitle);
            }
        });
    });
});