function store_cookie() { 
    var userName = document.getElementsByTagName("input")[0].value;
    var level_num = document.getElementById("select").value;
    var a_year_from_now = new Date()
    a_year_from_now.setFullYear(a_year_from_now.getFullYear() + 1);
    document.cookie = "userName=" + userName + ";expires=" + a_year_from_now.toGMTString();  
    document.cookie = "level=" + level_num + ";expires=" + a_year_from_now.toGMTString();  
}