function create_events(){
    var group_buttons = document.getElementsByTagName("button");
    for (let index = 0; index < group_buttons.length; index++) {
        group_buttons[index].addEventListener("click", function (e) {
            e.preventDefault();
            var a_year_from_now = new Date()
            a_year_from_now.setFullYear(a_year_from_now.getFullYear() + 1);
            document.cookie = "name=Group"+(index+1)+";expires=" + a_year_from_now;
            document.location.assign("Grid.html");
})}};
