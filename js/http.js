/**
 * File to send and receive http request.
 */
console.log("http js loaded.");
var myCloud = (function () {
    var myCloud = {};
    //TODO this should be part of config.
    var SERVER_URL = "https://my-stats-ext.appspot.com/_ah/api/greeting/v1/website/data/push";
    myCloud.push = function (data) {
        jQuery.ajax({
            contentType: "application/json",
            method: "POST",
            url: SERVER_URL,
            data: data,
            dataType: "json"
        }).done(function (msg) {
            console.info("Data Saved: " + msg);
        }).fail(function (msg) {
            console.error(msg)
        })
        ;
    };
    return myCloud;
}());