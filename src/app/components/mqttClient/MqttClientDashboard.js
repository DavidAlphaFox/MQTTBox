import React from 'react';
import ActionDehaze from 'material-ui/svg-icons/image/dehaze';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';

import CommonActions from '../../actions/CommonActions';

export default class MqttClientDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.showAppLeftMenu = this.showAppLeftMenu.bind(this);
  }

  showAppLeftMenu() {
    CommonActions.showHideAppLeftMenu({open:true});
  }

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
            <IconButton onTouchTap={this.showAppLeftMenu}>
                <ActionDehaze/>
            </IconButton>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarTitle text="Options" />
          <FontIcon className="muidocs-icon-custom-sort" />
          <ToolbarSeparator />
          <RaisedButton label="Create Broadcast" primary={true} />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}