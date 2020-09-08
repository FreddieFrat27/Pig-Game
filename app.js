/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points/ user entered points on GLOBAL score wins the game.
*/

var scores, roundScore, activePlayer, gamePlaying = true;
var previousRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function() 
{
    if(gamePlaying)
    {
    // 1. Random number
    // Floor makes the number a whole number and random generates a random number between 1-6.
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    // You can store query selectors for specific elements/classes/ids in a variable to use it later.
    var diceDOM = document.querySelector('.dice');
    var diceDOM2 = document.querySelector('.dice-2');
    diceDOM.style.display = 'block';  // Sets display to block so that its visible again.
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    // 3. Update the round score if the rolled number is not a 1;
    if (dice === 6 && previousRoll === 6)
    {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        changePlayer();
    }
    else if (dice !== 1 && dice2 !== 1)
    {
        // Add score
        roundScore += dice + dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        console.log(dice);
    } 
    else
    {
        changePlayer();
    }
    previousRoll = dice;
    }
});

// Checks if the user pressed the hold button. If the user did press the button, then we need to
// check if they won the game. If the user did not win the game, move on to the next player. 
document.querySelector('.btn-hold').addEventListener('click', function ()
{
    if (gamePlaying)
    {
    // Add CURRENT score to the global score.
    scores[activePlayer] += roundScore;
    // Update the UI.
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // This will allow a player to change the final score. If they don't enter one, by default, 
    // the winning score will be 100.
    var input = document.querySelector('.final-score').value;
    if (input)
    {
        var winningScore = input;
    }
    else winningScore = 100;
    
    // Check if player won the game.
    if (scores[activePlayer] >= winningScore)
    {
        // If the score is reached, declare that player the winner.
        document.getElementById('name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;

    }
    else changePlayer();
    }
});

// A function that changes the player by checking who the current player is.
function changePlayer()
{
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
        // Trenary operator.
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

// Initializes our game.
function init()
{
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    // Hides our image for the dice.
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    // This is our defaults whenever a new game is started or when the page first loads up.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
}

