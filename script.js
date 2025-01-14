const playButton = document.getElementById('play-icon');

playButton.addEventListener('click', () => {
    const sounds = [
        'sounds/laugh1.mp3',
        'sounds/laugh2.mp3',
        'sounds/laugh3.mp3',
        'sounds/laugh4.mp3',
        'sounds/laugh5.mp3',
        'sounds/laugh6.mp3',
        'sounds/laugh7.mp3',
        'sounds/laugh8.mp3'
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
});