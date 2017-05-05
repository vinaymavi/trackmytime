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
            if (changeInfo.status === "complete") {
                console.log(tab);
                push(tab);
            }

        });

        chrome.tabs.onActivated.addListener(function (activeInfo) {
            console.log("***onActivated***");
            console.log(activeInfo);
            var promise = getTabById(activeInfo.tabId);
            promise.then(function (tab) {
                console.log(tab);
                push(tab);
            })
        });
    };
    myTabs.getActive = function () {
        var dfd = jQuery.Deferred();
        chrome.tabs.query({"active": true}, function (tabs) {
            console.log(tabs);
            dfd.resolve(tabs);
        });
        return dfd.promise();
    }
    /**
     * Create instance of website by tabId.
     * @param {{Integer}} tabId
     * @return {{Promise}}
     */
    function getTabById(tabId) {
        var dfd = jQuery.Deferred();
        chrome.tabs.get(tabId, function (tab) {
            dfd.resolve(tab);
        });
        return dfd.promise();
    }

    function push(tab) {
        var website = new Website(tab.url, tab.tabId);
        myDb.deviceId().then(function (resp) {
            website.device_id = resp['device_id'];
            if (website.domain.protocol !== "chrome:") {
                myStats.checkAndUpdate(website);
            }
        });

    }

    return myTabs;
}());


