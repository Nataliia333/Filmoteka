
 export default {


queue (element){

    document.body.addEventListener( 'click', function ( event ) {

        if(event.toElement.className !== 'modal-btns-add-to-queue' ){
            return
        }
        else {
    console.log('URA');
    console.log(element);
    saveQueue(element);
    }
    
      });

    }
}

 function saveQueue(id){
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