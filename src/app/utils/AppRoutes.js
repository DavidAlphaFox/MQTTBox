import React from 'react';
import {Route} from 'react-router';

import Main from '../components/Main';
import MqttClientDashboard from '../components/mqttClient/MqttClientDashboard';
import AddEditMqttClient from '../components/mqttClient/AddEditMqttClient';

const AppRoutes = (
    <Route path="/" component={Main}>
        <Route path="/mqttclientsDashboard" component={MqttClientDashboard}/>
        <Route path="/addEditMqttClient" component={AddEditMqttClient}/>
    </Route>
);
export default AppRoutes;