//Piece lists
var whitePieces = [50, 52, 54, 56, 61, 63, 65, 67, 70, 72, 74, 76]; 
var redPieces = [01, 03, 05, 07, 10, 12, 14, 16, 21, 23, 25, 27];
var redKing = [];
var whiteKing = [];

//Available cell numbers
var availableCells = [30, 32, 34, 36, 41, 43, 45, 47];

var clickedPieceNumber = 0; 
var firstRed;//temporary variables for first clicked pieces
var firstWhite;
var WhitesTurn = true; // To check player turn
var beatedred; var beatenwhite; var blacktargetforRed; //Array temporary variables for moves
var beatedwhite; var beatenred; var blacktargetforWhite;

function clicktomove(event) { //Function to pieces

    if (WhitesTurn) { //White starts!
        if (clickedPieceNumber == 0) { //First click
            if (event.target.className == "whitesPieces" || event.target.className == "whiteKing") {
                if (isThereMove(parseInt(event.target.id))) { //Check if piece has valid move
                    $("#" + event.target.id).addClass("clicked");
                    firstWhite = parseInt(event.target.id); //temporary variable for storing value of piece to move
                    clickedPieceNumber++; //Trigger next click for move
                }
            } else if (event.target.className == "redsPieces" || event.target.className == "redKing") {
                alert("Not your turn!");
            }
        } else {
            if (event.target.className == "whitesPieces" || event.target.className == "whiteKing") {//Change piece to move
                if (isThereMove(parseInt(event.target.id))) {
                    $(".clicked").removeClass("clicked");
                    $("#" + event.target.id).addClass("clicked");
                    firstWhite = parseInt(event.target.id);
                }
            } else if (event.target.className == "blacksPieces") {
                if ($("#" + firstWhite).attr("class") == "whitesPieces clicked") { //If piece is only piece not king
                    if ((parseInt(event.target.id) + 18) == firstWhite) { // If white piece eats right top red
                        if ($("#" + (firstWhite - 9)).attr("class") == "redsPieces") {
                            // Temporary variables for updating piece lists
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite - 9];
                            // Update function for piece lists
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            // Changing pieces 
                            $("#" + firstWhite).removeClass("whitesPieces clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whitesPieces");
                            $("#" + (firstWhite - 9)).removeClass("redsPieces").addClass("blacksPieces");
                            isWhitebecomeking(parseInt(event.target.id)); //Check if piece become king
                            clickedPieceNumber--; //Triggering variable for next move
                            WhitesTurn = false; //Change turn
                            $("h1").html("Red's Turn").css({ "color": "red" }); //Alert to players
                            checkwin(); //Check if someone wins after that move 
                        } else {
                            alert("wrong move");
                        }
                    } else if ((parseInt(event.target.id) + 22) == firstWhite) {// If white piece eats left top red
                        if ($("#" + (firstWhite - 11)).attr("class") == "redsPieces") {
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite - 11];
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            $("#" + firstWhite).removeClass("whitesPieces clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whitesPieces");
                            $("#" + (firstWhite - 11)).removeClass("redsPieces").addClass("blacksPieces");
                            isWhitebecomeking(parseInt(event.target.id));
                            clickedPieceNumber--;
                            WhitesTurn = false;
                            $("h1").html("Red's Turn").css({ "color": "red" });
                            checkwin();
                        } else {
                            alert("wrong move");
                        }
                    } else if (((parseInt(event.target.id) + 9) == firstWhite) || ((parseInt(event.target.id) + 11) == firstWhite)) {// If white piece moves regular
                        var firstwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                        updateRegularMoveArray(firstwhite, blacktargetforWhite);
                        $("#" + firstWhite).removeClass("whitesPieces clicked").addClass("blacksPieces");
                        $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whitesPieces");
                        isWhitebecomeking(parseInt(event.target.id));
                        clickedPieceNumber--;
                        WhitesTurn = false;
                        $("h1").html("Red's Turn").css({ "color": "red" });
                        checkwin();
                    } else {
                        alert("wrong move");
                    }
                } else if ($("#" + firstWhite).attr("class") == "whiteKing clicked") {//White king moves
                    if ((parseInt(event.target.id) + 18) == firstWhite) { // If white king wants to eat right top red piece 
                        if ($("#" + (firstWhite - 9)).attr("class") == "redsPieces") {
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite - 9];
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            $("#" + firstWhite).removeClass("whiteKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whiteKing");
                            $("#" + (firstWhite - 9)).removeClass("redsPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = false;
                            $("h1").html("Red's Turn").css({ "color": "red" });
                            checkwin();
                        } else {
                            alert("wrong move");
                        }
                    } else if ((parseInt(event.target.id) + 22) == firstWhite) {// If white king wants to eat left top red piece 
                        if ($("#" + (firstWhite - 11)).attr("class") == "redsPieces") {
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite - 11];
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            $("#" + firstWhite).removeClass("whiteKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whiteKing");
                            $("#" + (firstWhite - 11)).removeClass("redsPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = false;
                            $("h1").html("Red's Turn").css({ "color": "red" });
                            checkwin();
                        } else {
                            alert("wrong move");
                        }
                    } else if ((parseInt(event.target.id) - 22) == firstWhite) {// If white king wants to eat red piece
                        if ($("#" + (firstWhite + 11)).attr("class") == "redsPieces") {
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite + 11];
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            $("#" + firstWhite).removeClass("whiteKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whiteKing");
                            $("#" + (firstWhite + 11)).removeClass("redsPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = false;
                            $("h1").html("Red's Turn").css({ "color": "red" });
                            checkwin();
                        } else {
                            alert("wrong move");
                        }
                    } else if ((parseInt(event.target.id) - 18) == firstWhite) {// If white king wants to eat red piece
                        if ($("#" + (firstWhite + 9)).attr("class") == "redsPieces") {
                            beatedwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                            beatenred = [firstWhite + 9];
                            updateBeatedPiecearray(beatedwhite, beatenred, blacktargetforWhite);
                            $("#" + firstWhite).removeClass("whiteKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whiteKing");
                            $("#" + (firstWhite + 9)).removeClass("redsPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = false;
                            $("h1").html("Red's Turn").css({ "color": "red" });
                            checkwin();
                        } else {
                            alert("wrong move");
                        }
                    } else if (((parseInt(event.target.id) + 9) == firstWhite) || ((parseInt(event.target.id) + 11) == firstWhite) ||
                        ((parseInt(event.target.id) - 9) == firstWhite) || ((parseInt(event.target.id) - 11) == firstWhite)
                    ) {// If white king wants to move regular
                        var firstwhite = [firstWhite]; blacktargetforWhite = [parseInt(event.target.id)];
                        updateRegularMoveArray(firstwhite, blacktargetforWhite);
                        $("#" + firstWhite).removeClass("whiteKing clicked").addClass("blacksPieces");
                        $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("whiteKing");

                        clickedPieceNumber--;
                        WhitesTurn = false;
                        $("h1").html("Red's Turn").css({ "color": "red" });
                        checkwin();
                    } else {
                        alert("wrong move");
                    }

                }
            }
        }
    } else {//RED turn!
        if (clickedPieceNumber == 0) {
            if (event.target.className == "redsPieces" || event.target.className == "redKing") {
                if (isThereMove(parseInt(event.target.id))) {
                    $("#" + event.target.id).addClass("clicked");
                    firstRed = parseInt(event.target.id);
                    clickedPieceNumber++;
                }
            } else if (event.target.className == "whitesPieces" || event.target.className == "whiteKing") {
                alert("Not your turn!");
            }
        } else {
            if (event.target.className == "redsPieces" || event.target.className == "redKing") {
                if (isThereMove(parseInt(event.target.id))) {
                    $(".clicked").removeClass("clicked");
                    $("#" + event.target.id).addClass("clicked");
                    firstRed = parseInt(event.target.id);
                }
            } else if (event.target.className == "whitesPieces") {
                alert("Wrong Move!");
            } else if (event.target.className == "blacksPieces") {
                if ($("#" + firstRed).attr("class") == "redsPieces clicked") { //RedPiece moves
                    if ((parseInt(event.target.id) - 18) == firstRed) {
                        if ($("#" + (firstRed + 9)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed + 9];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redsPieces clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redsPieces");
                            $("#" + (firstRed + 9)).removeClass("whitesPieces").addClass("blacksPieces");
                            isRedbecomeking(parseInt(event.target.id));
                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" }); //Alert players
                            checkwin(); //Check winners
                        } else {
                            alert("Wrong move!");
                        }
                    } else if ((parseInt(event.target.id) - 22) == firstRed) {
                        if ($("#" + (firstRed + 11)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed + 11];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redsPieces clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redsPieces");
                            $("#" + (firstRed + 11)).removeClass("whitesPieces").addClass("blacksPieces");
                            isRedbecomeking(parseInt(event.target.id));
                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" });
                            checkwin();
                        } else {
                            alert("Wrong move!");
                        }
                    } else if (((parseInt(event.target.id) - 9) == firstRed) || ((parseInt(event.target.id) - 11) == firstRed)) {
                        var firstred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                        updateRegularMoveArray(firstred, blacktargetforRed);
                        $("#" + firstRed).removeClass("redsPieces clicked").addClass("blacksPieces");
                        $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redsPieces");
                        isRedbecomeking(parseInt(event.target.id));
                        clickedPieceNumber--;
                        WhitesTurn = true;
                        $("h1").html("White's Turn").css({ "color": "white" });
                        checkwin();
                    } else {
                        alert("Wrong move!");
                    }
                } else if ($("#" + firstRed).attr("class") == "redKing clicked") {//Red Kıng moves
                    if ((parseInt(event.target.id) - 18) == firstRed) {
                        if ($("#" + (firstRed + 9)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed + 9];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redKing");
                            $("#" + (firstRed + 9)).removeClass("whitesPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" });
                            checkwin();
                        } else {
                            alert("Wrong move!");
                        }
                    } else if ((parseInt(event.target.id) - 22) == firstRed) {
                        if ($("#" + (firstRed + 11)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed + 11];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redKing");
                            $("#" + (firstRed + 11)).removeClass("whitesPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" });
                            checkwin();
                        } else {
                            alert("Wrong move!");
                        }
                    } else if ((parseInt(event.target.id) + 22) == firstRed) {
                        if ($("#" + (firstRed - 11)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed - 11];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redKing");
                            $("#" + (firstRed - 11)).removeClass("whitesPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" });
                            checkwin();
                        } else {
                            alert("Wrong move!");
                        }
                    } else if ((parseInt(event.target.id) + 18) == firstRed) {
                        if ($("#" + (firstRed - 9)).attr("class") == "whitesPieces") {
                            beatedred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                            beatenwhite = [firstRed - 9];
                            updateBeatedPiecearray(beatedred, beatenwhite, blacktargetforRed);
                            $("#" + firstRed).removeClass("redKing clicked").addClass("blacksPieces");
                            $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redKing");
                            $("#" + (firstRed - 9)).removeClass("whitesPieces").addClass("blacksPieces");

                            clickedPieceNumber--;
                            WhitesTurn = true;
                            $("h1").html("White's Turn").css({ "color": "white" });
                            checkwin();
                        } else {
                            alert("Wrong move!");
                        }
                    } else if (((parseInt(event.target.id) - 9) == firstRed) || ((parseInt(event.target.id) - 11) == firstRed) ||
                        ((parseInt(event.target.id) + 9) == firstRed) || ((parseInt(event.target.id) + 11) == firstRed)
                    ) {
                        var firstred = [firstRed]; blacktargetforRed = [parseInt(event.target.id)];
                        updateRegularMoveArray(firstred, blacktargetforRed);
                        $("#" + firstRed).removeClass("redKing clicked").addClass("blacksPieces");
                        $("#" + parseInt(event.target.id)).removeClass("blacksPieces").addClass("redKing");

                        clickedPieceNumber--;
                        WhitesTurn = true;
                        $("h1").html("White's Turn").css({ "color": "white" });
                        checkwin();
                    } else {
                        alert("Wrong move!");
                    }

                }
            }
        }
    }
}

