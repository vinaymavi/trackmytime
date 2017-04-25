/**
 * File that will use to display notifications.
 */
console.log("Notification js loaded.");
var myNotification = (function () {
    var myNotification = {};

    /**
     * Display information for single site.
     * @param siteName {{String}}
     * @param duration {{String}}
     */
    myNotification.singleSiteInfo = function (siteName, info) {
        console.log("Single site Info calling.");
    };

    /**
     * Display daily stats.
     * @param sitesObj {{Object}}
     */
    myNotification.dailyStats = function (sitesObj) {
        console.log("Daily Stats calling.");
    }
    return myNotification;
}());