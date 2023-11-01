function createModal(Table){
    let parent = translucent();
    let div = document.createElement("div");
    div.className = "modal";
    div.style.animation = "bg-slide-in 600ms";
    setTimeout(() => {
        parent.append(div);
    }, 900);
}

function translucent(){
    let div = document.createElement("div");
    div.className = "modal-translucent";
    setTimeout(() => {
        div.addEventListener("click", () => {
            div.style.transition = "ease-out 1s";
            div.style.animation = "bg-slide-out 1s";
            setTimeout(() => div.remove(), 800);
        });
    }, 1500);
    document.body.append(div);
    return div;
}

function populate_modal(Table, event){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",
        `./operations/json_table.php?id=${event.currentTarget.dataset.tag}&table=${event.currentTarget.dataset.table}`);
    xhr.send();
    xhr.onload = function (){
        let res = JSON.parse(xhr.response);
        //Put form here
    }
}