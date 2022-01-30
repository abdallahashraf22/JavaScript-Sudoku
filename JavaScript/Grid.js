let startButton = document.getElementById("startButton")
let cookeies = document.cookie.split(";")
let selectCell = document.getElementById("firstOne")
let curruntRow = 0;
let curruntCell = 0;
let values = {}
let grid_array = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
let isfull = 0;
let column_pass = 0;
let row_pass = 0;
let timerInterval
// let maxCells = values["level"]== 1 ? 4 : 9;
cookeies.forEach(element => {
    values[element.split('=')[0].replace(' ', '')] = element.split('=')[1]
});
let timer = 60 * values["level"];
let LiS = document.querySelectorAll('li[class="cell"]');
document.getElementById("playerName").innerText = values["userName"]
for (let i = 0; i < LiS.length; i++) {
    LiS[i].children[0].src = `../Images/${values["name"]}/${i + 1}.png`
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer--;
        if (timer < 0) {
            clearInterval(timerInterval)
            document.getElementById("timer").innerText = `00:00`;
            alert("sorry try again you will pass next time");
            playAgain()
        }
        else if (timer < 10)
            document.getElementById("timer").innerText = `00:0${timer}`
        else
            document.getElementById("timer").innerText = `00:${timer}`
    }, 1000)
}

function playAgain() {
    let result = confirm("would like play again");
    if (result) {
        startButton.disabled = false
        timer = 60
        startButton.style.pointerEvents = "auto"
        location.reload();
    }
    else{
        document.body.removeEventListener("keyup", (e) => {
            if (isFinite(e.key) && Number(e.key) > 0 && Number(e.key) < 5) 
                putImage(e.key,curruntRow,curruntCell)
            else if (e.code == 'ArrowLeft')
                move(-1,"x")
            else if (e.code == 'ArrowRight')
                move(1,"x")
            else if (e.code == 'ArrowUp')
                move(-1,"y")
            else if (e.code == 'ArrowDown')
                move(1,"y")
            checkResult()
        },false);
    }
}
// function moveDown() {
//     if (curruntRow < 3) {
//         selectCell.classList.remove("choosen")
//         selectCell.parentElement.nextElementSibling.nextElementSibling.children[curruntCell].classList.add("choosen")
//         selectCell = selectCell.parentElement.nextElementSibling.nextElementSibling.children[curruntCell]
//         console.log(selectCell)
//         curruntRow++
//     }
//     else {
//         curruntRow = 0
//         selectCell.classList.remove("choosen")
//         selectCell.parentElement.parentElement.children[curruntRow].children[curruntCell].classList.add("choosen")
//         selectCell = selectCell.parentElement.parentElement.children[curruntRow].children[curruntCell]
//     }
// }

// function moveUp() {
//     if (curruntRow > 0) {
//         selectCell.classList.remove("choosen")
//         selectCell.parentElement.previousElementSibling.previousElementSibling.children[curruntCell].classList.add("choosen")
//         selectCell = selectCell.parentElement.previousElementSibling.previousElementSibling.children[curruntCell]
//         console.log(selectCell)
//         curruntRow--
//     }
//     else {
//         curruntRow = 3
//         selectCell.classList.remove("choosen")
//         selectCell.parentElement.parentElement.children[curruntRow * 2].children[curruntCell].classList.add("choosen")
//         selectCell = selectCell.parentElement.parentElement.children[curruntRow * 2].children[curruntCell]
//     }
// }
// function moveRight() {
//     if (curruntCell < 3) {
//         selectCell.classList.remove("choosen")
//         selectCell.nextElementSibling.classList.add("choosen")
//         selectCell = selectCell.nextElementSibling
//         curruntCell++;
//     }
//     else {
    //         curruntCell = 0
    //         selectCell.classList.remove("choosen")
    //         selectCell = selectCell.parentElement.children[0]
    //         selectCell.classList.add("choosen")
    //     }
    // }
    // function moveLeft() {
        //     if (curruntCell > 0) {
            //         selectCell.classList.remove("choosen")
