let startButton = document.getElementById("startButton")
let cookeies = document.cookie.split(";")
let selectCell
let curruntRow = 0;
let curruntCell = 0;
let values = {}
let grid_array = [];
let isfull = 0;
let column_pass = 0;
let row_pass = 0;
let timerInterval
cookeies.forEach(element => {
    values[element.split('=')[0].replace(' ', '')] = element.split('=')[1]
});
let maxCells = Math.pow(parseInt(values["level"]) + 1, 2);
let timer = 60 * values["level"];
let LiS = document.querySelectorAll('li[class="cell"]');
document.getElementById("playerName").innerText = values["userName"]
for (let i = 0; i < LiS.length; i++) {
    LiS[i].children[0].src = `../Images/${values["name"]}/${i + 1}.png`
}


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
    }
}

function switch_to_light_mode(){
    if(localStorage.getItem("darkMode") === "yes"){
        localStorage.setItem("darkMode", "no");
        document.body.style.backgroundImage = "URL('../Images/back-ground.png')";
    }
}


function reset_grid() {
    for (let i = 0; i < maxCells; i++) {
        grid_array.push([]);
        for (let j = 0; j < maxCells; j++) {
            grid_array[i].push(-1);
        }
    }
}

function add_the_highscore() {
    if (localStorage.getItem(values["userName"] + "-" + values["level"])) {
        let player_name_li = document.getElementsByClassName("playerName")[0];
        let the_score_LI = document.createElement("li");
        the_score_LI.classList.add("textDivTopPage");
        the_score_LI.classList.add("high-score");
        the_score_LI.innerHTML = "Your highscore: " + localStorage.getItem(values["userName"] + "-" + values["level"]);
        player_name_li.insertAdjacentElement("afterend", the_score_LI);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        if (timer < 0) {
            clearInterval(timerInterval)
            document.getElementById("timer").innerText = `00:00`;

            document.getElementById("timeout").innerHTML = "Timeout<span style='color: darkred;'>!</span>"
            playAgain();
        }
        else if (timer < 10)
            document.getElementById("timer").innerText = `00:0${timer}`
        else
            document.getElementById("timer").innerText = `00:${timer}`
    }, 1000)
}

function playAgain() {
    var element = document.getElementById("conf");
    element.classList.add("show-confirm");
    remove_confirm();

}
function remove_confirm() {
    if (document.getElementById("yes").name == "yes") {
        startButton.disabled = false
        timer = 60
        startButton.style.pointerEvents = "auto"
        location.reload();
        document.getElementById("yes").name == ""
    }
    else if (document.getElementById("no").name == "no") {
        location.assign("login-page.html");
        document.getElementById("no").name == "";
    }
}
function move(direction, axis) {
    if (axis == "y") {
        curruntRow = direction == -1 ? curruntRow - 1 : curruntRow + 1
        curruntRow = curruntRow < 0 ? maxCells - 1 : curruntRow > maxCells - 1 ? 0 : curruntRow;
    }
    else if (axis == "x") {
        curruntCell = direction == -1 ? curruntCell - 1 : curruntCell + 1
        curruntCell = curruntCell < 0 ? maxCells - 1 : curruntCell > maxCells - 1 ? 0 : curruntCell;
    }
    selectCell.classList.remove("choosen")
    selectCell = document.getElementById("grid").children[curruntRow].children[curruntCell]
    selectCell.classList.add("choosen")
}

function check_full() {
    isfull = 0;
    for (let i = 0; i < maxCells; i++)
        for (let j = 0; j < maxCells; j++)
            if (grid_array[i][j] == -1)
                isfull++;
    if (isfull == 0)
        return true;
    else
        return false;
}

function check_pass() {
    row_pass = 0;
    column_pass = 0;
    for (let row = 0; row < maxCells; row++) {
        for (let col = 0; col < maxCells; col++) {
            for (let i = 0; i < maxCells; i++)
                if (grid_array[row][col] == grid_array[i][col] && i != row)
                    row_pass++;
            for (let j = 0; j < maxCells; j++)
                if (grid_array[row][col] == grid_array[row][j] && j != col)
                    column_pass++;
        }
    }
    if (row_pass == 0 && column_pass == 0)
        return true;
    else
        return false;
}
function checkEndGame(){
    if((maxCells*(maxCells+1)/2)*maxCells == grid_array.reduce(function(a,b){return a.concat(b)}).reduce(function(a,b){return a+b})) 
    setTimeout(() => {

        var alert_element = document.getElementById("pop_up");
        alert_element.classList.add("show-modal");

        if (localStorage.getItem(values["userName"] + "-" + values["level"])) {
            if (localStorage.getItem(values["userName"] + "-" + values["level"]) < timer) {
                localStorage.setItem(values["userName"] + "-" + values["level"], timer);
                alert_element.children[0].children[0].innerHTML += "<br>" + "you also broke your high Score, now it's: " + (localStorage.getItem(values["userName"] + "-" + values["level"]));
            }
        }
        else {
            localStorage.setItem(values["userName"] + "-" + values["level"], timer);
        }
        clearInterval(timerInterval);
        reset_grid();
    }, 100);
}

