const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')

store.playerX = true

const onMultiplayer = () => {
  store.multiplayer = true
}

const onSinglePlayer = () => {
  store.multiplayer = false
}

// checks for all winning scenarios
const checkWinner = () => {
  event.preventDefault()
  let hasWin = false

  const cells = store.gameData.cells
  const gameOver = () => {
    store.gameData.over = true
    ui.gameOver()
  }

  // checks each row for a win
  for (let i = 0; i < 9; i += 3) {
    if (allSame(cells[i], cells[i + 1], cells[i + 2])) {
      gameOver()
      hasWin = true
      ui.blink(i, i + 1, i + 2)
    }
  }
  // checks for each column
  for (let j = 0; j < 4; j++) {
    if (allSame(cells[j], cells[j + 3], cells[j + 6])) {
      gameOver()
      hasWin = true
      ui.blink(j, j + 3, j + 6)
    }
  }
  // checks for a diagonal
  if (allSame(cells[4], cells[0], cells[8])) {
    gameOver()
    hasWin = true
    ui.blink(4, 0, 8)
  }
  // checks for other diagonal
  if (allSame(cells[4], cells[2], cells[6])) {
    gameOver()
    hasWin = true
    ui.blink(4, 2, 6)
  }
  // checks for a draw
  if (cells.every(x => x !== '') && !hasWin) {
    store.gameData.over = true
    api.updateGame()
      .then(ui.tie)
      .catch(ui.updateGameFail)
  }
}

// counts how many games the player won
const gamesWon = () => {
  event.preventDefault()

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
  event.preventDefault()
  const cells = store.gameData.cells
  if (cells.every(x => x !== '')) {
  } else if (cells.some(x => x !== '')) {
    let index = Math.floor(Math.random() * 9)
    while (cells[index]) {
      index = Math.floor(Math.random() * 9)
    }

    $('.feedback').text('Computer is thinking...')
    setTimeout(() => { $(`#${index}`).html('<p>O</p>') }, 1500)
    cells[index] = 'o'
    store.playerX = true

    setTimeout(function () {
      api.updateGame(index, 'o')
        .then(ui.updateGameSuccess)
        .catch(ui.updateGameFail)
    }, 1500)
  }
}

// adds 'x' or 'o' to the clicked cell if there isnt already a piece there
const onUpdateGame = event => {
  event.preventDefault()
  const cells = store.gameData.cells
  // if game is not over
  if (!store.gameData.over) {
    const index = event.target.cellIndex
    // if space is not taken
    if (cells[index] === '') {
      // if it is player X's turn, update the game with x at position of index
      if (store.playerX) {
        $(`#${index}`).html('<p>X</p>')
        cells[index] = 'x'
        store.playerX = false
        api.updateGame(index, 'x')
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
        checkWinner()
      } else if (store.multiplayer) {
        // if it is player O's turn, update the game with o at position of index
        $(`#${index}`).html('<p>O</p>')
        cells[index] = 'o'
        store.playerX = true
        api.updateGame(index, 'o')
          .then(ui.updateGameSuccess)
          .catch(ui.updateGameFail)
        checkWinner()
      }
      // if single player, trigger AI
      if (!store.gameData.over && !store.multiplayer) {
        computerMove()
        checkWinner()
      }
    }
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
  //
  // api.getGamesUnfinished()
  //   .then(ui.getGamesUnfinishedSuccessful)
  //   .catch(ui.getGamesUnfinishedFailed)

  gamesWon()
}

module.exports = {
  onSinglePlayer,
  onMultiplayer,
  onUpdateGame,
  onNewGame,
  checkWinner
}
