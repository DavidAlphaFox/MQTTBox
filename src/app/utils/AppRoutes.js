import React from 'react';
import {Route} from 'react-router';

import Main from '../components/Main';
import MqttClientDashboard from '../components/mqttClient/MqttClientDashboard';

const AppRoutes = (
    <Route path="/" component={Main}>
        <Route path="/mqttclientsDashboard" component={MqttClientDashboard}/>
    </Route>
);
export default AppRoutes;