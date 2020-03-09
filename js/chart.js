google.charts.load("current", {
    "packages": ["corechart"],
    "language": "zh-CN"
});
window.charts = window.charts || [];
$(function () {
    google.charts.setOnLoadCallback(function () {
        for (let i = 0; i < window.charts.length; i++) {
            if (typeof(window.charts[i]) === "function") {
                window.charts[i]();
            }
        }
        window.chartRendered = true;
    });
});