function checkwin() { //IF one of players has no piece left or someone has 3 kings then winner is that player
    if (whitePieces.length == 0 || redKing.length>2) {
        $("h1").html("");
        $(".board").html("Red Won!").removeClass("board").addClass("winner").css({ "color": "red" });
    } else if (redPieces.length == 0 || whiteKing.length>2) {
        $("h1").html("");
        $(".board").html("White Won!").removeClass("board").addClass("winner").css({ "color": "white" });
    }
}
function isRedbecomeking(x) {//checks if red reached last row
    if ([70, 72, 74, 76].includes(x)) {
        $("#" + x).removeClass("redsPieces").addClass("redKing");
        redKing.push(x);
    }
}
function isWhitebecomeking(x) {
    if ([1, 3, 5, 7].includes(x)) {
        $("#" + x).removeClass("whitesPieces").addClass("whiteKing");
        whiteKing.push(x);
    }
}
function updateBeatedPiecearray(y, z, w) { //y-> beated   z->beaten w->y to new coordinate
    //Array function dumping pushing updating
    if ($("#" + y[0]).attr("class") == "redsPieces clicked") {
        redPieces.push(w[0]);
        redPieces = redPieces.filter(x => !y.includes(x));
        availableCells.push(y[0]);
        availableCells.push(z[0]);
        availableCells = availableCells.filter(x => !w.includes(x));
        whitePieces = whitePieces.filter(x => !z.includes(x));
    } else if ($("#" + y[0]).attr("class") == "whitesPieces clicked") {
        whitePieces.push(w[0]);
        whitePieces = whitePieces.filter(x => !y.includes(x));
        availableCells.push(y[0]);
        availableCells.push(z[0]);
        availableCells = availableCells.filter(x => !w.includes(x));
        redPieces = redPieces.filter(x => !z.includes(x));
    } else if ($("#" + y[0]).attr("class") == "redKing clicked") {//buna bak
        redPieces.push(w[0]);
        redPieces = redPieces.filter(x => !y.includes(x));
        availableCells.push(y[0]);
        availableCells.push(z[0]);
        availableCells = availableCells.filter(x => !w.includes(x));
        whitePieces = whitePieces.filter(x => !z.includes(x));
    } else if ($("#" + y[0]).attr("class") == "whiteKing clicked") {//buna bak
        whitePieces.push(w[0]);
        whitePieces = whitePieces.filter(x => !y.includes(x));
        availableCells.push(y[0]);
        availableCells.push(z[0]);
        availableCells = availableCells.filter(x => !w.includes(x));
        redPieces = redPieces.filter(x => !z.includes(x));
    }

}
function updateRegularMoveArray(y, z) {
    //Pushing updating pieces to arrays
    if ($("#" + y[0]).attr("class") == "redsPieces clicked") {
        redPieces.push(z[0]);
        availableCells.push(y[0]);
        redPieces = redPieces.filter(x => !y.includes(x));
        availableCells = availableCells.filter(x => !z.includes(x));
    } else if ($("#" + y[0]).attr("class") == "whitesPieces clicked") {
        whitePieces.push(z[0]);
        availableCells.push(y[0]);
        whitePieces = whitePieces.filter(x => !y.includes(x));
        availableCells = availableCells.filter(x => !z.includes(x));

    } else if ($("#" + y[0]).attr("class") == "redKing clicked") {
        redPieces.push(z[0]);
        redKing.push(z[0]);
        availableCells.push(y[0]);
        redKing = redKing.filter(x => !y.includes(x));
        redPieces = redPieces.filter(x => !y.includes(x));
        availableCells = availableCells.filter(x => !z.includes(x));

    } else if ($("#" + y[0]).attr("class") == "whiteKing clicked") {
        whitePieces.push(z[0]);
        whiteKing.push(z[0]);
        availableCells.push(y[0]);
        whiteKing = whiteKing.filter(x => !y.includes(x));
        whitePieces = whitePieces.filter(x => !y.includes(x));
        availableCells = availableCells.filter(x => !z.includes(x));
    }
}
function isThereMove(x) {
    // Checking valid moves if piece has
    if ($("#" + x).attr("class") == "redsPieces") { //red piece can move regular or eat left or right bottom white
        if (availableCells.includes(x + 18) && (whitePieces.includes(x + 9)))
            return true;
        else if (availableCells.includes(x + 22) && whitePieces.includes(x + 11))
            return true;
        else if (availableCells.includes(x + 9) || availableCells.includes(x + 11))
            return true;
        else
            return false;
    } else if ($("#" + x).attr("class") == "whitesPieces") {//white piece can move regular or eat left or right top red
        if (availableCells.includes(x - 18) && redPieces.includes(x - 9))
            return true;
        else if (availableCells.includes(x - 22) && redPieces.includes(x - 11))
            return true;
        else if (availableCells.includes(x - 9) || availableCells.includes(x - 11))
            return true;
        else
            return false;
    } else if ($("#" + x).attr("class") == "whiteKing") {//white king can move regular or eat left or right top and bottom red piece
        if (availableCells.includes(x + 18) && redPieces.includes(x + 9))
            return true;
        else if (availableCells.includes(x + 22) && redPieces.includes(x + 11))
            return true;
        else if (availableCells.includes(x - 18) && redPieces.includes(x - 9))
            return true;
        else if (availableCells.includes(x - 22) && redPieces.includes(x - 11))
            return true;
        else if (availableCells.includes(x + 9) || availableCells.includes(x + 11) || availableCells.includes(x - 9) || availableCells.includes(x - 11))
            return true;
        else
            return false;
    } else if ($("#" + x).attr("class") == "redKing") { //red king can move regular or eat left or right top and bottom white piece
        if (availableCells.includes(x + 18) && whitePieces.includes(x + 9))
            return true;
        else if (availableCells.includes(x + 22) && whitePieces.includes(x + 11))
            return true;
        else if (availableCells.includes(x - 18) && whitePieces.includes(x - 9))
            return true;
        else if (availableCells.includes(x - 22) && whitePieces.includes(x - 11))
            return true;
        else if (availableCells.includes(x + 9) || availableCells.includes(x + 11) || availableCells.includes(x - 9) || availableCells.includes(x - 11))
            return true;
        else
            return false;
    }
}