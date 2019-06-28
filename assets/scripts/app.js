'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const gameboardEvents = require('./gameboard/events.js')
const authEvents = require('./auth/events.js')
const themeEvents = require('./themes/events.js')
const store = require('./store')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.cell').on('click', gameboardEvents.onUpdateGame)
  $('#new-game').on('click', gameboardEvents.onNewGame)
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#sign-out').on('click', authEvents.onSignOut)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('.basic').on('click', themeEvents.onBasic)
  $('.dark').on('click', themeEvents.onDark)
})
