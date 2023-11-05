document.querySelectorAll(".action-update").forEach(elem => {
    elem.addEventListener("click", evt=> updateEvent(evt));
});

function updateEvent(event){
    if(document.querySelector(".modal-translucent") == null){
        createModal();
        updateModalData(event);
        //Time out for animations
        setTimeout(() => {
            document.querySelector("#modal-form").addEventListener("submit", evt => {
                evt.preventDefault();
                let xhr = new XMLHttpRequest();
                sendRequest(xhr, "./operations/update.php");
                respondUpdate(xhr);
            });
            document.querySelector("#modal-form>.btn-form-cancel").addEventListener("click",
                evt => closeModal(evt));
        }, 1000);
    }
}

function sendRequest(xhr, url){
    let columns = [];
    let values = [];
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf8");
    document.querySelectorAll("#modal-form>.form-row>[name]").forEach(elem => {
        columns.push(elem.name);
        values.push(elem.value);
    });
    xhr.send(JSON.stringify([
        columns,
        values,
        document.querySelector("[id*=table-]").id.split("-")[1]]
    ));
}

function respondUpdate(xhr){
    xhr.onload = () =>{
        let json = JSON.parse(xhr.response);
        if(json.Type === "Failed"){
            document.querySelector(".modal").append(json.Type);
        }else{
            document.querySelector(".modal-translucent").style.transition = "ease-out 1s";
            document.querySelector(".modal-translucent").style.animation = "bg-slide-out 1s";
            setTimeout(() => document.querySelector(".modal-translucent").remove(), 800);
            document.querySelector(".table-container").prepend("Entry updated!");
            let data = document.querySelectorAll(`[id*=table-]>tbody>tr[class='${json[0]}']>td`);
            for (let i = 0; i < data.length-1; i++) {
                data[i].innerText = json[i];
            }
        }
    }
}