// order (top to bottom) in which to display scans
const scanNumbers = [39, 128, 86, 109, 144, 9, 159];

// three types of each image, each with a different file name convention
var imgNames = ["_penplot.jpg", "_posterized.jpg", ".jpg"];
// penplot and original scan images shrink to match posterized padding
var imgStyles = ["width: 83%; padding: 11% 15%;", "width:100%; margin-left: 7%;", "width: 83%; padding: 11% 15%;"];

var numCols = 1;
var penplotQ = false; //1 button
var posterQ = true; //2 button
var scanQ = false; //3 button

var onColor = "background-color: #ddd;";
var offColor = "background-color: #333;";

// button clicks toggle which columns to show
function toggleCols(colNum) {
  colButton = document.getElementById("col" + colNum);
  if (colNum == 1) {
    if(penplotQ) {colButton.style = offColor} else {colButton.style = onColor};
    penplotQ = !penplotQ;
  } else if (colNum == 2) {
    if(posterQ) {colButton.style = offColor} else {colButton.style = onColor};
    posterQ = !posterQ
  } else {
    if(scanQ) {colButton.style = offColor} else {colButton.style = onColor};
    scanQ = !scanQ
  };
  numCols = [penplotQ, posterQ, scanQ].filter(Boolean).length;
  makeScanSections([penplotQ, posterQ, scanQ]);
};

function makeScanSections(colBools) {
  document.querySelectorAll(".sec").forEach(e => e.remove());
console.log(colBools);
  var colWidth = Math.min(40, 90/numCols - 3);

  for (var i = 0; i < scanNumbers.length; i++) {
      var scanString = "scan" + scanNumbers[i];
      var section = document.createElement("section");
      section.setAttribute("class", "sec");

      var row = document.createElement("div");
      row.setAttribute("class", "row");
      section.appendChild(row);

      for (var j = 0; j < 3; j++) {
        if (colBools[j]) {
          var col = document.createElement("div");
          col.setAttribute("class", "column");
          col.style = "width: " + colWidth + "%;"
          section.appendChild(col);
          var img = document.createElement("img");
          img.src = "images/" + scanString + imgNames[j];
          img.style = imgStyles[j];
          col.appendChild(img);
        };
      };
      document.body.appendChild(section);
    }
}
