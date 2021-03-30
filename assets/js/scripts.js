// The full list of cards. The length of this array
// will be used to determine whether or not the cardsMatched
// array is complete. If the two arrays are of equal length,
// then we know that the cardsMatched array contains all of
// the card names, and thus the game will be over.
const cards = [
  'sacral',
  'thirdEye',
  'chakraMan',
  'ladyChakra',
  'chakraTapestry',
  'chakraAngel',
  'heart',
  'solarPlexus',
  'throat',
  'root'
];

// Think of this variable as the card that was
// initially clicked. Once you click on another card
// it will be checked against this one. After the check
// takes place, it will be set back to null. So this
// will always either be:
// 1. null
// 2. A string value representing the name of the card that was last clicked.
let currentCard = null;

// This will be an array of strings.
// Each item in this array will represent a name
// of a card. If a card's name is in this array,
// it means that it has been successfully matched.
// Initially it is empty because there are no
// matches when the game begins.
let cardsMatched = [];

// This function shuffles an array and returns the shuffled version.
// Don't worry about how this function works. You can tell your instructor
// you found this algorithm online and they won't care. They wouldn't expect
// you to be able to re-create the Fisher-Yates shuffle algorithm on your own ;)
// Here is a link to credit the author: 
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// This function is called when the game has been won.
function gameWon() {
  // Hide the game section.
  document.getElementById('main').style.display = 'none';

  // Show the victory screen section.
  document.getElementById('victory-screen').style.display = 'flex';

  // Set the event listener for the Play Again button
  // The resetGame function is defined further down.
  document.getElementById('play-again-button').addEventListener('click', resetGame);
};

function cardClicked (clickEvent) {
  // Create a reference to the actual element that was clicked on.
  const cardElementClicked = clickEvent.currentTarget;

  // The event is passed automatically to this function.
  // Access the currentTarget to get the element that was
  // clicked during the event and then grab the data-cardType assigned
  // and assign that as a string to cardClicked.
  // So cardClicked will always either be the data-cardType of the card or null.
  const cardClicked = cardElementClicked.dataset.cardtype;



  // Add the flip class to the clicked card.
  cardElementClicked.classList.add('flip');

  // Now that we know which card was clicked, let's set the
  // current card equal to cardClicked IF cardClicked is currently
  // null. If it is not null, then we need to do the check now.
  // The first if block will run if currentCard is not null.
  if (currentCard) {
    // matchFound will be set to true if cardClicked is equal to
    // currentCard, otherwise it will be false. So the value is a boolean.
    const matchFound = cardClicked === currentCard;

    // If a match has been found we want to keep track of that match.
    // We will add the card type to an array called cardsMatched.
    // Once the card has been added to the cardsMatched array, we
    // will need to check if the game is over by looking at the length.
    // If a match was not found, we simply want to flip the cards back
    // over.
    if (matchFound) {
      cardsMatched.push(cardClicked);

      // If cardsMatched.length is equal to cards.length then we know
      // that the cardsMatched array is complete. Thus the game is over.
      if (cardsMatched.length === cards.length) {
        // setTimeout to delay the victory by half a second. This is so that the card can finish
        // Turning over before the victory screen is shown. Just a better visual experience.
        setTimeout(gameWon, 500);
      }

      // Reset.
      currentCard = null;
    } else {
      // The setTimeout is used to delay the function for some number of milliseconds. In this case 500.
      // We do this so that the user can see the cards and process it mentally before they flip back over.
      setTimeout(() => {
        // If you are confused about the backtick syntax with the 
        // dollar sign.. (`[data-cardType="${currentCard}"]`) then have a look here:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        document
          .querySelectorAll(`[data-cardType="${currentCard}"]`)
          .forEach(card => card.classList.remove('flip'));

        // Also remove the flip class from the card that was just clicked:
        cardElementClicked.classList.remove('flip');

        // Reset.
        currentCard = null;
      }, 500);
    }

    // Reset.
    
  } else {
    currentCard = cardClicked;
  }
};

