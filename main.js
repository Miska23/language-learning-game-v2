import * as DOMElements from './Modules/DomElements.js'

let openedCards = [];
let pairCounter = 0;
let gameCounter = 0;
let timer;
let colourName;
let selectedLanguage;
let selectedMode;
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

const displaySelectedLanguage = (language) => {
  DOMElements.langSelectionDisp.style.display = 'block';
  if (language === 'english') {
    return 'Englanti';
  } else if (language === 'french') {
    return 'Ranska';
  } else if (language === 'russian') {
    return 'Venäjä';
  }
}

const selectLanguage = event => {
  selectedLanguage = event.target.dataset.lang
  DOMElements.langButtons.forEach(langButton => langButton.style.display = 'none')
  DOMElements.langSelectionDisp.innerHTML = `Valittu kieli: ${displaySelectedLanguage(selectedLanguage)}`;
  DOMElements.modeButtons.forEach(modeButton => modeButton.style.display = 'inline-block')
}

const displaySelectedMode = (mode) => {
  DOMElements.modeSelectionDisp.style.display = 'block';
  if (mode === 'easy') {
    return 'Helppo';
  } else if (mode === 'difficult') {
    return 'Vaikea';
  }
}

const selectMode = event => {  
  selectedMode = event.target.dataset.mode;
  DOMElements.modeButtons.forEach(langButton => langButton.style.display = 'none')
  DOMElements.modeSelectionDisp.innerHTML = `Valittu taso: ${displaySelectedMode(selectedMode)}`;
  if (!gameCounter) {
  startGameWithCountdown();
  }
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

const shuffleInitialCards = mode => {
  if (mode === 'easy') {
    return shuffle(initialCards.slice(0,4)); //! TESTAUSARVOT
  } else if (mode === 'difficult') {
    return shuffle(initialCards.slice(0,8)); //! TESTAUSARVOT
  }
}

const createCards = () => {
  shuffledInitialCards = shuffleInitialCards(selectedMode);
  selectedMode === 'easy' ? fronts = DOMElements.frontsEasy : fronts = DOMElements.frontsDifficult;
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledInitialCards[index].pairID);
    if (shuffledInitialCards[index].colour) {
      front.classList.add(`${shuffledInitialCards[index].colour}-card`);
    } else {
      front.classList.add('text-card');
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

const toggleSelectedGrid = mode => {
  if (mode === 'easy') {
    DOMElements.easyGrid.classList.remove('hidden');
    DOMElements.difficultGrid.classList.add('hidden');
  } else if (mode === 'difficult'){
    DOMElements.difficultGrid.classList.remove('hidden');
    DOMElements.easyGrid.classList.add('hidden');  }
};

const showCard = function() {
  this.children[0].classList.toggle("show");
}

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
  if (DOMElements.newGameInfo.style.display === 'block') {
    DOMElements.newGameButtons.style.display = 'none';
    DOMElements.newGameInfo.style.display = 'none';
  } else {
    DOMElements.newGameButtons.style.display = 'block';
    DOMElements.newGameInfo.style.display = 'block';
  }
}

const isGameCompleted = () => {
  let halfOfAllCards = backs.length / 2;
  if (pairCounter === halfOfAllCards) {
    gameCounter++;
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

const setupCardListeners = () => {
  backs.forEach(back => {
    back.addEventListener("click", showCard);
    back.addEventListener("click", addToOpenedCards);
    back.addEventListener("click", checkIfOpenedCardsMatch);
  })
}

const setupGame = () => {
  createCards();
  selectedMode === 'easy' ? backs = DOMElements.backsEasy : backs = DOMElements.backsDifficult;
  setupCardListeners();
  toggleSelectedGrid(selectedMode);
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

const clearClassLists = (firstArray, secondArray) => {
    firstArray.forEach(element => element.classList.remove(element.classList.item(1)))
  if (secondArray) {
    secondArray.forEach(element => element.classList.remove(element.classList.item(1)))
  }
}

//TODO: poista kun uusi reset-toiminto on valmis
const playAgain = () => {
  shuffledInitialCards = shuffleInitialCards(selectedMode); //! uusi sekoitus
  clearClassLists(fronts); //! väri- ja tekstiluokan poisto
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledInitialCards[index].pairID);
    front.innerHTML = ''; //! ed. pelissä asetettu teksti pois kortista, joka on nyt värikortti
    if (shuffledInitialCards[index].colour) {
      front.classList.add(`${shuffledInitialCards[index].colour}-card`);
    }
    else {
      front.classList.add('text-card');
      colourName = shuffledInitialCards[index][selectedLanguage]; //! teksti ed. pelin kielival. mukaan
      front.innerHTML = `${colourName}`;
    }
  });
}
//TODO: poista kun uusi reset-toiminto on valmis
const playAgainAndChangeMode = () => {
  selectedMode === 'easy' ? selectedMode = 'difficult' : selectedMode = 'easy' //! tason muutos 
  shuffledInitialCards = shuffleInitialCards(selectedMode); //! uusi sekoitus
  //! frontsien käyttäminen tason mukaan
  selectedMode === 'easy' ? fronts = DOMElements.frontsEasy : fronts = DOMElements.frontsDifficult;
  clearClassLists(fronts); //! väri- ja tekstiluokan poisto
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledInitialCards[index].pairID);
    front.innerHTML = ''; //! ed. pelissä asetettu teksti pois kortista, joka on nyt värikortti
    if (shuffledInitialCards[index].colour) {
      front.classList.add(`${shuffledInitialCards[index].colour}-card`);
    } else {
      front.classList.add('text-card');
      colourName = shuffledInitialCards[index][selectedLanguage]; //! teksti ed. pelin kielival. mukaan
      front.innerHTML = `${colourName}`;
    }
  });
  //! backsien uud. asetus jotta niiden toiminnot ovat ok tason vaihdon jälkeen
  selectedMode === 'easy' ? backs = DOMElements.backsEasy : backs = DOMElements.backsDifficult; 
  setupCardListeners();
