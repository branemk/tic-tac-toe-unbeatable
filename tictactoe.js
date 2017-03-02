/*global $ */
/* jshint browser: true */
/*jshint devel:true */
$("#button").click(function () {
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
    comfirst: false
};

function startnewGame() {
    var turn = $(".optionactive").text();

    if (turn === "O") {
        $(".tile").text(" ");
        game.turn = 'computer';
        game.moves = 0;
        game.comfirst = true;
        game.hasresult = false;
        $('.tile').removeClass('animated flipInY');
        computerMove();
    } else {
        $(".tile").text(" ");
        game.turn = 'user';
        game.moves = 0;
        game.hasresult = false;
        game.comfirst = false;
         $('.tile').removeClass('animated flipInY');
    }
}

$(".tile").click(function () {
    if (game.turn === 'user') {
        if ($(this).text() === " ") {
            $(this).text("X").addClass('animated flipInY');
            game.turn = 'computer';
            game.moves += 1;
            checkWin();
              console.log('moves '+game.moves);
            if (game.moves < 9 && !game.hasresult) {
                setTimeout(computerMove, 500);
            }
        }
    }
});

function computerMove() {
    console.log('moves number '+game.moves);
    if (game.comfirst) {
        game.comfirst = false;
        Makefirtsmove();
    } else {
        if (game.moves === 2) {
            MakeSecondMove();
        } else {
            Makemove(game.computer);
        }
    }
}

function MakeSecondMove() {
    console.log('second move');
    var tiles = $('.tile');
    var usermove;
    for (var i = 1; i <= tiles.length; i++) {
        if ($('#tile' + i).text() === 'X') {
            usermove = i;
        }

    }
    console.log('usermove '+usermove);
    if (usermove === 5) {
        var moves = ['1', '3', '7', '9'];
        var random = Math.floor(Math.random() * 4);
        if ($('#tile' + moves[random]).text() === ' ') {
            $('#tile' + moves[random]).text('O').addClass('animated pulse');
            game.moves += 1;
            game.turn = 'user';
            checkWin();
        } else MakeSecondMove();
    }else if(usermove === 1 || usermove === 3 || usermove === 7 || usermove === 9 || usermove === 2 || usermove === 4 || usermove === 6 || usermove === 8 ){
        var moves1 = ['1', '3','5','7', '9'];
        var random1 = Math.floor(Math.random() * 4);
          if ($('#tile' + moves1[random1]).text() === ' ') {
            $('#tile' + moves1[random1]).text('O').addClass('animated flipInY');
            game.moves += 1;
            game.turn = 'user';
            checkWin();
        } else MakeSecondMove();
    }
}

function Makefirtsmove() {
    var moves = ['1', '3', '5', '7', '9'];
    var random = Math.floor(Math.random() * 5);

    $('#tile' + moves[random]).text('O').addClass('animated flipInY');
    game.moves += 1;
    game.turn = 'user';
    checkWin();
}

function Makemove(player) {
    var tiles = $('.tile');
    var random;
    var content = [];
    for (var i = 1; i <= tiles.length; i++) {
        content[i] = $('#tile' + i).text();

    }
    if (game.moves < 2) {
        random = calculateFirstMove(content);
    } else {
        random = findBestMove(content, game.computer);
    }







    if ($('#tile' + random).text() === ' ') {
        $('#tile' + random).text('O').addClass('animated flipInY');
        game.moves += 1;
        game.turn = 'user';
        checkWin();

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
        alert("It's Draw");
    }
}

function showWinner(w) {

    game.hasresult = true;
    alert(w + " is a winner");


}

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

    // console.log("winner ", result);
    return result;
}

function calculateWinner(player, board) {


    console.log("Min max for  " + board);
    if (checkIfWin(board, game.user)) {

        return -10;

    } else if (checkIfWin(board, game.computer)) {

        return 10;

    } else if (areMovesLeft(board) === false) {

        return 0;

    }

    if (player === game.computer) {

        var best = -1000;
        for (var i = 1; i <= board.length; i++) {
            if (board[i] === ' ') {

                board[i] = player;

                best = Math.max(best, calculateWinner(game.user, board));

                board[i] = " ";

            }


        }
        return best;

    } else {
        var bestuser = 1000;
        for (var n = 1; n <= board.length; n++) {
            if (board[n] === ' ') {

                board[n] = player;

                bestuser = Math.min(bestuser, calculateWinner(game.computer, board));

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
            console.log("Try number " + i + " " + board);
            moveVal = calculateWinner(game.user, board);
            board[i] = " ";


            if (moveVal > bestVal) {

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

function calculateFirstMove(board) {
    var tile;
    for (var i = 1; i < board.length; i++) {
        if (board[i] !== ' ') {

            tile = i;

        }
    }
    //make perfect move
    //console.log('tile '+tile);
    var moves = ['1', '3', '7', '9'];
    if (tile === 1 || tile === 3 || tile === 7 || tile === 9) return 5;
    else if (tile === 2 || tile === 4) return 1;
    else if (tile === 6 || tile === 8) return 9;
    else if (tile === 5) {
        return moves[Math.floor(Math.random() * 3)];
    }




}
