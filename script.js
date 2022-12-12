//variable declaration
const content = document.getElementById("content");
const gname = document.getElementById("addName")
const playtime = document.getElementById("addPlaytime");
const difficulty = document.getElementById("addDifficulty");
const popBtn = document.getElementById("pop-btn");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const popform = document.getElementById("form");
const errorDiv = document.getElementById("error");

let games = [];

//object declaration
function addToLibrary(){
    let game = {
        name: gname.value,
        playtime: playtime.value,
        difficulty: difficulty.value
    }
    games.push(game);
}

//functions
    function createCard (){
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        content.appendChild(card);
        const lname = document.createElement("label");
        lname.textContent = "Game Name: "
        card.appendChild(lname);
        const tname = document.createElement("p");
        tname.setAttribute("class", "name answer");
        tname.textContent = games[games.length-1].name;
        card.appendChild(tname);
        const lplaytime = document.createElement("label");
        lplaytime.textContent = "Hours played: "
        card.appendChild(lplaytime);
        const tplaytime = document.createElement("p");
        tplaytime.setAttribute("class", "playtime answer");
        tplaytime.textContent = games[games.length-1].playtime;
        card.appendChild(tplaytime);
        const ldifficulty = document.createElement("label");
        ldifficulty.textContent = "Difficulty: "
        card.appendChild(ldifficulty);
        const tdifficulty = document.createElement("p");
        tdifficulty.textContent = games[games.length-1].difficulty;
        tdifficulty.setAttribute("class", "difficulty answer");
        card.appendChild(tdifficulty);
        //switch add
        const lplatinum = document.createElement("label");
        lplatinum.textContent = "Platinum earned? ";
        card.appendChild(lplatinum);
        const checkbox = document.createElement("label");
        checkbox.setAttribute("class", "switch");
        card.appendChild(checkbox);
        const checkput = document.createElement("input");
        checkput.setAttribute("type", "checkbox");
        checkbox.appendChild(checkput);
        const switchspan = document.createElement("span");
        switchspan.setAttribute("class", "slider round");
        checkbox.appendChild(switchspan);
        
    };
    function popclose(){
        gname.value="";
        playtime.value="";
        difficulty.value="";
        popform.style.visibility = "hidden";
        errorDiv.textContent = "";
        
    }

function magicHappens(){
    let falsecheck = false;
    //error handle for same game add
        for(let nextgame of games){
            if(nextgame.name == gname.value){
                errorDiv.textContent = "This game has already been added";
                falsecheck=true;
            }
        }
         //error handle for difficulty must be 0-10
        if (difficulty.value > 10 || difficulty.value < 0){
            errorDiv.textContent = "Difficulty must be between 10 and 0";
            falsecheck=true;
        }
        else if(falsecheck == false){
                addToLibrary();
                createCard();
                popclose();
                falsecheck = true;
                console.log(games)
            }
    }

//buttonclick events
popBtn.addEventListener("click", function popadd(){
    popform.style.visibility = "visible";
});
addBtn.addEventListener("click", magicHappens);
cancelBtn.addEventListener("click", popclose);

//save to localhost
//document.addEventListener("load", localStorage.getItem("myGames"));