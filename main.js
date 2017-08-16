$(document).ready(function() {

    // Initialise variables
    var x = true;
    var comp = true;
    var board = {
        tl: 0,
        tm: 0,
        tr: 0,
        ml: 0,
        mm: 0,
        mr: 0,
        bl: 0,
        bm: 0,
        br: 0
    };
    var turn;

    // Hide the board in the beginning
    $('.settings').hide();
    $('.end').hide();

    // Click events to select player settings
    $('#x').click(function(event) {
        x = true;
        $('#x').addClass('selected');
        $('#o').removeClass('selected');
    });
    $('#o').click(function(event) {
        x = false;
        $('#o').addClass('selected');
        $('#x').removeClass('selected');
    })
    $('#comp').click(function(event) {
        comp = true;
        $('#comp').addClass('selected');
        $('#player').removeClass('selected');
    });
    $('#player').click(function(event) {
        comp = false;
        $('#player').addClass('selected');
        $('#comp').removeClass('selected');
    });

    // Play button to start the game with current settings
    $('#play').click(function(event) {
        $('.settings').hide();
        $('.board').show();
        turn = x;
    });

    function areEqual() {
        var len = arguments.length;
        for (var i=1; i<len; i++) {
            if (arguments[i] === 0 || arguments[i] !== arguments[i-1]) {
                return false;
            }
        }
        return true;
    }

    function showBoard() {
        for (var cell in board) {
            if (board[cell]) {
                if (board[cell] === 1) {
                    $("#" + cell).text("X");
                }
                else {
                    $("#" + cell).text("O");
                }
            }
            else {
                $("#" + cell).text("");
            }
        }
    }
    
    function reset() {
        resetBoard();
        x = true;
        comp = true;
        $('.end').hide();
        $('.settings').show();
    }
    function resetBoard() {
        for (var cell in board) {
            board[cell] = 0;
        }
    }

    function showEnd(player) {
        $('.board').hide();
        $('.end').show();
        if (!x) {
            $('.end').text("Player" + " X " + "Wins!");
        }
        else {
            $('.end').text("Player" + " O " + "Wins!");            
        }
    }
    function checkEnd() {
        if (areEqual(board.tl, board.tm, board.tr) ||
            areEqual(board.ml, board.mm, board.mr) ||
            areEqual(board.bl, board.bm, board.br) ||
            areEqual(board.tl, board.ml, board.bl) ||
            areEqual(board.tm, board.mm, board.bm) ||
            areEqual(board.tr, board.mr, board.br) ||
            areEqual(board.tl, board.mm, board.br) ||
            areEqual(board.bl, board.mm, board.tr)) {
                showEnd(x);
                setTimeout(reset, 5000);
            }
    }

    $('.square').click(function(event) {
        var id = event.target.id;
        if (!(board[id] > 0)) {
            if (x) {
                board[id] = 1;
                x = false;
            }
            else {
                board[id] = 2;
                x = true;
            }
            showBoard();
            setTimeout(checkEnd, 1);
        }

    })



});