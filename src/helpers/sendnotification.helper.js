// send_notification_helper.js
const { getMessaging } = require('firebase-admin/messaging');

const sendNotification = (message) => {
    return getMessaging().send(message)
        .then(response => {
            console.log('Successfully sent message:', response);
            return { success: true, response };
        })
        .catch(error => {
            console.error('Error sending message:', error);
            return { success: false, error: error.message };
        });
};

module.exports = {
    sendNotification
};
