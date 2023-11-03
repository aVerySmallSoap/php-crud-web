document.querySelectorAll(".action-delete").forEach(elem => {
    elem.addEventListener("click", e => {
        let choice = confirm("Are you sure about this?");
        if(choice === true){
            let xhr = new XMLHttpRequest();
            xhr.open("GET",
                `./operations/delete.php?id=${e.currentTarget.dataset.tag}&table=${e.currentTarget.dataset.table}`);
            xhr.send();
            xhr.onload = function (){
                let res = JSON.parse(xhr.response);
                if(res.Response === "Success"){
                    let row = document.querySelector(`table>tbody>[class*="${res.id}"]`);
                    row.style.transition = "ease-out 2000ms";
                    row.style.animation = "item-slide-out 2000ms";
                    setTimeout(() => {
                        row.remove();
                    },1900);
                }else{
                    console.log("Error!");
                }
            }
        }
    });
});
