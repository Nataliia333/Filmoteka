import {Spinner} from 'spin.js';
import refs from './refs';


let opts = {
  lines: 30, // The number of lines to draw
  length: 30, // The length of each line
  width: 4, // The line thickness
  radius: 13, // The radius of the inner circle
  scale: 1.55, // Scales overall size of the spinner
  corners: 0, // Corner roundness (0..1)
  speed: 0.8, // Rounds per second
  rotate: 41, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b08;', // CSS color or array of colors
  fadeColor: '#ff6b08;', // CSS color or array of colors
  top: '30%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

// const target = document.getElementById('spinner');
const spinner = new Spinner(opts).spin( refs.spinner);

  


function startToSpin() {
  refs.spinner.classList.remove('is-hidden');
};

function stopToSpin() {
  refs.spinner.classList.add('is-hidden');
};


export {startToSpin, stopToSpin}