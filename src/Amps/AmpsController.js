import * as Amps from 'amps';
import serverconfig from '../serverconfig.json';

var targetConfig 
for(var item in serverconfig){
    if(serverconfig[item].active){
        targetConfig = serverconfig[item];
        break;
    }
}

var ip = targetConfig.serverIP;
var port = targetConfig.serverPort;

var ampsServerUriForJson = `ws://${ip}:${port}/amps/json`;
var ampsServerUriForProtobuf = `ws://${ip}:${port}/amps/sow-protobuf`;
var ampsClient = new Amps.Client(`AmpsWebClient-${Date.now()}`);
var ampsProtobufClient = new Amps.Client(`AmpsWebClientProtobuf-${Date.now()}`);

var AmpsControllerSingleton = (function () {
    var instance;
    return {
        getInstance: function () {
            if (instance !== undefined) {
                return instance;
            } else {
                instance = new AmpsController();
                return instance;
            }
        }
    }
})();

 class AmpsController {

    constructor() {
        this.ampsconnectObjectForJson = undefined;
        this.ampsconnectObjectForProtobuf = undefined;
    }

    connectAndSubscribe(dataUpdateCallback, subscriberInfoCallback, commandObject, groupingColumnKey) {
        let ampsCommandObject, tryCount = 0;
        if (!this.ampsconnectObjectForJson) {
            try {
                this.ampsconnectObjectForJson = ampsClient.connect(ampsServerUriForJson);
            } catch (e) {
                if (tryCount === 5) {
                    console.log('multiple connnection timeouts');
                } else {
                    tryCount++;
                    this.ampsconnectObjectForJson = ampsClient.connect(ampsServerUriForJson);
                }
            }
        }

        this.ampsconnectObjectForJson
            .then(() => {
                if (commandObject.command !== undefined) {
                    ampsCommandObject = new Amps.Command(commandObject.command);
                }

                if (commandObject.topic !== undefined) {
                    ampsCommandObject = ampsCommandObject.topic(commandObject.topic);
                }

                if (commandObject.filter !== undefined) {
                    ampsCommandObject = ampsCommandObject.filter(commandObject.filter);
                }

                if (commandObject.bookmark !== undefined) {
                    ampsCommandObject = ampsCommandObject.bookmark(commandObject.bookmark);
                }

                if (commandObject.orderBy !== undefined) {
                    ampsCommandObject = ampsCommandObject.orderBy(commandObject.orderBy);
                }

                if (commandObject.options !== undefined) {
                    ampsCommandObject = ampsCommandObject.options(commandObject.options);
                }

                return ampsClient.execute(ampsCommandObject, dataUpdateCallback);

            }).then((subId) => {
                console.log("Subscription ID: " + subId);
                if (groupingColumnKey === undefined) {
                    subscriberInfoCallback(subId);
                } else {
                    subscriberInfoCallback(subId, groupingColumnKey);
                }
            })
    }

    unsubscribe(subId, successCallback) {
        ampsClient.unsubscribe(subId)
            .then(() => {
                successCallback(subId);
            });
    }

    unsubscribe(subId, successCallback, subscriptionColumnReference) {
        ampsClient.unsubscribe(subId)
            .then(() => {
                console.log('Unsubscribed the subscription with ID : ' + subId);
                successCallback(subId, subscriptionColumnReference);
            });
    }

    connectAndSubscribeForProtobuf(dataUpdateCallback, subscriberInfoCallback, commandObject, groupingColumnKey) {
        let ampsCommandObject, tryCount = 0;
        if (!this.ampsconnectObjectForProtobuf) {
            try {
                this.ampsconnectObjectForProtobuf = ampsProtobufClient.connect(ampsServerUriForProtobuf);
            } catch (e) {
                if (tryCount === 5) {
                    console.log('multiple connnection timeouts');
                } else {
                    tryCount++;
                    this.ampsconnectObjectForProtobuf = ampsProtobufClient.connect(ampsServerUriForProtobuf);
                }
            }
        }

        this.ampsconnectObjectForProtobuf
            .then(() => {
                if (commandObject.command !== undefined) {
                    ampsCommandObject = new Amps.Command(commandObject.command);
                }

                if (commandObject.topic !== undefined) {
                    ampsCommandObject = ampsCommandObject.topic(commandObject.topic);
                }

                if (commandObject.filter !== undefined) {
                    ampsCommandObject = ampsCommandObject.filter(commandObject.filter);
                }

                if (commandObject.bookmark !== undefined) {
                    ampsCommandObject = ampsCommandObject.bookmark(commandObject.bookmark);
                }

                if (commandObject.orderBy !== undefined) {
                    ampsCommandObject = ampsCommandObject.orderBy(commandObject.orderBy);
                }

                if (commandObject.options !== undefined) {
                    ampsCommandObject = ampsCommandObject.options(commandObject.options);
                }

                return ampsProtobufClient.execute(ampsCommandObject, dataUpdateCallback);

            }).then((subId) => {
                console.log("Subscription ID: " + subId);
                if (groupingColumnKey === undefined) {
                    subscriberInfoCallback(subId);
                } else {
                    subscriberInfoCallback(subId, groupingColumnKey);
                }
            })
    }

    unsubscribeProtobuf(subId, successCallback) {
        ampsProtobufClient.unsubscribe(subId)
            .then(() => {
                successCallback(subId);
            });
    }

}

export default AmpsControllerSingleton;