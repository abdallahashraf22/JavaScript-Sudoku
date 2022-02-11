let labels= document.getElementsByTagName("label");
let the_button = document.getElementsByTagName("button")[0];

if(!(localStorage.getItem("darkMode"))){
    localStorage.setItem("darkMode", "no");
}
else if(localStorage.getItem("darkMode") === "yes"){
    localStorage.setItem("darkMode", "no");
    switch_to_dark_mode()
}


function switch_to_dark_mode(){
    if(localStorage.getItem("darkMode") === "no"){
        localStorage.setItem("darkMode", "yes");
        document.body.style.backgroundImage = "URL('../Images/dark-theme.jpg')";
        for (let index = 0; index < labels.length; index++) {
            labels[index].style.color = "rgb(107, 0, 102)";
        }
        the_button.style.color ="rgb(107, 0, 102)";
        document.getElementsByName("Level_Num")[0].style.backgroundColor="#000000"
        document.getElementsByName("Level_Num")[0].style.color="grey"
        document.getElementsByName("username")[0].style.backgroundColor="#000000"
        document.getElementsByName("username")[0].style.color="grey"
    }
}

function switch_to_light_mode(){
    if(localStorage.getItem("darkMode") === "yes"){
        localStorage.setItem("darkMode", "no");
        document.body.style.backgroundImage = "URL('../Images/back-ground.png')";
        for (let index = 0; index < labels.length; index++) {
            labels[index].style.color = "rgb(156, 107, 3)";
        }
        the_button.style.color ="rgb(240, 227, 203)";
        document.getElementsByName("Level_Num")[0].style.backgroundColor="rgb(197, 167, 101)"
        document.getElementsByName("Level_Num")[0].style.color="black"
        document.getElementsByName("username")[0].style.backgroundColor="rgb(197, 167, 101)"
        document.getElementsByName("username")[0].style.color="black"
    }
}

function store_cookie() { 
var userName = document.getElementById("User").value;
var level_num = document.getElementById("select").value;
var a_year_from_now = new Date()
a_year_from_now.setFullYear(a_year_from_now.getFullYear() + 1);
document.cookie = "userName=" + userName + ";expires=" + a_year_from_now.toGMTString();  
document.cookie = "level=" + level_num + ";expires=" + a_year_from_now.toGMTString();
}

switch(window.location.protocol) {
    case 'file:':
        alert("you must run it from a server");
        window.close();
      break;
 }