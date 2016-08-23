import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {blue500, red500, green500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import ActionClear from 'material-ui/svg-icons/content/clear';
import Divider from 'material-ui/Divider';

import CommonEventEmitter from '../../dispatcher/CommonEventEmitter';
import CommonConstants from '../../utils/CommonConstants';

const style = {
    leftFloat: {
        float:'left'
    },
    rightFloat: {
        float:'right'
    }
};

export default class AppLeftDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.showHideAppLeftMenu = this.showHideAppLeftMenu.bind(this);

    this.state = {open: false};
  }

  handleToggle() {
    this.setState({open: !this.state.open});
  }

  showHideAppLeftMenu(open) {
    this.setState({open:open});
  }

  componentDidMount() {
    CommonEventEmitter.addChangeListener(CommonConstants.EVENT_OPEN_CLOSE_APP_LEFT_DRAWER,this.showHideAppLeftMenu);
  }

  componentWillUnmount() {
    CommonEventEmitter.removeChangeListener(CommonConstants.EVENT_OPEN_CLOSE_APP_LEFT_DRAWER,this.showHideAppLeftMenu);
  }

  render() {
    return (
        <Drawer open={this.state.open} docked={true} onRequestChange={this.showHideAppLeftMenu}>
          <Toolbar>
              <ToolbarGroup style={style.leftFloat}/>
              <ToolbarGroup style={style.rightFloat}>
                  <IconButton onTouchTap={this.showHideAppLeftMenu.bind(this,false)}>
                      <ActionClear/>
                  </IconButton>
              </ToolbarGroup>
          </Toolbar>
          <Divider/>
        </Drawer>
    );
  }
}