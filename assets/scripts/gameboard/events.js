const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./../store')

let playerX = true

// adds 'x' or 'o' to the clicked cell if there isnt already a piece there
const onAddMove = event => {
  event.preventDefault()
  const index = event.target.cellIndex
  if (store.gameData.cells[index] === '') {
    if (playerX) {
      $(`#${index}`).text('X')
      store.gameData.cells[index] = 'x'
      playerX = false
    } else {
      $(`#${index}`).text('O')
      store.gameData.cells[index] = 'x'
      playerX = true
    }
  }

  api.addMove()
    .then(console.log)
    .catch(console.log)
}

const onNewGame = event => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFail)
}

module.exports = {
  onAddMove,
  onNewGame
}
