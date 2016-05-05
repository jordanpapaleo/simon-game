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

var scoreNode = document.querySelector('.score')
var statusNode = document.querySelector('.status')

var button = document.querySelector('.btn')
button.addEventListener('click', startGame)

var quads = document.querySelectorAll('.quad')
for (let i = 0, j = quads.length; i < j; i++) {
  quads[i].addEventListener('click', userClick)
}

function getRandomColor () {
  var colors = ['red', 'yellow', 'blue', 'green']
  var randomIndex = Math.floor(Math.random() * colors.length)
  var randomColor = colors[randomIndex]
  return randomColor
}

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
  statusNode.innerText = 'Playing'
  clickIndex = 0
  score.innerText = 0
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
      scoreNode.innerText = score
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
  statusNode.innerText = 'Game Over'

  setTimeout(function () {
    new Audio('assets/sounds/aww.wav').play()
  }, 300)
}

function turnAllOff () {
  for (let i = 0, j = quads.length; i < j; i++) {
    quads[i].classList.remove('active')
  }
}

/* function seedForTests (seedCount) {
  while (seedCount > 0) {
    colorHistory.push(getRandomColor())
    seedCount--
  }
} */
