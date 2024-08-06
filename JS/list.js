import { contactFromDB } from './connectDB.js';
import { loadForm } from './index.js';
import { changeUpdateVar } from './form.js';

window.addEventListener("load", loadList);

export function loadList() {
  document.getElementById("main-title").innerHTML = "Events"

  document.getElementById("list-link").style.color = "blue";
  document.getElementById("form-link").style.color = "unset";

  document.getElementById("grid-container").style.display = "flex";
  document.getElementById("form-container").style.display = "none";

  const main_content = document.getElementById("main");
  main_content.innerHTML = '';
  contactFromDB.once('value')
  .then((snapshot) => {
    const data = snapshot.val();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const {name, desc, date} = data[key];
        const recivedDate = new Date(date)

        const keyElement = document.createElement("p");
        keyElement.innerHTML = key;
        keyElement.style.display = 'none';
        const nameElement = document.createElement("label");
        const nameElementText = document.createTextNode(name);
        nameElement.appendChild(nameElementText);
        const dateElement = document.createElement("label");
        const dateElementText = document.createTextNode(recivedDate.toDateString());
        dateElement.appendChild(dateElementText);
        nameElement.style.fontFamily = `"Lucida Console", "Courier New", monospace`
        dateElement.style.fontFamily = `"Lucida Console", "Courier New", monospace`
        nameElement.style.fontSize = "16px";
        dateElement.style.fontSize = "12px";

        const divElement = document.createElement("div");

        const currDate = new Date();

        divElement.style.borderRadius = "5px";
        divElement.style.borderStyle = "solid";
        divElement.style.borderWidth = "5px";
        divElement.style.width = "0px";
        divElement.style.height = "0px";

        if (date == currDate.getTime())
            divElement.style.borderColor = "#179BAE";
        else if(date < currDate.getTime())
            divElement.style.borderColor = "#FF7F3E";
        else
            divElement.style.borderColor = "#7776B3";

        divElement.addEventListener("click", () => {
            const addButton = document.getElementById("add-button");
            addButton.innerHTML = "Save";
            addButton.disabled = false;

            loadForm();
            document.getElementById("main-title").innerHTML = "Edit Event";
            document.getElementById("event-name").value = name;
            document.getElementById("description").value = desc;
            document.getElementById("date").value = formatDateToYYYYMMDD(recivedDate);

            changeUpdateVar(true, key);
          })

        document.getElementById("main").appendChild(divElement);

        new Promise((resolve) => {
            let id = null;
            let pos = 0;
            clearInterval(id);
            id = setInterval(frame, 5);
            function frame() {
              if (pos == 120) {
                clearInterval(id);
                resolve();
              } else {
                pos++; 
                divElement.style.width = pos + "px"; 
                divElement.style.height = pos + "px"; 
              }
            }
        }).then(() => {
            divElement.appendChild(nameElement);
            divElement.appendChild(dateElement);    
            divElement.appendChild(keyElement);    
        })
      }
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });  
}

function formatDateToYYYYMMDD(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0'); // Pad single digits with leading zero
  
  return `${year}-${month}-${day}`;
}

