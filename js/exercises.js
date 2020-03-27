$(function () {
    let tempDiv = $("<div/>").appendTo($("body"));
    $(".xz-choice-question > li > ul").removeClass("xz-choice-2 xz-choice-4").each(function () {
        let itemWidth = $(this).find("li").toArray().map(x => $("<span/>").text(x.innerText).appendTo(tempDiv).width()), listWidth = $(this).width();
        if (itemWidth.every(x => x < listWidth / 4 - 32)) {
            $(this).addClass("xz-choice-4");
        } else if (itemWidth.every(x => x < listWidth / 2 - 32)) {
            $(this).addClass("xz-choice-2");
        }
    });
    tempDiv.remove();
});