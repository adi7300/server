const { google } = require("googleapis");

let gcsKey;
try {
  // Use the correct credentials file
  gcsKey = require("/Users/adimagori/Development/json/tmb_2024_78ad24b6f2da.json");
  
  // Fix the private key formatting - this is crucial
  if (gcsKey.private_key) {
    gcsKey.private_key = gcsKey.private_key.replace(/\\n/g, '\n');
  }
} catch (error) {
  console.error("Error loading credentials:", error);
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