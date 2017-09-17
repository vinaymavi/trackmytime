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
        this.startTime = startTime || new moment();
        this.endTime = endTime;
        /*TODO this temporary solutions.*/
        this.localStartTime = new moment();
        this.localEndTime;
        this.device_id = "";
        this.isNewVisit = false;
        this.os_type = myWindows.os();
        this.date = moment.utc().startOf("day").valueOf();
        this.toString = function () {
            return {"value": JSON.stringify(this)};
        }
    }

    /**
     * This function convert website data to new format.
     *
     * #Format
     *  {
        "domain": "xyz.com",
        "port": "8080",
        "protocol": "https",
        "duration": 200,
        "date": "2017-09-11T15:12:25.734Z",
        "device_id": "797f9sdf897f89ds798",
        "client_type":"Chrome",
        "os_type":""
        }
     */
    function convertToNewFormat(_this) {
        //    TODO implementation is pending.
    }


    return Website;
}());