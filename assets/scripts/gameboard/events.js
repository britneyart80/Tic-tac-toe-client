const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')

store.playerX = true

// checks for all winning scenarios
const checkWinner = () => {
  const cells = store.gameData.cells
  const gameOver = () => {
    store.gameData.over = true
    ui.gameOver()
  }

  // checks each row for a win
  for (let i = 0; i < 9; i += 3) {
    if (allSame(cells[i], cells[i + 1], cells[i + 2])) {
      gameOver()
    }
  }
  // checks for each column
  for (let j = 0; j < 4; j++) {
    if (allSame(cells[j], cells[j + 3], cells[j + 6])) {
      gameOver()
    }
  }
  // checks for each diagonal
  if (allSame(cells[4], cells[0], cells[8]) || allSame(cells[4], cells[2], cells[6])) {
    gameOver()
  }
  // checks for a draw
  if (cells.every(x => x !== '')) {
    store.gameData.over = true
    api.updateGame()
      .then(ui.tie)
      .catch(ui.updateGameFail)
  }
}

// counts how many games the player won
const gamesWon = () => {
  api.getAllGames()
    .then(ui.countWins)
    .catch(ui.countWinsFailure)
}

// checks if inputs are the same
const allSame = (first, second, third) => {
  if (first && second && third) {
    return first === second && second === third
  }
}

// Computer's move
const computerMove = () => {
  const cells = store.gameData.cells
  if (cells.every(x => x !== '')) {
  } else if (cells.some(x => x !== '')) {
    $('.feedback').text('Computer is thinking...')
    let index = Math.floor(Math.random() * 9)
    while (cells[index]) {
      index = Math.floor(Math.random() * 9)
    }
    setTimeout(() => { $(`#${index}`).text('O') }, 1500)
    cells[index] = 'o'
    store.playerX = true
  }
}

// adds 'x' or 'o' to the clicked cell if there isnt already a piece there
const onUpdateGame = event => {
  event.preventDefault()

  if (!store.gameData.over) {
    const index = event.target.cellIndex
    let currPlayer
    if (store.gameData.cells[index] === '') {
      if (store.playerX) {
        $(`#${index}`).text('X')
        currPlayer = 'x'
        store.gameData.cells[index] = 'x'
        store.playerX = false
      }
      checkWinner()
      if (!store.gameData.over) {
        computerMove()
        checkWinner()
      }
    }
    setTimeout(function () {
      api.updateGame(index, currPlayer)
        .then(ui.updateGameSuccess)
        .catch(ui.updateGameFail)
    }, 1500)
  }
}

const onNewGame = event => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)

  api.getAllGames()
    .then(ui.getAllGamesSuccessful)
    .catch(ui.getAllGamesFailed)

  api.getGamesUnfinished()
    .then(ui.getGamesUnfinishedSuccessful)
    .catch(ui.getGamesUnfinishedFailed)

  gamesWon()
}

module.exports = {
  onUpdateGame,
  onNewGame,
  checkWinner
}
