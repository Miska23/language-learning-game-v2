//TODO: käyttäjällе näkyvä parilaskuri
//TODO: käyttäjällе näkyvä kello sekä läpäisyn kohdalla viesti joka kertoo käytetyn ajan
//TODO: ranskan- ja venäjänkielisten sanojen taivutusmuotojen näyttäminen läpäisyn jälkeen
//TODO: ohjemodaali
//TODO: perustyylit kuntoon
//TODO: responsiivinen design
//TODO: mobiiliversio React nativella?

import * as DOMElements from './Modules/DomElements.js'

let openedCards = [];
let pairCounter = 0;
let firstGame = true;
let selectedLanguage;
let easyMode;
let newGameOption;
let fronts;
let backs;
let shuffledCards;
let gameTimer;

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
  if (this.children[0].classList.contains('show')) {
    openedCards.push(this.children[0]);
    openedCards.forEach(openedCard => openedCard.parentNode.style.pointerEvents = 'none');
    console.log('from addToOpenedCards, openedCards is: ', openedCards);
    
  } else {
    openedCards = [];
  }
}

const closeOpenedCards = () => {
  openedCards.forEach(openedCard => openedCard.classList.remove('show'));
  openedCards = [];
}

//* checkIfOpenedCardsMatch-funktiossa, jotta siellä asetettu Timeout voidaan 
//* pyyhkiä setUpGame-funktiossa clearTimedCloserin avulla.
//* Estää tilanteen jossa tason vaihto sulkee uudessa pelissä nopesti avatun parentDivin (eli kortin), 
//* joka oli ennen tason vaihtoa vielä auki vanhassa pelissä tasonapin painamisen aikana (ei paria muodostunut) 
const closeCardsInTwoSeconds = () => {
  setTimeout(() => closeOpenedCards(), 2000);
}

const enableClickingInTwoSeconds = () => {
  setTimeout(() => {
    backs.forEach(back=> {
      if (!back.children[0].classList.contains('show')) {
        back.style.pointerEvents = 'auto';
      }
    });
  }, 2000)
}

const isGameCompleted = () => {
  let halfOfAllCards = backs.length / 2;
  if (pairCounter === halfOfAllCards) {
    let timerEndValue = DOMElements.gameTimer.textContent;
    console.log('from isGameCompleted, timerEndValue is: ', timerEndValue );
    clearInterval(gameTimer);
    DOMElements.gameTimer.textContent = `Löysit kaikki parit ajassa: ${timerEndValue}`;
    firstGame = false;
    pairCounter = 0;
    DOMElements.completionMsg.style.display = 'block'  
  }
}

const checkIfOpenedCardsMatch = () => {
  const openedCardsCounter = openedCards.length;
  if (openedCardsCounter === 2) {
    const isPair = openedCards[0].getAttribute('pairID') === openedCards[1].getAttribute('pairID');
    if (isPair) {
      openedCards = [];  
      pairCounter++;
      isGameCompleted(); 
    } else {
      backs.forEach(back => back.style.pointerEvents = 'none');
      closeCardsInTwoSeconds();
      enableClickingInTwoSeconds();
    }
  }
} 

const showCard = function() {
  this.children[0].classList.toggle('show');
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
  } 
  if (selectedLanguage === 'french') {
    langText = 'ranska';
  } 
  if (selectedLanguage === 'russian') {
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

const clearTextAndColourClasses = () => {
  fronts.forEach(front => front.classList.remove(front.classList.item(1)))
}

const setupCards = () => {
  shuffledCards = shuffleInitialCards();
  selectFrontsAndBacks();
  if (!firstGame) { //! suorita jos ei ole ensimmäinen peli eli on jo asetettu classListejä
    clearTextAndColourClasses();
    fronts.forEach(front => front.classList.remove('show'));
    backs.forEach(back => back.style.pointerEvents = 'auto');
  }
  fronts.forEach((front, index) => {
    front.setAttribute('pairID', shuffledCards[index].pairID);
    //! ed. pelissä asetettu teksti pois kortista, joka on nyt värikortti
    if (!firstGame) front.innerHTML = ''; 
    if (shuffledCards[index].colour) {
      front.classList.add(`${shuffledCards[index].colour}-card`);
    } else {
      front.classList.add('text-card');
      let colourName;
      //! turha block A ja B -reseteissä
      if (selectedLanguage === 'english') {
        colourName = shuffledCards[index].english;
      }
      if (selectedLanguage === 'french'){ 
        colourName = shuffledCards[index].french;
      }
      if (selectedLanguage === 'russian'){ 
        colourName = shuffledCards[index].russian;
      }
      front.innerHTML = `${colourName}`;
    }
  });
};

const toggleSelectedGrid = () => {
  if (easyMode) {
    DOMElements.easyGrid.classList.remove('hidden');
    DOMElements.difficultGrid.classList.add('hidden');
  } else {
    DOMElements.difficultGrid.classList.remove('hidden');
    DOMElements.easyGrid.classList.add('hidden');  }
};

const setupGame = () => {
  setupCards();
  setupCardListeners();
  toggleSelectedGrid();
  startGameTimer();
  DOMElements.newGameButtons.classList.toggle("hidden") 
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
  openedCards = [];
  pairCounter = 0;
  if (DOMElements.completionMsg.style.display = 'block') {
    DOMElements.completionMsg.style.display = 'none'
  }
  DOMElements.newGameButtons.classList.toggle("hidden");
  DOMElements.easyGrid.classList.add('hidden');
  DOMElements.difficultGrid.classList.add('hidden');
  firstGame = false;
  newGameOption = event.target.dataset.newgameoption;
  if (newGameOption === 'playAgain') { 
    startGameWithCountdown()
  }
  if (newGameOption === 'changeMode') {
    easyMode = !easyMode;
    DOMElements.modeSelectionDisp.style.display = 'block';
    DOMElements.modeSelectionDisp.innerHTML = `Valittu taso: ${displaySelectedMode()}`;
    startGameWithCountdown();
  } 
  if (newGameOption === 'changeLanguage') {
    DOMElements.langSelectionDisp.style.display = 'none';
    DOMElements.modeSelectionDisp.style.display = 'none';
    DOMElements.langButtons.forEach(langButton => langButton.style.display = 'inline-block')
  }
}

const startGameTimer = () => {

  //! alussa muoto 00.00, sitten 00.01, 00.10, 01.00,
  const createTimeFormat = (seconds, minutes) => {
    console.log('seconds: ', seconds, 'minutes: ', minutes);
    
    if (minutes < 10) {
      minutes = "0" + minutes;
    }  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    let result = minutes + ':' + seconds;
    return minutes + ':' + seconds
  }
/*   const addZero = (time) => {
    if (time < 10) {
      time = "0" + time;
    }
    return time; */
  
  DOMElements.gameTimer.classList.toggle('hidden');
  let seconds = 1;
  let minutes = 0;
  DOMElements.gameTimer.textContent = `00:00`
  gameTimer = setInterval(() => {    
/*     DOMElements.gameTimer.textContent = `${addZero(time)}`
 */    DOMElements.gameTimer.textContent = `${createTimeFormat(seconds, minutes)}`
    seconds++;
  }, 1000)
}

const setupButtons = (function() {
  DOMElements.langButtons.forEach(langButton => langButton.addEventListener('click', selectLanguage))
  DOMElements.modeButtons.forEach(modeButton => modeButton.addEventListener('click', selectMode))
  DOMElements.newGameButtons.addEventListener('click', resetGameWithOptions);
})(); 

