/**
 * Content script to communicate with webpage.
 */
console.log("MyContent script.")
window.addEventListener("message", function (event) {
    try {
        if (typeof  event.data !== "undefined") {
            var data = JSON.parse(event.data);
            if (data.from == "WEB_PAGE") {
                console.log();
                sendDeviceId();
            }
        }

    } catch (e) {
        console.error(e);
    }


});
function sendDeviceId() {
    chrome.storage.local.get("app_config", function (resp) {
        if (typeof  resp === "undefined") {
            resp = {}
        }
        resp.from = "EXTENSION";
        window.postMessage(JSON.stringify(resp), '*');
    });
}