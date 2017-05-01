/**
 * File listen and register windows events.
 */
var myWindows = (function () {
    var myWindows = {};
    myWindows.registerListeners = function () {
        var currentWindow,
            lastFocusedWindow,
            tab;
        chrome.windows.onFocusChanged.addListener(function (windowId) {
            console.log(windowId);
            if (windowId < 0) {
                myStats.onWindowOffFocus();
            } else {
                myTabs.getActive().then(function (tabs) {
                    tabs.forEach(function (val) {
                        if (windowId === val.windowId) {
                            tab = val;
                        }
                    });
                    var website = new Website(tab.url, tab.tabId);
                    if (website.domain.protocol !== "chrome:") {
                        myStats.checkAndUpdate(website);
                    }
                })
            }
        });
    }
    return myWindows;
}());
