function updateModalData(event){
    let xhr = new XMLHttpRequest();
    xhr.open("POST",
        `./operations/fetchTable.php`);
    xhr.send(JSON.stringify([
        event.currentTarget.dataset.tag,
        document.querySelector("[id*=table-]").id.split("-")[1]
    ]));
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
    form.append(div);
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
                headers[i],
                response.Columns[i]
                )
            );
            div.append(formRow);
        }else if(headers[i].className.includes("bind-")){
            div.append(formRow);
            setTimeout(() => {
                let bindInput = createBindInput(
                    headers[i].className.split("-")[1],
                    document.querySelector(
                        `#modal-form>.row-container>.form-row>select[data-bind=${headers[i].className.split("-")[1]}]`),
                    response.Columns[i]
                );
                if(headers[i].hasAttribute("data-calculable")){
                    bindInput.setAttribute("data-calculable", headers[i].dataset.calculable)
                }
                bindInput.setAttribute("value", response.Rows[i]);
                formRow.append(label, bindInput);
            }, 50);
        }else if(headers[i].hasAttribute("data-calculable") || headers[i].hasAttribute("data-calculate") ){
            if(headers[i].hasAttribute("data-calculate")){
                input.setAttribute("data-calculate", headers[i].dataset.calculate);
            }else{
                input.setAttribute("data-calculable", headers[i].dataset.calculable);
                input.setAttribute("disabled", "true");
            }
            input.setAttribute("value", response.Rows[i]);
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }else{
            input.setAttribute("type", "text");
            input.setAttribute("value", response.Rows[i]);
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }
    }
    actionElements(form);
    calculateData();
}

function add_modal(modal, response){
    let div = document.createElement("div");
    let form = document.createElement("form");
    let headers = document.querySelectorAll("[id*=table-]>thead>tr>th");
    div.className = "row-container";
    form.id = "modal-form";
    modal.append(form);
    form.append(div);
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
                headers[i],
                response.Columns[i]
                )
            );
            div.append(formRow);
        }else if(headers[i].className.includes("bind-")){
            div.append(formRow);
            setTimeout(() => {
                let bindInput = createBindInput(
                    headers[i].className.split("-")[1],
                    document.querySelector(
                        `#modal-form>.row-container>.form-row>select[data-bind=${headers[i].className.split("-")[1]}]`),
                    response.Columns[i]
                );
                if(headers[i].hasAttribute("data-calculable")){
                    bindInput.setAttribute("data-calculable", headers[i].dataset.calculable)
                }
                formRow.append(label, bindInput);
            }, 50);
        }else if(headers[i].hasAttribute("data-calculable") || headers[i].hasAttribute("data-calculate") ){
            if(headers[i].hasAttribute("data-calculate")){
                input.setAttribute("data-calculate", headers[i].dataset.calculate);
            }else{
                input.setAttribute("data-calculable", headers[i].dataset.calculable);
                input.setAttribute("disabled", "true");
            }
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }else{
            input.setAttribute("type", "text");
            input.setAttribute("name", response.Columns[i]);
            formRow.append(label, input);
            div.append(formRow);
        }
    }
    actionElements(form);
    calculateData();
}

function createOption(table, reference, column){
    let xhr = new XMLHttpRequest();
    let select = document.createElement("select");
    xhr.open("POST", `./operations/fetchReferenceTable.php`, true);
    xhr.send(JSON.stringify([
        table,
        reference.className.split("-")[1],
        column
    ]));
    xhr.onload = () => {
        let res = JSON.parse(xhr.response);
        select.setAttribute("name", column);
        if(reference.hasAttribute("data-bind")){
            select.setAttribute("data-bind", reference.className.split("-")[1]);
            select.addEventListener("change", (e) => {
                let columns = [];
                document.querySelectorAll("#modal-form>.row-container>.form-row>input[data-bind]").forEach(
                    e => {
                        columns.push(e.name);
                    }
                );
                let xhr = new XMLHttpRequest();
                xhr.open("POST", `./operations/refreshBoundData.php`, true);
                xhr.send(JSON.stringify([
                    e.target.dataset.bind,
                    columns,
                    e.target.name,
                    e.target.value
                ]));
                xhr.onload = () => {
                    let res = JSON.parse(xhr.response);
                    let fields =
                        document.querySelectorAll("#modal-form>.row-container>.form-row>input[data-bind]");
                    for (let i = 0; i < fields.length; i++) {
                        fields[i].value = res[i];
                    }
                }
                setTimeout(() => {
                    let x = document.querySelector("input[data-calculable*='var-']").value;
                    let y = document.querySelector("input[data-calculate]").value;
                    let z = x * y;
                    document.querySelector("input[data-calculable*='output']").value = z;
                }, 25);
            });
        }
        for (let i = 0; i < res.length; i++) {
            let option = document.createElement("option");
            option.value = res[i];
            option.innerText = res[i];
            select.appendChild(option);
        }
    }
    return select;
}

function createBindInput(table, reference, column){
    let xhr = new XMLHttpRequest();
    let input = document.createElement("input");
    xhr.open("POST", `./operations/fetchBoundData.php`, true);
    xhr.send(JSON.stringify([
        table,
        reference.getAttribute("name"),
        reference.value,
        column
    ]));
    xhr.onload = () => {
        let res = JSON.parse(xhr.response);
        input.setAttribute("name", column);
        input.setAttribute("data-bind", reference.dataset.bind);
        input.setAttribute("disabled", true);
        input.value = res[0];
    }
    return input;
}

function calculateData(){
    if(document.querySelector("th[data-calculate]") !== null){
        document.querySelector("input[data-calculate]").addEventListener("keyup", e => {
            let x = document.querySelector("input[data-calculable*='var-']").value;
            let y = e.currentTarget.value;
            let out = document.querySelector("input[data-calculable*='output']");
            out.value = x * y;
        });
    }
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