let group_buttons = document.getElementsByTagName("button");
let groups_of_pictures = document.getElementsByClassName("Single_Group");
function create_events(){
    
    for (let index = 0; index < group_buttons.length; index++) {
        group_buttons[index].addEventListener("click", function (e) {
            e.preventDefault();
            var a_year_from_now = new Date()
            a_year_from_now.setFullYear(a_year_from_now.getFullYear() + 1);
            document.cookie = "name=Group"+(index+1)+";expires=" + a_year_from_now;
            document.location.assign("Grid.html");
})}};



if(localStorage.getItem("darkMode") === "no"){
    localStorage.setItem("darkMode", "yes");
    switch_to_light_mode();
}
else if(localStorage.getItem("darkMode") === "yes"){
    localStorage.setItem("darkMode", "no");
    switch_to_dark_mode()
}


function switch_to_dark_mode(){
    if(localStorage.getItem("darkMode") === "no"){
        localStorage.setItem("darkMode", "yes");
        document.body.style.backgroundImage = "URL('../Images/dark-theme.jpg')";
        for (let index = 0; index < group_buttons.length; index++) {
            group_buttons[index].style.color = "rgb(107, 0, 102)";
        }
        for (let index = 0; index < groups_of_pictures.length; index++) {
            groups_of_pictures[index].style.backgroundColor = "rgba(0,0,0, 0.7)";
        }
    }
}

function switch_to_light_mode(){
    if(localStorage.getItem("darkMode") === "yes"){
        localStorage.setItem("darkMode", "no");
        document.body.style.backgroundImage = "URL('../Images/back-ground.png')";
        for (let index = 0; index < group_buttons.length; index++) {
            group_buttons[index].style.color = "rgb(226, 221, 221)";
        }
        for (let index = 0; index < groups_of_pictures.length; index++) {
            groups_of_pictures[index].style.backgroundColor = "rgba(226, 221, 221, 0.8)";
        }
    }
}

