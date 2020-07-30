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