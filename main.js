import * as DOMElements from './Modules/DomElements.js'

let openedCards = [];
let pairCounter = 0;
let firstGame = true;
let timer;
let colourName;
let selectedLanguage;
let easyMode;
let newGameOption;
let fronts;
let backs;
let shuffledInitialCards;

const initialCards = [
  {colour: 'red',
   pairID: 'pair-1'
  },
  {english: 'Red',
   french: 'Rouge',
   russian: 'Красный',
   pairID: 'pair-1'
  },
  {colour: 'blue',
   pairID: 'pair-2'
  },
  {english: 'Blue',
   french: 'Bleu',
   russian: 'Синий',
   pairID: 'pair-2'
  },
  {colour: 'green',
  pairID: 'pair-3'
  },
  {english: 'Green',
   french: 'Vert',
   russian: 'Зелёный',
   pairID: 'pair-3',
  },
  {colour: 'black',
  pairID: 'pair-4'
  },
  {english: 'Black',
   french: 'Noir',
   russian: 'Чёрный',
   pairID: 'pair-4'
  },
   {colour: 'white',
  pairID: 'pair-5'},
  {english: 'White',
   french: 'Blanc',
   russian: 'Белый',
   pairID: 'pair-5'
  },
  {colour: 'yellow',
  pairID: 'pair-6'},
  {english: 'Yellow',
   french: 'Jaune',
   russian: 'Жёлтый',
   pairID: 'pair-6'
  },
  {colour: 'grey',
  pairID: 'pair-7'
  },
  {english: 'Grey',
   french: 'Gris',
   russian: 'Серый',
   pairID: 'pair-7'
  },
  {colour: 'orange',
  pairID: 'pair-8'},
  {english: 'Orange',
   french: 'Orange',
   russian: 'Оранжевый',
   pairID: 'pair-8'
  },
  {colour: 'pink',
  pairID: 'pair-9'},
  {english: 'Pink',
   french: 'Rose',
   russian: 'Розовый',
   pairID: 'pair-9'
  },
  {colour: 'purple',
  pairID: 'pair-10'
  },
  {english: 'Purple',
   french: 'Violet',
   russian: 'Пурпурный',
   pairID: 'pair-10'
  } 
]

const addToOpenedCards = function() {
  if (this.children[0].classList.contains("show")) {
    openedCards.push(this.children[0]);
    openedCards.forEach(openedCard => openedCard.parentNode.style.pointerEvents = 'none');
  } else {
    openedCards = [];
  }
}

const closeOpenedCards = () => {
  openedCards.forEach(openedCard => openedCard.classList.remove("show"));
  openedCards = [];
}

//* checkIfOpenedCardsMatch-funktiossa, jotta siellä asetettu Timeout voidaan 
//* pyyhkiä setUpGame-funktiossa clearTimedCloserin avulla.
//* Estää tilanteen jossa tason vaihto sulkee uudessa pelissä nopesti avatun parentDivin (eli kortin), 
//* joka oli ennen tason vaihtoa vielä auki vanhassa pelissä tasonapin painamisen aikana (ei paria muodostunut) 
const closeCardsInTwoSeconds = () => {
  timer = setTimeout(() => closeOpenedCards(), 2000);
}

const enableClickingInTwoSeconds = () => {
  setTimeout(() => {
    backs.forEach(back=> {
      if (!back.children[0].classList.contains("show")) {
        back.style.pointerEvents = "auto";
      }
    });
  }, 2000)
}

const toggleNewGameElements = () => {
  DOMElements.newGameInfo.classList.toggle("hidden") 
}

const isGameCompleted = () => {
  let halfOfAllCards = backs.length / 2;
  if (pairCounter === halfOfAllCards) {
    firstGame = false;
    toggleNewGameElements();
  }
}
 
const pairCheck = () => {
  return openedCards[0].getAttribute('pairID') === openedCards[1].getAttribute('pairID')
} 

const checkIfOpenedCardsMatch = () => {
  let openedCardsCounter = openedCards.length;
  if (openedCardsCounter === 2 && pairCheck()) {
    openedCards = [];
    pairCounter++;
    isGameCompleted(); 
  } else if (openedCardsCounter === 2){
    backs.forEach(back => back.style.pointerEvents = "none");
    closeCardsInTwoSeconds();
    enableClickingInTwoSeconds();
  }
} 

const showCard = function() {
  this.children[0].classList.toggle("show");
}

const setupCardListeners = () => {
  backs.forEach(back => {
    back.addEventListener("click", showCard);
    back.addEventListener("click", addToOpenedCards);
    back.addEventListener("click", checkIfOpenedCardsMatch);
  })
}

