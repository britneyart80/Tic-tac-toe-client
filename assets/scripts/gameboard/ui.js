'use strict'

const store = require('./../store')

const gameOver = () => {
  $('.main-message').text('game over! Start a new game to play again.').show()
}

const newGameSuccess = gameData => {
  $('.main-message').text('Started a new game!').css('background-color', 'green').show()
  $('.main-message').delay(2000).fadeOut()
  $('.feedback').text("It's player X's turn")
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  store.gameData = gameData.game
}

const newGameFail = gameData => {
  console.log('new game failed')
}

const updateGameSuccess = gameData => {
  if (store.playerX) {
    $('.feedback').text("It's player X's turn")
  } else {
    $('.feedback').text("It's player O's turn")
  }
}

const updateGameFail = gameData => {
  $('.main-message').text('An error occured').css('background-color', 'red').show()
  $('.main-message').delay(2000).fadeOut()
}

module.exports = {
  newGameSuccess,
  newGameFail,
  updateGameSuccess,
  updateGameFail,
  gameOver
}
