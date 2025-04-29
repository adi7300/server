const { formatDate } = require("../common/helpers.js");

const { authSheets } = require("./auth.js");
const {
  styleTourLeaderSection,
  stylePaxListSection,
  stylePersonalPreferencesSection,
  styleAccommodationSection,
} = require("./style.js");

const getSheetsData = async (spreadsheetId) => {
  try {
    const { sheets } = await authSheets();
    const getRows = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: "Sheet1",
    });
  } catch (error) {
    console.error("google sheets error is:", error);
  }
};

const createSpreadsheet = async (req, res) => {
  const { sheets } = await authSheets();
  const tourLeaderName = req.body.tourLeader.name;

  try {
    const response = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: tourLeaderName,
        },
      },
    });

    const spreadsheetId = response.data.spreadsheetId;

    await moveSpreadsheetToFolder(
      spreadsheetId,
      "1YnNPxKlT8Y25rnsY_rc_o0fKU0Uy8wK1"
    );

    await writeTourLeaderData(sheets, spreadsheetId, req.body); //Grey table
    await writePaxListData(sheets, spreadsheetId, req.body); //Pink table
    await writePersonalPreferencesData(sheets, spreadsheetId, req.body); //Green table
    await writeAccommodationData(sheets, spreadsheetId, req.body); //Blue table

    return res.json({
      message: `Google Sheet created with ID: ${spreadsheetId}`,
    });
  } catch (error) {
    console.error("Error creating Google Sheet:", error);
    res.status(500).json({ message: "Error creating Google Sheet" });
  }
};

const createPaxFolder = async ({ tourLeader }) => {
  const { drive } = await authSheets();
  drive.files.create(
    {
      resource: {
        name: tourLeader.name,
        mimeType: "application/vnd.google-apps.folder",
        parents: ["1YnNPxKlT8Y25rnsY_rc_o0fKU0Uy8wK1"],
      },
      fields: "id",
    },
    (err, file) => {
      if (err) {
        console.log("Error creating folder:", err);
      } else {
        console.log("Folder Id:", file.data.id);
      }
    }
  );
};

const moveSpreadsheetToFolder = async (spreadsheetId, folderId) => {
  const { drive } = await authSheets();

  try {
    await drive.files.update({
      fileId: spreadsheetId,
      addParents: folderId,
      removeParents: "root",
    });
  } catch (error) {
    console.error(
      "Error moving spreadsheet to folder:",
      error.response.data.error
    );
  }
};

const writeTourLeaderData = async (sheets, spreadsheetId, { tourLeader }) => {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      resource: {
        values: [
          ["Contact", tourLeader.name, tourLeader.phone, tourLeader.email],
        ],
      },
    });
    await styleTourLeaderSection(sheets, spreadsheetId);
  } catch (error) {
    console.error("writeSheetsData error is:", error);
  }
};

const writePaxListData = async (sheets, spreadsheetId, { paxList }) => {
  const valuesToAppend = paxList.map((pax) => [
    pax.contactPerson ? "V" : "",
    pax?.name || "",
    pax?.phone || "",
    pax?.email || "",
    pax?.diet || "",
    formatDate(pax?.birthDate) || "",
    pax.remarks || ""
  ]);

  valuesToAppend.unshift([
    "Contact person",
    "Name",
    "Phone",
    "E-Mail",
    "Diet",
    "Birth date",
    "Comments",
  ]);
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: "Sheet1!A2",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: valuesToAppend,
      },
    });
    await stylePaxListSection(sheets, spreadsheetId, paxList.length);
  } catch (error) {
    console.error("writeSheetsData error is:", error);
  }
};

const writePersonalPreferencesData = async (
  sheets,
  spreadsheetId,
  { otherComments, bookingPreference }
) => {
  const fromDate = bookingPreference.startingDate
    ? formatDate(bookingPreference.startingDate)
    : "";
  const untilDate = bookingPreference.endingDate
    ? formatDate(bookingPreference.endingDate)
    : "";

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,

      range: "Sheet1!H1:L5",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [
          ["Personal preferences", "", "", bookingPreference.flightBooked ? "Flights Reserved" : "", ""],
          ["Dates", "", bookingPreference.departureFlightNo ? `${fromDate} (${bookingPreference.departureFlightNo})` : fromDate, "", bookingPreference.returnFlightNo
            ? `${untilDate} (${bookingPreference.returnFlightNo})`
            : untilDate],
          ["Room Type", bookingPreference.roomType, bookingPreference.bedType, "", bookingPreference.level],
          ["Booking Comments", bookingPreference.remarks, "", "", ""],
          ["General Comments", otherComments, "", "", ""],
        ],
      },
    });
    await stylePersonalPreferencesSection(sheets, spreadsheetId);
  } catch (error) {
    console.error("writePersonalPreferencesData error is:", error);
  }
};

const writeAccommodationData = async (
  sheets,
  spreadsheetId,
  { accList, paxList }
) => {
  const startingRow = paxList.length + 3 < 7 ? 7 : paxList.length + 4;

  const valuesToAppend = accList.map((pax) => [
    pax.nightNo,
    pax.location,
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    `${pax.firstOption} ${pax.secondOption ? `\\${pax.secondOption}` : ""}  ${pax.thirdOption ? `\\${pax.thirdOption}` : ""
    } `,
    pax.remarks,
  ]);

  valuesToAppend.unshift([
    "Date",
    "Location",
    "Hotel / Hut",
    "Address",
    "Price(per person)",
    "Room type",
    "Board basis",
    "Payment date",
    "Cancellation policy",
    "Comments",
    "Client Preferences",
    "Client Remarks",
  ]);
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: `Sheet1!A${startingRow}`,
      valueInputOption: "RAW",
      resource: {
        values: valuesToAppend,
      },
    });
    await styleAccommodationSection(
      sheets,
      spreadsheetId,
      paxList.length,
      accList.length
    );

    const dropdownValues = await getDropdownValues(sheets);
    await addDropdownToColC(
      sheets,
      spreadsheetId,
      startingRow,
      startingRow + valuesToAppend.length,
      dropdownValues
    );
  } catch (error) {
    console.error("writeSheetsData error is:", error);
  }
};

const getDropdownValues = async (sheets) => {
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId: '1dLxWP5E8H0JU9DVcRHZR9WUswIA7CZcIxg_AjHLu9-g',
    range: 'Sheet1!B:B',
  });

  console.log('result.data.values: ', result.data.values)
  return result.data.values.flat().filter(Boolean);
};

const addDropdownToColC = async (sheets, spreadsheetId, startRow, endRow, dropdownValues) => {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          setDataValidation: {
            range: {
              sheetId: 0, // Usually 0 for the first sheet, but you may want to fetch the actual sheetId
              startRowIndex: startRow, // 0-based, inclusive
              endRowIndex: endRow - 1,     // 0-based, exclusive
              startColumnIndex: 2,     // Col C is index 2
              endColumnIndex: 3,
            },
            rule: {
              condition: {
                type: 'ONE_OF_LIST',
                values: dropdownValues.map(v => ({ userEnteredValue: v })),
              },
              showCustomUi: true,
              strict: true,
            },
          },
        },
      ],
    },
  });
};

// export default new GoogleSheets();

module.exports = {
  writeAccommodationData,
  writePersonalPreferencesData,
  writePaxListData,
  writeTourLeaderData,
  createPaxFolder,
  getSheetsData,
  createSpreadsheet,
};
