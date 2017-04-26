/**
 * Website entity, A structure format of website information.
 */

var Website = (function () {

    function Website(url, tabId, startTime, endTime) {
        this.url = url;
        this.tabId = tabId;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    return Website;
}());