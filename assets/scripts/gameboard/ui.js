'use strict'

const store = require('./../store')

const gameOver = () => {
  if (store.playerX) {
    $('.main-message').text('Player O wins! Click Single or Multi Player to play again').show()
  } else {
    $('.main-message').text('Player X wins! Click Single or Multi Player to play again').show()
  }
}

const tie = () => {
  $('.main-message').text('Players tied! Game over.').show()
}

const newGameSuccess = gameData => {
  $('.main-message').text('Started a new game!').css('background-color', 'green').show()
  $('.main-message').delay(2000).fadeOut()
  $('.feedback').text("It's player X's turn")
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  store.playerX = true
  store.gameData = gameData.game
}

const newGameFail = gameData => {
  $('.main-message').text('An error occured').css('background-color', 'red').show()
}

const updateGameSuccess = gameData => {
  if (!store.multiplayer && store.playerX) {
    setTimeout(function () {
      $('.feedback').text("It's player X's turn")
    }, 1500)
  } else if (store.playerX) {
    $('.feedback').text("It's player X's turn")
  } else {
    $('.feedback').text("It's player O's turn")
  }
}

const updateGameFail = gameData => {
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  $('.main-message').text('An error occured').css('background-color', 'red').show()
  $('.main-message').delay(2000).fadeOut()
}

const getAllGamesSuccessful = response => {
  $('.total-games').text(`Total games played: ${response.games.length}`)
}

const getAllGamesFailed = response => {
  $('.total-games').text(`Total games played: Error- Unable to retrieve data.`)
  $('.games-won').text(`Total games won: Error- Unable to retrieve data.`)
}

const getGamesUnfinishedSuccessful = response => {
  $('.unfinished-games').text(`Total unfinished games: ${response.games.length}`)
}

const getGamesUnfinishedFailed = response => {
  $('.unfinished-games').text(`Total unfinished games: Error- Unable to retrieve data.`)
}

const countWins = allGames => {
  let wins = 0
  const allSame = (a, b, c) => {
    if (a && b && c) {
      return a === 'x' && a === b && b === c
    }
  }
  for (let i = 0; i < allGames.games.length; i++) {
    const curr = allGames.games[i]
    for (let i = 0; i < 9; i += 3) {
      if (allSame(curr.cells[i], curr.cells[i + 1], curr.cells[i + 2])) {
        wins++
      }
    }
    // checks for each column
    for (let j = 0; j < 4; j++) {
      if (allSame(curr.cells[j], curr.cells[j + 3], curr.cells[j + 6])) {
        wins++
      }
    }
    // checks for each diagonal
    if (allSame(curr.cells[4], curr.cells[0], curr.cells[8]) ||
    allSame(curr.cells[4], curr.cells[2], curr.cells[6])) {
      wins++
    }
  }
  $('.games-won').text(`Total games won: ${wins}`)
}

const countWinsFailure = () => {

}

module.exports = {
  newGameSuccess,
  newGameFail,
  updateGameSuccess,
  updateGameFail,
  gameOver,
  tie,
  getAllGamesSuccessful,
  getAllGamesFailed,
  getGamesUnfinishedSuccessful,
  getGamesUnfinishedFailed,
  countWins,
  countWinsFailure
}
