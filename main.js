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
    var lastHash = "";

    // MathJax 初始化
    MathJax.Ajax.config.path["mhchem"] = "//cdnjs.cloudflare.com/ajax/libs/mathjax-mhchem/3.2.0";
    MathJax.Hub.Config({
        tex2jax: {
            inlineMath: [["$", "$"], ["\\(", "\\)"]],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
            processEscapes: true,
        },
        TeX: {
            extensions: ["[mhchem]/mhchem.js"]
        },
        showMathMenu: false
    });

    // 代码高亮
    hljs.initHighlighting();
    $("#content pre code").each(function() {
        $(this).html("<ul><li>" + $(this).html().replace(/^\s+/, "").replace(/\s+$/, "").replace(/\n/g, "</li><li>") + "</li></ul>");
    });

    //img标签相关
    $("#content img").each(function() {
        var data = this.dataset;
        while (!$(this).siblings().length && ($(this).parent()[0].tagName.toLowerCase() == "p"))
            $(this).unwrap();
        switch (data.disp) {
        case "auto":
            return;
        case "block":
            $(this).css("display", "block");
            break;
        default:
            $(this).wrap($("<div/>").addClass("imgBlock" + (data.disp == "left" ? " a-l" : "")));
            $(this).attr("alt") && $("<div/>").addClass("imgDisc").text($(this).attr("alt")).appendTo($(this).parent());
        }
        $(this).css("width", +data.size || 240).attr("title", $(this).attr("alt"));
    });

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

    // 目录
    $(".leftToggleItemLink").click(function (){
        var toggleItem = ["#leftNavigation", "#leftToc"],
            thisItem = this.dataset.toggleItem;
        for (var i = 0; i < toggleItem.length; i++) {
            var item = toggleItem[i];
            if (item == thisItem) {
                $(item).show();
            } else {
                $(item).hide();
            }
        }
        $(".leftToggleItemLink").removeClass("leftToggleItemLinkOn");
        $(this).addClass("leftToggleItemLinkOn");
    });

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
        toc.children().prependTo($("#leftToc"));
    })();

    // MathJax
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "output"]);

    $("#topLink").click(function() {
        $("html").animate({
            scrollTop: 0
        }, 500);
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
});