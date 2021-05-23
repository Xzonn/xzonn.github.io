"use strict";

$(function () {
    /* 信息框 */
    if (Cookies.get("noPrintInfo")) {
        $(".xz-info-print").remove();
        Cookies.set("noPrintInfo", "false", {
            "expires": 7
        });
    } else {
        $(".xz-info-print").addClass("fade in").removeClass("hidden");
    }
    $(".xz-info-print").on("closed.bs.alert", function () {
        Cookies.set("noPrintInfo", "false", {
            "expires": 7
        });
    });

    /* PDF */
    if (window.pageInfo["tags"] && window.pageInfo["tags"].indexOf("学习资料") > -1) {
        let hasedFileList = JSON.parse(localStorage.getItem("xz-pdf-list"));
        let renderAlert = function (pdfList) {
            let fileName = location.pathname.split("/").reverse()[0].replace(".html", ".pdf");
            if (pdfList.indexOf(fileName) > -1) {
                let div = $("<div/>").addClass(["xz-info-pdf alert alert-success"]).append([
                    $("<p/>").html(`本页面存在一个 <a href="https://cdn.jsdelivr.net/gh/Xzonn/xz-pdf/${fileName}" class="alert-link">已渲染的PDF版本</a>。`)
                ]).appendTo($(".xz-infobox-top"));
                Han(div[0]).render();
            }
        }
        if (!hasedFileList || (new Date() - hasedFileList["update"]) > (30 * 60 * 1000)) {
            $.get({
                "url": "https://api.github.com/repos/Xzonn/xz-pdf/contents",
                "timeout": 5000
            }).done(function (data) {
                if (data instanceof Array) {
                    let pdfList = data.map(x => x["path"]);
                    localStorage.setItem("xz-pdf-list", JSON.stringify({
                        "update": +new Date(),
                        "list": pdfList
                    }));
                    renderAlert(pdfList);
                }
            }).fail(function () {
                let div = $("<div/>").addClass(["alert alert-danger"]).append([
                    $("<p/>").html(`无法链接至<strong><a href="https://api.github.com/">https://api.github.com/</a></strong>，请检查网络设置。`)
                ]).appendTo($(".xz-infobox-top")),
                    closeButton = $(`<button type="button" class="close" data-dismiss="alert">&times;</button>`).appendTo($(".xz-infobox-top"));
                Han(div[0]).render();
                setTimeout(x => closeButton.click(), 5000);
                renderAlert((hasedFileList || {})["list"] || []);
            })
        } else {
            renderAlert(hasedFileList["list"]);
        }
    }
});