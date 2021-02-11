

function saveToLocalStorageList(id, list){
let newId = id;
if (localStorage.getItem(list) === null){
    localStorage.setItem(list, '[]');
}
const arr = JSON.parse(localStorage.getItem(list));
const i = arr.indexOf(newId);
if (i !== -1) {
    return;
}
arr.push(newId)
localStorage.setItem(list, JSON.stringify(arr));
}



function modalBtnHandler(movieId) {
  const btnWatched = document.querySelector(".modal-btns-add-to-watched");
  const btnQueue = document.querySelector(".modal-btns-add-to-queue");
  checkList(movieId, "watched", btnWatched, btnQueue);
  checkList(movieId, "queue", btnQueue, btnWatched);
  btnWatched.addEventListener('click', modalWatchedHandler);
  btnQueue.addEventListener('click', modalQueueHandler);
  function modalWatchedHandler(event) {
  console.log(event)
        const id = localStorage.getItem('movieId');
        saveToLocalStorageList(id, 'watched');
            event.target.innerHTML = 'Added to watched';
            event.target.style.backgroundColor='#ff6b08';
  btnQueue.setAttribute("disabled", "disabled");
  }
  function modalQueueHandler(event) {
  console.log(event)
        const id = localStorage.getItem('movieId');
         saveToLocalStorageList(id, 'queue');
            event.target.innerHTML = 'Added to "QUEUE"';
            event.target.style.backgroundColor='#ff6b08';
  btnWatched.setAttribute("disabled", "disabled");
  }
  function checkList(movieId, list, btnLink, btnDisable) {
  const filmList = JSON.parse(localStorage.getItem(list));
  const findMovie = filmList.find(el => el === movieId);
  if (findMovie) {
    btnLink.textContent = `In ${list} list`;
    btnLink.style.backgroundColor = '#ff6b08';
    btnLink.style.color = '#ffffff';
    btnLink.setAttribute("disabled", "disabled");
    btnDisable.setAttribute("disabled", "disabled");
  }
}
}


export { modalBtnHandler}

