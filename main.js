var history = []

function getRandomColor () {
  var colors = ['red', 'yellow', 'blue', 'green']
  var randomIndex = Math.floor(Math.random() * colors.length)
  var randomColor = colors[randomIndex]
  return randomColor
}

function start () {
  history = []
}

function addColor () {
  history.push(getRandomColor())
}
