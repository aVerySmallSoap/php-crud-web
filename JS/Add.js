document.querySelector(".action-add").addEventListener("click", evt => {
    if(document.querySelector(".modal-translucent") == null){
        createModal();
        addModalData();
        //Time out for animations
        setTimeout(() => {
            document.querySelector("#modal-form").addEventListener("submit", evt => {
                evt.preventDefault();
                let xhr = new XMLHttpRequest();
                sendRequest(xhr, "./operations/add.php");
                respondAdd(xhr);
            });
            document.querySelector("#modal-form>.btn-form-cancel").addEventListener("click",
                evt => closeModal(evt));
        }, 1000);
    }
});

function respondAdd(xhr){
    xhr.onload = () => {
        let json = JSON.parse(xhr.response);
        let table = document.querySelector("[id*=table-]");
        let row = table.insertRow();
        row.className = json[0];
        for (let i = 0; i < json.length; i++) {
            let cell = row.insertCell(i);
            cell.innerText = json[i];
        }
        addCRUD(table, row, json[0]);
    }
}

function addCRUD(table, row, itemID){
    let Delete = document.createElement("button");
    let Update = document.createElement("button");
    Delete.innerText = "Delete";
    Update.innerText = "Update";
    Delete.className = "action-delete";
    Update.className = "action-update";
    Delete.dataset.table = table.id.split("-")[1];
    Update.dataset.table = table.id.split("-")[1];
    Delete.dataset.tag = itemID;
    Update.dataset.tag = itemID;
    Delete.addEventListener("click", e => deleteEvent(e));
    Update.addEventListener("click", e => updateEvent(e));
    row.insertCell().append(Delete, Update);
}