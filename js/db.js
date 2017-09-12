/**
 * File to store and load data from db.
 */
'use strict';
console.log("DB js loaded.");
//TODO we need to support local data storage.
var myDb = (function () {
    var myDb = {};

    myDb.save = function (website) {
        console.log("Save Data locally");
        saveLocal(website);
    };
    myDb.deviceId = function () {
        var dfd = jQuery.Deferred();
        chrome.storage.local.get(myConfig.APP_CONFIG, function (resp) {
            if (typeof resp.runtimeStyle !== "undefined") {
                console.error("Error in fetching app_config.");
                dfd.reject();
            } else {
                dfd.resolve(resp[myConfig.APP_CONFIG]);
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
    /**
     * Fetch today visited sites.
     * @return {Object} of site
     */
    myDb.getWebsites = function () {
        const promise = new Promise((resolve, reject)=> {
            chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
                if (typeof resp.runtime !== "undefined") {
                    console.error("Local Storage error");
                    reject();
                } else {
                    today().then(function (today) {
                        resolve(resp[myConfig.STORAGE_NAME][today]['websites']);
                    })
                }
            });
        });

        return promise;
    };
    /**
     * Update today websites
     */
    myDb.updateWebsites = function (websites) {
        const promise = new Promise((resolve, reject)=> {
            chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
                if (typeof resp.runtime !== "undefined") {
                    console.error("Local Storage error");
                    reject();
                } else {
                    today().then(function (today) {
                        let websitePointer = resp[myConfig.STORAGE_NAME][today]['websites'];
                        let keysArr = Object.keys(websites);
                        keysArr.forEach(function (val) {
                            websitePointer[val] = websites[val];
                        });
                        myDb.setData(resp);
                    });
                }
            });
        });
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
                    checkAndSetWebsite(website, resp, _today);
                }
            });
        })
    }

    function checkAndSetWebsite(website, resp, today) {
        var websitesObj = resp[myConfig.STORAGE_NAME][today]['websites'];
        if (typeof websitesObj[website.domain.domain] === 'undefined') {
            websitesObj[website.domain.domain] = {
                localDuration: website.localDuration,
                notification_count: 0,
                domain: website.domain.domain,
                port: website.domain.domain.port,
                protocol: website.domain.domain.protocol,
                device_id: website.device_id,
                client_type: "Chrome",
                os_type: website.os_type,
                visit_count: 1
            }
        } else {
            var w = websitesObj[website.domain.domain];
            if (!w.localDuration) {
                w.localDuration = 0;

            }
            if (!w.visit_count) {
                w.visit_count = 0;
            }
            if (website.isNewVisit) {
                w.visit_count++;
            }
            w.localDuration += website.localDuration;
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
        var dfd = jQuery.Deferred();
        var _todayStr = moment().format("YYYY:MM:DD").toString();
        chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
            if (typeof resp.runtime !== "undefined") {
                console.error("Local Storage error");
                dfd.reject();
            } else {
                if (typeof resp[myConfig.STORAGE_NAME][_todayStr] === "undefined") {
                    resp[myConfig.STORAGE_NAME][_todayStr] = {};
                    resp[myConfig.STORAGE_NAME][_todayStr]['websites'] = {};
                    chrome.storage.local.set(resp, function (resp_set) {
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

    /**
     * Setup local database.
     */
    myDb.init = function init() {
        const promise = new Promise((resolve, reject)=> {
            chrome.storage.local.get(myConfig.STORAGE_NAME, function (resp) {
                if (typeof resp.runtime !== "undefined") {
                    console.error("Local Storage error");
                    reject();
                } else {
                    if (typeof resp[myConfig.STORAGE_NAME] === "undefined") {
                        let storage = {};
                        storage[myConfig.STORAGE_NAME] = {};
                        chrome.storage.local.set(storage, function (resp_set) {
                            if (typeof resp_set !== "undefined") {
                                console.error("Local Storage error");
                                reject();
                            } else {
                                resolve()
                            }
                        })
                    }
                }
            });
        });
    };

    return myDb;
}());

