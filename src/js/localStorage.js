function saveToQueueList(id){
let newId = id;
if (localStorage.getItem('queue') === null){
    localStorage.setItem('queue', '[]');
}
const arr = JSON.parse(localStorage.getItem('queue'));
debugger;
console.log('queue', arr);
const i = arr.indexOf(newId);
if (i !== -1) {
    return;
}
arr.push(newId)
event.toElement.innerHTML = 'added to queue';
localStorage.setItem('queue', JSON.stringify(arr));
}


function saveToWatchedList(id) {
   let newId = id;
if (localStorage.getItem('watched') === null){
  localStorage.setItem('watched', '[]');
}
const arr = JSON.parse(localStorage.getItem('watched'));
console.log('watched', arr);
const i = arr.indexOf(newId);
if (i !== -1) {
    return;
}
arr.push(newId)
event.toElement.innerHTML = 'added to watched';
    localStorage.setItem('watched', JSON.stringify(arr));

} 

export {
    saveToWatchedList,
    saveToQueueList,
}

