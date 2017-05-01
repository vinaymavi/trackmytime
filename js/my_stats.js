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
            calDur(currentSite);
            pushData(currentSite);
            currentSite = undefined;
        }
    };
    function process(website) {
        if (currentSite !== undefined) {
            if (currentSite.domain.domain === website.domain.domain) {
                console.log("Same site");
            } else {
                currentSite.endTime = new moment();
                calDur(currentSite);
                pushData(currentSite);
                website.startTime = new moment();
                currentSite = website;
            }
        } else {
            website.startTime = new moment();
            currentSite = website;
        }
    }

    function pushData(website) {
        console.log("Push data");
        console.log(JSON.stringify(website.toString()));
        myDb.save(website);
        myCloud.push(JSON.stringify(website.toString()));
    }

    /**
     * Calculate duration between startTime and endTime.
     */
    function calDur(website) {
        var duration = moment.duration(website.endTime.diff(website.startTime));
        var seconds = duration.asSeconds();
        website.duration = seconds;
    }

    return myStats;
}());

// Extension initialization.

chrome.runtime.onStartup.addListener(init);
chrome.runtime.onInstalled.addListener(init);

function init() {

    if (!isInit) {
        console.log("onStartUp Calling.");
        myStats.init();
        isInit = true;
    }
}