//         selectCell.previousElementSibling.classList.add("choosen")
//         selectCell = selectCell.previousElementSibling
//         curruntCell--;
//     }
//     else {
    //         curruntCell = 3
    //         selectCell.classList.remove("choosen")
    //         selectCell = selectCell.parentElement.children[3]
    //         selectCell.classList.add("choosen")
    //     }
    // }
    // function moveY(direction ) {
    //     curruntRow =  direction==-1?curruntRow-1:curruntRow+1   
    //     curruntRow=curruntRow <0 ? 3: curruntRow > 3 ? 0:curruntRow; 
    //     selectCell.classList.remove("choosen")
    //     selectCell = document.getElementById("grid").children[curruntRow * 2].children[curruntCell]
    //     selectCell.classList.add("choosen")
    // }
    // function moveX(direction ) {
    //     curruntCell =  direction==-1?curruntCell-1:curruntCell+1   
    //     curruntCell=curruntCell <0 ? 3: curruntCell > 3 ? 0:curruntCell; 
    //     selectCell.classList.remove("choosen")
    //     selectCell = document.getElementById("grid").children[curruntRow * 2].children[curruntCell]
    //     selectCell.classList.add("choosen")
    // }
    
function move(direction , axis) {
    if(axis == "y"){
        curruntRow =  direction==-1?curruntRow-1:curruntRow+1   
        curruntRow=curruntRow <0 ? 3: curruntRow > 3 ? 0:curruntRow; 
    }
    else if(axis == "x"){
        curruntCell =  direction==-1?curruntCell-1:curruntCell+1   
        curruntCell=curruntCell <0 ? 3: curruntCell > 3 ? 0:curruntCell; 
    }
    selectCell.classList.remove("choosen")
    selectCell = document.getElementById("grid").children[curruntRow * 2].children[curruntCell]
    selectCell.classList.add("choosen")
}

function check_full() {
    isfull = 0;
    for (let i = 0; i < 4; i++) 
        for (let j = 0; j < 4; j++) 
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
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            for (let i = 0; i < 4; i++) 
                if (grid_array[row][col] == grid_array[i][col] && i != row) 
                    row_pass++;
            for (let j = 0; j < 4; j++) 
                if (grid_array[row][col] == grid_array[row][j] && j != col) 
                    column_pass++;
        }
    }

    if (row_pass == 0 && column_pass == 0)
        return true;
     else
        return false;
    
}

function checkResult(){
    if (check_full()) {
        if (check_pass()) {
            setTimeout(() => {
                alert("congratulations good work you are awsome");
                clearInterval(timerInterval);
                playAgain();
                grid_array = [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]];
            }, 100);
        }
    }
}
function checkAvilablity(selector){
    if(selector.children[0] && selector.children[0].name=="randomImage")
        return true
    else
        return false;
}
function putImage(imageNumber, rowNumber, cellNumber,randomImage=false) {
    let selectCell = document.getElementById("grid").children[rowNumber * 2].children[cellNumber]
    let image = selectCell.children[0]
    if (!image) {
        image = document.createElement("img")
        image.classList.add("gameImage")
        selectCell.appendChild(image)
    }
    if(randomImage)
        image.name="randomImage"
    if(randomImage||!checkAvilablity(selectCell)){
        image.src = `../Images/${values['name']}/${imageNumber}.png`;
        grid_array[rowNumber][cellNumber] = Number(imageNumber);
    }
}
function getRandomImages(max = 4) {
    let dict = {}
    for (let i = 0; i < max; i++) {
        let curruntRow = i
        let curruntCell = parseInt(Math.random() * (max - 0) + 0)
        let randomeImage = parseInt(Math.random() * (max) + 1)
        if(!dict[randomeImage]){
            putImage(randomeImage, curruntRow, curruntCell, true)
            dict[randomeImage] = true;
        }
        else
            i--;
    }
}
function addKeyEvent(){
    document.body.addEventListener("keyup", (e) => {
        if (isFinite(e.key) && Number(e.key) > 0 && Number(e.key) < 5) 
            putImage(e.key,curruntRow,curruntCell)
        else if (e.code == 'ArrowLeft')
            move(-1,"x")
        else if (e.code == 'ArrowRight')
            move(1,"x")
        else if (e.code == 'ArrowUp')
            move(-1,"y")
        else if (e.code == 'ArrowDown')
            move(1,"y")
        checkResult()
    })
}
startButton.addEventListener("click", () => {
    getRandomImages()
    startButton.disabled = true
    document.getElementById("timer").innerText = `00:${timer}`
    startButton.style.pointerEvents = "none"
    document.getElementById("firstOne").classList.add("choosen")
    startTimer()
    addKeyEvent()
})