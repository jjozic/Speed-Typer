var words = ['hello', 'how', 'house', 'boy', 'girl', 'planet']
var randomWord = words[Math.floor(Math.random()*words.length)]
var run = 0

setTimeout(() => generateRandomWord(), 200)

function generateRandomWord(){
    console.log(randomWordGenerator())
    var text = document.getElementById('gametext')
    text.innerHTML += (' ' + randomWordGenerator())
    run++
    if(run<40) setTimeout(() => generateRandomWord(), 200)
}

function randomWordGenerator(){
    return words[Math.floor(Math.random()*words.length)]
}