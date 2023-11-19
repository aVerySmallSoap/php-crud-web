document.querySelectorAll(".action-delete").forEach(elem => {
    elem.addEventListener("click", evt => deleteEvent(evt));
});

function deleteEvent(event){
    let choice = confirm("Are you sure about this?");
    if(choice === true){
        let xhr = new XMLHttpRequest();
        xhr.open("POST",
            `./operations/delete.php`);
        xhr.send(JSON.stringify([
                event.currentTarget.dataset.table,
                event.currentTarget.dataset.tag
            ])
        );
        xhr.onload = function (){
            let res = JSON.parse(xhr.response);
            if(res.Type === "Failed"){
                createBanner(
                    document.querySelector("[class*=table-]"),
                    "Failed!",
                    "#C51605",
                    5000);
            }else{
                let row = document.querySelector(`table>tbody>[class*="${res.id}"]`);
                row.style.transition = "ease-out 2000ms";
                row.style.animation = "item-slide-out 2000ms";
                createBanner(
                    document.querySelector("[class*=table-]"),
                    "Entry successfully deleted!",
                    "#CECE5A",
                    5000);
                setTimeout(() => {
                    row.remove();
                },1900);
            }
        }
    }
}
