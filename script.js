// Firebase設定
const firebaseConfig = {
    apiKey: "AIzaSyApLmc-Hx9dOIxvkXLj-bRb4g-ICS-3mx0",
    authDomain: "laugh-counter.firebaseapp.com",
    databaseURL: "https://laugh-counter-default-rtdb.firebaseio.com",
    projectId: "laugh-counter",
    storageBucket: "laugh-counter.appspot.com",
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

// ローカルカウントのバッファ
let localCount = 0;
let globalCount = 0; // サーバー側の全体カウント

// サーバーからグローバルカウントを取得
function fetchAndDisplayCounter() {
    const counterRef = firebase.database().ref('counter');
    counterRef.once('value').then((snapshot) => {
        globalCount = snapshot.val() || 0;
        updateDisplay();
    });
}

// ローカルカウントとグローバルカウントを表示更新
function updateDisplay() {
    counterElem.textContent = `${globalCount + localCount}`;
}

// クリックをバッファリングしてサーバーに送信
function syncLocalCount() {
    if (localCount > 0) {
        const counterRef = firebase.database().ref('counter');
        counterRef.transaction((currentValue) => {
            return (currentValue || 0) + localCount;
        }).then((result) => {
            globalCount = result.snapshot.val(); // サーバーから更新後のカウントを取得
            localCount = 0; // ローカルカウントをリセット
            updateDisplay();
        }).catch((error) => {
            console.error("送信エラー:", error);
        });
    }
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
    localCount++;       // ローカルカウントを増加
    updateDisplay();    // ローカルで即時反映
    playRandomLaugh();  // 笑い声を再生
});

// 初期化処理
fetchAndDisplayCounter();

// 10秒ごとにローカルカウントをサーバーに同期
setInterval(syncLocalCount, 10000);

// リアルタイムリスナー（全体カウントの更新を同期）
firebase.database().ref('counter').on('value', (snapshot) => {
    globalCount = snapshot.val() || 0;
    updateDisplay();
});