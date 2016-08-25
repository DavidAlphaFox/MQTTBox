import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Autorenew from 'material-ui/svg-icons/action/autorenew';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import UUID from 'node-uuid';

import LeftMenuButton from '../common/LeftMenuButton';
import MqttClientSettings from '../../models/MqttClientSettings';
import CommonActions from '../../actions/CommonActions';

const cols = {lg: 3, md: 3, sm: 2, xs: 1, xxs: 1};
const totalFormFields = 21;
const styles = {
    checkbox: {
        marginTop:30
    }
};

export default class AddEditMqttClient extends React.Component {

    constructor(props) {
        super(props);
        this.initBrokerObj = this.initBrokerObj.bind(this);
        this.onTargetValueChange = this.onTargetValueChange.bind(this);
        this.generateMqttClientId = this.generateMqttClientId.bind(this);
        this.onMqtt311CompliantChange = this.onMqtt311CompliantChange.bind(this);
        this.onProtocolValueChange = this.onProtocolValueChange.bind(this);
        this.onCheckBoxValueChange = this.onCheckBoxValueChange.bind(this);
        this.onWillQosValueChange = this.onWillQosValueChange.bind(this);

        this.saveMqttClientSettings = this.saveMqttClientSettings.bind(this);

        this.initBrokerObj(this.props.params);
    }

    initBrokerObj(params) {
        if(params!=null && params.bsId!=null && params.bsId.trim().length>0) {
            //this.state = BrokerSettingsService.getBrokerSettingDataByBsId(params.bsId);
        } else {
            this.state = new MqttClientSettings();
        }
    }

    onTargetValueChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    generateMqttClientId() {
        this.setState({mqttClientId:UUID.v4()});
    }

    onMqtt311CompliantChange(event) {
        var newState = {mqtt311Compliant:true,protocolId:'MQTT',protocolVersion:4};
        if(event.target.checked === false) {
            newState = {mqtt311Compliant:false,protocolId:'MQIsdp',protocolVersion:3};
        }
        this.setState(newState);
    }

    onProtocolValueChange(event, index, value) {
        this.setState({protocol:value});
    }

    onCheckBoxValueChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.checked;
        this.setState(newState);
    }

    onWillQosValueChange(event, index, value) {
        this.setState({willQos:value});
    }

    saveMqttClientSettings() {
        if(this.state!=null) {
            if(this.state.mqttClientName==null||this.state.mqttClientName.trim().length<1||this.state.mqttClientName.trim().length>500) {
                CommonActions.showMessageToUser({message:'Please enter valid MQTT client name'});
            } else if(this.state.mqttClientId==null||this.state.mqttClientId.trim().length<1||this.state.mqttClientId.trim().length>500) {
                CommonActions.showMessageToUser({message:'Please enter valid client id'});
            } else if(this.state.host==null||this.state.host.trim().length<1||this.state.host.trim().length>10000) {
                CommonActions.showMessageToUser({message:'Please enter valid host'});
            } else if(this.state.reconnectPeriod==null|| Number.isNaN(this.state.reconnectPeriod) || this.state.reconnectPeriod<=0) {
                CommonActions.showMessageToUser({message:'Please enter valid reconnect period'});
            } else if(this.state.connectTimeout==null|| Number.isNaN(this.state.connectTimeout) || this.state.connectTimeout<=0) {
                CommonActions.showMessageToUser({message:'Please enter valid connect timeout'});
            } else if(this.state.keepalive==null|| Number.isNaN(this.state.keepalive) || this.state.keepalive<0) {
                CommonActions.showMessageToUser({message:'Please enter valid keep alive'});
            } else if(this.state.willTopic!=null && this.state.willTopic.trim().length>0 &&
            (this.state.willTopic.indexOf('#') > -1 || this.state.willTopic.indexOf('+') > -1)) {
                CommonActions.showMessageToUser({message:'Please enter valid "will topic". Should not contain + or #'});
            } else {
                CommonActions.showMessageToUser({message:'Saved'});
                //CommonActions.saveBrokerSettings(this.state);
            }
        } else {
            CommonActions.showMessageToUser({message:'Please Enter Valid MQTT Client Settings'});
        }
    }

    getLayoutsFromGrid() {
        var layouts = {};
        for(var key in cols) {
            var maxX = cols[key],y = 0, x = 0, layout = [];
            for(var i=1;i<=totalFormFields;i++) {
                if(x>=maxX) {x = 0; y++;}
                layout.push({i:'field_'+i, x: x, y: y, w: 1, h: 1});
                x++;
            }
            layouts[key] = layout;
        }
        return layouts;
    }

    render() {
        var layouts = this.getLayoutsFromGrid();
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <LeftMenuButton/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton href="#/mqttclientsDashboard" label="MQTT Clients"/>
                    </ToolbarGroup>
                </Toolbar>
                <div style={{border: "1px solid #ccc",borderRadius:5,margin:10,paddingBottom:20}}>
                    <ResponsiveReactGridLayout rowHeight={60} isDraggable={false} isResizable={false} className="layout" layouts={layouts} breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                        cols={cols}>
                        <div key={"field_1"}>
                            <TextField name="mqttClientName" onChange={this.onTargetValueChange} value={this.state.mqttClientName} hintText="e.g: client 1" floatingLabelText="MQTT Client Name" floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_2"}>
                            <TextField name="mqttClientId" onChange={this.onTargetValueChange} value={this.state.mqttClientId} floatingLabelText="Client Id" floatingLabelFixed={true}/>
                            <IconButton onTouchTap={this.generateMqttClientId} tooltipPosition="top-center" tooltip='Generate new Client Id'>
                                <Autorenew/>
                            </IconButton>
                        </div>
                        <div style={styles.checkbox} key={"field_3"}>
                            <Checkbox name="timestampClientId" defaultChecked={this.state.timestampClientId} onCheck={this.onCheckBoxValueChange} label='Append timestamp to Client Id'/>
                        </div>
                        <div key={"field_4"}>
                            <SelectField name="protocol" onChange={this.onProtocolValueChange} value={this.state.protocol} floatingLabelText='Protocol'>
                                <MenuItem value={'tcp'} primaryText='tcp'/>
                                <MenuItem value={'ws'} primaryText='ws'/>
                                <MenuItem value={'mqtt'} primaryText='mqtt'/>
                            </SelectField>
                        </div>
                        <div key={"field_5"}>
                            <TextField name="host" onChange={this.onTargetValueChange} value={this.state.host} hintText='Host' floatingLabelText='Host' floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_6"}>
                            <TextField name="port" onChange={this.onTargetValueChange} value={this.state.port} hintText='Port' floatingLabelText='Port' floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_7"}>
                            <TextField name="username" onChange={this.onTargetValueChange} value={this.state.username} hintText='Username' floatingLabelText='Username' floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_8"}>
                            <TextField name="password" type='password' onChange={this.onTargetValueChange} value={this.state.password} hintText='Password' floatingLabelText='Password' floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_9"} style={styles.checkbox}>
                            <Checkbox name="clean" defaultChecked={this.state.clean} onCheck={this.onCheckBoxValueChange} label='Clean Session'/>
                        </div>
                        <div key={"field_10"}>
                             <TextField name="reconnectPeriod" type='number' onChange={this.onTargetValueChange} value={this.state.reconnectPeriod} hintText='Reconnect Period' floatingLabelText='Reconnect Period' floatingLabelFixed={true}/><span>milliseconds</span>
                        </div>
                        <div key={"field_11"}>
                            <TextField name="connectTimeout" type='number' onChange={this.onTargetValueChange} value={this.state.connectTimeout} hintText='Connect Timeout' floatingLabelText='Connect Timeout' floatingLabelFixed={true}/><span>milliseconds</span>
                        </div>
                        <div key={"field_12"}>
                            <TextField name="keepalive" type='number' onChange={this.onTargetValueChange} value={this.state.keepalive} hintText='KeepAlive' floatingLabelText='KeepAlive' floatingLabelFixed={true}/><span>seconds</span>
                        </div>
                        <div style={styles.checkbox} key={"field_13"}>
                            <Checkbox name="reschedulePings" defaultChecked={this.state.reschedulePings} onCheck={this.onCheckBoxValueChange} label='Reschedule Pings'/>
                        </div>
                        <div style={styles.checkbox} key={"field_14"}>
                            <Checkbox name="queueQoSZero" defaultChecked={this.state.queueQoSZero} onCheck={this.onCheckBoxValueChange} label='Queue outgoing QoS zero messages'/>
                        </div>
                        <div style={styles.checkbox} key={"field_15"}>
                            <Checkbox name="mqtt311Compliant" defaultChecked={this.state.mqtt311Compliant} onCheck={this.onMqtt311CompliantChange} label='Broker is MQTT v3.1.1 compliant'/>
                        </div>
                        <div key={"field_16"}>
                            <TextField name="willTopic" onChange={this.onTargetValueChange}  value={this.state.willTopic} hintText='Will - Topic' floatingLabelText='Will - Topic' floatingLabelFixed={true}/>
                        </div>
                        <div key={"field_17"}>
                            <SelectField name="willQos" onChange={this.onWillQosValueChange}  value={this.state.willQos} floatingLabelText='Will - QoS'>
                                <MenuItem value={0} primaryText='0 - Almost Once'/>
                                <MenuItem value={1} primaryText='1 - Atleast Once'/>
                                <MenuItem value={2} primaryText='2 - Exactly Once'/>
                            </SelectField>
                        </div>
                        <div style={styles.checkbox} key={"field_18"}>
                            <Checkbox name="willRetain" defaultChecked={this.state.willRetain} onCheck={this.onCheckBoxValueChange} label='Will - Retain'/>
                        </div>
                        <div key={"field_19"}>
                            <TextField name="willPayload" onChange={this.onTargetValueChange} value={this.state.willPayload} multiLine={true} rows={1}  hintText='Will - Payload' floatingLabelText='Will - Payload' floatingLabelFixed={true}/>
                        </div>
                        <div style={styles.checkbox} key={"field_20"}>
                            <RaisedButton onTouchTap={this.saveMqttClientSettings} label='Save' primary={true}/>
                        </div>
                        <div style={styles.checkbox} key={"field_21"}>
                            <RaisedButton label='Delete' secondary={true}/>
                        </div>
                    </ResponsiveReactGridLayout>
                </div>
            </div>
        );
    }
}