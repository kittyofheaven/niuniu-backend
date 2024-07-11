// send_notification_helper.js
const axios = require("axios");
const { google } = require("googleapis");

const getAccessToken = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    projectId: process.env.FIREBASE_PROJECT_ID,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token;
};

const sendNotification = async (message) => {
  try {
    const accessToken = await getAccessToken();
    // console.log("accessToken", accessToken);
    console.log("SENDING MESSAGE", message);

    const url = `https://fcm.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/messages:send`;

    const payload = {
      message: {
        token: message.token,
        notification: {
          title: message.title,
          body: message.body,
        },
        data: message.data ? message.data : {},
      },
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; UTF-8",
      },
    });

    console.log("Successfully sent message:", response.data);
    return { success: true, response: response.data };
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: error.response ? error.response.data.error : error.message,
    };
  }
};

module.exports = {
  sendNotification,
};
