import ReactDOM from 'react-dom';
import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {NotificationContainer} from 'react-notifications';
import StoreView from 'js/core/view/StoreView';

injectTapEventPlugin();
const MuiTheme = getMuiTheme();

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(
        <MuiThemeProvider muiTheme={MuiTheme}>
            <StoreView>
                <div>Hello!</div>
                <NotificationContainer/>
            </StoreView>
        </MuiThemeProvider>,

        document.getElementById("bodyContainer")
    );
});