/*   toggleSelectedGrid(selectedMode); */
}
//TODO: poista kun uusi reset-toiminto on valmis
const playAgainAndChangeLanguage = () => {
  DOMElements.newGameInfo.style.display = 'none';
  DOMElements.easyGrid.classList.add('hidden');
  DOMElements.difficultGrid.classList.add('hidden');
  console.log('from playAgainAndChangeLanguage (1), sel.lang and sel.mode are:', selectedLanguage, selectedMode);
  shuffledInitialCards = shuffleInitialCards(selectedMode);
  selectedMode === 'easy' ? fronts = DOMElements.frontsEasy : fronts = DOMElements.frontsDifficult;
  clearClassLists(fronts);
  console.log('from playAgainAndChangeLanguage (2), fronts is now:', fronts);
}
//TODO: poista kun uusi reset-toiminto on valmis
const resetGame = event => {
  //! toiminnot kaikissa kolmessa
  newGameOption = event.target.dataset.newgameoption;
  pairCounter = 0;
  fronts.forEach(front => front.classList.toggle("show"));
  if (newGameOption === 'playAgain') { 
    playAgain();
  } else if (newGameOption === 'changeMode') {
    playAgainAndChangeMode();
  } else if (newGameOption === 'changeLanguage') {
    playAgainAndChangeLanguage();
  }
  backs.forEach(back => back.style.pointerEvents = "auto"); //! tämä kaikissa kolmessa 
}        

const resetGameWithOptions = (language, mode) => {
  pairCounter = 0;
  toggleNewGameElements();
  //! VAIHTOEHTO A:
  mode === 'easy' ? fronts = DOMElements.frontsEasy : fronts = DOMElements.frontsDifficult;
  mode === 'easy' ? backs = DOMElements.backsEasy : backs = DOMElements.backsDifficult;
  fronts.forEach(front => front.classList.remove('show'));
  shuffledInitialCards = shuffleInitialCards(mode); //! uusi sekoitus
  clearClassLists(fronts); //! väri- ja tekstiluokan poisto
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledInitialCards[index].pairID);
    front.innerHTML = ''; //! ed. pelissä asetettu teksti pois kortista, joka on nyt värikortti
    if (shuffledInitialCards[index].colour) {
      front.classList.add(`${shuffledInitialCards[index].colour}-card`);
    }
    else {
      front.classList.add('text-card');
      colourName = shuffledInitialCards[index][language]; //! teksti ed. pelin kielival. mukaan
      front.innerHTML = `${colourName}`;
    }
  });
  toggleSelectedGrid(selectedMode);
  backs.forEach(back => back.style.pointerEvents = 'auto');
  setupCardListeners();
}

const setResetOption = event => {
  newGameOption = event.target.dataset.newgameoption;
  let language;
  let mode;
  if (newGameOption === 'playAgain') { 
  } else if (newGameOption === 'changeMode') {
    selectedMode === 'easy' ? selectedMode = 'difficult' : selectedMode = 'easy'
  } else if (newGameOption === 'changeLanguage') {
    
  }
  resetGameWithOptions(selectedLanguage, selectedMode);
}


const setupButtons = (function() {
  DOMElements.langButtons.forEach(langButton => langButton.addEventListener('click', selectLanguage))
  DOMElements.modeButtons.forEach(modeButton => modeButton.addEventListener('click', selectMode))
  DOMElements.newGameButtons.addEventListener('click', setResetOption);
})(); 
