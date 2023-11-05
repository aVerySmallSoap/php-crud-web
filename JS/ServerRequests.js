function sendRequest(xhr, url){
    let columns = [];
    let values = [];
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=utf8");
    document.querySelectorAll("#modal-form>.row-container>.form-row>[name]").forEach(elem => {
        columns.push(elem.name);
        values.push(elem.value);
    });
    xhr.send(JSON.stringify([
        columns,
        values,
        document.querySelector("[id*=table-]").id.split("-")[1]]
    ));
}