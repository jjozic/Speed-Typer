function reset() {
    console.log('gurke to go')
}

document.addEventListener('DOMContentLoaded', () => {
    var words = ['hello', 'how', 'house', 'boy', 'girl', 'planet']
    var randomWord = words[Math.floor(Math.random() * words.length)]
    var run = 0
    const text = document.getElementById('textDisplay')
    var time = document.getElementById('time')
    var typingBox = document.getElementById('typingDisplay')
    var scoreLabel = document.getElementById('score')

    setTimeout(() => generateRandomWord(), 500)

    //reacts on each input of the typing box
    typingBox.addEventListener('input', () => {
        let score = 0
        const arrayQuote = text.querySelectorAll('span')
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
            const span = characterSpan.innerText
            const blub = 0
            if (character == null) {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
                correct = false
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')
            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')
                correct = false
            }
        })

        //if (correct) renderNewQuote()
    })

    function generateRandomWord() {
        text.innerHTML += (' ' + randomWordGenerator())
        time.innerHTML = 'Time: ' + (run) + 's';
        console.log(typingBox.innerHTML)
        run++
        if (run < 40) {
            setTimeout(() => generateRandomWord(), 1000)
        }
    }

    function randomWordGenerator() {
        return words[Math.floor(Math.random() * words.length)]
    }

  
})