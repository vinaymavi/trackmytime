/**
 * File that contains logic to calculate visit time.
 */
//TODO create a config file.
/*TODO Push local logs to server.*/
console.log("my stats js loaded.");
var isInit = false;
var myStats = (function () {
    var myStats = {};
    var currentSite;
    /**
     * Initialize extension.
     */
    myStats.init = function () {
        myTabs.registerListeners();
        myWindows.registerListeners();
        myNotification.startTimer();
    };

    myStats.checkAndUpdate = function (website) {
        if (website instanceof Website) {
            process(website);
        } else {
            console.log("Not a website instance.");
        }
    };
    /**
     * Push current site data when chrome window out of focus.
     */
    myStats.onWindowOffFocus = function () {
        if (typeof  currentSite !== "undefined") {
            currentSite.endTime = new moment();
            currentSite.localEndTime = new moment();
            calDur(currentSite);
            localCalDur(currentSite);
            pushData(currentSite);
            currentSite = undefined;
        }
    };
    function process(website) {
        if (currentSite !== undefined) {
            if (currentSite.domain.domain === website.domain.domain) {
                console.log("Same site");
                currentSite.localEndTime = new moment();
                localCalDur(currentSite);
                pushData(currentSite, true);
                /*TODO this is hack for local update*/
                currentSite.localStartTime = new moment();
            } else {
                currentSite.endTime = new moment();
                currentSite.localEndTime = new moment();
                calDur(currentSite);
                localCalDur(currentSite);
                pushData(currentSite);
                currentSite = website;
            }
        } else {
            currentSite = website;
        }
    }

    /**
     * Push interface to push data to all platforms, local and remote.
     * @param website {Website}
     * @param pushToLocalOnly {boolean}
     */
    function pushData(website, pushToLocalOnly) {
        console.log("Push data");
        console.log(JSON.stringify(website.toString()));
        myDb.save(website);
    }

    /**
     * Calculate duration between startTime and endTime.
     */
    function calDur(website) {
        var duration = moment.duration(website.endTime.diff(website.startTime));
        var seconds = duration.asSeconds();
        website.duration = seconds;
    }

    /**
     * Calculate duration between startTime and endTime.
     */
    function localCalDur(website) {
        var duration = moment.duration(website.localEndTime.diff(website.localStartTime));
        var seconds = duration.asSeconds();
        website.localDuration = seconds;
    }

    return myStats;
}());

// Extension initialization.

chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);
chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/1F8hLgQdvKVoo9gVc0-3pkU18hj9AS71hUCKH0KrMXPs/viewform", function () {
    /*TODO update Admin about un-installation*/
    console.log("Un-Installed");
});

function init() {
    if (!isInit) {
        console.log("MyStats init.");
        myConfig.hasDeviceId().then(function (bool) {
            if (!bool) {
                myCloud.getDeviceId().then(function (resp) {
                    console.log(resp);
                    if (typeof resp.device_id !== "undefined") {
                        myConfig.setDeviceId(resp.device_id)
                    } else {
                        console.error("No device id returned from server.");
                    }
                });
            }
        });
        myDb.init();
        myStats.init();
        cron.init();
        isInit = true;
    }
}
chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        myDb.deviceId().then(function (resp) {
            if (resp['device_id'] === "undefined") {
                sendResponse({'hasDeviceId': false})
            } else {
                sendResponse("{'hasDeviceId': true, 'device_id': resp['device_id']}");
            }
        })
    });
chrome.browserAction.onClicked.addListener(function callback() {
    myTabs.openWebApp();
});