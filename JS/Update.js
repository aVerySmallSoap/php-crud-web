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
        }, 1000);
    }
}

function respondUpdate(xhr){
    xhr.onload = () =>{
        let json = JSON.parse(xhr.response);
        if(json.Type === "Failed"){
            createBanner(
                document.querySelector("#modal-form"),
                json.Message,
                "#C51605",
                5000);
        }else{
            closeModal();
            let data = document.querySelectorAll(`[id*=table-]>tbody>tr[class='${json[0]}']>td`);
            for (let i = 0; i < data.length-1; i++) {
                data[i].innerText = json[i];
            }
            createBanner(document.querySelector("[class*=table-]"),
                "Entry successfully updated!",
                "#CECE5A",
                5000);
        }
    }
}