const styleTourLeaderSection = async (sheets, spreadsheetId) => {
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
                endColumnIndex: 8,
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
                endColumnIndex: 8,
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

const stylePaxListSection = async (sheets, spreadsheetId, PaxNo) => {
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
                endRowIndex: 2, // Only the first row
                startColumnIndex: 0,
                endColumnIndex: 8,
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
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 1,
                endRowIndex: PaxNo + 2,
                startColumnIndex: 0,
                endColumnIndex: 8,
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
                endColumnIndex: 8,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    //Light Pink
                    red: 1,
                    green: 0.85,
                    blue: 0.87,
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

const stylePersonalPreferencesSection = async (sheets, spreadsheetId) => {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        requests: [
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 8,
                endColumnIndex: 13,
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 3,
                endRowIndex: 5,
                startColumnIndex: 8,
                endColumnIndex: 13,
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
                  wrapStrategy: "WRAP",
                  horizontalAlignment: "LEFT",
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.horizontalAlignment,userEnteredFormat.verticalAlignment,userEnteredFormat.wrapStrategy",
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 4,
                endRowIndex: 5,
                startColumnIndex: 8,
                endColumnIndex: 13,
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
                  wrapStrategy: "WRAP",
                  horizontalAlignment: "LEFT", // Align text to the left for second and third rows
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.horizontalAlignment,userEnteredFormat.verticalAlignment,userEnteredFormat.wrapStrategy",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 3,
                endRowIndex: 4,
                startColumnIndex: 9,
                endColumnIndex: 13,
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            mergeCells: {
              range: {
                sheetId: 0,
                startRowIndex: 4,
                endRowIndex: 5,
                startColumnIndex: 9,
                endColumnIndex: 13,
              },
              mergeType: "MERGE_ALL",
            },
          },
          {
            repeatCell: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 8,
                endColumnIndex: 13,
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
                    fontSize: 11,
                  },
                },
              },
              fields:
                "userEnteredFormat.backgroundColor,userEnteredFormat.textFormat,userEnteredFormat.horizontalAlignment,userEnteredFormat.verticalAlignment",
            },
          },
          {
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 1, // Only the first row
                startColumnIndex: 8,
                endColumnIndex: 13,
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
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: 0,
                endRowIndex: 5,
                startColumnIndex: 8,
                endColumnIndex: 13,
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
                endRowIndex: 5,
                startColumnIndex: 8,
                endColumnIndex: 13,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: {
                    //Light Green
                    red: 0.7,
                    green: 0.87,
                    blue: 0.71,
                  },
                  textFormat: {
                    bold: true, // Set text to bold for the first cell in the row
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
    console.error("stylePersonalPreferencesSection error is:", error);
  }
};

const styleAccommodationSection = async (
  sheets,
  spreadsheetId,
  paxNo,
  accNo
) => {
  const startingRow = paxNo + 3 < 6 ? 6 : paxNo + 3;
  const endingRow = startingRow + accNo + 1;

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
                endRowIndex: startingRow + 1,
                startColumnIndex: 0,
                endColumnIndex: 11,
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
            updateBorders: {
              range: {
                sheetId: 0,
                startRowIndex: startingRow,
                endRowIndex: endingRow,
                startColumnIndex: 0,
                endColumnIndex: 11,
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
                endColumnIndex: 11,
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
  } catch (error) {
    console.log("styleAccommodationSection batchUpdate error is:", error);
  }
};

module.exports = {
  styleTourLeaderSection,
  styleAccommodationSection,
  stylePersonalPreferencesSection,
  stylePaxListSection,
};
