var colorHistory = []

function getRandomColor () {
  var colors = ['red', 'yellow', 'blue', 'green']
  var randomIndex = Math.floor(Math.random() * colors.length)
  var randomColor = colors[randomIndex]
  return randomColor
}

function seedForTests (seedCount) {
  while (seedCount > 0) {
    colorHistory.push(getRandomColor())
    seedCount--
  }
}

function animate (colorSet) {

}

function turnOn (color) {

}

function newGame () {

}
