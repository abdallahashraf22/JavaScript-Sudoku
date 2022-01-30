let startButton = document.getElementById("startButton")
let cookeies = document.cookie.split(";")
let selectCell = document.getElementById("firstOne")
let curruntRow = 0;
let curruntCell = 0;
let values = {}
//let timer = 5;
cookeies.forEach(element => {
    values[element.split('=')[0].replace(' ', '')] = element.split('=')[1]
});
let timer=60*values["level"];
let LiS = document.querySelectorAll('li[class="cell"]');
document.getElementById("playerName").innerText = values["userName"]
for (let i = 0; i < LiS.length; i++) {
    LiS[i].children[0].src = `../Images/${values["name"]}/${i + 1}.png`
}

function startTimer(){
    let timerInterval = setInterval(() => {
        timer--;
        if (timer < 0) {
            clearInterval(timerInterval)
            document.getElementById("timer").innerText = `00:00`
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

    }
}
function moveDown() {
    if (curruntRow < 3) {
        selectCell.classList.remove("choosen")
        selectCell.parentElement.nextElementSibling.nextElementSibling.children[curruntCell].classList.add("choosen")
        selectCell = selectCell.parentElement.nextElementSibling.nextElementSibling.children[curruntCell]
        console.log(selectCell)
        curruntRow++
    }
    else {
        curruntRow = 0
        selectCell.classList.remove("choosen")
        selectCell.parentElement.parentElement.children[curruntRow].children[curruntCell].classList.add("choosen")
        selectCell = selectCell.parentElement.parentElement.children[curruntRow].children[curruntCell]
    }
}

function moveUp() {
    if (curruntRow > 0) {
        selectCell.classList.remove("choosen")
        selectCell.parentElement.previousElementSibling.previousElementSibling.children[curruntCell].classList.add("choosen")
        selectCell = selectCell.parentElement.previousElementSibling.previousElementSibling.children[curruntCell]
        console.log(selectCell)
        curruntRow--
    }
    else {
        curruntRow = 3
        selectCell.classList.remove("choosen")
        selectCell.parentElement.parentElement.children[curruntRow * 2].children[curruntCell].classList.add("choosen")
        selectCell = selectCell.parentElement.parentElement.children[curruntRow * 2].children[curruntCell]
    }
}
function moveRight() {
    if (curruntCell < 3) {
        selectCell.classList.remove("choosen")
        selectCell.nextElementSibling.classList.add("choosen")
        selectCell = selectCell.nextElementSibling
        curruntCell++;
    }
    else {
        curruntCell = 0
        selectCell.classList.remove("choosen")
        selectCell = selectCell.parentElement.children[0]
        selectCell.classList.add("choosen")
    }
}
function moveLeft() {
    if (curruntCell > 0) {
        selectCell.classList.remove("choosen")
        selectCell.previousElementSibling.classList.add("choosen")
        selectCell = selectCell.previousElementSibling
        curruntCell--;
    }
    else {
        curruntCell = 3
        selectCell.classList.remove("choosen")
        selectCell = selectCell.parentElement.children[3]
        selectCell.classList.add("choosen")
    }
}

moveEvent=document.body.addEventListener("keyup", (e) => {
    if (isFinite(e.key) && Number(e.key) > 0 && Number(e.key) < 5) {
        let image = selectCell.children[0]
        if (!image) {
            image = document.createElement("img")
            image.classList.add("gameImage")
            selectCell.appendChild(image)
        }
        image.src = `../Images/${values['name']}/${e.key}.png`
    }
    else if (e.code == 'ArrowLeft')
        moveLeft()
    else if (e.code == 'ArrowUp')
        moveUp()
    else if (e.code == 'ArrowDown')
        moveDown()
    else if (e.code == 'ArrowRight')
        moveRight()
})

startButton.addEventListener("click", () => {
    startButton.disabled = true
    document.getElementById("timer").innerText = `00:${timer}`
    startButton.style.pointerEvents = "none"
    document.getElementById("firstOne").classList.add("choosen")
    startTimer()
})