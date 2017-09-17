/**
 * File to send and receive http request.
 */
'use strict';
console.log("http js loaded.");
var myCloud = (function () {
    var myCloud = {};
    myCloud.push = function (data) {
        var url = myConfig.PUSH_DATA_URL;
        jQuery.ajax({
            contentType: "application/json",
            method: "POST",
            url: url,
            data: data,
            dataType: "json"
        }).done(function (msg) {
            console.info("Data Saved: " + JSON.stringify(msg));
        }).fail(function (msg) {
            console.error(msg)
        });

    };
    myCloud.getDeviceId = function () {
        var url = myConfig.API_SERVER_URL + "/greeting/v1/website/config/new_device_id";
        var dfd = jQuery.Deferred();
        jQuery.ajax({
            contentType: "application/json",
            method: "GET",
            url: url,
            dataType: "json"
        }).done(function (resp) {
            dfd.resolve(resp);
        }).fail(function (msg) {
            dfd.reject();
        });
        return dfd.promise();
    }
    return myCloud;
}());