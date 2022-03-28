//board for array stuff
const Gameboard = (() => {
    let gameBoard = new Array(9).fill("");
    //.at will be an interface method
    // letting us get and set a board member

    const restartBoard = () => {
        gameBoard = Array(9).fill("");
    }

    const addMarker = (index, mark) => {
        gameBoard[index] = mark;
    }

    const getBoard = () => {
        return [...gameBoard];
    }

    let winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    return { restartBoard, addMarker, getBoard, winConditions }
})();

//All things player based 
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
}

//gameflow for interface between player & board
const Gameflow = (() => {

    Player1 = Player('John', 'X');
    Player2 = Player('Comp','O');

    let turnCounter = 0;


    
    const _boardContainer = document.querySelector('.board-container');

    //Create divs on page using JS
    function createDiv() {
        var boardDiv = document.createElement("div");
        boardDiv.className = "square";
        boardDiv.addEventListener('click', _handleSquare)    
        return boardDiv;
      }
    
    function createAndModifyDivs() {
        myDivs = [],
        i = 0,
        numOfDivs = 9;
  
      for (i; i < numOfDivs; i += 1) {
        myDivs.push(createDiv());
        _boardContainer.appendChild(myDivs[i]);
      }
    }
  
    // create divs & map array to divs
    createAndModifyDivs(); 
    const boxes = _boardContainer.children;
    const squaresArray = Array.from(boxes);
    
    for (square of squaresArray) {
		square.addEventListener("click", _handleSquare);
	}

    function checkForWin(currentClass){ 
        return Gameboard.winConditions.some( combination => {
            return combination.every(index => {
                return boxes[index].classList.contains(currentClass);
            })
        })
    }

    //handle square, used to play move and check logic on each turn
    function _handleSquare(e) {
        const square = e.target;
        currentClass = 'square X';
        if(turnCounter % 2 == 0){
            Gameboard.addMarker(squaresArray.indexOf(square), Player1.getMarker());
            square.classList.add(Player1.getMarker());
        } else {
            Gameboard.addMarker(squaresArray.indexOf(square), Player2.getMarker());
            square.classList.add(Player2.getMarker());
        }
        turnCounter++;
        square.removeEventListener('click', _handleSquare);
        _render();
        if(checkForWin(currentClass)){
            console.log('winner');
        }
    }

    const _render = () => {
        Gameboard.getBoard().forEach((element, index) => {
            boxes[index].textContent = element;
        })
    }


})();



