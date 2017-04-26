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
    }

    function process(website) {
        if (currentSite !== undefined) {
            if (currentSite.url === website.url) {
                console.log("Same site");
            } else {
                pushData(currentSite);
                currentSite = website;
            }
        } else {
            currentSite = website;
        }
    }

    function pushData(website) {
        //TODO push data to db.
        //TODO add endTime;
        console.log(website);
    }

    return myStats;
}());

// Extension initialization.

chrome.runtime.onStartup.addListener(init);

function init() {
    console.log("onStartUp Calling.");
    myStats.init();
}