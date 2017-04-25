/**
 * File that contains logic to calculate visit time.
 */
//TODO create a config file.
console.log("my stats js loaded.");
var myStats = (function () {
    var myStats = {};
    /**
     * Initialize extension.
     */
    myStats.init = function () {
        myTabs.registerListeners();
    };

    return myStats;
}());

// Extension initialization.

chrome.runtime.onStartup.addListener(function () {
    console.log("onStartUp Calling.");
    myStats.init();
});