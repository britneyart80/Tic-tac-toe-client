const api = require('./api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields.js')

const gameboard = {
  cells: ['', '', '', '', '', '', '', '', ''],
  over: false,
  player_x: true
}

// adds 'x' or 'o' to the clicked cell if there isnt already a piece there
const addMove = event => {
  const index = event.target.cellIndex
  if (gameboard.cells[index] === '') {
    if (gameboard.player_x) {
      gameboard.cells[index] = 'x'
      gameboard.player_x = false
    } else {
      gameboard.cells[index] = 'o'
      gameboard.player_x = true
    }
  }
}

module.exports = {
  addMove
}
