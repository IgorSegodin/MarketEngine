import React from 'react';

require('react-notifications/lib/notifications.css');
import {NotificationContainer, NotificationManager} from 'react-notifications';

/**
 * Notification factory
 * */
export default {

    success: function(text) {
        NotificationManager.success(text, 'Success');
    },

    error: function(text) {
        NotificationManager.error(text, 'Error');
    }
}