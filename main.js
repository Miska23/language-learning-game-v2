import { initialCards, backsides, frontsides } from './Modules/Cards.js'

let openedCards = [];
let pairCounter;
let timer;


const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
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

const shuffledInitialCards = shuffle(initialCards);

let selectedLanguage = 'russian';

const createCards = () => {
  frontsides.forEach((frontside, index) => {
    frontside.setAttribute('pairIdentifier', shuffledInitialCards[index].pairIdentifier);
    if (shuffledInitialCards[index].colour) {
      frontside.classList.add(`${shuffledInitialCards[index].colour}-card`);
    } else {
      let colourName;
      frontside.classList.add('text-card');
      if (selectedLanguage === 'english') {
        colourName = shuffledInitialCards[index].english;
      } else if (selectedLanguage === 'french'){ 
        colourName = shuffledInitialCards[index].french;
      } else if (selectedLanguage === 'russian'){ 
        colourName = shuffledInitialCards[index].russian;
      }
      frontside.innerHTML = `${colourName}`;
    }
  });
};

createCards();

//* OK, poistetaan luokka show ja openedCardsin tyhjennys
const closeOpenedCards = () => {
  openedCards.forEach(openedCard => openedCard.classList.remove("show"));
  openedCards = [];
  console.log("openedCards was emptied");
}

//* checkIfOpenedCardsMatch-funktiossa, jotta siellä asetettu Timeout voidaan 
//* pyyhkiä setUpGame-funktiossa clearTimedCloserin avulla.
//* Estää tilanteen jossa tason vaihto sulkee uudessa pelissä nopesti avatun parentDivin (eli kortin), 
//* joka oli ennen tason vaihtoa vielä auki vanhassa pelissä tasonapin painamisen aikana (ei paria muodostunut) 
const closeCardsInTwoSeconds = () => {
  console.log("from closeCards: timer activated");
  timer = setTimeout(() => {
    closeOpenedCards();
  }, 2000);
}

//* OK
const enableClickingInTwoSeconds = () => {
  setTimeout(() => {
    backsides.forEach(backside => {
      if (!backside.children[0].classList.contains("show")) {
        backside.style.pointerEvents = "auto";
      }
    });
  }, 2000)
}

const showCard = function() {
  this.children[0].classList.toggle("show");
}

const addToOpenedCards = function() {
  if (this.children[0].classList.contains("show")) {
    openedCards.push(this.children[0]);
  } else {
    openedCards = [];
  }
  console.log('from addToOpenedCards, openedCards is now: ', openedCards);
}

const pairCheck = () => {
  return openedCards[0].getAttribute('pairIdentifier') === openedCards[1].getAttribute('pairIdentifier')
} 

const checkIfOpenedCardsMatch = () => {
  let openedCardsCounter = openedCards.length;
  if (openedCardsCounter === 2 && pairCheck()) {
    console.log('Pair!')
    openedCards = [];
    pairCounter++;
  } else if (openedCardsCounter === 2){
    console.log('Not a Pair!')
    backsides.forEach(backside => backside.style.pointerEvents = "none");
    closeCardsInTwoSeconds();
    enableClickingInTwoSeconds();
  }
} 


const setUpCardListeners = () => {
  backsides.forEach(backside => {
    backside.addEventListener("click", showCard);
    backside.addEventListener("click", addToOpenedCards);
    backside.addEventListener("click", checkIfOpenedCardsMatch);
  })
}

setUpCardListeners();


