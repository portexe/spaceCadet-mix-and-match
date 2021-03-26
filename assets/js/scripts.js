//flip when clicked

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function cardAnimation(cardId) {
    document.getElementById(cardId).style.transform = "rotateY(180deg)";
}
function startGame() {
    setTimeout(() => {shuffleCards();
        countDown = startCountDown();
        busy = false;
   }, 500); 

function flipCard() {
    if (lockboard) return;
    this.classList.add('flip');
    //first click
    hasFlippedCard = true;
    firstCard = this;
    
    return;

    //second click

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch()
}
 function checkForMatch() {
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

     isMatch ? disableCards() : unflipCards();
 } 
  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  }
 
    function unFlipCards() {
      lockboard = true;

     setTimeout(() => {
     firstCard.classlist.remove('flip');
     secondCard.classlist.remove('flip');  

     lockBoard = false;
  }, 1500); 
}

 function resetBoard() {
     [hasFlippedCard, lockboard] = [false, false];
     [firstcard, secondCard] = [null,null];
 }
 function shuffle() {
     cards.forEach(card => {
         let randomPos = Math.floor(Math.random() * 19);
         card.style.order = randomPos;
     });
 }
}
cards.forEach(card => card.addEventListener('click', flipCard));