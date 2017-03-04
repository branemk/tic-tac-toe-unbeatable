/*global $ */
/* jshint browser: true */
/*jshint devel:true */
$("#button").click(function () {
    startnewGame();
});

$(".mode").click(function () {

    $(".modeactive").each(function () {
        $(this).removeClass("modeactive");
    });


    $(this).addClass("modeactive");
    startnewGame();
});

$(".options").click(function () {

    $(".optionactive").each(function () {
        $(this).removeClass("optionactive");
    });


    $(this).addClass("optionactive");
    startnewGame();
});

var game = {
    turn: 'user',
    moves: 0,
    hasresult: false,
    computer: "O",
    user: "X",
    comfirst: false,
    modenormal: 'Normal mode',
    modelegend: 'Legend mode'
};

function startnewGame() {
    var turn = $(".optionactive").text();
    $(".tile").text(" ");
    $("#result").text("").removeClass("animated zoomIn");
    $(".tile").css("opacity", "1.0");
    $('.tile').removeClass('animated flipInY');

    game.moves = 0;
    game.hasresult = false;
    if (turn === "O") {
        game.computer = "X";
        game.user = "O";
        game.turn = 'computer';
        game.comfirst = true;


        computerMove();

    } else {
        game.computer = "O";
        game.user = "X";
        game.turn = 'user';
        game.comfirst = false;

    }
}

$(".tile").click(function () {
    if (game.turn === 'user') {
        if ($(this).text() === " ") {
            $(this).text(game.user).addClass('animated flipInY');
            game.turn = 'computer';
            game.moves += 1;
            checkWin();

            if (game.moves < 9 && !game.hasresult) {
                setTimeout(computerMove, 500);
            }
        }
    }
});

function computerMove() {

    if (game.comfirst) {

        CalculateComputerFirstMove();
    } else if (!game.comfirst) {
        ComputerMakeNextMove();
    }


}

//second move when computer plays first , we are not using minimax here because performance
function MakeSecondMove() {
    if ($(".modeactive").text() === game.modenormal) {
       
        RandomMove();
    } else {


        var usermove = GetUserFirstMove();

        if (usermove === 5) {
            

            var moves = ['1', '3', '7', '9'];
            var random = Math.floor(Math.random() * 4);

            if (TileIsEmpty(moves[random])) {
                
                PutComputerValueInTile(moves[random]);

            } else MakeSecondMove();

        } else if (usermove === 1 || usermove === 3 || usermove === 7 || usermove === 9 || usermove === 2 || usermove === 4 || usermove === 6 || usermove === 8) {

            var moves1 = ['1', '3', '5', '7', '9'];
            var random1 = Math.floor(Math.random() * 4);
            if (TileIsEmpty(moves1[random1])) {

                PutComputerValueInTile(moves1[random1]);

            } else MakeSecondMove();
        }
    }
}
//first move when computer plays first
function Makefirtsmove() {

    var moves = ['1', '3', '5', '7', '9'];
    var random = Math.floor(Math.random() * 5);

    PutComputerValueInTile(moves[random]);

}

function Makemove(player) {
    var tiles = $('.tile');
    var random;
    var content = [];
    for (var i = 1; i <= tiles.length; i++) {
        content[i] = $('#tile' + i).text();

    }
    if (game.moves < 2) {
        //if user plays first we calculate first computer move
        random = calculateFirstMove(content);
        
    } else {
        
        //calculate move with minimax algorithm
        random = findBestMove(content, game.computer);
    }



    if (TileIsEmpty(random)) {
        
        PutComputerValueInTile(random);

    } else Makemove();
}



function checkWin() {


    var tiles = $('.tile');
    var content = [];

    for (var i = 1; i <= tiles.length; i++) {
        content[i] = $('#tile' + i).text();

    }


    if ((content[1] === content[2] && content[2] == content[3]) &&
        (content[1] !== " " && content[2] !== " " && content[3] !== " ")) {

        showWinner(content[1]);

    } else if ((content[4] === content[5] && content[5] === content[6]) && (content[4] !== " " && content[5] !== " " && content[6] !== " ")) {
        showWinner(content[4]);

    } else if ((content[7] === content[8] && content[8] === content[9]) && (content[7] !== " " && content[8] !== " " && content[9] !== " ")) {
        showWinner(content[7]);

    } else if ((content[1] === content[4] && content[4] === content[7]) && (content[1] !== " " && content[4] !== " " && content[7] !== " ")) {
        showWinner(content[1]);

    } else if ((content[2] === content[5] && content[5] === content[8]) && (content[2] !== " " && content[5] !== " " && content[8] !== " ")) {
        showWinner(content[2]);

    } else if ((content[3] === content[6] && content[6] === content[9]) && (content[3] !== " " && content[6] !== " " && content[9] !== " ")) {
        showWinner(content[3]);

    } else if ((content[1] === content[5] && content[5] === content[9]) && (content[1] !== " " && content[5] !== " " && content[9] !== " ")) {
        showWinner(content[1]);

    } else if ((content[3] === content[5] && content[5] == content[7]) && (content[3] !== " " && content[5] !== " " && content[7] !== " ")) {
        showWinner(content[3]);

    }

    if (!game.hasresult && game.moves === 9) {
        //alert("It's Draw");
        $(".tile").css("opacity", "0.1");
        $("#result").text("It's Draw!").addClass("animated zoomIn");
    }
}

