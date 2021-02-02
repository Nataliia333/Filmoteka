
 export default {


queue (element){
document.body.addEventListener( 'click', function ( event ) {
if(event.toElement.className !== 'modal-btns-add-to-queue' ){
            return
        } else {
    saveToQueueList(element);
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
} 
