import moment from 'moment';

const defaultDateTimeFormat = "DD.MM.YYYY HH:mm:ss";

export default {

    formatDateTime: function(input) {
        return moment(input).format(defaultDateTimeFormat);
    },

    parseDateTime: function(input) {
        return moment(input, defaultDateTimeFormat).toDate();
    }
}