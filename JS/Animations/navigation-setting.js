let isUp = false;
document.querySelector("#Setting").addEventListener("click", () => {
     if(!isUp){
         isUp = true;
         document.querySelector("#setting-arrow").style.transition = "transform ease 1s";
         document.querySelector("#setting-arrow").style.transform = "rotateX(-180deg)";
         dropDown();
     }else{
         isUp = false;
         document.querySelector("#setting-arrow").style.transform = "rotateX(0)";
         document.querySelector(".drop-menu").style.transition = "ease-out 1s";
         document.querySelector(".drop-menu").style.animation = "menu-slide-up 1s";
         setTimeout(() => document.querySelector(".drop-menu").remove(), 1000);
     }
});

function dropDown(){
    let div = document.createElement("div");
    let profile = document.createElement("a");
    let logout = document.createElement("a");
    div.className = "drop-menu";
    profile.innerText = "Profile";
    profile.href = "./operations/fetchProfile.php";
    logout.innerText = "Logout";
    logout.href = "./operations/logout.php";
    div.append(createDropDownRow(profile), createDropDownRow(logout));
    document.querySelector("#Setting").append(div);
}

function createDropDownRow(content){
    let row = document.createElement("div");
    row.className = "drop-row";
    row.append(content);
    return row;
}