const { google } = require("googleapis");
const gcsKey = JSON.parse(
  Buffer.from(process.env.GCP_CRED_FILE, "base64").toString()
);

const authSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    // keyFile: "./keys.json",
    credentials: {
      client_email: gcsKey.client_email,
      private_key: gcsKey.private_key,
    },
    projectId: gcsKey.project_id,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  //Create client instance for auth
  const authClient = await auth.getClient();

  //Instance of the Sheets API
  const sheets = google.sheets({ version: "v4", auth: authClient });
  const drive = google.drive({ version: "v3", auth: auth });

  return {
    auth,
    authClient,
    sheets,
    drive,
  };
};

module.exports = { authSheets };
