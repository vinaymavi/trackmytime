/**
 * file that upload data on server on periodic interval.
 */

var cron = (function () {
    /*Upload interval in minutes*/
    var UPLOAD_INTERVAL = 1;
    var ALARM_NAME = "UPDATE_SERVER";
    var cron = {};
    chrome.alarms.onAlarm.addListener(function (Alarm) {
        if (Alarm.name === ALARM_NAME) {
            updateServer();
        }
    });

    function updateServer() {
        console.log("EVENT:UPDATE_SERVER");
        const _todayStr = moment().format("YYYY:MM:DD").toString();
        let keysArr,
            entityCollection,
            dateObj;
        myDb.getStorage()
            .then((resp)=> {
                dateObj = resp['my_stats'];
                keysArr = Object.keys(dateObj);
                keysArr.forEach((dateStr)=> {
                    entityCollection = prepareServerData(dateObj[dateStr]["websites"]);
                    myCloud.push(JSON.stringify({"value": JSON.stringify(entityCollection)}));
                    if (_todayStr !== dateStr) {
                        delete dateObj[dateStr];
                    }
                });
                myDb.setData(resp);
            })
            .catch((err)=> {
                console.log(err);
            });
    }

    function prepareServerData(websites) {
        let entityCollection = [];
        const websiteNames = Object.keys(websites);
        websiteNames.forEach((name, index)=> {
            entityCollection.push(websites[name]);
        });
        return entityCollection;
    }

    cron.init = function () {
        chrome.alarms.create(ALARM_NAME, {"periodInMinutes": UPLOAD_INTERVAL});
    };
    return cron;
}());
