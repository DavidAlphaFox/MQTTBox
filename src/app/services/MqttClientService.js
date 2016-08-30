import Events from 'events';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import MqttClientConstants from '../utils/MqttClientConstants';
import CommonConstants from '../utils/CommonConstants';

class MqttClientService extends Events.EventEmitter {

    constructor() {
        super();

        this.mqttClients = {};
        this.initComplete = false;
        this.MqttClientDbWorker = new Worker('./workers/MqttClientDbWorker.js');

        this.workerMessageListener = this.workerMessageListener.bind(this);
        this.registerToAppDispatcher = this.registerToAppDispatcher.bind(this);
        this.emitChange = this.emitChange.bind(this);
        this.addChangeListener = this.addChangeListener.bind(this);
        this.removeChangeListener = this.removeChangeListener.bind(this);
        this.syncMqttClientSettingsCache = this.syncMqttClientSettingsCache.bind(this);

        this.registerToAppDispatcher();

        this.dbWorker.addEventListener('message',this.workerMessageListener);
        this.dbWorker.postMessage({cmd:AppConstants.WORKER_CMD_GET_ALL});
    }

    registerToAppDispatcher() { 
        AppDispatcher.register(function(action) {
            switch(action.actionType) {
                case MqttClientConstants.ACTION_SAVE_MQTT_CLIENT:
                    this.saveMqttClientSettings(action.data);
                    break;
                default:
            }
        }.bind(this));
    }

    workerMessageListener(event) { 
        var data = event.data;
        switch(data.event) {
            case CommonConstants.WORKER_EVENT_DATA:
                this.syncBrokerSettingsCache(data.payload);
                break;
            default:
        }
    }

    syncMqttClientSettingsCache(mqttClientList) { 
        if(mqttClientList!=null && mqttClientList.length>0) {
            for(var i=0;i<mqttClientList.length;i++) {
                var mqttClientObj = mqttClientList[i];
                if(mqttClientObj!=null && mqttClientObj.mcsId!=null) {
                    this.mqttClients[mqttClientObj.mcsId] = mqttClientObj;
                    if(this.initComplete == false) {
                        //BrokerConnectionService.connectBroker(bsObj);
                    }
                }
            }
            this.emitChange(MqttClientConstants.EVENT_MQTT_CLIENT_DATA_CHANGED,mqttClientList[0].mcsId);
        }
        this.initComplete = true;
    }

    emitChange(event,data) { 
        this.emit(event,data);
    }

    addChangeListener(event,callback) { 
        this.on(event,callback);
    }

    removeChangeListener(event,callback) { 
        this.removeListener(event,callback);
    }

    getAllMqttClientSettings() { 
        return _.values(this.mqttClients);
    }

    saveMqttClientSettings(data) { 
        this.mqttClients[data.mcsId] = data;
        this.emitChange(MqttClientConstants.EVENT_MQTT_CLIENT_DATA_CHANGED,data.mcsId);
        //save with worker
        console.log('MqttClientService.saveMqttClientSettings = ',data);
    }
}

export default new MqttClientService();