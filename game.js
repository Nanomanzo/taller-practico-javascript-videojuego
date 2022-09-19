const canvas = document.querySelector("#game")
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up")
const btnRight = document.querySelector("#right")
const btnLeft = document.querySelector("#left")
const btnDown = document.querySelector("#down")
const spanLives = document.querySelector("#lives")
let canvasSize;
let bomba = []
let elementsSize;
let playerPosition = {

    x : undefined,
    y : undefined
}
let giftPosition = {
    x: undefined,
    y: undefined
}
let level = 0
let vidas = 3

window.addEventListener("load", setCanvasSize)
window.addEventListener("resize", setCanvasSize)

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
      canvasSize = window.innerWidth * 0.8;
    } else {
      canvasSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);
    
    elementsSize = canvasSize / 10;
  
    startGame();
}
  
function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    gameWin()
    return
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));

  showLives()
  
  bomba = []
  game.clearRect(0,0,canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        } 
      } else if (col == "I"){
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col == 'X') {
        bomba.push({
            x: posX,
            y: posY
        });
        }
      
      
         game.fillText(emoji, posX, posY);
       });
      });

      movePlayer();
}
  
function movePlayer() {
    let giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    let giftColiisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    let giftCollision = giftCollisionX && giftColiisionY

    if (giftCollision) {
        pasarNivel();
    }
 

    let enemyCollition = bomba.find(enemy => {
        enemyCollitionX = playerPosition.x.toFixed(3) == enemy.x.toFixed(3)
        enemyCollitionY = playerPosition.y.toFixed(3) == enemy.y.toFixed(3)
        return enemyCollitionX && enemyCollitionY
    })

    if (enemyCollition) {
        levelFail()
    }
 

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);


}

function pasarNivel(){
    console.log("pasaste de nivel");
    level++
    startGame()
}

function levelFail() {
    console.log("BOMMMMM");
    vidas--

    if (vidas <= 0) {
        level = 0
        vidas = 3 
        console.warn(vidas);
    }

    console.log(vidas)

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(vidas)

}

function gameWin() {
    console.log("pasaste el juego");
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
  
function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
 
function moveUp() {
    if ((playerPosition.y.toFixed(3) - elementsSize.toFixed(3)) < elementsSize.toFixed(3)) {
        console.log(("no"));
    } else {
        //console.log('Me quiero mover hacia derecha');
        playerPosition.y -= elementsSize.toFixed(3) ;
        console.log({playerPosition, canvasSize});
        startGame();
    }
}

function moveRight() {
    if ((playerPosition.x.toFixed(3) + elementsSize.toFixed(3)) > canvasSize.toFixed(3)) {
        console.log(("no"));
    } else {
        //console.log('Me quiero mover hacia derecha');
        playerPosition.x += elementsSize;
        console.log({playerPosition, canvasSize});
        startGame();
    }
}

function moveLeft() {
    if ((playerPosition.x.toFixed(3) - elementsSize.toFixed(3)) < elementsSize.toFixed(3)) {
        console.log(("no"));
    } else {
        //console.log('Me quiero mover hacia derecha');
        playerPosition.x -= elementsSize;
        console.log({playerPosition, canvasSize});
        startGame();
    }
}

function moveDown() {
    if ((playerPosition.y.toFixed(3) + elementsSize.toFixed(3)) > canvasSize.toFixed(3)) {
        console.log(("no"));
    } else {
        //console.log('Me quiero mover hacia derecha');
        playerPosition.y += elementsSize;
        console.log({playerPosition, canvasSize});
        startGame();
    }
}


