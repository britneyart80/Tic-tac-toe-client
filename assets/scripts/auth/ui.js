'use strict'

const store = require('./../store')

const successfulSignUp = response => {
  $('form').trigger('reset')
  $('#sign-up-modal').modal('hide')
  $('.logins-message').text('Sign up successful! Sign in to the play the game.').css('color', 'green')
}

const failedSignUp = () => {
  $('form').trigger('reset')
  $('.logins-fail-message').text('This username is taken or passwords are not the same.').show()
  $('.logins-fail-message').delay(2500).fadeOut()
}

const successfulSignIn = response => {
  // stores user sign-in token
  store.user = response.user
  // clears starter board
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  $('.dropdown-toggle').text(`${store.user.email}`)
  $('.logins-message').text('Sign in or Sign up to start the game!')
  $('.game-data').attr('class', 'game-data visible')
  $('.feedback').text('Click Single or Multiplayer to play!').show()
  $('section').attr('class', 'visible')
  $('form').trigger('reset')
  $('#sign-in-modal').modal('hide')
  $('.logins').hide()
  $('#drop-down').attr('class', 'visible')
}

const failedSignIn = () => {
  $('form').trigger('reset')
  $('.logins-fail-message').text('Username or password is incorrect').show()
  $('.logins-fail-message').delay(2500).fadeOut()
}

const successfulSignOut = () => {
  $('.body').attr('id', 'basic')
  // clears starter board
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  $('#0').text('X')
  $('#4').text('O')
  $('#5').text('X')
  $('#8').text('O')
  $('.game-data').attr('class', 'game-data invisible')
  $('.total-games').text('')
  $('.unfinished-games').text('')
  $('.games-won').text('')
  $('section').attr('class', 'invisible')
  $('.main-message').text('You were signed out').css('background-color', 'green').show()
  $('.main-message').delay(2500).fadeOut()
  $('.logins').show()
  $('#drop-down').attr('class', 'invisible')
}

const failedSignOut = () => {
  $('.main-message').text('Error: Failed to sign out').css('background-color', 'red').show()
  $('.main-message').delay(2500).fadeOut()
}

const successfulPasswordChange = () => {
  $('form').trigger('reset')
  $('#change-password-modal').modal('hide')
  $('.main-message').text('Password successfully changed').css('background-color', 'green').show()
  $('.main-message').delay(2500).fadeOut()
}

const failedPasswordChange = () => {
  $('form').trigger('reset')
  $('.logins-fail-message').text('Error: Failed to change password')
  $('.logins-fail-message').delay(2500).fadeOut()
}

module.exports = {
  successfulSignUp,
  failedSignUp,
  successfulSignIn,
  failedSignIn,
  successfulSignOut,
  failedSignOut,
  successfulPasswordChange,
  failedPasswordChange
}
