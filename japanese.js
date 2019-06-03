$(function () {
    $("jp").each(function () {
        $(this).replaceWith($("<span/>").attr({
            "lang": "ja"
        }).html($(this).html()));
    });

    $("blockquote").attr({
        "lang": "ja"
    });
});