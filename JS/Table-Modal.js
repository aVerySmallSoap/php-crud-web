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

function updateModalData(event){
    let xhr = new XMLHttpRequest();
    xhr.open("GET",
        `./operations/json_table.php?id=${event.currentTarget.dataset.tag}&table=${event.currentTarget.dataset.table}`);
    xhr.send();
    xhr.onload = function (){
        let res = JSON.parse(xhr.response);
        setTimeout(() => {
            update_modal(document.querySelector(".modal"), res);
        }, 900);
    }
}

function addModalData(){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./operations/fetchLatestID.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(`table=${document.querySelector("[id*=table-]").id.split("-")[1]}`);
    xhr.onload = function (){
        let res = JSON.parse(xhr.response);
        setTimeout(() => {
            add_modal(document.querySelector(".modal"), res);
        }, 900);
    }
}

function update_modal(modal, response){
    let div = document.createElement("div");
    let form = document.createElement("form");
    let headers = document.querySelectorAll("[id*=table-]>thead>tr>th");
    div.className = "row-container";
    form.id = "modal-form";
    modal.append(form);
    for (let i = 0; i < headers.length-1; i++) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let formRow = document.createElement("div");
        formRow.className = "form-row";
        label.innerText = headers[i].innerText;
        if(i === 0){
            input.setAttribute("disabled", "true");
            input.setAttribute("type", "text");
            input.setAttribute("value", response.Rows[i]);
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }else if(headers[i].className.includes("references-")){
            formRow.append(label, createOption(
                document.querySelector("[id*=table-]").id.split("-")[1],
                document.querySelector("[class*=references-]").className.split("-")[1],
                response.Columns[i]));
            div.append(formRow);
        }else{
            input.setAttribute("type", "text");
            input.setAttribute("value", response.Rows[i]);
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }
    }
    form.append(div);
    actionElements(form);
}

function add_modal(modal, response){
    let div = document.createElement("div");
    let form = document.createElement("form");
    let headers = document.querySelectorAll("[id*=table-]>thead>tr>th");
    div.className = "row-container";
    form.id = "modal-form";
    modal.append(form);
    for (let i = 0; i < headers.length-1; i++) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let formRow = document.createElement("div");
        formRow.className = "form-row";
        label.innerText = headers[i].innerText;
        if(i === 0){
            input.setAttribute("disabled", "true");
            input.setAttribute("name", response.Columns[i]);
            input.setAttribute("value", response.ID);
            formRow.append(label, input);
            div.append(formRow);
        }else if (headers[i].className.includes("references-")) {
            formRow.append(label, createOption(
                document.querySelector("[id*=table-]").id.split("-")[1],
                document.querySelector("[class*=references-]").className.split("-")[1],
                response.Columns[i]));
            div.append(formRow);
        }else{
            input.setAttribute("type", "text");
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }
    }
    form.append(div);
    actionElements(form)
}

function createOption(table, reference, parent){
    let xhr = new XMLHttpRequest();
    let select = document.createElement("select");
    xhr.open("GET", `./operations/json_allTableEntries.php?table=${table}&reference=${reference}`, true);
    xhr.send();
    xhr.onload = () => {
        let res = JSON.parse(xhr.response);
        select.setAttribute("name", parent);
        for (let i = 0; i < res.length; i++) {
            let option = document.createElement("option");
            option.value = res[i];
            option.innerText = res[i];
            select.appendChild(option);
        }
    }
    return select;
}

function actionElements(form){
    let div = document.createElement("div");
    let submit = document.createElement("button");
    let cancel = document.createElement("button");
    div.className = "form-control";
    submit.type = "submit";
    submit.innerText = "Submit";
    submit.className = "btn-form-submit";
    cancel.innerText = "Cancel";
    cancel.className = "btn-form-cancel";
    cancel.addEventListener("click", event => {
        event.preventDefault();
        closeModal();
    })
    div.append(submit,cancel);
    form.append(div);
}

function closeModal(){
    document.querySelector(".modal-translucent").style.transition = "ease-out 1s";
    document.querySelector(".modal-translucent").style.animation = "bg-slide-out 1s";
    setTimeout(() => document.querySelector(".modal-translucent").remove(), 800);
}