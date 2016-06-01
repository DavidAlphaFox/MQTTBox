import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import BrokerSettingsAction from '../actions/BrokerSettingsAction';

class SubscriberForm extends React.Component {
    constructor(props) {
        super(props);
        this.onTopicChange = this.onTopicChange.bind(this);
        this.onQosChange = this.onQosChange.bind(this);
        this.subscribeToTopic = this.subscribeToTopic.bind(this);
        this.saveSubscriberSettings = this.saveSubscriberSettings.bind(this);

        this.state = {
            qos:this.props.subscriberSettings.qos,
            topic:this.props.subscriberSettings.topic
        }
    }

    onTopicChange(event) {
        this.setState({topic:event.target.value});
    }

    onQosChange(event, index, value) {
        this.setState({qos:value});
    }

    subscribeToTopic() {
        this.saveSubscriberSettings();
        if(BrokerConnectionFactory.isBrokerConnected(this.props.bsId)) {
            BrokerSettingsAction.subscribeToTopic(this.props.bsId,this.props.subscriberSettings.subId,
                this.state.topic,
                {qos:this.state.qos});
        } else {
            alert('Broker is not connected. Please check broker settings.');
        }
    }

    saveSubscriberSettings() {
        var subSettings = {subId: this.props.subscriberSettings.subId,
                           topic: this.state.topic,
                           qos: this.state.qos};
        BrokerSettingsAction.onAddSubscriberButtonClick(this.props.bsId,subSettings);
    }

    render() {
        console.log('render SubscriberForm');
        return (
            <div>
                <TextField onBlur={this.saveSubscriberSettings} onChange={this.onTopicChange} fullWidth={true} value={this.state.topic} hintText="Topic to publish" floatingLabelText="Topic to subscribe"/>
                <SelectField onBlur={this.saveSubscriberSettings} onChange={this.onQosChange} value={this.state.qos} fullWidth={true} value={this.state.qos} floatingLabelText='QOS'>
                    <MenuItem value={0} primaryText='0 - Almost Once'/>
                    <MenuItem value={1} primaryText='1 - Atleast Once'/>
                    <MenuItem value={2} primaryText='2 - Exactly Once'/>
                </SelectField>
                <RaisedButton onTouchTap={this.subscribeToTopic} label='Subscribe' primary={true}/>
            </div>
        );
    }
}

export default SubscriberForm;
