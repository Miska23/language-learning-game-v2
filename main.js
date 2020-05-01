import { initialCards, backsides, frontsides } from './Modules/Cards.js'
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

//* OK
const showCard = function() {
  this.children[0].classList.toggle("show");
}

const setUpCardListeners = () => {
  backsides.forEach(backside => backside.addEventListener("click", showCard));
}

setUpCardListeners();
