function createBanner(parent, message, color, duration){
    if(document.querySelector(".alert-banner") != null){
        document.querySelector(".alert-banner").remove();
    }
    let banner = document.createElement("div");
    let text = document.createElement("span");
    banner.className = "alert-banner";
    banner.style.backgroundColor = color;
    text.innerText = message;
    //intro animation
    //Outro animation; TODO: Nest setTimeout
    setTimeout(() => banner.remove(), duration);
    banner.append(text);
    parent.prepend(banner);
}