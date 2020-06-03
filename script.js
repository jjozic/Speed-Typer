document.addEventListener('DOMContentLoaded', () => {
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'

    //dom elements used to manipulate
    const quoteBox = document.getElementById('textDisplay')
    const timerElement = document.getElementById('timer')
    const typingBox = document.getElementById('typingDisplay')
    const scoreLabel = document.getElementById('score')
    const wpmLabel = document.getElementById('wpm')
    const cpmLabel = document.getElementById('cpm')

    //used for wpm
    var wordCount = 0

    renderNewQuote()

    //reacts on each input of the typing box
    typingBox.addEventListener('input', () => {
        const arrayQuote = quoteBox.querySelectorAll('span')
        const arrayValue = typingBox.value.split('')

        let score = 0
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

        scoreLabel.innerHTML = 'Score: ' + score
        if (correct) {
            cpmLabel.innerHTML = cpmCalculation()
            wpmLabel.innerHTML = wpmCalculation()
            renderNewQuote()
        }
    })

    function getRandomQuote() {
        return fetch(RANDOM_QUOTE_API_URL)
            .then(response => response.json())
            .then(data => data.content)
    }

    async function renderNewQuote(newPage) {
        //first word is not preceeded by a 
        wordCount = 1
        const quote = await getRandomQuote()
        quoteBox.innerHTML = ''
        quote.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            quoteBox.appendChild(characterSpan)
            if (character === ' ') {
                wordCount++
            }
        })
        typingBox.value = null
        if(typingBox.innerHTML!==null){
            startTimer()
        }
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

    function cpmCalculation(forWpm) {
        let chars = 0
        const arrayQuote = quoteBox.querySelectorAll('span')

        arrayQuote.forEach(() => {
            chars++
        })

        let cpm = (chars / getTimerTime()) * 60
        let roundedCpm = Math.floor(cpm)
        if (forWpm) {
            return "WPM: " + Math.floor(roundedCpm / 5)
        }
        return "CPM: " + roundedCpm
    }
    function wpmCalculation(cpm) {
        return cpmCalculation(true)
    }

    reset.addEventListener('click', () => {
        console.log('reset')
        renderNewQuote()
    })
})