// This function will reset the game back to it's initial state.
// Only called when the "Play Again" button is clicked.
function resetGame() {
  // Remove the flip class from all of the cards.
  document
    .querySelectorAll('.card')
    .forEach(card => card.classList.remove('flip'));

  // Show the game section.
  document.getElementById('main').style.display = 'block';

  // Hide the victory screen section.
  document.getElementById('victory-screen').style.display = 'none';
}

// The purpose of this function is to render the cards
// onto the screen. We are doing this here instead of
// writing the HTML manually because it gives us more
// dynamic capabilities, and is also much cleaner (Writing less code!).
// If you are not allowed to generate this dynamically
// due to your assignment's rules, we can simply write the
// HTML manually. But this way is better, trust me.
function generateCardGrid() {
  // Complete cards is going to be the cards array except with two of every item in it.
  // We are using something called "spreading" here to accomplish this. The three dots spreads
  // the item into the array. For example lets say you had an array like this:
  // const exampleArray = [1, 2, 3];
  // If you were to do this:
  // console.log([...exampleArray]); -> [1, 2, 3]
  // It would be equal to the original array.
  // But if you did this:
  // const exampleArray1 = [1, 2, 3];
  // const exampleArray2 = [4, 5, 6];
  // console.log([...exampleArray1, ...exampleArray2]); -> [1, 2, 3, 4, 5, 6]
  // It effectively combines the two. So by combining two of the same array, we
  // are basically duplicating itself. We need two of each because every card needs a match.
  // But we also need to scramble these cards up. So we will pass this duplicated array to
  // a scrambling function. SO in the end.. completeCards will be the fully scrambled array
  // of cards where each item contains exactly 1 match.
  const completeCards = shuffle([...cards, ...cards]);

  // Start by iterating through each of the items in the completeCards array.
  completeCards.forEach(c => {
    // 'c' is the current item we are on. So for example on the first
    // iteration, 'c' is equal to 'sacral', because it is the first item
    // inside of the completeCards array. We will be creating a card and injecting 
    // it onto the screen for every item inside of 'completeCards'.

    // We want to start by creating a div element.
    // This element will be the container of our card.
    const container = document.createElement('div');

    // We will do the same for the front and the back of the card
    const front = document.createElement('div');
    const back = document.createElement('div');

    // Now we need to create an image element for both the front
    // and the back of the cards.
    const frontImg = document.createElement('img');
    const backImg = document.createElement('img');

    // Now we have created all of the elements, we need to actually
    // set the attributes on each of the elements.

    // The container gets the card class
    container.classList.add('card');

    // And let's set the data-cardType to the current card we are on.
    container.dataset.cardtype = c;

    // Front and Back class names.
    front.classList.add('card-face');
    front.classList.add('card-front');
    back.classList.add('card-face');
    back.classList.add('card-back');

    // Time to finally set the image src's.
    // Due to the naming convention, this is really simple!
    frontImg.src = `assets/images/${c}.jpg`;
    frontImg.classList.add('card-value');

    // The backs of all of the cards are the same.
    backImg.src = 'assets/images/Flamethrower.jpg';
    backImg.classList.add('back-image');

    // Grab a reference to the game grid.
    const gameGrid = document.getElementById('game-container');

    // Okay all of the proper attributes have been set
    // so all we need to do is stack the elements together
    // and then inject the current parent into the HTML template
    // that's pre-written inside of the index.html file.
    // Order matters here.
    front.appendChild(frontImg);
    back.appendChild(backImg);
    container.appendChild(back);
    container.appendChild(front);
    gameGrid.appendChild(container);
  });
};

// This is the function that we will call when the script loads in order
// to kick everything off. Init is short for initialize.
function init () {
  // Start by generating the grid.
  generateCardGrid();

  // Grab all elements with a class of memory-card and then add 
  // a click event listener to it. The callback for the click is
  // set to the cardClicked function.
  // Confused about the arrow syntax? Have a look here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  document
    .querySelectorAll('.card')
    .forEach(card => card.addEventListener('click', cardClicked));
};

// Initialize the game.
init();
