import localforage from 'localforage';
import Q from 'q';
import _ from 'lodash';

import CommonConstants from '../utils/CommonConstants';

class MqttClientDbWorker {  

    constructor() {
        this.db = localforage.createInstance({name:"MQTT_CLIENT_SETTINGS",driver:localforage.INDEXEDDB});

        this.workerMessageListener = this.workerMessageListener.bind(this);
        this.saveMqttClientSettings = this.saveMqttClientSettings.bind(this);
        this.getAllMqttClientSettings = this.getAllMqttClientSettings.bind(this);
        this.deleteMqttClientSettingsById = this.deleteMqttClientSettingsById.bind(this);

        self.addEventListener('message',this.workerMessageListener,false);
    }

    workerMessageListener(event) {
        var data = event.data;
        switch(data.cmd) {
            case CommonConstants.WORKER_CMD_SAVE:
                this.saveMqttClientSettings(data.payload);
                break;
            case CommonConstants.WORKER_CMD_GET_ALL:
                this.getAllMqttClientSettings();
                break;
            case CommonConstants.WORKER_CMD_DELETE:
                this.deleteMqttClientSettingsById(data.payload.mcsId);
                break;
            default:
                break;
        }
    }

    saveMqttClientSettings(obj) { 
        Q.invoke(this.db,'setItem',obj.mcsId,obj).done();
    }

    getAllMqttClientSettings() { 
        var me =this;
        var mqttClientSettingsList = [];
        return Q.invoke(this.db,'iterate',
            function(value, key, iterationNumber) {
                mqttClientSettingsList.push(value);
            }
        ).then(function() {
            postMessage({event:CommonConstants.WORKER_EVENT_DATA,
                payload:_.sortBy(mqttClientSettingsList, ['createdOn'])
            });
        }.bind(this));
    }

    deleteMqttClientSettingsById(mcsId) {
        return Q.invoke(this.db,'removeItem',mcsId).done();
    }
}

export default new MqttClientDbWorker();