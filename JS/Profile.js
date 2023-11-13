document.querySelector(".form-control>button").addEventListener("click", e =>{
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    sendFormRequest(xhr, "./operations/update.php");
    xhr.onload = () =>{
        let json = JSON.parse(xhr.response);
        if(json.Type === "Success"){
            createBanner(
                document.querySelector("[class*=container-]"),
                "Profile successfully updated!",
                "#CECE5A",
                5000);
        }else{
            createBanner(document.querySelector("[class*=container-]"),
                json.Message,
                "#C51605",
                5000);
        }
    }
});