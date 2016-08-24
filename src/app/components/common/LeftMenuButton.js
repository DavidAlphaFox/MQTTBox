import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import ActionDehaze from 'material-ui/svg-icons/image/dehaze';

import CommonActions from '../../actions/CommonActions';

const styles = {
    button: {
        marginTop: 10
    }
};

export default React.createClass({
  render() {
    return (<FlatButton
             label="Menu"
             onTouchTap={CommonActions.showHideAppLeftMenu.bind(this,{open:true})}
             labelPosition="before"
             style={styles.button}
             icon={<ActionDehaze />}
           />);
  }
});