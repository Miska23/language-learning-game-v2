const backsides = Array.from(document.querySelectorAll(".card-backside"));

const frontsides = Array.from(document.querySelectorAll(".card-frontside"));

const initialCards = [
  {colour: 'red'},
  {english: 'red'},
  {colour: 'blue'},
  {english: 'blue'},
  {colour: 'black'},
  {english: 'black'},
  {colour: 'white'},
  {english: 'white'},
]

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

const addCardsToFrontsides = () => {
  frontsides.forEach((frontside, index) => {
    if (shuffledInitialCards[index].colour) {
      frontside.classList.add(shuffledInitialCards[index].colour);
    } else {
      frontside.classList.add('text-card');
      let colourName = shuffledInitialCards[index].english;
      frontside.innerHTML = `${colourName}`;
    }
  });
};

addCardsToFrontsides();


/* backsides.forEach(backside => backside.addEventListener("click", showCard));
 */

/* backsides[0].addEventListener('click', showCard)
 */

function setUpCardListeners() {
  backsides.forEach(backside => {
    backside.addEventListener("click", showCard);
  });
}
//* OK
function showCard() {
  this.children[0].classList.toggle("show");
}

setUpCardListeners();


//! REFAKTOROINTI-IDEOITA
/* 
-html-:
  parentDiv
    childDiv

-html:lää koskeva js:
  let word = '';
  childDiv.innerHtml = ´${word
  }´
-lista olioita, joista puolella on propeina sanat eri kielillä ja puolella propina väri

-tämä lista sekoitetaan: newArr

-cardTopSidesille forEach(topSide, index) => , jossa tarkistus:
  if (newArr[index].väri) {
    topSide.classList.add(newArr[index])
  } else {
    if (selectedLanguage = "english") {
      word = newArr[index].english
    } else if...
    
  }

  */
