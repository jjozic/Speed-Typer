document.addEventListener('DOMContentLoaded', () => {
    var words = ['hello', 'how', 'house', 'boy', 'girl', 'planet']
    var randomWord = words[Math.floor(Math.random() * words.length)]
    var run = 0
    var text = document.getElementById('game-text')
    var time = document.getElementById('time')
    var typingBox = document.getElementById('typing-box')


    setTimeout(() => generateRandomWord(), 500)

    //reacts on each input of the typing box
    typingBox.addEventListener('input', () => {
        const arrayValue = typingBox.value.split('')

        console.log(arrayValue)

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

    function reset() {
        text.innerHTML = 'start'
        console.log('gurke to go')
    }
})