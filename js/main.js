"use strict";

Date.prototype.format = function(fmt="YYYY年MM月DD日 EEE HH:mm:ss") {
    var o = {
        "M+": this.getMonth() + 1,
        //月份         
        "D+": this.getDate(),
        //日         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        //小时         
        "H+": this.getHours(),
        //小时         
        "m+": this.getMinutes(),
        //分         
        "s+": this.getSeconds(),
        //秒         
        "Q+": Math.floor((this.getMonth() + 3) / 3),
        //季度         
        "S": this.getMilliseconds()//毫秒         
    };
    var week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

$(function() {
    // 目录
    (function() {
        var toc = $("<div/>")
          , lastRank = 1
          , tocID = []
          , headings = $("#content").find("h2, h3, h4, h5");
        if (!headings) {
            return;
        }
        headings.each(function(n, t) {
            var thisRank = +this.tagName[1];
            while (thisRank > lastRank) {
                tocID.push(0);
                if (toc.children().length == 0) {
                    toc = $("<li/>").addClass("no-list-style").appendTo($(toc));
                }
                toc = $("<ul/>").appendTo($(toc.children()[toc.children().length - 1] || toc));
                thisRank--;
            }
            while (lastRank > thisRank) {
                tocID.pop();
                toc = toc.parent().parent();
                thisRank++;
            }
            tocID.push(tocID.pop() + 1);
            toc.append($("<li/>").append($("<a/>").attr({
                href: "#" + this.id
            }).text(this.innerText)))
            lastRank = +this.tagName[1];
        });
        while (toc.parent()[0]) {
            toc = toc.parent();
        }
        while (toc.children().length == 1 && (!(toc.children()[0].tagName.toLowerCase() == "li") || toc.children()[0].classList.contains("no-list-style"))) {
            toc = toc.children();
        }
        toc.children().prependTo($(".leftToc"));
    })();

    // 代码高亮
    $("#content pre code").each(function() {
        $(this).html("<ul><li>" + $(this).html().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\n/g, "</li><li>") + "</li></ul>");
    });

    //img标签相关
    var imageDisplay = ["auto", "none", "block", "left", "right", "center"],
        imageSize = 360,
        imageSizeUnit = /(pt|px|em|%)$/;
    $("#content img, #content svg.svgImage").each(function() {
        if (this.nodeName == "IMG" && this.classList.length) {
            return;
        }

        var data = this.dataset,
            disp = data.disp,
            size = (data.size || imageSize),
            alt = (this.alt || data.alt || "").split("|"),
            title = alt[0];
        while (!$(this).siblings().length && ($(this).parent()[0].tagName.toLowerCase() == "p")) {
            $(this).unwrap();
        }
        for (var i = 0; i < alt.length; i++) {
            if (!alt[i]) {
                continue;
            }
            if (imageDisplay.indexOf(alt[i]) > -1) {
                disp = alt[i];
            } else if (!isNaN(alt[i])) {
                size = imageSize * (+alt[i]);
            } else if (alt[i].match(imageSizeUnit)) {
                size = alt[i];
            } else {
                title = alt[i];
            }
        }
        switch (disp) {
        case "auto":
        case "none":
            return;
        case "block":
            $(this).css({
                "display": "block"
            });
            break;
        default:
            $(this).wrap($("<figure/>").addClass(disp == "left" ? "a-l" : disp == "right" ? "a-r" : ""));
            title && $("<figcaption/>").addClass("figureCaption").attr({
                "id": "figure-" + this.src.split("/").slice(-1)[0]
            }).html(title).appendTo($(this).parent());
            $(this).wrap($("<a/>").attr({
                "href": this.src,
                "target": "_blank"
            }));
        }
        this.alt = title;
        $(this).css({
            "width": size
        });
    });

    // 图注、表注显示
    (function() {
        let figureCaptions = $(".figureCaption"),
            figureCaptionId = {};
        $(".figureCaption").each(function (n) {
            if (this.id) {
                figureCaptionId[this.id] = n + 1;
            }
        });
        $("a.xrefFigure").each(function() {
            let hash = this.href.split("#").slice(-1)[0];
            if (figureCaptionId[hash]) {
                $(this).text("图 " + figureCaptionId[hash]);
            }
        });
        let tableCaptions = $(".tableCaption"),
            tableCaptionId = {};
        $(".tableCaption").each(function (n) {
            if (this.id) {
                tableCaptionId[this.id] = n + 1;
            }
        });
        $("a.xrefTable").each(function() {
            let hash = this.href.split("#").slice(-1)[0];
            if (tableCaptionId[hash]) {
                $(this).text("表 " + tableCaptionId[hash]);
            }
        });
    })();

    // 注释
    $("#content ref").each(function(count) {
        $(this).css("bottom", -2 - this.clientHeight).hide();
        var p = $(this).parent()[0]
          , reficon = $("<sup/>").addClass("reficon").attr("data-id", count).click(function(event) {
            $($("ref").fadeOut()[reficon[0].dataset.id]).click(function() {
                $(this).fadeOut();
            }).fadeIn();
        });
        $(this).before(reficon);
        $(p).append($(this).detach());
        $(p).css("position", "relative");
    });

    // 信息框
    $(".infoBoxHideButton").click(function(e) {
        switch (this.dataset.status) {
            case "show":
                $(".infoBoxIcon, .infoBoxInfo").fadeOut();
                this.dataset.status = "hide";
                this.innerHTML = "显示";
                break;
            case "hide":
                $(".infoBoxIcon, .infoBoxInfo").fadeIn();
                this.dataset.status = "show";
                this.innerHTML = "隐藏";
                break;                
        }
        e.preventDefault();
    });

    // 返回页面顶端
    $("#topLink").click(function(e) {
        $("html").animate({
            scrollTop: 0
        }, 500);
        e.preventDefault();
    });

    // 复制带版权
    $(document.body).on("copy", function(e) {
        if (typeof window.getSelection == "undefined") {
            e.preventDefault();
            return false;
        }

        var selection = window.getSelection();
        if (("" + selection).length < 30) {
            return true;
        }
        
        var range = selection.getRangeAt(0)
          , newdiv = $("<div/>").css({
            position: "absolute",
            left: "-99999px",
        }).appendTo(document.body).append(range.cloneContents());

        if (range.commonAncestorContainer.parentNode.nodeName == "CODE") {
            newdiv.html("<pre><code>" + newdiv.html() + "</code></pre>");
        }

        newdiv.html(newdiv.html() + "<ul class=\"copyright\"><li>来自<a href=\"" + location.href + "\">Xzonn的小站</a></li><li>标题：" + document.title + "</li><li>地址：" + location.href + "</li><li>转载请注明出处</li></ul>");
        selection.selectAllChildren(newdiv[0]);

        setTimeout(0, function() {
            selection.removeAllRanges();
            selection.addRange(range);
            newdiv.remove();
        });
    });

    // 二维码
    var selfLink = location.origin + location.pathname,
        alipayLink = "https://qr.alipay.com/FKX05443CDRZJP85NBKH9A",
        wxpayLink = "wxp://f2f0tRrkOkpu3KRGCoBxAXCOjrqNKoQOk5p3";
    $("#rightQrcodeBlock").attr({
        "href": selfLink
    }).qrcode({
        "text": selfLink,
        "width": 240,
        "height": 240
    }).click(e => e.preventDefault());
    $("#alipayQrcodeBlock").attr({
        "href": alipayLink
    }).qrcode({
        "text": alipayLink,
        "width": 108,
        "height": 108
    });
    $("#wxpayQrcodeBlock").attr({
        "href": wxpayLink
    }).qrcode({
        "text": wxpayLink,
        "width": 108,
        "height": 108
    });
});