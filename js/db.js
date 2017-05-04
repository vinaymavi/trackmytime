/**
 * File to store and load data from db.
 */
'use strict';
console.log("DB js loaded.");
//TODO we need to support local data storage.
var myDb = (function () {
    var myDb = {};

    myDb.save = function (website) {
        saveLocal(website);
    };
    myDb.deviceId = function () {
        var dfd = jQuery.Deferred();
        chrome.storage.local.get(myConfig.APP_CONFIG, function (resp) {
            if (typeof resp.runtimeStyle !== "undefined") {
                console.error("Error in fetching app_config.");
                dfd.reject();
            } else {
                dfd.resolve(resp);
            }
        });
        return dfd.promise();
    };
    /**
     * A public function to set data in chrome storage.
     * @param data {{Object}} to save data in local db.
     * @return {jquery.Promise}
     */
    myDb.setData = function (data) {
        var dfd = jQuery.Deferred();
        chrome.storage.local.set(data, function (resp) {
            if (typeof resp !== "undefined") {
                console.error("Storage saving error.");
                dfd.reject();
            } else {
                dfd.resolve();
            }
        });
        return dfd.promise();
    };
    /*
     * Private function.
     * */
    function saveLocal(website) {
        //TODO this variable should be at class level.
        var _today;
        today().then(function (str) {
            _today = str;
            chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
                if (typeof resp.runtime !== "undefined") {
                    console.error("Local Storage error");
                } else {
                    checkAndSetWebsite(website, resp);
                }
            })
        })
    }

    function checkAndSetWebsite(website, resp) {
        var websitesObj = resp[myConfig.STORAGE_NAME]['websites'];
        if (typeof websitesObj[website.domain.domain] === 'undefined') {
            websitesObj[website.domain.domain] = {
                duration: website.duration,
                notification_count: 0
            }
        } else {
            var w = websitesObj[website.domain.domain];
            w.duration += website.duration;
        }
        chrome.storage.local.set(resp, function () {
            if (typeof resp_set !== "undefined") {
                console.error("Storage saving error.");
            }
        })
    }

    /**
     * Check and create today key object in storage.
     * @return {string} today date string in format "YYYY:MM:DD"
     */
    function today() {
        /*TODO code looks complex need to look again.*/
        var dfd = jQuery.Deferred();
        var _todayStr = moment().format("YYYY:MM:DD").toString();
        chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
            if (typeof resp.runtime !== "undefined") {
                console.error("Local Storage error");
                dfd.reject();
            } else {
                console.log(resp);
                if (typeof resp[myConfig.STORAGE_NAME] === "undefined" || resp[myConfig.STORAGE_NAME]["today"] !== _todayStr) {
                    var newStorage = {};
                    newStorage[myConfig.STORAGE_NAME] = {}
                    newStorage[myConfig.STORAGE_NAME]["today"] = _todayStr;
                    newStorage[myConfig.STORAGE_NAME]["websites"] = {};
                    chrome.storage.local.set(newStorage, function (resp_set) {
                        if (typeof resp_set !== "undefined") {
                            console.error("Local Storage error");
                            dfd.reject();
                        } else {
                            dfd.resolve(_todayStr);
                        }
                    })
                } else {
                    dfd.resolve(_todayStr);
                }
            }
        });
        return dfd.promise();
    }

    return myDb;
}());