const selectLanguage = event => {
  selectedLanguage = event.target.dataset.lang
  let langText;
  if (selectedLanguage === 'english') {
    langText = 'englanti';
  } else if (selectedLanguage === 'french') {
    langText = 'ranska';
  } else if (selectedLanguage === 'russian') {
    langText = 'venäjä';
  }
  DOMElements.langButtons.forEach(langButton => langButton.style.display = 'none')
  DOMElements.langSelectionDisp.style.display = 'block';
  DOMElements.langSelectionDisp.innerHTML = `Valittu kieli: ${langText}`;
  DOMElements.modeButtons.forEach(modeButton => modeButton.style.display = 'inline-block')
}

const displaySelectedMode = () => {
  if (easyMode) {
    return 'helppo'
  } else {
    return 'vaikea'
  }
}

const selectMode = event => {
  if (event.target.dataset.mode === 'easy') {
    easyMode = true;
  } else {
    easyMode = false;
  }
  DOMElements.modeButtons.forEach(langButton => langButton.style.display = 'none')
  DOMElements.modeSelectionDisp.style.display = 'block';
  DOMElements.modeSelectionDisp.innerHTML = `Valittu taso: ${displaySelectedMode()}`;
  DOMElements.startInfo.style.display = 'none';
  startGameWithCountdown();
}

const shuffle = array => {
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

const shuffleInitialCards = () => {
  if (easyMode) {
    return shuffle(initialCards.slice(0,4)); //! TESTAUSARVOT
  } else {
    return shuffle(initialCards.slice(0,8)); //! TESTAUSARVOT
  }
}

const selectFrontsAndBacks = () => {
  if (easyMode) {
    fronts = DOMElements.frontsEasy;
    backs = DOMElements.backsEasy;
  } else {
    fronts = DOMElements.frontsDifficult
    backs = DOMElements.backsDifficult
  }
}

const clearClasslists = () => {
  fronts.forEach(front => front.classList.remove(front.classList.item(1)))
}

//TODO: erota tai siirrä sisältöä, koska osa ei liity kortteihin
const createCards = () => {
  shuffledInitialCards = shuffleInitialCards();
  selectFrontsAndBacks();
  if (!firstGame) { //! suorita jos ei ole ensimmäinen peli eli on jo asetettu classListejä
    clearClasslists();
    pairCounter = 0;
    fronts.forEach(front => front.classList.remove('show'));
    backs.forEach(back => back.style.pointerEvents = 'auto');
  }
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledInitialCards[index].pairID);
    //! ed. pelissä asetettu teksti pois kortista, joka on nyt värikortti
    if (!firstGame) front.innerHTML = ''; 
    if (shuffledInitialCards[index].colour) {
      front.classList.add(`${shuffledInitialCards[index].colour}-card`);
    } else {
      front.classList.add('text-card');
      //! turha block A ja B -reseteissä
      if (selectedLanguage === 'english') {
        colourName = shuffledInitialCards[index].english;
      } else if (selectedLanguage === 'french'){ 
        colourName = shuffledInitialCards[index].french;
      } else if (selectedLanguage === 'russian'){ 
        colourName = shuffledInitialCards[index].russian;
      }
      front.innerHTML = `${colourName}`;
    }
  });
};

//TODO: tee toiminnot classlist.togglella?
const toggleSelectedGrid = () => {
  if (easyMode) {
    DOMElements.easyGrid.classList.remove('hidden');
    DOMElements.difficultGrid.classList.add('hidden');
  } else {
    DOMElements.difficultGrid.classList.remove('hidden');
    DOMElements.easyGrid.classList.add('hidden');  }
};

const setupGame = () => {
  createCards();
  setupCardListeners();
  toggleSelectedGrid();
} 

const startGameWithCountdown = () => {
  let time = 2;
  DOMElements.countDownTimer.style.display = 'block';
  DOMElements.countDownTimer.textContent = `${3}`
  const timer = setInterval(() => {
    DOMElements.countDownTimer.textContent = `${time}`
    if (time === -1) {
      clearInterval(timer);
      setupGame();
      DOMElements.countDownTimer.style.display = 'none';
    } else {
      time--
    }
  }, 1000)
}

const resetGameWithOptions = event => {
  toggleNewGameElements();
  newGameOption = event.target.dataset.newgameoption;
  if (newGameOption === 'playAgain') { 
    startGameWithCountdown()
  } else if (newGameOption === 'changeMode') {
    easyMode = !easyMode;
    DOMElements.modeSelectionDisp.style.display = 'block';
    DOMElements.modeSelectionDisp.innerHTML = `Valittu taso: ${displaySelectedMode()}`;
    startGameWithCountdown();
  } else if (newGameOption === 'changeLanguage') {
    DOMElements.langSelectionDisp.style.display = 'none';
    DOMElements.modeSelectionDisp.style.display = 'none';
    DOMElements.langButtons.forEach(langButton => langButton.style.display = 'inline-block')
  }
}

const setupButtons = (function() {
  DOMElements.langButtons.forEach(langButton => langButton.addEventListener('click', selectLanguage))
  DOMElements.modeButtons.forEach(modeButton => modeButton.addEventListener('click', selectMode))
  DOMElements.newGameButtons.addEventListener('click', resetGameWithOptions);
})(); 
