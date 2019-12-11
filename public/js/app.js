const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messgeOne = document.querySelector('#message-1')
const messgeTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messgeOne.textContent = `Loading...`
    messgeTwo.textContent = ``
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messgeOne.textContent = data.error
                // console.log(data.error);
            } else if (data) {
                messgeOne.textContent = data.location
                // console.log(data.forcast);
                messgeTwo.textContent = data.forcast
                // console.log(data.location);
            }
        })
    })
})
