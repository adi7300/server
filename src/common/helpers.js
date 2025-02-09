const { Base64 } = require("js-base64");
const { jsPDF } = require("jspdf");
const fs = require("fs");
require("jspdf-autotable");

const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Add 12 hours to ensure we're in the middle of the day
  date.setHours(12, 0, 0, 0);
  return date.toLocaleDateString('en-GB'); // This will format as DD/MM/YYYY
};

const exportToPDF = async (body, drive, pdfName) => {
  const { bookingPreference, accList, paxList, otherComments } = body;

  const _startingDate = formatDate(bookingPreference.startingDate);
  const _endingDate = formatDate(bookingPreference.endingDate);

  const PaxListColumns = ["Name", "Phone", "Email", "diet"];
  const PaxListDataKeys = ["name", "phone", "email", "diet"];

  const accListColumns = ["Night", "Location", "Options"];
  const accDataKeys = ["nightNo", "location", "options"];

  const bookingPreferenceValues = {
    ...bookingPreference,
    startingDate: _startingDate,
    endingDate: _endingDate,
  };

  const AccValuesToAppend = accList.map((acc) => ({
    nightNo: acc.nightNo,
    location: acc.location,
    options: `${acc.firstOption} ${acc.secondOption ? `\\${acc.secondOption}` : ""
      }  ${acc.thirdOption ? `\\${acc.thirdOption}` : ""} `,
    remarks: acc.remarks,
  }));

  const bookingPreferenceTableData = Object.entries(bookingPreferenceValues);
  const prefrencesStartingX = (1 + paxList.length) * 7.5 + 30;

  const doc = new jsPDF();
  // doc.addFont("Rubik.ttf", "Rubik", "normal");
  // doc.setR2L(true);
  const imgData = "data:image/jpeg;base64" + Base64.encode("logo.jpg");

  await doc.addImage(imgData, "JPEG", 50, 50, 180, 180);

  doc.text("Preperation for TMB", 60, 20);

  doc.text("Passengers:", 15, 30);
  doc.autoTable({
    head: [PaxListColumns], // Headers
    body: paxList.map((obj) => PaxListDataKeys.map((key) => obj[key])), // Data
    startY: 35,
    styles: {
      fontSize: 12,
      cellPadding: 0.2,
      lineColor: 200,
    },
    columnStyles: {
      0: { cellWidth: 40 }, // Customize column width if needed
    },
  });

  doc.text("Preferences:", 15, prefrencesStartingX + 5);
  doc.autoTable({
    body: bookingPreferenceTableData, // Table rows (header and values)
    startX: 10,
    startY: prefrencesStartingX + 10,
  });

  doc.text("Accommodation prefrences:", 15, prefrencesStartingX + 65);
  doc.autoTable({
    head: [accListColumns],
    body: AccValuesToAppend.map((obj) => accDataKeys.map((key) => obj[key])),
    startY: prefrencesStartingX + 70,
    styles: {
      fontSize: 12,
      cellPadding: 0.2,
      lineColor: 200,
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 55 },
      2: { cellWidth: 70 },
      3: { cellWidth: 50 },
    },
  });

  // doc.text(otherComments, 100, 20);

  // Save the PDF locally
  doc.save(`${pdfName}.pdf`);

  // Upload the PDF to Google Drive
  const fileMetadata = {
    name: `${pdfName} - TMB Preparation.pdf`, // Name of the PDF in Google Drive
    parents: ["1eJl9EM1im6t-sIN8qqQMkPi570tX_Fqx"], // Specify the folder where you want to save the PDF
  };

  const media = {
    mimeType: "application/pdf",
    body: fs.createReadStream(`${pdfName}.pdf`), // Read the local PDF file
  };

  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    (err, file) => {
      if (err) {
        console.error("Error uploading file to Google Drive:", err);
      } else {
        console.log(
          `PDF file uploaded to Google Drive with file ID: ${file.data.id}`
        );

        // Delete the local PDF file
        fs.unlink(`${pdfName}.pdf`, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error deleting local PDF file: ${unlinkErr}`);
          } else {
            console.log(`Local PDF file ${pdfName}.pdf deleted.`);
          }
        });
      }
    }
  );
};

module.exports = { formatDate, exportToPDF };
