import AppDispatcher from '../dispatcher/AppDispatcher';
import MqttClientConstants from '../utils/MqttClientConstants';

class MqttClientActions {  

    static saveMqttClientSettings(data) { 
        AppDispatcher.dispatch({ 
            actionType: MqttClientConstants.ACTION_SAVE_MQTT_CLIENT, 
            data: data 
        }); 
    }

}

export default MqttClientActions;