// Firebase設定
const firebaseConfig = {
    apiKey: "AIzaSyApLmc-Hx9dOIxvkXLj-bRb4g-ICS-3mx0",
    authDomain: "laugh-counter.firebaseapp.com",
    databaseURL: "https://laugh-counter-default-rtdb.firebaseio.com",
    projectId: "laugh-counter",
    storageBucket: "laugh-counter.firebasestorage.app",
    messagingSenderId: "780610406662",
    appId: "1:780610406662:web:8c2c71fca26693d557b687",
    measurementId: "G-0GTSNL24HP"
};

// Firebase初期化
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// DOM要素
const playButton = document.getElementById('play-icon');
const counterElem = document.getElementById('counter');

// カウントを取得して画面に表示
function fetchCounter() {
    const counterRef = firebase.database().ref('counter');
    counterRef.on('value', (snapshot) => {
        const count = snapshot.val() || 0;
        counterElem.textContent = count;
    });
}

// カウントを1増加
function incrementCounter() {
    const counterRef = firebase.database().ref('counter');
    counterRef.transaction((currentValue) => {
        return (currentValue || 0) + 1;
    });
}

// 笑い声を再生
function playRandomLaugh() {
    const sounds = [
        'sounds/laugh1.mp3',
        'sounds/laugh2.mp3',
        'sounds/laugh3.mp3',
        'sounds/laugh4.mp3',
        'sounds/laugh5.mp3',
        'sounds/laugh6.mp3',
        'sounds/laugh7.mp3'
    ];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
}

// ボタンのクリックイベント
playButton.addEventListener('click', () => {
    incrementCounter();
    playRandomLaugh();
});

// 初期化
fetchCounter();