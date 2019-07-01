'use strict'

const config = require('./../config')
const store = require('./../store.js')

const getAllGames = () => {
  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'GET',
    contentType: 'application/json',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
//
// const getGamesUnfinished = () => {
//   return $.ajax({
//     url: config.apiUrl + '/games?over=false',
//     method: 'GET',
//     contentType: 'application/json',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

const updateGame = (index, value) => {
  return $.ajax({
    url: config.apiUrl + '/games/' + store.gameData.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': value
        },
        'over': store.gameData.over
      }
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
  updateGame,
  newGame,
  getAllGames
  // getGamesUnfinished
}
