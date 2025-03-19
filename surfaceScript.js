// order (top to bottom) in which to display scans
const scanNumbers = [39, 128, 86, 109, 144, 9, 159];

// three types of each image, each with a different file name convention
var imgNames = ["_penplot.jpg", "_posterized.jpg", ".jpg"];
// penplot and original scan images shrink to match posterized padding
var imgStyles = [
    "width: 83%; padding: 11% 15%;",
    "width: 100%; margin-left: 7%;",
    "width: 83%; padding: 11% 15%;"
  ];

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
  var colWidth = Math.min(40, 90/numCols - 3);

  for (var i = 0; i < scanNumbers.length; i++) {
      var scanString = "scan" + scanNumbers[i];
      var res = document.createElement("div");
      res.setAttribute("class", "sec");
      res.style = "height: 100%";

      var row = document.createElement("div");
      row.setAttribute("class", "row");
      row.style = "height: 100%";
      res.appendChild(row);

      for (var j = 0; j < 3; j++) {
        if (colBools[j]) {
          var col = document.createElement("div");
          col.setAttribute("class", "column");
          col.style = "width: " + colWidth + "%; height: 100%"
          var img = document.createElement("img");
          img.src = "images/" + scanString + imgNames[j];
          img.style = imgStyles[j];
          col.appendChild(img);
          row.appendChild(col);
        };
      };

      if (i == scanNumbers.length - 1) {
        var reflection = document.createElement("div");
        reflection.setAttribute("class", "reflection sec");
        reflection.innerHTML = "<br><p>I used this project on \"surfaces\" to explore dimensionality. Each scan represents a 3D object, each posterized image represents a 2D surface, and each pen plot represents a 1D line. Each of these representations, then, is viewed via the 2D surface of a screen (or piece of paper). As I worked on this project, I wondered about the relationship between the dimensionality of an object and the dimensionality of the space in which that object is viewed. Despite the definition of a surface as a 2D object, I intuitively think of a surface in three dimensions, perhaps since my first association is to 3D plots of surfaces from multivariable Calculus. We add a third dimension to the plots to fully see the behavior of the 2D surface, just as we add a second dimension (y-axis) to the plot of a curve or line and add a single dimension (number line) to the plot of a 0D point. The \"surface\" is a 2-dimensional medium through which we can imagine worlds  dimensions removed.</p>"

        res.appendChild(reflection);
      };

      document.body.appendChild(res);
    }
}
