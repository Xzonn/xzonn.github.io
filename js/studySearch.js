let friendlySize = function (byte, blank = " ") {
    byte = parseInt(byte);
    if (isNaN(byte)) {
        return ""
    } else if (byte < 1024) {
        return byte + blank + "B"
    } else if (byte < 1024 * 1024) {
        return (byte / 1024).toFixed(1) + blank + "KB"
    } else if (byte < 1024 * 1024 * 1024) {
        return (byte / 1024 / 1024).toFixed(1) + blank + "MB"
    } else if (byte < 1024 * 1024 * 1024 * 1024) {
        return (byte / 1024 / 1024 / 1024).toFixed(1) + blank + "GB"
    } else {
        return (byte / 1024 / 1024 / 1024 / 1024).toFixed(1) + blank + "TB"
    }
}

// {% include js/getURLParameters.js %}
let getURLParameters = function (rawSearch = location.search) {
    let search = new Map(rawSearch.slice(1).split("&").map(x => x.split("=").map(y => decodeURIComponent(y))).filter(x => (x.length == 2))),
        searchObject = {};
    search.forEach(function (val, key) {
        searchObject[key] = val;
    });
    return searchObject;
}

// {% include js/pagination.js %}
let renderPagination = function (pageNumber, maxPageNumber, clickEvent) {
    let paginationList = $("<ul/>").addClass("pagination"),
        addPage = function (page, text, addClass) {
            $("<a/>").text(text || page).attr("href", "#").data("page", addClass ? NaN : page).appendTo($("<li/>").addClass(addClass).appendTo(paginationList));
        };
    addPage(pageNumber - 1, "\xab", pageNumber == 1 ? "disabled" : "");
    (pageNumber > 3) && addPage(1);
    (pageNumber > 4) && addPage(1, "\u2026", "disabled");
    for (let i = Math.max(1, pageNumber - 2); i <= Math.min(maxPageNumber, pageNumber + 2); i++) {
        addPage(i, i, pageNumber == i ? "active" : "");
    }
    (pageNumber < maxPageNumber - 3) && addPage(1, "\u2026", "disabled");
    (pageNumber < maxPageNumber - 2) && addPage(maxPageNumber);
    addPage(pageNumber + 1, "\xbb", pageNumber == maxPageNumber ? "disabled" : "");
    paginationList.find("a").bind("click", clickEvent);
    return(paginationList);
}

// {% include js/time.js %}
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

