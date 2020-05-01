
const backsides = Array.from(document.querySelectorAll(".card-backside"));

const frontsides = Array.from(document.querySelectorAll(".card-frontside"));

const initialCards = [
  {colour: 'red'},
  {english: 'Red',
   french: 'Rouge',
   russian: 'Красный'
  },
  {colour: 'blue'},
  {english: 'Blue',
   french: 'Bleu',
   russian: 'Синий'
  },
  {colour: 'green'},
  {english: 'Green',
   french: 'Vert',
   russian: 'Зелёный'
  },
  {colour: 'black'},
  {english: 'Black',
   french: 'Noir',
   russian: 'Чёрный'
  },
  {colour: 'white'},
  {english: 'White',
   french: 'Blanc',
   russian: 'Белый'
  },
  {colour: 'yellow'},
  {english: 'Yellow',
   french: 'Jaune',
   russian: 'Жёлтый'
  },
  {colour: 'grey'},
  {english: 'Grey',
   french: 'Gris',
   russian: 'Серый'
  },
  {colour: 'orange'},
  {english: 'Orange',
   french: 'Orange',
   russian: 'Оранжевый'
  },
  {colour: 'pink'},
  {english: 'Pink',
   french: 'Rose',
   russian: 'Розовый'
  },
  {colour: 'purple'},
  {english: 'Purple',
   french: 'Violet',
   russian: 'Пурпурный'
  }
]

export { initialCards, backsides, frontsides }