/**
 * Website entity, A structure format of website information.
 */

var Website = (function () {
    /**
     * Create a instance of Website.
     * @param url {{String}}
     * @param tabId {{Integer}}
     * @param startTime {{String}}
     * @param endTime {{String}}
     * @constructor
     */
    function Website(url, tabId, startTime, endTime) {
        //TODO instance checking pending.
        this.domain = new Domain(url);
        this.tabId = tabId;
        this.startTime = startTime;
        this.endTime = endTime;
    }


    return Website;
}());