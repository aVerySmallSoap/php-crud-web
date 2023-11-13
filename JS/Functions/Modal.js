function createModal(){
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
    document.body.append(div);
    return div;
}

function appendToModal(elem){
    setTimeout(() => {
        document.querySelector(".modal").append(elem);
    }, 900);
}

function prependToModal(elem){
    setTimeout(() => {
        document.querySelector(".modal").prepend(elem);
    }, 900);
}
