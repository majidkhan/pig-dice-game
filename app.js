/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var score, currentScore, activePlayer, gamePlaying, isDiceSix, winningScore;

init();

// when the roll button is clicked, it calls an anonymous function. 
document.querySelector('.btn-roll').addEventListener( 'click', function() {
    if(gamePlaying) {
        var dice = Math.floor((Math.random() * 6) + 1);
        var dice1 = Math.floor((Math.random() * 6) + 1);

        document.getElementById('dice-0').src = 'dice-' + dice + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        
        // if one of the dice is 1, pass the turn else continue rolling
        if (dice === 1 || dice1 === 1) {
            passTurn();
        } else {
            rollDice(dice);
            rollDice(dice1);    
        }
    }
});

// the function roll a dice and add the total to current score
function rollDice(theDice) {
    if ( theDice !== 1 ) {
        if ( theDice !== 6 ) {
            currentScore += theDice;
            isDiceSix = 0;
            document.getElementById('current-' + activePlayer).textContent = currentScore;        
        } else if ( theDice === 6 && isDiceSix === 0){
            isDiceSix = 1;
            currentScore += theDice;
            document.getElementById('current-' + activePlayer).textContent = currentScore;    
        } else if ( theDice === 6 && isDiceSix === 1 ) {
            document.getElementById('current-' + activePlayer).textContent = 0; // empty the current score DOM element
            document.getElementById('score-' + activePlayer).textContent = 0; // display score of the players                
            currentScore = 0;
            isDiceSix = 0;
            passTurn();
        }
    } else {
        passTurn();
    }
} 

document.querySelector('.btn-hold').addEventListener( 'click', function() {
    if (gamePlaying) {
        score[activePlayer] += currentScore; // add current score to the score array of the corresponding player
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer]; // display score of the playsers
    
        //  checking for the winner 
        //  
        if( score[activePlayer] >= winningScore ) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner'; // replacing player name with the Winner text
            document.getElementById('dice-0').style.display = 'none'; // hide dice 
            document.getElementById('dice-1').style.display = 'none'; // hide dice     
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');   // 
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    
            document.getElementById('current-0').textContent = 0;   // reset the score of the last turns. It is the score that is not hold yet.   
            document.getElementById('current-1').textContent = 0;        
            gamePlaying = false;
        } else {
            passTurn();
        }
    }
});

// function is called when pressing the hold button. 
// function is called when Player get a dice of 1.
function passTurn() {
    isDiceSix = 0;
    currentScore = 0;   // passing turn to the other player, empty the currentScore 
    document.getElementById('current-' + activePlayer).textContent = currentScore; // empty the current score DOM element
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;   // switch the player when hold is clicked
    document.getElementById('dice-0').style.display = 'none'; // hide dice 
    document.getElementById('dice-1').style.display = 'none'; // hide dice     
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// calls the init() for a new game
document.querySelector('.btn-new').addEventListener( 'click', init );

// Set Winning score
document.querySelector('input').addEventListener( 'input', function() {
    winningScore = document.querySelector('input').value;
});



// initialize variables and game states.
// The function is called when;
//  - the game loades in browser for first time 
//  - a new game is started
function init() {
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    isDiceSix = 0;

    document.getElementById('name-0').textContent = 'Player 1'; // Update name of the player. It will replace 'Winner' to 'Player 1'
    document.getElementById('name-1').textContent = 'Player 2'; // Update name of the player. It will replace 'Winner' to 'Player 2'   
    
    document.getElementById('dice-0').style.display = 'none'; // hide dice 
    document.getElementById('dice-1').style.display = 'none'; // hide dice     
    document.getElementById('current-0').textContent = 0;   // reset the score of the last turns. It is the score that is not hold yet. 
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-0').textContent = 0; // reset the score of each player
    document.getElementById('score-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.remove('winner'); // remove winner class when a new game is started
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active'); // remove active class 
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');    // set player 1 active by default when game initializes
}

// -------------------------------------------------
//  Program that I tried myself only in console
//
/*
var scorePlayer1 = 0;
var scorePlayer2 = 0; 

var currentPlayer = true;

function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(6);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function printScore(player) {
    if( player != 1 ) {
        console.log('Player2 score is ' + scorePlayer2);
    } else {
        console.log('Player1 score is ' + scorePlayer1);
    }
}

if (currentPlayer == false) {
    console.log('player 2 '+ currentPlayer);

// Player 2 turn
    function dice () {

        var turn = getRandomInt();
        console.log(turn);
        // the if statement will run when dice value is
        // other than 1 (i.e. 2,3,4,5)
        if (turn !== 1) {
            scorePlayer2 += turn;
        } else {
        // else will run for dice value is 1
//            printScore(currentPlayer);
            scorePlayer2 = 0;
            currentPlayer = true;
        }    
        printScore(currentPlayer);
    }
    
    
} else {
    console.log('player 1 '+ currentPlayer);

// Player 1 turn
    function dice () {

        var turn = getRandomInt();
        console.log(turn);
        // the if statement will run when dice value is
        // other than 1 (i.e. 2,3,4,5)
        if (turn !== 1) {
            scorePlayer1 += turn;
        } else {
        // else will run for dice value is 1
//            printScore(currentPlayer);
            scorePlayer1 = 0;
            currentPlayer = false;            
        }    
        printScore(currentPlayer);
    }    
    
}

function runApp() {
    dice();
}
*/

/***********************
 *      Concepts
 ***********************

//    Callback Function

    A callback function is the function that is called as 
    an argument inside another function. e.g.



//    Anonymous Function
    Anonymous function is a callback funtion but it does not 
    have a function name. It is also called function expression. 

*/