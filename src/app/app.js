import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, hashHistory } from 'react-router'

import AppRoutes from './utils/AppRoutes';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
hashHistory.replace('/addEditMqttClient');

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(
  <Router history={hashHistory}>
    {AppRoutes}
  </Router>
, document.getElementById('app'));