window.searchHandle = function (type, string, page, classid, limit = 20) {
    if ($(".xz-ss-confirm").prop("disabled")) {
        return;
    }
    window.scrollTo({
        "top": $(".xz-content-main").offset().top - 80, 
        "left": $(".xz-content-main").offset().left, 
        "behavior": "smooth"
    });
    $("<p/>").html(`搜索中……`).appendTo($(".xz-info-search-result").addClass("alert-info").removeClass("alert-success alert-warning alert-danger").empty());
    $(".xz-ss-confirm").prop("disabled", true);
    $(".xz-ss-result-file").addClass("hidden");
    $(".xz-ss-result-class").addClass("hidden");
    $(".xz-pagination-list").empty();
    $(".xz-pagination-form input, .xz-pagination-form button").prop("disabled", true);
    if (typeof(type) === typeof({})) {
        data = type
    } else {
        data = {
            "type": type,
            "string": string,
            "page": page,
            "classid": classid,
            "limit": limit
        };
    }
    let newSearch = [];
    for (let i in data) {
        (i != "limit") && data[i] && newSearch.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
    }
    newSearch = "?" + newSearch.join("&");
    if (newSearch.length > 1 && location.search != newSearch) {
        history.pushState({
            "url": location.href
        }, newSearch, location.pathname + newSearch);
    }
    $.get({
        "url": scriptDomain + "/study.py",
        "timeout": 5000,
        "data": data
    }).done(function (newData) {
        if (newData["count"]) {
            $("<p/>").html(`搜索到${ newData["count"] }条结果，用时${ newData["time"].toFixed(3) }&nbsp;s。`).appendTo($(".xz-info-search-result").addClass("alert-success").removeClass("alert-info alert-warning alert-danger").empty());
            switch (data["type"]) {
                case "class":
                    let classBody = $(".xz-ss-result-class > tbody").empty();
                    newData["result"].forEach(function (x) {
                        let line = $("<tr/>");
                        [x["id"], x["className"], x["classType"] + " " + x["classSubType"], x["teacher"]].forEach(function (y) {
                            $("<td/>").text(y).appendTo(line);
                        });
                        $("<a/>").addClass("glyphicon glyphicon-search").attr("href", "#").on("click", function (e) {
                            e.preventDefault();
                            $(".xz-ss-classid").val(x["id"]);
                            $(".xz-ss-classid-check").prop("checked", true);
                            $(".xz-ss-file").click();
                            $(".xz-ss-confirm").click();
                            $(".xz-ss-string").focus();
                        }).appendTo($("<td/>").appendTo(line));
                        line.appendTo(classBody);
                    });
                    $(".xz-ss-result-class").removeClass("hidden");
                    try {
                        $(".xz-ss-result-class").tablesorter();
                    } catch (e) {}
                    break;
                case "file":
                    let fileBody = $(".xz-ss-result-file > tbody").empty();
                    newData["result"].forEach(function (x) {
                        let line = $("<tr/>"),
                            thisClass = newData["classInfo"][x["classId"]];
                        [x["id"], thisClass["className"], x["fileName"], new Date(x["modifyTime"] * 1000).format("YYYY-MM-DD HH:mm"), friendlySize(x["size"], "\xA0")].forEach(function (y) {
                            $("<td/>").text(y).appendTo(line);
                        });
                        line.find("td:nth-child(3)").append([$("<br/>"), $("<span/>").addClass("xz-ss-fullpath font-mono").text(`/${ thisClass["classType"] }/${ thisClass["className"] } ${ thisClass["classSubType"] }/${ x["subPath"] && x["subPath"] + "/" }`)]);
                        line.appendTo(fileBody);
                    });
                    $(".xz-ss-result-file").removeClass("hidden");
                    try {
                        $(".xz-ss-result-file").tablesorter();
                    } catch (e) {}
                    break;
            }
            $(".xz-pagination-input").val(newData["newPage"]);
            let paginationList = renderPagination(newData["newPage"], newData["totalPage"], function (e) {
                e.preventDefault();
                let pageNumber = +$(this).data("page");
                console.log(pageNumber);
                if (!isNaN(pageNumber)) {
                    let newData = data;
                    newData["page"] = pageNumber;
                    searchHandle(newData);
                }
            });
            paginationList.appendTo($(".xz-pagination-list").empty());
            $(".xz-pagination-form").on("submit", function (e) {
                e.preventDefault();
                let newData = data;
                newData["page"] = $(".xz-pagination-input").val();
                searchHandle(newData);
            });
            $(".xz-pagination-form input, .xz-pagination-form button").prop("disabled", false);
        } else {
            $("<p/>").html(`未搜索到任何结果。您可以在 <a href=".xz-comment" class="alert-link">页面下方</a> 提出反馈，或是提供资料给我们，帮我们完善资料库。`).appendTo($(".xz-info-search-result").addClass("alert-danger").removeClass("alert-success alert-info alert-warning").empty());
        }
    }).fail(function (newData, type) {
        if (type == "timeout") {
            $("<p/>").html(`载入超时。请重试。`).appendTo($(".xz-info-search-result").addClass("alert-danger").removeClass("alert-success alert-info alert-warning").empty());
        } else if (type == "error" && newData["responseJSON"]) {
            $("<p/>").html(`错误${ newData["responseJSON"]["code"] }：${ newData["responseJSON"]["info"] }。请在 <a href=".xz-comment" class="alert-link">页面下方</a> 提出反馈。`).appendTo($(".xz-info-search-result").addClass("alert-danger").removeClass("alert-success alert-info alert-warning").empty());
        } else {
            $("<p/>").html(`内部服务器错误。请在 <a href=".xz-comment" class="alert-link">页面下方</a> 提出反馈。`).appendTo($(".xz-info-search-result").addClass("alert-danger").removeClass("alert-success alert-info alert-warning").empty());
        }
        console.log(arguments);
    }).always(function () {
        $(".xz-ss-confirm").prop("disabled", false);
        Han($(".xz-content")[0]).render();
        window.windowResize();
    });
}

$(function () {
    $(".xz-ss-class").on("click", function (e) {
        e.preventDefault();
        $(".xz-ss-type").text("课程").data("active", "class");
        $(".xz-ss-classid-group input").prop("disabled", true);
    });
    $(".xz-ss-file").on("click", function (e) {
        e.preventDefault();
        $(".xz-ss-type").text("文件").data("active", "file");
        $(".xz-ss-classid-group input").prop("disabled", false);
    });
    $(".xz-ss-confirm").on("click", function () {
        searchHandle($(".xz-ss-type").data("active"), $(".xz-ss-string").val(), 1, $(".xz-ss-classid-check").prop("checked") ? $(".xz-ss-classid").val() : 0);
    });
    $(".xz-ss-classid").on("keyup", function () {
        $(".xz-ss-classid-check").prop("checked", !!this.value.length);
    })
    let searchObject = getURLParameters();
    switch (searchObject["type"]) {
        case "file":
            $(".xz-ss-file").click();
            break;
        case "class":
        default:
            $(".xz-ss-class").click();
            break;
    }
    $(".xz-ss-string").val(searchObject["string"]);
    $(".xz-ss-classid-check").prop("checked", !!searchObject["classid"]);
    $(".xz-ss-classid").val(searchObject["classid"]);
    $("<div/>").addClass("xz-info-search-result alert").appendTo($(".xz-infobox-top"));
    if (Object.keys(searchObject).length) {
        searchHandle(searchObject);
    } else {
        $(".xz-info-search-result").addClass("alert-info").text("请在下方表单中输入搜索条件。");
    }
});