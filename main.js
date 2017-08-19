$(document).ready(function () {
    var x = true;
    var turn;
    var end;
    var moves = 0;
    var board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    var squareCoords = {
        tl: [0, 0],
        tm: [0, 1],
        tr: [0, 2],
        ml: [1, 0],
        mm: [1, 1],
        mr: [1, 2],
        bl: [2, 0],
        bm: [2, 1],
        br: [2, 2]
    };

    // Setup reusable functions
    function startGame() {
        // Hide the settings screen
        $('.settings').hide();

        // Reset the board
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        // Initialise variables
        turn = x;
        end = false;
        moves = 0;

        // Show the board
        $('.board').show();
        showBoard(board);
        console.log(board);

        // Start with x
        if (!x) {
            computerMove(board);
            turn = true;
            showBoard(board);
        }
    }

    function showBoard(board) {
        for (var key in squareCoords) {
            var curr = board[squareCoords[key][0]][squareCoords[key][1]];
            var symbol = "";
            if (curr === 1) {
                symbol = "X";
            } else if (curr === 2) {
                symbol = "O";
            }

            $('#' + key).text(symbol);

        }
    }

    function calcMove(board) {
        switch (Math.floor(Math.random() * 9)) {
            case 0:
                return 'tl';
            case 1:
                return 'tm';
            case 2:
                return 'tr';
            case 3:
                return 'ml';
            case 4:
                return 'mm';
            case 5:
                return 'mr';
            case 6:
                return 'bl';
            case 7:
                return 'bm';
            case 8:
                return 'br';
        }
    }

    function computerMove(board) {
        if (moves < 9) {
            do {
                var move = calcMove(board);
                var cRow = squareCoords[move][0];
                var cCol = squareCoords[move][1];
            }
            while (board[cRow][cCol] !== 0);

            if (x) {
                board[cRow][cCol] = 2;
            } else {
                board[cRow][cCol] = 1;
            }
            moves++;
            return [cRow, cCol];
        }
    }

    function checkEnd(board, lastRow, lastCol, isPlayer) {
        var tie = false;
        var symbol;
        if (isPlayer) {
            symbol = x ? 1 : 2;
        } else {
            symbol = x ? 2 : 1;
        }

        // Check row
        end = true;
        for (var i = 0; i < 3; i++) {
            if (board[lastRow][i] !== symbol) {
                end = false;
                break;
            }
        }

        // Check col
        if (!end) {
            end = true;
            for (var i = 0; i < 3; i++) {
                if (board[i][lastCol] !== symbol) {
                    end = false;
                    break;
                }
            }
        }

        // Check diagonal
        if (lastRow === lastCol && !end) {
            end = true;
            for (var i = 0; i < 3; i++) {
                if (board[i][i] !== symbol) {
                    end = false;
                    break;
                }
            }
        }

        // Check anti-diagonal
        if (lastRow + lastCol === 2 && !end) {
            end = true;
            for (var j = 0; j < 3; j++) {
                if (board[j][3 - j] !== symbol) {
                    end = false;
                    break;
                }
            }
        }

        // Check for tie
        if (moves === 9 && !end) {
            console.log(board);
            end = true;
            tie = true;
        }

        if (end) {
            console.log(end);
            if (tie) {
                setTimeout(function () {
                    showEnd(0)
                }, 1000);
            } else {
                setTimeout(function () {
                    showEnd(symbol)
                }, 1000);
            }
        }
    }

    function showEnd(symbol) {
        $('.board').hide();
        $('.end').show();

        var text = "";
        if (symbol === 1) {
            text = "X Wins!";
        } else if (symbol === 2) {
            text = "O Wins!";
        } else {
            text = "It was a tie!"
        }
        $('.end').text(text);
    }


    // Hide the other screens
    $('.board').hide();
    $('.end').hide();

    // Setup settings click events
    $('#x').click(function (event) {
        x = true;
        $('#x').addClass('selected');
        $('#o').removeClass('selected');
    });

    $('#o').click(function (event) {
        x = false;
        $('#o').addClass('selected');
        $('#x').removeClass('selected');
    });

    $('#play').click(function (event) {
        startGame();
    });

    // Create click events for board cells
    $('.square').click(function (event) {
        if (turn) {
            // Player's move
            var id = event.target.id;
            var row = squareCoords[id][0];
            var col = squareCoords[id][1];
            var cell = board[row][col];
            if (cell === 0) {
                if (x) {
                    board[row][col] = 1;
                } else {
                    board[row][col] = 2;
                }
                turn = false;
                moves++;

                showBoard(board);
                checkEnd(board, row, col, true);
                // Computer's move
                if (!end) {
                    var coords = computerMove(board);
                    row = coords[0];
                    col = coords[1];

                    setTimeout(function () {
                        showBoard(board);
                        turn = true;
                        checkEnd(board, row, col, false);
                    }, 1000);
                }
            }
        }
    });

    // Click to restart event
    $('.end').click(function (event) {
        $('.end').hide();
        $('.settings').show();
        x = true;
    });

});