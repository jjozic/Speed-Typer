const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'

function reset() {
    console.log('gurke to go')
}

document.addEventListener('DOMContentLoaded', () => {
    var words = ['hello', 'how', 'house', 'boy', 'girl', 'planet']
    var randomWord = words[Math.floor(Math.random() * words.length)]
    var run = 0
    const quoteBox = document.getElementById('textDisplay')
    const timerElement  = document.getElementById('timer')
    const typingBox = document.getElementById('typingDisplay')
    const scoreLabel = document.getElementById('score')
    const wpmLabel = document.getElementById('wpm')

    renderNewQuote(true)

    //reacts on each input of the typing box
    typingBox.addEventListener('input', () => {
        let score = 0
        const arrayQuote = quoteBox.querySelectorAll('span')
        const arrayValue = typingBox.value.split('')

        console.log(arrayValue)

        /*for (let i = 0; i < arrayValue.length; i++) {
            if (arrayValue[i] === text.innerHTML[i]) {
                score++
            }
        }
        scoreLabel.innerHTML = score;*/

        let correct = true
        arrayQuote.forEach((characterSpan, index) => {
            const character = arrayValue[index]
            if (character == null) {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
                score++
            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                correct = false
                score--
            }
        })
        scoreLabel.innerHTML = score
        wpmLabel.innerHTML = getTimerTime()/score
        if (correct) renderNewQuote()
    })

    function getRandomQuote() {
        return fetch(RANDOM_QUOTE_API_URL)
            .then(response => response.json())
            .then(data => data.content)
    }

    async function renderNewQuote(newPage) {
        const quote = await getRandomQuote()
        quoteBox.innerHTML = ''
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteBox.appendChild(characterSpan)
        })
        typingBox.value = null
        if(!newPage){
            return
        }
        startTimer()
    }

    let startTime
    function startTimer() {
        timerElement.innerText = 'Time: 0s'
        startTime = new Date()
        setInterval(() => {
            timer.innerText = 'Time: ' + getTimerTime() + 's'
        }, 1000)
    }

    function getTimerTime() {
        return Math.floor((new Date() - startTime) / 1000)
      }
})