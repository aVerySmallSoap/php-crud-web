document.querySelector("#form-register").addEventListener("submit", e => {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    sendFormRequest(xhr, "./operations/register.php");
    xhr.onload = () => {
        let json = JSON.parse(xhr.response);
        if(json.Type === "Success"){
            createModal();
            appendToModal("Registration successful!");
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
    button.addEventListener("click", () => window.location.replace("./login.html"));
    return button;
}

