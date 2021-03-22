//flip when clicked

const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function cardAnimation(cardId) {
    document.getElementById(cardId).style.transform = "rotateY(180deg)";
}

function flipCard() {
    this.classList.add('flip');
    //first click
    hasFlippedCard = true;
    firstCard = this;
    
    // do cards match?

 function checkForMatch() {
     let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

     isMatch ? disableCards() : unflipCards();
     //not a match
 setTimeout(() => {
     firstCard.classlist.remove('flip');
     secondCard.classlist.remove('flip');  
  }, 1500); 

  }
 }


cards.forEach(card => card.addEventListener('click', flipCard));