'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const gameboardEvents = require('./gameboard/events.js')
const authEvents = require('./auth/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.cell').on('click', gameboardEvents.onAddMove)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
})
