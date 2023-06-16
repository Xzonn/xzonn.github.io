$(function () {
    /* 手动生成各标签 */
    let tags_dict = {}
    let lines = $(".xz-postlist > tbody > tr").toArray().map(x => x.dataset["tags"].split(" "));
    for (let line = 0; line < lines.length; line++) {
        for (let tag = 0; tag < lines[line].length; tag++) {
            let tag_name = lines[line][tag];
            if (!tags_dict[tag_name]) {
                tags_dict[tag_name] = 1
            } else {
                tags_dict[tag_name]++;
            }
        }
    }
    let tags = Object.keys(tags_dict);
    tags.sort(function (a, b) {
        return tags_dict[b] - tags_dict[a];
    });
    $(".xz-taglist").empty().append($("<li />").attr({
        id: "tag-",
        "data-sort": lines.length
    }).html(`<a href="#">全部<span class="badge">${lines.length}</span></a>`));
    for (let tag = 0; tag < tags.length; tag++) {
        let tag_name = tags[tag], tag_count = tags_dict[tag_name];
        if (!tag_name) continue;
        $("<li />").attr({
            id: "tag-" + tag_name,
            "data-sort": tag_count
        }).html(`<a href="#${tag_name}">${tag_name}<span class="badge">${tag_count}</span></a>`).appendTo($(".xz-taglist"));
    }

    /* 标签页处理 */
    let handleHashChange = function (e) {
        let hash = decodeURIComponent(location.hash).slice(1);
        $(".xz-taglist > li").removeClass("active");
        $("#tag-" + hash).addClass("active");
        if (hash) {
            $(".xz-postlist > tbody > tr").each(function () {
                if ($(this).find(".post-tag-simp").toArray().some(x => x.innerText == hash)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        } else {
            $(".xz-postlist > tbody > tr").show();
        }
        windowResize();
        if (e) e.preventDefault();
    }

    $(".xz-taglist > li").sort(function (a, b) {
        return b.dataset.sort - a.dataset.sort;
    }).detach().appendTo($(".xz-taglist"));
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    $(".xz-taglist").addClass("in");
    $(".xz-postlist").addClass("in");
});