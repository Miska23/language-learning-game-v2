
const backsides = Array.from(document.querySelectorAll(".card-backside"));

const frontsides = Array.from(document.querySelectorAll(".card-frontside"));

const initialCards = [
  {colour: 'red',
   pairIdentifier: 'pair-1'
  },
  {english: 'Red',
   french: 'Rouge',
   russian: 'Красный',
   pairIdentifier: 'pair-1'
  },
  {colour: 'blue',
   pairIdentifier: 'pair-2'
  },
  {english: 'Blue',
   french: 'Bleu',
   russian: 'Синий',
   pairIdentifier: 'pair-2'
  },
  {colour: 'green',
  pairIdentifier: 'pair-3'
  },
  {english: 'Green',
   french: 'Vert',
   russian: 'Зелёный',
   pairIdentifier: 'pair-3',
  },
  {colour: 'black',
  pairIdentifier: 'pair-4'
  },
  {english: 'Black',
   french: 'Noir',
   russian: 'Чёрный',
   pairIdentifier: 'pair-4'
  },
  {colour: 'white',

  pairIdentifier: 'pair-5'},
  {english: 'White',
   french: 'Blanc',
   russian: 'Белый',
   pairIdentifier: 'pair-5'
  },
  {colour: 'yellow',
  pairIdentifier: 'pair-6'},
  {english: 'Yellow',
   french: 'Jaune',
   russian: 'Жёлтый',
   pairIdentifier: 'pair-6'
  },
  {colour: 'grey',
  pairIdentifier: 'pair-7'
  },
  {english: 'Grey',
   french: 'Gris',
   russian: 'Серый',
   pairIdentifier: 'pair-7'
  },
  {colour: 'orange',
  pairIdentifier: 'pair-8'},
  {english: 'Orange',
   french: 'Orange',
   russian: 'Оранжевый',
   pairIdentifier: 'pair-8'
  },
  {colour: 'pink',
  pairIdentifier: 'pair-9'},
  {english: 'Pink',
   french: 'Rose',
   russian: 'Розовый',
   pairIdentifier: 'pair-9'
  },
  {colour: 'purple',
  pairIdentifier: 'pair-10'
  },
  {english: 'Purple',
   french: 'Violet',
   russian: 'Пурпурный',
   pairIdentifier: 'pair-10'
  }
]

export { initialCards, backsides, frontsides }