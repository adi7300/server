//Grey table
const styleTourLeaderSection = async (sheets, spreadsheetId) => {
  console.log("🚀🚀🚀 - Starting GREY Table styling");
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 7, // End at column G
              },
              top: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              bottom: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              left: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              right: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0,
                endColumnIndex: 7, // End at column G
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.73,
                    green: 0.73,
                    blue: 0.73,
                  },
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error("styleTourLeaderSection error is:", error);
  }
};

//Pink table
const stylePaxListSection = async (sheets, spreadsheetId, PaxNo) => {
  console.log("🚀🚀🚀 - Starting PINK Table styling");
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: PaxNo + 2,
                startColumnIndex: 0,
                endColumnIndex: 7, // End at column G
              },
              top: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              bottom: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              left: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              right: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: PaxNo + 2,
                startColumnIndex: 0,
                endColumnIndex: 7, // End at column G
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 1,
                    green: 0.75,
                    blue: 0.8,
                  },
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat",
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error("stylePaxListSection error is:", error);
  }
};

//Green table

const stylePersonalPreferencesSection = async (sheets, spreadsheetId) => {
  console.log("🚀🚀🚀 - Starting GREEN Table styling");
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          // Apply green background to the entire section FIRST
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 5,
                startColumnIndex: 7, // Column H
                endColumnIndex: 12, // Column L
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.7,
                    green: 0.87,
                    blue: 0.71,
                  },
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields: "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat.bold",
            },
          },

          // Row 1 merges: H1-I1 (Personal preferences) and J1-K1 (Flights Reserved) and L1 (Terms)
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 7, // H1
                endColumnIndex: 9,   // I1
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 9,  // J1
                endColumnIndex: 11,  // K1
              },
              mergeType: "MERGE_ALL",
            },
          },

          // Row 2 merges: I2-J2 and K2-L2
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: 2,
                startColumnIndex: 8,  // I2
                endColumnIndex: 10,  // J2
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: 2,
                startColumnIndex: 10, // K2
                endColumnIndex: 12,  // L2
              },
              mergeType: "MERGE_ALL",
            },
          },

          // Row 3 merges: I3-J3 and K3-L3
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 2,
                endRowIndex: 3,
                startColumnIndex: 8,  // I3
                endColumnIndex: 10,  // J3
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 2,
                endRowIndex: 3,
                startColumnIndex: 10, // K3
                endColumnIndex: 11,  // L3
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 2,
                endRowIndex: 3,
                startColumnIndex: 11,  // I3
                endColumnIndex: 12,  // J3
              },
              mergeType: "MERGE_ALL",
            },
          },

          // Row 4: Booking Comments (I4-L4)
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 3,
                endRowIndex: 4,
                startColumnIndex: 8,  // I4
                endColumnIndex: 12,  // L4
              },
              mergeType: "MERGE_ALL",
            },
          },

          // Row 5: General Comments (I5-L5)
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 4,
                endRowIndex: 5,
                startColumnIndex: 8,  // I5
                endColumnIndex: 12,  // L5
              },
              mergeType: "MERGE_ALL",
            },
          },

          // Red text for "Terms accepted" cell (L1 only)
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 9, // J1
                endColumnIndex: 11,  // K1
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.7,
                    green: 0.87,
                    blue: 0.71,
                  },
                  textFormat: {
                    foregroundColor: {
                      red: 1,
                      green: 0,
                      blue: 0,
                    },
                    bold: true,
                  },
                  horizontalAlignment: "LEFT",
                },
              },
              fields: "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat.foregroundColor,userEnteredFormat.textFormat.bold,userEnteredFormat.horizontalAlignment"
            },
          },

          // Text wrapping for comment cells
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 3,
                endRowIndex: 5,
                startColumnIndex: 8,  // I4-I5
                endColumnIndex: 12,  // L4-L5
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.7,
                    green: 0.87,
                    blue: 0.71,
                  },
                  wrapStrategy: "WRAP",
                  horizontalAlignment: "LEFT",
                  verticalAlignment: "TOP",
                },
              },
              fields: "userEnteredFormat.backgroundColor,userEnteredFormat.horizontalAlignment,userEnteredFormat.verticalAlignment,userEnteredFormat.wrapStrategy",
            },
          },

          // Borders around the entire section
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 5,
                startColumnIndex: 7,
                endColumnIndex: 12,
              },
              top: {
                style: "SOLID",
                width: 5,
                color: { red: 0, green: 0, blue: 0 },
              },
              bottom: {
                style: "SOLID",
                width: 5,
                color: { red: 0, green: 0, blue: 0 },
              },
              left: {
                style: "SOLID",
                width: 5,
                color: { red: 0, green: 0, blue: 0 },
              },
              right: {
                style: "SOLID",
                width: 5,
                color: { red: 0, green: 0, blue: 0 },
              },
            },
          },
        ],
      },
    });


  } catch (error) {
    console.error("stylePersonalPreferencesSection error is:", error);
    throw error; // Re-throw to see the actual error
  }
};

//Blue table
const styleAccommodationSection = async (sheets, spreadsheetId, paxNo, accNo) => {
  // Make sure the blue table starts after the pink table and green table
  // Using Math.max to ensure it starts at least at row 6 or after PaxNo + 3
  const startingRow = Math.max(6, paxNo + 3);
  const endingRow = startingRow + accNo + 1;

  console.log("🚀🚀🚀 - Starting BLUE Table styling");

  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: startingRow,
                endRowIndex: endingRow,
                startColumnIndex: 0,
                endColumnIndex: 12,
              },
              top: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              bottom: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              left: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
              right: {
                style: "SOLID",
                width: 5,
                color: {
                  red: 0,
                  green: 0,
                  blue: 0,
                },
              },
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: startingRow,
                endRowIndex: endingRow,
                startColumnIndex: 0,
                endColumnIndex: 12,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    red: 0.6,
                    green: 0.8,
                    blue: 1,
                  },
                  textFormat: {
                    bold: true,
                  },
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat",
            },
          },
        ],
      },
    });
    console.log("Accommodation section styled successfully");
  } catch (error) {
    console.error("styleAccommodationSection error:", error);
  }
};

module.exports = {
  styleTourLeaderSection,
  styleAccommodationSection,
  stylePersonalPreferencesSection,
  stylePaxListSection,
};