function checkResult() {
    if (check_full()) {
        if (check_pass()) {
            setTimeout(() => {

                var alert_element = document.getElementById("pop_up");
                alert_element.classList.add("show-modal");

                if (localStorage.getItem(values["userName"] + "-" + values["level"])) {
                    if (localStorage.getItem(values["userName"] + "-" + values["level"]) < timer) {
                        localStorage.setItem(values["userName"] + "-" + values["level"], timer);
                        alert_element.children[0].children[0].innerHTML += "<br>" + "you also broke your high Score, now it's: " + (localStorage.getItem(values["userName"] + "-" + values["level"]));
                    }
                }
                else {
                    localStorage.setItem(values["userName"] + "-" + values["level"], timer);
                }
                clearInterval(timerInterval);
                reset_grid();
            }, 100);
        }
    }
}
function checkAvilablity(selector) {
    if (selector.children[0] && selector.children[0].name == "randomImage")
        return true
    else
        return false;
}

function putImage(imageNumber, rowNumber, cellNumber, randomImage = false) {
    let selectCell = document.getElementById("grid").children[rowNumber].children[cellNumber]
    let image = selectCell.children[0]
    if (!image) {
        image = document.createElement("img")
        image.classList.add("gameImage")
        selectCell.appendChild(image)
    }
    if (randomImage) {
        image.name = "randomImage"
        selectCell.style.borderColor = "green";
    }

    if (randomImage || !checkAvilablity(selectCell)) {
        image.src = `../Images/${values['name']}/${imageNumber}.png`;
        grid_array[rowNumber][cellNumber] = Number(imageNumber);
    }
}
function returnColumns() {
    let columns = {};
    for (let i = 0; i < maxCells; i++)
        columns[i] = 0;
    return columns
}
function getRandomImages(max = 4) {
    let dict = {}
    let columns = returnColumns()
    for (let i = 0; i < max; i++) {
        let curruntRow = i
        let curruntCell = parseInt(Math.random() * (max - 0) + 0)
        let randomeImage = parseInt(Math.random() * (max) + 1)

        if (!dict[randomeImage]) {
            if (columns[curruntCell] >= Math.floor(maxCells / 2)) {
                i--;
                continue
            }
            else {
                columns[curruntCell]++;
            }
            putImage(randomeImage, curruntRow, curruntCell, true)
            dict[randomeImage] = true;
        }
        else {
            i--;
        }
    }
}
function repairGrid() {
    for (let Rows = 0; Rows < maxCells; Rows++) {
        let newRow = document.createElement("div")
        newRow.classList.add("Rows")
        for (let cells = 0; cells < maxCells; cells++) {
            let newCell = document.createElement("div")
            newCell.classList.add("cell")
            newRow.appendChild(newCell)
            if (!Rows && !cells)
                newCell.id = "firstOne"
        }
        document.getElementById("grid").appendChild(newRow)
    }
    selectCell = document.getElementById("firstOne")
}

function the_event_on_the_Grid(e) {
    if (isFinite(e.key) && Number(e.key) > 0 && Number(e.key) < maxCells + 1)
        putImage(e.key, curruntRow, curruntCell)
    else if (e.code == 'ArrowLeft')
        move(-1, "x")
    else if (e.code == 'ArrowRight')
        move(1, "x")
    else if (e.code == 'ArrowUp')
        move(-1, "y")
    else if (e.code == 'ArrowDown')
        move(1, "y")
    checkResult()
    // checkEndGame()
}

startButton.addEventListener("click", () => {
    reset_grid();
    getRandomImages(maxCells)
    startButton.disabled = true
    document.getElementById("timer").innerText = `00:${timer}`
    startButton.style.pointerEvents = "none"
    document.getElementById("firstOne").classList.add("choosen")
    startTimer()
    document.body.addEventListener("keyup", the_event_on_the_Grid);
})


function remove_alert() {
    var element = document.getElementById("pop_up");
    element.classList.remove("show-modal");
    setTimeout(playAgain, 100);
}

function confirm_yes() {
    var element = document.getElementById("conf");
    element.classList.remove("show-confirm");
    document.getElementById("yes").name = "yes";
    remove_confirm();
}

function confirm_no() {
    var element = document.getElementById("conf");
    element.classList.remove("show-confirm");
    document.getElementById("no").name = "no";
    remove_confirm();
}
repairGrid()
add_the_highscore();
window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
