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

window.addEventListener("load", renderSavedGames)

let games = [];

//object declaration
function addToLibrary(){
    let game = {
        name: gname.value,
        playtime: playtime.value,
        difficulty: difficulty.value
    }
    games.push(game);
    saveGame(games);
}

//functions
    function createCard (){
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        content.appendChild(card);
        //label and input for name
        const lname = document.createElement("label");
        lname.textContent = "Game Name: "
        card.appendChild(lname);

        const tname = document.createElement("p");
        tname.setAttribute("class", "name answer");
        tname.textContent = games[games.length-1].name;
        card.appendChild(tname);
        //label and input for playtime
        const lplaytime = document.createElement("label");
        lplaytime.textContent = "Hours played: "
        card.appendChild(lplaytime);

        const tplaytime = document.createElement("p");
        tplaytime.setAttribute("class", "playtime answer");
        tplaytime.textContent = games[games.length-1].playtime;
        card.appendChild(tplaytime);
        //label and input for difficulty
        const ldifficulty = document.createElement("label");
        ldifficulty.textContent = "Difficulty: "
        card.appendChild(ldifficulty);

        const tdifficulty = document.createElement("p");
        tdifficulty.textContent = games[games.length-1].difficulty;
        tdifficulty.setAttribute("class", "difficulty answer");
        card.appendChild(tdifficulty);

        const errorChng = document.createElement("p");
        errorChng.setAttribute("class", "change-error");
        card.appendChild(errorChng);
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
        //div for settings
        const settings = document.createElement("button");
        settings.textContent = "..."
        settings.setAttribute("class", "settings");
        card.appendChild(settings);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "save";
        saveBtn.setAttribute("class", "save-change");
        card.appendChild(saveBtn);

        let helpName = "";

        settings.addEventListener("click", () =>{
            saveBtn.style.display = "block";
            tplaytime.setAttribute("contentEditable", true);
            tname.setAttribute("contentEditable", true);
            tdifficulty.setAttribute("contentEditable", true);
            helpName = tname.textContent;

        })
        
        saveBtn.addEventListener("click", () =>{
            let falsecheck = false;
            for(let nextgame of games){
                if(tname.textContent == helpName){
                    falsecheck = false
                }
                else if(tname.textContent == nextgame.name){
                    errorChng.style.display="block";
                    errorChng.textContent = "This game has already been added!";
                    falsecheck = true;
                }   
            }
            if (tdifficulty.textContent > 10 || tdifficulty.textContent < 0){
                errorChng.style.display="block";
                errorChng.textContent = "Difficulty must be between 10 and 0!";
                falsecheck=true;
            }else if(tname.textContent == ""){
                errorChng.style.display="block";
                errorChng.textContent = "The name of the game can not be empty!";
                falsecheck=true;
            }else if(tplaytime.textContent < 0){
                errorChng.style.display="block";
                errorChng.textContent = "You can't play negative hours!";
                    falsecheck=true;
            }else if (falsecheck == false){
                let editableGame = games.findIndex((obj => obj.name == helpName))
                games[editableGame].name = tname.textContent;
                games[editableGame].playtime = tplaytime.textContent;
                games[editableGame].difficulty = tdifficulty.textContent;

                saveBtn.style.display = "none";
                errorChng.textContent="";
                errorChng.style.display ="none";
                tplaytime.removeAttribute("contentEditable");
                tname.removeAttribute("contentEditable");
                tdifficulty.removeAttribute("contentEditable");
                
                }
        })
       
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
    //error handle for same game add}
        for(let nextgame of games){
            if(nextgame.name == gname.value){
                errorDiv.style.display="block";
                errorDiv.textContent = "This game has already been added!";
                falsecheck=true;
            }   
        }
          //error handle for difficulty must be 0-10
        if (difficulty.value > 10 || difficulty.value < 0){
            errorDiv.style.display="block";
            errorDiv.textContent = "Difficulty must be between 10 and 0!";
            falsecheck=true;
        }else if(gname.value == ""){
            errorDiv.style.display="block";
            errorDiv.textContent = "The name of the game can not be empty!";
            falsecheck=true;
        }
        else if(falsecheck == false){
                addToLibrary();
                createCard();
                popclose();
                falsecheck = true;
            }
    }

