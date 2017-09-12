/**
 * File that will use to display notifications.
 */
'use strict';
console.log("Notification js loaded.");
var myNotification = (function () {
    var myNotification = {};
    var ALARM_NAME = "checkNotification";
    // Interval in minutes.
    var ALARM_INTERVAL = 1;
    var STORAGE_NAME = "my_stats";
    var SINGLE_SLOT = 1 * 60;

    /**
     * Display information for single site.
     * @param siteName {{String}}
     * @param duration {{String}}
     */
    myNotification.singleSiteInfo = singleSiteInfo;

    function singleSiteInfo(site) {
        var options = {
            "type": "basic",
            "iconUrl": "images/icon3.png",
            "title": site.name,
            "message": "Today surfing time is " + parseFloat(site.duration / 60).toFixed(0) + " Min."
        };
        chrome.notifications.create(options, function (id) {
            /*TODO user should need interaction*/
            console.log(id);
        });
    };

    /**
     * Display daily stats.
     * @param sitesObj {{Object}}
     */
    myNotification.dailyStats = function (sitesObj) {
        console.log("Daily Stats calling.");
    };
    /*
     * Start timer to check and send notifications.
     * */
    myNotification.startTimer = function () {
        chrome.alarms.create(ALARM_NAME, {"periodInMinutes": ALARM_INTERVAL});
    };

    /**
     * Alarm listener
     * */
    chrome.alarms.onAlarm.addListener(function (Alarm) {
        if (Alarm.name === ALARM_NAME) {
            console.log("ALARM_NAME=" + ALARM_NAME);
            getSites().then(function (sites) {
                sites.forEach(function (site) {
                    singleSiteInfo(site);
                })
            });
        }
    });
    /**
     * Check sites that need to send notification from sites list.
     * @return {Array} of sites that need to send notification.
     */
    function getSites() {
        var websitesObj,
            keysArr,
            notificationSites = [],
            website;
        var dfd = jQuery.Deferred();
        myDb.getWebsites().then((websitesObj)=> {
            keysArr = Object.keys(websitesObj);
            keysArr.forEach(function (val) {
                website = websitesObj[val];
                if (parseInt(website.localDuration / SINGLE_SLOT) > website.notification_count) {
                    notificationSites.push({
                        "name": val,
                        duration: website.localDuration
                    });
                    website.notification_count = parseInt(website.localDuration / SINGLE_SLOT)
                }
            });
            myDb.updateWebsites(websitesObj);
            dfd.resolve(notificationSites);     
        });
        return dfd.promise();
    }

    return myNotification;
}());