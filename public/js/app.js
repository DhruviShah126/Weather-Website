const weatherForm = document.querySelector('#unitForm')
const search = document.querySelector('#form-1')
// const unitForm = document.querySelector('#unitChoice')
const unitSys = document.querySelector('#form-2')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener(('submit'), (e) => {
    e.preventDefault()

    const location = search.value
    const unit = unitSys.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // if (unit == 'F') {
    //     console.log("Farenheit");
    // } else {
    //     console.log("Celsius")
    // }

    fetch('/weather?address=' + location + unit).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

