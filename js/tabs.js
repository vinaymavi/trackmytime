/**
 * File to listen and register tabs events.
 */

console.log("Tabs js loaded.");
var myTabs = (function () {
    var myTabs = {};
    /**
     * Register all tab listeners.
     */
    myTabs.registerListeners = function () {
        chrome.tabs.onCreated.addListener(function (tab) {
            console.log("***OnCreated***");
            console.log(tab);
        });

        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            console.log("***onUpdated***");
            console.log(tabId);
            console.log(changeInfo);
            console.log(tab);
        });

        chrome.tabs.onHighlighted.addListener(function (highlightInfo) {
            console.log("***onHighlighted***");
            console.log(highlightInfo);
        });

        chrome.tabs.onActivated.addListener(function (activeInfo) {
            console.log("***onActivated***");
            console.log(activeInfo);
        });
    };

    return myTabs;
}());


