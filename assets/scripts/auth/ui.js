'use strict'

const store = require('./../store')

const successfulSignUp = response => {
  $('form').trigger('reset')
  $('#sign-up-modal').modal('hide')
  $('.logins-message').text('Sign up successful! Sign in to the play the game.').css('color', 'green')
}

const failedSignUp = () => {
  $('form').trigger('reset')
  $('.logins-fail-message').text('This username is taken or passwords are not the same.')
  $('.logins-fail-message').delay(3000).fadeOut()
}

const successfulSignIn = response => {
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).text('')
  }
  $('.game-data').attr('class', 'game-data visible')
  $('.feedback').text('Click New Game to play!')
  $('section').attr('class', 'visible')
  $('form').trigger('reset')
  $('#sign-in-modal').modal('hide')
  $('.logins').hide()
  $('#drop-down').attr('class', 'visible')
  // stores user sign-in token
  store.user = response.user
}

const failedSignIn = () => {
  $('form').trigger('reset')
  $('.logins-fail-message').text('Username or password is incorrect')
  $('.logins-fail-message').delay(3000).fadeOut()
}

const successfulSignOut = () => {
  $('.game-data').attr('class', 'invisible')
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
  $('.logins-fail-message').delay(3000).fadeOut()
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
