import {Spinner} from 'spin.js';


let opts = {
  lines: 13, // The number of lines to draw
  length: 5, // The length of each line
  width: 8, // The line thickness
  radius: 8, // The radius of the inner circle
  scale: 0.95, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 18, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#1c1c1c', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '38%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

  const target = document.getElementById('spinner_inner');
  const buttonSpinner = document.getElementById('spinner_on');
buttonSpinner.addEventListener('click', (e) => {
  const spinner = new Spinner(opts).spin(target);
})

/*function chartOnClick() {
  //How long to show the spinner for in ms (eg 3 seconds)
  let spinnerShowTime = 3000

  //Show the spinner
  document.getElementById('spinner').style.display = "";

  //Set the timeout on the spinner
  setTimeout("hideSpinner()", spinnerShowTime);
}

function hideSpinner() {
  document.getElementById('spinner').style.display = "none";
}
 
  // ПОКАЗАТЬ спиннер - spinner.show();
// ЗАКРЫТЬ  спиннер - spinner.close();*/
