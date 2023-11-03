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
        console.log(json);
    }
}