//buttonclick events
popBtn.addEventListener("click", function popadd(){
    popform.style.visibility = "visible";
});
addBtn.addEventListener("click", magicHappens);
cancelBtn.addEventListener("click", popclose);

//save to localhost
function saveGame(game) {
    const gameData = JSON.stringify(game);
    localStorage.setItem('games', gameData);
    console.log(gameData)
  }
  
  // Retrieve games from local storage
function getGame() {
    const gameData = localStorage.getItem('games');
    const game = JSON.parse(gameData);
    
    return game;
  }

function renderSavedGames(){
    if(window.localStorage.length !=0){
    let gameArr = getGame();
    games = gameArr;
    console.log(gameArr)
    for(let game of gameArr){
        const card = document.createElement("div");
        card.setAttribute("class", "card");
        content.appendChild(card);
        //label and input for name
        const lname = document.createElement("label");
        lname.textContent = "Game Name: "
        card.appendChild(lname);

        const tname = document.createElement("p");
        tname.setAttribute("class", "name answer");
        tname.textContent = game.name;
        card.appendChild(tname);
        //label and input for playtime
        const lplaytime = document.createElement("label");
        lplaytime.textContent = "Hours played: "
        card.appendChild(lplaytime);

        const tplaytime = document.createElement("p");
        tplaytime.setAttribute("class", "playtime answer");
        tplaytime.textContent = game.playtime;
        card.appendChild(tplaytime);
        //label and input for difficulty
        const ldifficulty = document.createElement("label");
        ldifficulty.textContent = "Difficulty: "
        card.appendChild(ldifficulty);

        const tdifficulty = document.createElement("p");
        tdifficulty.textContent = game.difficulty;
        tdifficulty.setAttribute("class", "difficulty answer");
        card.appendChild(tdifficulty);

        const errorChng = document.createElement("p");
        errorChng.setAttribute("class", "change-error");
        card.appendChild(errorChng);
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
        //div for settings
        const settings = document.createElement("button");
        settings.textContent = "..."
        settings.setAttribute("class", "settings");
        card.appendChild(settings);

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "save";
        saveBtn.setAttribute("class", "save-change");
        card.appendChild(saveBtn);

        let helpName = "";

        settings.addEventListener("click", () =>{
            saveBtn.style.display = "block";
            tplaytime.setAttribute("contentEditable", true);
            tname.setAttribute("contentEditable", true);
            tdifficulty.setAttribute("contentEditable", true);
            helpName = tname.textContent;

        })
        
        saveBtn.addEventListener("click", () =>{
            let falsecheck = false;
            for(let nextgame of games){
                if(tname.textContent == helpName){
                    falsecheck = false
                }
                else if(tname.textContent == nextgame.name){
                    errorChng.style.display="block";
                    errorChng.textContent = "This game has already been added!";
                    falsecheck = true;
                }   
            }
            if (tdifficulty.textContent > 10 || tdifficulty.textContent < 0){
                errorChng.style.display="block";
                errorChng.textContent = "Difficulty must be between 10 and 0!";
                falsecheck=true;
            }else if(tname.textContent == ""){
                errorChng.style.display="block";
                errorChng.textContent = "The name of the game can not be empty!";
                falsecheck=true;
            }else if(tplaytime.textContent < 0){
                errorChng.style.display="block";
                errorChng.textContent = "You can't play negative hours!";
                    falsecheck=true;
            }else if (falsecheck == false){
                let editableGame = games.findIndex((obj => obj.name == helpName))
                games[editableGame].name = tname.textContent;
                games[editableGame].playtime = tplaytime.textContent;
                games[editableGame].difficulty = tdifficulty.textContent;

                saveBtn.style.display = "none";
                errorChng.textContent="";
                errorChng.style.display ="none";
                tplaytime.removeAttribute("contentEditable");
                tname.removeAttribute("contentEditable");
                tdifficulty.removeAttribute("contentEditable");
                
                }
        })
    }
}
}

function removeSavedGame(){

}