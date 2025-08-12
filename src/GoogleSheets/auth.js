const { google } = require("googleapis");

let gcsKey;
try {
  const credentialsString = Buffer.from(process.env.GCP_CRED_FILE, "base64").toString();
  gcsKey = JSON.parse(credentialsString);

  // Fix the private key formatting - this is crucial
  if (gcsKey.private_key) {
    gcsKey.private_key = gcsKey.private_key.replace(/\\n/g, '\n');
  }
} catch (error) {
  console.error("Error parsing credentials:", error);
  throw error;
}

const authSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: gcsKey.client_email,
      private_key: gcsKey.private_key,
      project_id: gcsKey.project_id,
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  const authClient = await auth.getClient();
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