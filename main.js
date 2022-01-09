

// CREATE PLAYER
// CREATE BOARD
// PLAY GAME
    // PLAYER CLICK CELL
    // CHECK 3 IN A ROW OR A TIE
    // AI CLICK CELL
    // CHECK AGAIN
// STORE SCOREBOARD

const playgameonboard = (() => {
    let player1 = 0;
    let player2 = 0;
    let board = 0;

    // EVENT LISTENER
    const aiBtn = document.getElementById("aiBtn");
    const twoPlayersBtn = document.getElementById("twoPlayersBtn");
    const boardcells = document.querySelectorAll(".board-cell");
    const result = document.getElementById("result");

    aiBtn.addEventListener('click', () => {
        resetBoard();
        resetPlayers();
        [player1, player2] = createPlayers('player1', 'ai');

        playGame();
    });
    
    class Board {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        markedIndex = [];
        winningconditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        getboard = () => {
            return this.board;
        }
        getMarkedIndex = () => {
            return this.markedIndex;
        }
        updatecell = (index) => {
            index = Number(index);
            this.board[index] = 1;
            this.markedIndex.push(index);
        }
        isemptycell = (index) => {
            index = Number(index);
            return this.board[index] === 0;
        }

        checkamIwinner = () => {
            return this.winningconditions.some((condition) => {
                return condition.every((i) => {
                    return this.board[i] === 1;
                })
            })
        }
    }

    function createBoard() {
        return new Board();
    }
    
    function resetBoard() {
        board = createBoard()
        boardcells.forEach((cell) => {
            cell.innerHTML = '';
        })
    }
    class Player extends Board{
        constructor(
            name = 'None',
            marker = 'X',
            isAI = false,
        ){
            super(name, marker)
            this.name = name;
            this.marker = marker;
            this.isAI = isAI;
            // this.board = board;
        }

        getName = () => {
            return this.name;
        }
        getMarker = () => {
            return this.marker;
        }
        getisAI = () => {
            return this.isAI;
        }


    }

    function createPlayers(fstPlayerName, sndPlayerName) {
        return [new Player(fstPlayerName, 'X', false), 
            new Player(sndPlayerName, 'O', true)];
    }


    function resetPlayers() {
        player1 = 0;
        player2 = 0;
        ai = 0;
    }

    function playGame() {
        boardcells.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                // console.log(e.target.value);
                // console.log(e.target.innerHTML);
                let index = e.target.value

                if (e.target.innerHTML === '' && board.isemptycell(index)) {
                    updateBoard(player1, index, e.target);
                    updateBoard(player2);
                }


            })

        })

        function updateBoard(player, index=null, target=null) {

            let isAI = player.getisAI()

            if (isAI === false && (index === null || target === null)) {
                console.log("Error: please insert index");
            }
            if (isAI === false && index !== null && target !==null){
                board.updatecell(index);
                player.updatecell(index);
                target.innerHTML = player.getMarker();
                console.log(player.getMarkedIndex());
                if(player.checkamIwinner()){
                    finishGame(player);
                }


            } else if (isAI === true){
                let index = 0;
                while(1){
                    index = Math.floor(Math.random() * (8+1)); //range (0 to 8)
                    if (board.isemptycell(index) === true){
                        break;
                    }
                }
                let targetid = `cell-${index}`;
                let target = document.getElementById(targetid);

                board.updatecell(index);
                player.updatecell(index);
                target.innerHTML = player.getMarker();

                if(player.checkamIwinner()){
                    finishGame(player);
                }
            } 

        }

        function finishGame(player) {
            let name = player.getName()
            result.innerHTML = `The ${name} is a winner`
            resetPlayers();
            resetBoard();
        }

    }

})();







