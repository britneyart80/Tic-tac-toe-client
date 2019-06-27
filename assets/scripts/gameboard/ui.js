'use strict'

const store = require('./../store')

const newGameSuccess = gameData => {
  console.log(gameData)
  store.gameData = gameData.game
}

const newGameFail = gameData => {
  console.log('new game failed')
}

const addMoveSuccess = gameData => {

}

const addMoveFail = gameData => {

}

module.exports = {
  newGameSuccess,
  newGameFail,
  addMoveSuccess,
  addMoveFail
}
