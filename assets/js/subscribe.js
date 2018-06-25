!(function () {
  "use strict"
  window.addEventListener('load', function (event) {

    var form = document.getElementById('buttondown')
    var input = document.getElementById('mail')
    var hidden = document.getElementById('hidden')
    var submit = document.getElementById('button')
    var formMessage = document.getElementById('formMessage')

    var email = ''

    form.addEventListener('submit', function (event) {
      event.preventDefault()
      input.setAttribute('disabled', 'disabled')
      submit.setAttribute('disabled', 'disabled')

      var email = input.value || ''

      fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        body: JSON.stringify({email: email}),
        headers: {
          'Authorization': 'Token ' + '',
          'Content-type': 'application/json'
        }
      }).then(function(response) {
        console.log(response)
        if (response.statusText == 'Created') return created(email)
        if (response.status == 400) badRequest(email)
        else errorOut(email)
        //return response.json()
      }).then(function(json) {
        console.log(json)
      }).catch(function (err) {
        console.error(err)
        return errorOut(email)
      })
    })

    function created (email) {
      var message = 'Subscribed ' + email + '!'
      console.log(message)
      formMessage.classList.remove('fail')
      formMessage.classList.add('success')
      formMessage.textContent = message
      setTimeout(function () {
        formMessage.textContent = ''
        input.value = ''
      }, 7000)
      input.removeAttribute('disabled')
      submit.removeAttribute('disabled')
    }

    function badRequest (email) {
      var message = ''
      if (email == '') message = 'Please provide an email.'
      else message = 'There appears to be something wrong with the email you entered.'
      console.log(message)
      formMessage.classList.remove('success')
      formMessage.classList.add('fail')
      formMessage.textContent = message
      input.removeAttribute('disabled')
      submit.removeAttribute('disabled')
    }

    function errorOut (email) {
      var message = 'Something went wrong on our end when trying to subscribe ' + email + '. Email Costa to fix this at: costa@innovationbound.com.'
      console.log(message)
      formMessage.textContent = message
      formMessage.classList.remove('success')
      formMessage.classList.add('fail')
      formMessage.textContent = message
      input.removeAttribute('disabled')
      submit.removeAttribute('disabled')
    }

  }, false)
}());
