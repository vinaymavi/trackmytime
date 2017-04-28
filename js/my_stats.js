/**
 * File that contains logic to calculate visit time.
 */
//TODO create a config file.
console.log("my stats js loaded.");
var myStats = (function () {
    var myStats = {};
    var currentSite;
    /**
     * Initialize extension.
     */
    myStats.init = function () {
        myTabs.registerListeners();
    };

    myStats.checkAndUpdate = function (website) {
        if (website instanceof Website) {
            process(website);
        } else {
            console.log("Not a website instance.");
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

function init() {
    console.log("onStartUp Calling.");
    myStats.init();
}