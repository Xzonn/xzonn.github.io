function notFound() {
    document.title = "404 NOT FOUND";
    $(".container").show();
}

$(function () {
    let origin = location.origin,
        path = location.pathname,
        search = location.search,
        hash = location.hash;
    if (/^\/([\w\-]+)\/?$/.test(path)) {
        let newPath = origin + "/posts/" + RegExp.$1 + ".html"
        $.get(newPath).done(function () {
            location.href = newPath + search + hash;
        }).error(notFound);
    } else {
        notFound();
    }
});