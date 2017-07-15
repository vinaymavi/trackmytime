/**
 * Check and set all configs.
 */
'use strict';
var myConfig = (function () {
    var config = {};
    config.APP_CONFIG = "app_config";
    config.USER_CONFIG = 'user_config';
    config.STORAGE_NAME = 'my_stats';
    config.API_SERVER_URL = "https://beta-my-stats-ext.appspot.com/_ah/api";
    config.WEB_APP_URL = "https://beta-my-stats-ext.appspot.com/login";


    config.hasDeviceId = function () {
        var dfd = jQuery.Deferred();
        myDb.deviceId().then(function (resp) {
            console.log(resp);
            if (typeof resp !== "undefined" && typeof resp['device_id'] !== "undefined") {
                dfd.resolve(true);
            } else {
                dfd.resolve(false);
            }

        }, function (resp) {
            dfd.reject();
        });
        return dfd.promise();
    };
    config.setDeviceId = function (device_id) {
        var dfd = jQuery.Deferred();
        var data = {};
        data[config.APP_CONFIG] = {"device_id": device_id};
        myDb.setData(data).then(function (resp) {
            dfd.resolve();
        }, function () {
            dfd.reject();
        });
        return dfd.promise();
    };
    return config;
}());
