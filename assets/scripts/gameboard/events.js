const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')

store.playerX = true

const checkWinner = () => {
  const cells = store.gameData.cells

  // checks each row for a win
  for (let i = 0; i < 9; i += 3) {
    if (allSame(cells[i], cells[i + 1], cells[i + 2])) {
      store.gameData.over = true
      api.updateGame()
        .then(ui.gameOver)
        .catch(ui.updateGameFail)
    }
  }
  // checks for each column
  for (let j = 0; j < 4; j++) {
    if (allSame(cells[j], cells[j + 3], cells[j + 6])) {
      store.gameData.over = true
      api.updateGame()
        .then(ui.gameOver)
        .catch(ui.updateGameFail)
    }
  }
  // checks for each diagonal
  if (allSame(cells[4], cells[0], cells[8]) || allSame(cells[4], cells[2], cells[6])) {
    store.gameData.over = true
    api.updateGame()
      .then(ui.gameOver)
      .catch(ui.updateGameFail)
  }
}

const allSame = (first, second, third) => {
  if (first !== '' && second !== '' && third !== '') {
    return first === second && second === third
  }
}

// adds 'x' or 'o' to the clicked cell if there isnt already a piece there
const onUpdateGame = event => {
  event.preventDefault()
  console.log(store.gameData.cells)
  const index = event.target.cellIndex
  if (store.gameData.cells[index] === '') {
    if (store.playerX) {
      $(`#${index}`).text('X')
      store.gameData.cells[index] = 'x'
      store.playerX = false
    } else {
      $(`#${index}`).text('O')
      store.gameData.cells[index] = 'o'
      store.playerX = true
    }
  }

  api.updateGame()
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFail)

  checkWinner()
}

const onNewGame = event => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
}

module.exports = {
  onUpdateGame,
  onNewGame,
  checkWinner
}
