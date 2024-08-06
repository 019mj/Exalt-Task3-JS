import { contactFromDB } from './connectDB.js';

document.getElementById("add-button").addEventListener('click', manageButton);
document.getElementById("event-name").addEventListener('input', checkInputs)
document.getElementById("date").addEventListener('input', checkInputs)
document.getElementById("cancel-button").addEventListener('input', cancelEvent)
let update = false, key;
function addToDB() {
    const name = document.getElementById("event-name").value;
    const desc = document.getElementById("description").value;
    const date = new Date(document.getElementById("date").value).getTime();

    const newEvent =  contactFromDB.push();

    newEvent.set({
        name: name,
        desc: desc,
        date: date
    })
        
   // window.location.href = "index.html";
    
}

function checkInputs() {
    const eventNameInput = document.getElementById("event-name");
    const dateInput = document.getElementById("date");
    const addButton = document.getElementById("add-button");
    addButton.disabled = (eventNameInput.value === "" || dateInput.value === "") ? true : false;
}

export function updateToDB(key){

    const name = document.getElementById("event-name").value;
    const desc = document.getElementById("description").value;
    const date = new Date(document.getElementById("date").value).getTime();

    const updatedData = {
        name: name,
        desc: desc,
        date: date
    };

    contactFromDB.child(key).update(updatedData, (error) => {
        if (error) {
          console.error('Update failed:', error);
        } else {
           // window.location.href = "index.html";
        }
      });
      
      
}

function manageButton() {
    if (update) {
      updateToDB(key);
    }else
      addToDB();
}

export function changeUpdateVar(value, keyValue){
    update = value;
    key = keyValue;    
}

function cancelEvent(){
  window.location.href = "index.html";
}