function showWinner(w) {

    game.hasresult = true;
    $("#score" + w).text(parseInt($("#score" + w).text()) + 1);
    //alert(w + " is a winner");
    $(".tile").css("opacity", "0.1");
    if ($(".optionactive").text() === w) {
        $("#result").text("You Win!").addClass("animated zoomIn");
    } else {
        $("#result").text("You Lose! " + w + " is a winner").addClass("animated zoomIn");
    }



}
//check win for minmax
function checkIfWin(board, player) {
    var content = [];
    var result = false;
    var winner = "";
    content = board;


    if ((content[1] === content[2] && content[2] == content[3]) &&
        (content[1] !== " " && content[2] !== " " && content[3] !== " ")) {
        winner = content[1];



    } else if ((content[4] === content[5] && content[5] === content[6]) && (content[4] !== " " && content[5] !== " " && content[6] !== "")) {
        winner = content[4];


    } else if ((content[7] === content[8] && content[8] === content[9]) && (content[7] !== " " && content[8] !== " " && content[9] !== " ")) {
        winner = content[7];


    } else if ((content[1] === content[4] && content[4] === content[7]) && (content[1] !== " " && content[4] !== " " && content[7] !== " ")) {
        winner = content[1];


    } else if ((content[2] === content[5] && content[5] === content[8]) && (content[2] !== " " && content[5] !== " " && content[8] !== " ")) {
        winner = content[2];


    } else if ((content[3] === content[6] && content[6] === content[9]) && (content[3] !== " " && content[6] !== " " && content[9] !== " ")) {
        winner = content[3];

    } else if ((content[1] === content[5] && content[5] === content[9]) && (content[1] !== " " && content[5] !== " " && content[9] !== " ")) {
        winner = content[1];

    } else if ((content[3] === content[5] && content[5] == content[7]) && (content[3] !== " " && content[5] !== " " && content[7] !== " ")) {
        winner = content[3];

    }

    if (winner === player) {
        result = true;
    }

    
    return result;
}
//minimax algorithm 
function calculateWinner(player, board, depth) {

    depth += 1;

    if (checkIfWin(board, game.user)) {
        
        return depth - 10;

    } else if (checkIfWin(board, game.computer)) {
     
        return 10 - depth;

    } else if (areMovesLeft(board) === false) {

        return 0;

    }


    if (player === game.computer) {

        var best = -1000;
        for (var i = 1; i <= board.length; i++) {
            if (board[i] === ' ') {

                board[i] = player;

                best = Math.max(best, calculateWinner(game.user, board, depth));

                board[i] = " ";



            }



        }
        return best;

    } else {
        var bestuser = 1000;
        for (var n = 1; n <= board.length; n++) {
            if (board[n] === ' ') {

                board[n] = player;

                bestuser = Math.min(bestuser, calculateWinner(game.computer, board, depth));

                board[n] = " ";


            }


        }
        return bestuser;
    }




}

function findBestMove(board, player) {
    var bestVal = -1000;
    var bestMove;
    var moveVal;
    for (var i = 1; i < board.length; i++) {
        if (board[i] === ' ') {
            board[i] = player;
            
            moveVal = calculateWinner(game.user, board, 0);
            board[i] = " ";
            

            if (moveVal >= bestVal) {

                bestMove = i;
                bestVal = moveVal;
            }
        }
    }

   
    return bestMove;
}



function areMovesLeft(b) {


    for (var i = 1; i <= b.length; i++) {
        if (b[i] === ' ') {
            return true;

        }


    }

    return false;
}
//computer first move when user plays first
function calculateFirstMove(board) {
    if ($(".modeactive").text() === game.modenormal) {

        return Math.floor((Math.random() * 9) + 1);

    } else {
        var tile = GetUserFirstMove();

        //make perfect move
      
        var moves = ['1', '3', '7', '9'];
        if (tile === 1 || tile === 3 || tile === 7 || tile === 9) return 5;
        else if (tile === 2 || tile === 4) return 1;
        else if (tile === 6 || tile === 8) return 9;
        else if (tile === 5) {
            return moves[Math.floor(Math.random() * 3)];
        }
    }



}

function RandomMove() {
   
    var randomnormal = Math.floor((Math.random() * 9) + 1);
    if (TileIsEmpty(randomnormal)) {

        PutComputerValueInTile(randomnormal);

    } else {
        RandomMove();
    }
}
//computer first move when computer plays first
function CalculateComputerFirstMove() {

    if ($(".modeactive").text() === game.modelegend) {

        game.comfirst = false;
        Makefirtsmove();

    } else if ($(".modeactive").text() === game.modenormal) {
        //on normal mode first two computer moves are random
        if (game.moves === 4) {
            game.comfirst = false;
        }

        RandomMove();
    }
}

function ComputerMakeNextMove() {
    if (game.moves === 2) {
       
        //calculate second computer move when computer plays first on legend mode,if it's normal mode this function will be called when there are 5 moves(because we are settting game.comfirst to false when there are 4 moves in CalculateComputerFirstMove() ) so we calculate 

        MakeSecondMove();
    } else {

       
        Makemove(game.computer);
    }

}

function TileIsEmpty(index) {

    if ($('#tile' + index).text() === ' ') {

        return true;

    } else return false;
}

function PutComputerValueInTile(index) {
    $('#tile' + index).text(game.computer).addClass('animated flipInY');
    game.moves += 1;
    game.turn = 'user';
    checkWin();
}



function GetUserFirstMove() {
    var tiles = $('.tile');

    for (var i = 1; i <= tiles.length; i++) {
        if ($('#tile' + i).text() === game.user) {
            return i;
        }

    }
}
