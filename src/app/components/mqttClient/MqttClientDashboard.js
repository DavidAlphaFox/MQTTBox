import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Paper from 'material-ui/Paper';
import * as Colors from 'material-ui/styles/colors.js';

import MqttClientService from '../../services/MqttClientService';
import LeftMenuButton from '../common/LeftMenuButton';
import Utils from '../../utils/Utils';

const cols = {lg: 5, md: 4, sm: 2, xs: 1, xxs: 1};
const styles = {
    clientPaperOnline: {
        textAlign:'center',
        border:'1px solid green',
        backgroundColor:Colors.green50,
        padding:10
    },
    clientPaperOffline: {
        textAlign:'center',
        border:'1px solid red',
        backgroundColor:Colors.green50,
        padding:10
    }
};

export default class MqttClientDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {mqttClientSettings:MqttClientService.getAllMqttClientSettings()}
  }

  getAllMqttClientSettings() {
    this.setState({mqttClientSettings:MqttClientService.getAllMqttClientSettings()});
  }

  render() {
    var mqttClients = [];
    var layouts = {};

    if(this.state.mqttClientSettings!=null && this.state.mqttClientSettings.length>0) {
        layouts = Utils.getLayoutsForGrid(cols,this.state.mqttClientSettings.length);
        for(var i=0;i<this.state.mqttClientSettings.length;i++) {
            var mqttClient = this.state.mqttClientSettings[i];
            mqttClients.push(<Paper style={styles.clientPaperOnline} key={"g_"+(i+1)} zDepth={2}>
                                             <div><b>{mqttClient.mqttClientName}</b></div>
                                             <small>{mqttClient.protocol+' '+mqttClient.host+' '+mqttClient.port}</small>
                                          </Paper>);
        }
    }

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
          <ResponsiveReactGridLayout rowHeight={60} isDraggable={false} isResizable={false} className="layout"
          layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}} cols={cols}>
             {mqttClients}
          </ResponsiveReactGridLayout>
          <div style={{margin:10}}>
              {mqttClients.length<=0 ?(<div>
                  <h3>There are no MQTT clients added! <RaisedButton href="#/addEditMqttClient" label="ADD NEW MQTT CLIENT" primary={true}/></h3>
                </div>):null}
          </div>
        </div>
    );
  }
}