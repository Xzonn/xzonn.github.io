let getURLParameters = function (rawSearch = location.search) {
    let search = new Map(rawSearch.slice(1).split("&").map(x => x.split("=").map(y => decodeURIComponent(y))).filter(x => (x.length == 2))),
        searchObject = {};
    search.forEach(function (val, key) {
        searchObject[key] = val;
    });
    return searchObject;
}