import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import LeftMenuButton from '../common/LeftMenuButton';

export default class MqttClientDashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Toolbar>
            <ToolbarGroup>
                <LeftMenuButton/>
                <RaisedButton href="#/addEditMqttClient" label="ADD NEW MQTT CLIENT" primary={true}/>
            </ToolbarGroup>
            <ToolbarGroup>
              <FlatButton disabled={true} label="MQTT Clients"/>
            </ToolbarGroup>
          </Toolbar>
        </div>
    );
  }
}