
 export default {


queue (element){
document.body.addEventListener( 'click', function ( event ) {
if(event.toElement.className !== 'modal-btns-add-to-queue' ){
            return
        } else {
    saveToQueueList(element);
    event.toElement.innerHTML = 'added to queue';
    // deleteToQueue(element);
    console.log(event.toElement)
    }
     });
},

    watched (element){
document.body.addEventListener( 'click', function ( event ) {
   if(event.toElement.className !== 'modal-btns-left'){
              return
          }else {
      saveToWatchedList(element);
      }
      });
  },
}

 function saveToQueueList(id){
let newId = id;
if (localStorage.getItem('queue') === null){
    localStorage.setItem('queue', '[]');
}
let arr = JSON.parse(localStorage.getItem('queue'));
const i = arr.indexOf(newId);
if (i === -1) {
    arr.push(newId)
}
localStorage.setItem('queue', JSON.stringify(arr));
}


function saveToWatchedList(id) {
   let newId = id;
if (localStorage.getItem('watched') === null){
  localStorage.setItem('watched', '[]');
}
let arr = JSON.parse(localStorage.getItem('watched'));
const i = arr.indexOf(newId);
if (i === -1) {
    arr.push(newId)
}
    localStorage.setItem('watched', JSON.stringify(arr));
    console.log(localStorage.getItem('watched'))

} 


// function deleteToQueue(id) {
//     const items = JSON.parse(localStorage.getItem('queue'));
//     // console.log(items);
//     const newItems = items.filter(item => item !== id);
//     localStorage.setItem('queue', JSON.stringify(newItems));
// }


// const items = JSON.parse(localStorage.getItem('watched'));
// console.log(items)
// get items except for the one(s) you want to remove
// const newItems = items.filter(item => item !== '458220');
// save back to localStorage
// localStorage.setItem('watched', JSON.stringify(newItems));
// console.log(newItems)


// function btnHandler() {
  

//   const watchedList = JSON.parse(localStorage.getItem("watched")) || [];
//   const queueList = JSON.parse(localStorage.getItem("queue")) || [];

//   const { id } = openedMovie.movie;
//   if (watchedList.find((item) => item.id === id)) {
//     btnWatched.classList.add("details__btn--in-the-list");
//     btnWatched.textContent = `In watched list`;
//   }

//   if (queueList.find((item) => item.id === id)) {
//     btnQueue.classList.add("details__btn--in-the-list");
//     btnQueue.textContent = `In queue list`;
//   }


function checkFilmInQueue(id) {
    
}