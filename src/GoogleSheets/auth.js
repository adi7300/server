const { google } = require("googleapis");

const gcsKey = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const authSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: gcsKey,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: authClient });
  const drive = google.drive({ version: "v3", auth: auth });

  return { auth, authClient, sheets, drive };
};

module.exports = { authSheets };