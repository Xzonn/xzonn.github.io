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

    handleStart();

    function contentHandle(data) {
    }
    
    function handleStart() {
        var thisHash = location.hash.match(/^#!\/([^#]+)/);
        if (!thisHash || thisHash[1] != lastHash) {
            lastHash = (thisHash || [])[1];
            var title = lastHash ? decodeURI(lastHash) + (lastHash[lastHash.length - 1] == "/" ? "Readme" : "") : "Readme";
            $.ajax({
                dataType: "text",
                url: title + ".md",
                type: "get",
                success: function(data) {
                    // 标题
                    $("#contentTitle").text(title.split("/").pop());
                    document.title = $("#contentTitle").text() + " - Xzonn 的小站";

                    // 内容
                    $("#contentBody").html(new Markdown.Converter().makeHtml(data));

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
                    (function() {
                        var toc = $("<div/>")
                          , lastRank = 1
                          , tocID = [];
                        $("#content").find("h2, h3, h4, h5").each(function(n, t) {
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
                            this.id = "hl-" + tocID.join("-");
                            toc.append($("<li/>").append($("<a/>").attr({
                                href: location.hash.replace(/#[^!\/]+/, "") + "#hl-" + tocID.join("-")
                            }).text(this.innerText)))
                            lastRank = +this.tagName[1];
                        });
                        while (toc.parent()[0]) {
                            toc = toc.parent();
                        }
                        toc.children().children().prependTo($("#tocBlock").empty());
                    })();
                    
                    // 菜单
                    $(".view-source-link").attr("href", "https://raw.githubusercontent.com/Xzonn/Xzonn.github.io/master/study/" + (lastHash ? "data/" + decodeURI(lastHash) + ".md" : "Readme.md"));

                    // MathJax
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "output"]);
                }
            }); 
        } else {
            var bookMark = location.hash.match(/#[^#!\/]+$/);
            if (bookMark && $(bookMark[0])) {
                $("html").animate({
                    scrollTop: $(bookMark[0]).offset().top - $("#header").height()
                }, 300);
            }
        }
    }

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

    // 监听 location.hash 变化
    window.addEventListener("hashchange", handleStart, false);
});
