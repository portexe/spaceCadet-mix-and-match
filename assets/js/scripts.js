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

  if (firstCard.dataset.framework === secondCard.dataset.framework) {
      firstCard.removeEventListener("click",flipCard);
      secondCard.removeEventListener("click", flipCard);
  }
  console.log("Function was executed!")
}



cards.forEach(card => card.addEventListener('click', flipCard));