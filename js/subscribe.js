!(function () {
  "use strict"
  window.addEventListener('load', function (event) {

    var form = document.getElementById('buttondown')
    var input = document.getElementById('mail')
    var hidden = document.getElementById('hidden')
    var submit = document.getElementById('button')
    var formMessage = document.getElementById('formMessage')
    var interval


    var email = ''

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault()
        input.setAttribute('disabled', 'disabled')
        submit.setAttribute('disabled', 'disabled')

        var email = input.value || ''

        fetch('https://wamoyo.lib.id/microplastics-lab-email-subscriber@dev/subscribe/', {
          method: 'POST',
          body: JSON.stringify({email: email}),
          headers: {
            'Content-type': 'application/json'
          }
        }).then(function(option) {
          console.log('Response from OPTIONS: ', option)
          return option.json()
        }).then(function(response) {
          console.log('Response from POST: ', response)
          if (response.statusCode == 200) return created(email)
          if (response.statusCode == 400) badRequest(email)
          else errorOut(email)
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
        //interval = setTimeout(function () {
        //  formMessage.classList.remove('fail')
        //  formMessage.classList.remove('success')
        //  formMessage.textContent = ''
        //  input.value = ''
        //}, 7000)
        input.removeAttribute('disabled')
        submit.removeAttribute('disabled')
      }

      function badRequest (email) {
        //clearInterval(interval)
        var message = ''
        if (email == '') message = 'Please provide a valid email (or an alternate email).'
        else message = 'Please provide a valid email (or an alternate email).'
        console.log(message)
        formMessage.classList.remove('success')
        formMessage.classList.add('fail')
        formMessage.textContent = message
        input.removeAttribute('disabled')
        submit.removeAttribute('disabled')
      }

      function errorOut (email) {
        //clearInterval(interval)
        var message = 'Something went wrong on our end when trying to subscribe ' + email + '. Email Costa to fix this at: costa@innovationbound.com.'
        console.log(message)
        formMessage.textContent = message
        formMessage.classList.remove('success')
        formMessage.classList.add('fail')
        formMessage.textContent = message
        input.removeAttribute('disabled')
        submit.removeAttribute('disabled')
      }
    }

  }, false)
}());
