var colorHistory = ['red', 'yellow', 'blue', 'green']

//
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
  var i = 0
  var interval = setInterval(function() {
    turnOn(colorSet[i])

    i++

    if (i >= colorSet.length) {
      clearInterval(interval);
    }
  }, 600)
}

function turnOn (color) {
  var quad = document.querySelector('.' + color)
  quad.classList.add('active')
  setTimeout(function () {
    quad.classList.remove('active')
  }, 400)
}

function newGame () {
  colorHistory = []
  seedForTests(20)
  animate(colorHistory)
}

var button = document.querySelector('button')
button.addEventListener('click', newGame)
