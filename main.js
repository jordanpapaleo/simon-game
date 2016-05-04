var colorHistory = []
var score = 0
var isUserTurn = true
var clickIndex = 0
var isPlaying = false

var soundMap = {
  red: 'c_sharp.wav',
  yellow: 'd_sharp.wav',
  blue: 'f_sharp.wav',
  green: 'g_sharp.wav'
}

function getRandomColor () {
  var colors = ['red', 'yellow', 'blue', 'green']
  var randomIndex = Math.floor(Math.random() * colors.length)
  var randomColor = colors[randomIndex]
  return randomColor
}

/* function seedForTests (seedCount) {
  while (seedCount > 0) {
    colorHistory.push(getRandomColor())
    seedCount--
  }
} */

function animate (colorSet) {
  var i = 0
  var interval = setInterval(function () {
    turnOn(colorSet[i])
    i++
    if (i >= colorSet.length) {
      clearInterval(interval)
      isUserTurn = true
    }
  }, 600)
}

function turnOn (color) {
  new Audio('assets/sounds/' + soundMap[color]).play()
  var quad = document.querySelector('.' + color)

  quad.classList.add('active')
  setTimeout(function () {
    quad.classList.remove('active')
  }, 400)
}

function startGame () {
  turnAllOff()
  isPlaying = true
  score = 0
  colorHistory = []
  newTurn()
}

function newTurn () {
  isUserTurn = false
  clickIndex = 0
  var nextColor = getRandomColor()
  colorHistory.push(nextColor)
  animate(colorHistory)
}

function userClick (ev) {
  var color = ev.target.dataset.color
  if (isUserTurn && isPlaying) {
    turnOn(color)

    // Got one right
    if (color === colorHistory[clickIndex]) {
      score++
      clickIndex++

      if (clickIndex === colorHistory.length) {
        setTimeout(newTurn, 500)
      }
    } else if (color !== colorHistory[clickIndex]) {
      gameOver()
    }
  } else if (!isPlaying) {
    turnOn(color)
  }
}

function gameOver () {
  isPlaying = false
  console.log(score)

  setTimeout(function () {
    new Audio('assets/sounds/aww.wav').play()
    // alert('Game Over')
  }, 300)
}

function turnAllOff () {
  for (let i = 0, j = quads.length; i < j; i++) {
    quads[i].classList.remove('active')
  }
}

var button = document.querySelector('button')
button.addEventListener('click', startGame)

var quads = document.querySelectorAll('.quad')
for (let i = 0, j = quads.length; i < j; i++) {
  quads[i].addEventListener('click', userClick)
}
