import { loadList } from './list.js';
import { changeUpdateVar } from './form.js';


document.getElementById("list-link").addEventListener("click", loadList);
document.getElementById("form-link").addEventListener("click", loadForm);
document.getElementById("new-button").addEventListener("click", loadForm);


export function loadForm() {
    changeUpdateVar(false);
    document.getElementById("list-link").style.color = "unset";
    document.getElementById("form-link").style.color = "blue";

    document.getElementById("grid-container").style.display = "none";
    document.getElementById("form-container").style.display = "flex";
    
    document.getElementById("main-title").innerHTML = "Create Event"

}