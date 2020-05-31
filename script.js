document.addEventListener('DOMContentLoaded', () => {
    var words = ['hello', 'how', 'house', 'boy', 'girl', 'planet']
    var randomWord = words[Math.floor(Math.random() * words.length)]
    var run = 0
    var text = document.getElementById('game-text')
    var time = document.getElementById('time')

    setTimeout(() => generateRandomWord(), 500)

    function generateRandomWord() {
        console.log(randomWordGenerator())
        text.innerHTML += (' ' + randomWordGenerator())
        time.innerHTML = 'Time: ' + (run/2) + 's';
        run++
        if (run < 40) {
            setTimeout(() => generateRandomWord(), 500)
        }
    }

    function randomWordGenerator() {
        return words[Math.floor(Math.random() * words.length)]
    }

    function reset(){
        text.innerHTML = 'start'
        console.log('gurke to go')
    }
})