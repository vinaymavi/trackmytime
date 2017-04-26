/**
 * This id domain entity, A structure format of domain information.
 */
var Domain = (function () {
    /**
     * Create a instance of domain and process url information.
     * @param url
     * @constructor
     */
    function Domain(url) {
        var url = new URL(url);
        this.port = url.port;
        this.domain = url.hostname;
        this.protocol = url.protocol;
    }

    return Domain;
}());