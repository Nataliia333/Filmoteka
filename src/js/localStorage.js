function saveToQueueList(id){
let newId = id;
if (localStorage.getItem('queue') === null){
    localStorage.setItem('queue', '[]');
}
const arr = JSON.parse(localStorage.getItem('queue'));
const i = arr.indexOf(newId);
if (i !== -1) {
    return;
}
arr.push(newId)
localStorage.setItem('queue', JSON.stringify(arr));
}


function saveToWatchedList(id) {
   let newId = id;
if (localStorage.getItem('watched') === null){
  localStorage.setItem('watched', '[]');
}
const arr = JSON.parse(localStorage.getItem('watched'));
const i = arr.indexOf(newId);
if (i !== -1) {
    return;
}
arr.push(newId)
    localStorage.setItem('watched', JSON.stringify(arr));
} 


function saveFilmToLocalstorage() {
   document.addEventListener('click', (event) => {
    switch (event.target.className) {
      case 'modal-btns-left': {
        const id = localStorage.getItem('movieId');
        saveToWatchedList(id);
            event.target.innerHTML = 'Added to watched';
            event.target.style.backgroundColor='#ff6b08';
        break;
      }
      case 'modal-btns-add-to-queue': {
        const id = localStorage.getItem('movieId');
        saveToQueueList(id);
            event.target.innerHTML = 'Added to "QUEUE"';
            event.target.style.backgroundColor='#ff6b08';
        break;
      }
      default: {
        console.log('default');
        break;
      }
    }
  })
}
  
  
export {
      saveFilmToLocalstorage,
}

