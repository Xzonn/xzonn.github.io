/* 标签页处理 */
$(function () {
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