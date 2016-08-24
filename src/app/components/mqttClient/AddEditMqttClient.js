import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import LeftMenuButton from '../common/LeftMenuButton';

export default class AddEditMqttClient extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
                <LeftMenuButton/>
            </ToolbarGroup>
          </Toolbar>
          <div>
            <h3>Add Mqtt Form</h3>
          </div>
        </div>
    );
  }
}