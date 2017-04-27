/**
 * File to send and receive http request.
 */
console.log("http js loaded.");
var myCloud = (function () {
    var myCloud = {};
    //TODO this should be part of config.
    var SERVER_URL = "https://us-central1-my-stats-ext.cloudfunctions.net/set";
    myCloud.push = function (data) {
        jQuery.ajax({
            method: "POST",
            url: SERVER_URL,
            data: data
        }).done(function (msg) {
            console.info("Data Saved: " + msg);
        }).fail(function (msg) {
            console.error(msg)
        })
        ;
    };
    return myCloud;
}());