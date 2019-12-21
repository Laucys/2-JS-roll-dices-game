/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, selectedScore;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//var x = document.querySelector('#score-0').textContent;
//console.log(x);



// Add function to roll the dice button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {

    // Caclulate Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // Display the result as an image
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // if rolled dice is 6 and last dice was 5 player looses score

    if ( dice === 6 && lastDice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = '0';
        nextPlayer();
    }

    // update the round score IF the rolled number was NOT a 1
    else if (dice !== 1 && dice2 !== 1) {
        //Keep adding score to current score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // If player rolled 1, start playing with next player
        nextPlayer();
    }

    // last dice equals to rolled dice
    lastDice = dice;

    }


});


// Add function to add score to global score and show winner
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //selectedScore = document.getElementById("select-score").value;

     // Check if player won the game
     if (scores[activePlayer] >= selectedScore) {
        // Change player name to Winner and hide dice
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        gamePlaying = false;

        // Add class to winner
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    
     } else {
        // if still no winner, play with next player
        nextPlayer();
     }
    }

});

function nextPlayer() {
    // Choose next player
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     // Set current score to 0 in UI
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     // Adding/removing active class wich shows who is active atm
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     // Hiding dice when next player is selected
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.dice2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Hide roll from beginning
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    // Reset all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    // Reset player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove winner style
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // Remove both active players
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // Make player 1 active
    document.querySelector('.player-0-panel').classList.add('active');

}

function submit () {
    selectedScore = document.getElementById("select-score").value;
}