document.querySelector("#form-login").addEventListener("submit", e => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    sendFormRequest(xhr, "./operations/login.php");
    xhr.onload = () => {
        let json = JSON.parse(xhr.response);
        if(json.Type === "Success"){
            createModal();
            appendToModal("Login Successful!");
            appendToModal(buttonRedirect());
        }else{
            createBanner(
                document.querySelector(".container-card"),
                json.Message,
                "red",
                5000);
        }
    };
});

function buttonRedirect(){
    let button = document.createElement("button");
    button.innerText = "Okay";
    button.addEventListener("click", () => window.location.replace("./Users.php"));
    return button;
}