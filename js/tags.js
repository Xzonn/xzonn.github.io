/* 标签页处理 */
$(function () {
    function handleHashChange (e) {
        let hash = decodeURIComponent(location.hash).slice(1);
        if (hash.length < 1) {
            hash = $(".tagLink")[0].innerText;
        }
        $(".tagItem").removeClass("tagItemOn");
        $("#tag-" + hash).addClass("tagItemOn");
        $(".tagPostTagName").text(hash);
        $(".pageBlockSimp").each(function () {
            if ($(this).find(".pageTagLink").toArray().some(x => x.innerText == hash)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        if (e) e.preventDefault();
    }
    
    $(".tagItem").sort(function (a, b) {
        return b.dataset.sort - a.dataset.sort;
    }).detach().appendTo($(".tagBlock"));
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    $(".tagBlockRendering").removeClass("tagBlockRendering");
    $(".tagPostBlockRendering").removeClass("tagPostBlockRendering");
});