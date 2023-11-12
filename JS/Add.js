document.querySelector(".action-add").addEventListener("click", evt => {
    if(document.querySelector(".modal-translucent") == null){
        createModal();
        addModalData();
        //Time out for animations
        setTimeout(() => {
            document.querySelector("#modal-form").addEventListener("submit", evt => {
                evt.preventDefault();
                let xhr = new XMLHttpRequest();
                sendTableRequest(xhr, "./operations/add.php");
                respondAdd(xhr);
            });
        }, 1000);
    }
});

function respondAdd(xhr){
    xhr.onload = () => {
        let json = JSON.parse(xhr.response);
        if(json.Type === "Failed"){
            createBanner(
                document.querySelector("#modal-form"),
                json.Message,
                "#C51605",
                5000);
        }else{
            let table = document.querySelector("[id*=table-]");
            let row = document.querySelector(`#${table.id}>tbody`).insertRow();
            row.className = json[0];
            for (let i = 0; i < json.length; i++) {
                let cell = row.insertCell(i);
                cell.innerText = json[i];
                cell.style.textAlign = "center";
            }
            addAction(table, row, json[0]);
            closeModal();
            createBanner(document.querySelector("[class*=table-]"),
                "Entry successfully added!",
                "#CECE5A",
                5000);
        }
    }
}

function addAction(table, row, itemID){
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