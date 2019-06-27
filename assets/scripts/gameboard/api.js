'use strict'

const config = require('./../config')
const store = require('./../store.js')

const retrieveGame = () => {
  console.log(store.gameData)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameData.id,
    method: 'GET',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const addMove = () => {
  console.log(store.gameData)
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameData.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': store.gameData
    }
  })
}

const newGame = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    data: '{}',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  retrieveGame,
  addMove,
  newGame
}
