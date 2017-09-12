/**
 * File listen and register windows events.
 */
var myWindows = (function () {
    var myWindows = {};
    myWindows.registerListeners = function () {
        var currentWindow,
            lastFocusedWindow,
            tab;
        myWindows.isFocus = true;
        chrome.windows.onFocusChanged.addListener(function (windowId) {
            console.log("EVENT:WINDOW:onFocusChanged:value = " + windowId);
            /*checking off focus*/
            if (windowId < 0) {
                myStats.onWindowOffFocus();
                myWindows.isFocus = false;
            } else {
                myWindows.isFocus = true;
                myTabs.getActive().then(function (tabs) {
                    tabs.forEach(function (val) {
                        if (windowId === val.windowId) {
                            tab = val;
                        }
                    });
                    var website = new Website(tab.url, tab.tabId);
                    myDb.deviceId().then(function (resp) {
                        website.device_id = resp['device_id'];
                        if (website.domain.protocol !== "chrome:") {
                            myStats.checkAndUpdate(website);
                        }
                    });

                })
            }
        });
    };
    myWindows.os = function () {
        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows") != -1) OSName = "Windows 10";
        if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName = "Windows 8";
        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName = "Windows 7";
        if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName = "Windows Vista";
        if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName = "Windows XP";
        if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName = "Windows 2000";
        if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac";
        if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
        if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
        return OSName;
    };
    return myWindows;
}());
