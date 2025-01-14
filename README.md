# laugh-app prototype sample

## Description (English)
This project, "laugh-app prototype sample," is a simple web-based application designed to simulate the effect of a "laughing bag." It serves as a prototype to test and demonstrate the functionality of playing various laughter sounds with a single click. 

The app is created as a lightweight and straightforward implementation to evaluate potential user engagement and the feasibility of adding future interactive features. Feel free to explore and share your feedback!

## 説明 (日本語)
このプロジェクト「laugh-app prototype sample」は、「笑い袋」の効果をシミュレートするためのシンプルなWebアプリケーションです。クリック一つで様々な笑い声を再生する機能を検証し、動作をデモンストレーションするためのプロトタイプとして作成されています。

軽量かつ簡易な構成で実装されており、将来的なインタラクティブ機能の追加やユーザーの反応を評価することを目的としています。ぜひお試しいただき、ご意見をお寄せください！

## Changelog

### v2.0
- Added a counter feature to the Laughing Bag App.
  - Displays the message: "Spread XXX moments of health and peace through laughter!"
  - Shows the total click count in real-time.
  - Counts clicks locally and syncs with the server periodically.
  - Uses Firebase to store the count.
- Improved responsive design for better usability on smartphones.
- Enhanced the random laughter playback feature.

## 変更履歴

### v2.0
- 笑い袋アプリにカウンター機能を追加。
  - 「笑いの力で XXX回分の健康と平和を届けました！」というメッセージを表示。
  - 全体のクリック数をリアルタイムで表示。
  - ローカルでクリックをカウントし、定期的にサーバーに同期。
  - Firebaseを利用してカウントを保存。
- レスポンシブデザインを改善し、スマートフォンでも快適に利用可能。
- 笑い声のランダム再生機能を強化。

## Firebase Configuration

### English

This project uses Firebase to manage a click counter. Since this is a public repository, default Firebase settings are included. **However, if you fork this repository, it is mandatory to replace these settings with your own Firebase project configuration** to ensure the functionality of your own counter.

### How to Configure Firebase

1. Visit [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Navigate to the "Project Settings" section and obtain the following information:
   - API Key (`apiKey`)
   - Authentication Domain (`authDomain`)
   - Database URL (`databaseURL`)
   - Project ID (`projectId`)
   - Storage Bucket (`storageBucket`)
   - Messaging Sender ID (`messagingSenderId`)
   - App ID (`appId`)
   - Measurement ID (`measurementId`)
3. Replace the `firebaseConfig` object in `script.js` with the information from your Firebase project.

Example:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

---

### 日本語

このプロジェクトでは、クリックカウンターを管理するためにFirebaseを使用しています。このリポジトリは公開されているため、デフォルトのFirebase設定が含まれています。**ただし、このリポジトリをフォークする場合は、独自のFirebaseプロジェクト設定に置き換えることが必須です。** これにより、独自のカウンター機能が正常に動作します。

### Firebase設定手順

1. [Firebase Console](https://console.firebase.google.com/)にアクセスして、新しいプロジェクトを作成します。
2. 「プロジェクト設定」セクションに移動し、以下の情報を取得します。
   - APIキー (`apiKey`)
   - 認証ドメイン (`authDomain`)
   - データベースURL (`databaseURL`)
   - プロジェクトID (`projectId`)
   - ストレージバケット (`storageBucket`)
   - メッセージング送信者ID (`messagingSenderId`)
   - アプリID (`appId`)
   - 測定ID (`measurementId`)
3. `script.js`の`firebaseConfig`オブジェクトを取得した情報に置き換えます。

例:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

---

## Recommended Firebase Security Rules

### English

To prevent unauthorized access or misuse, it is strongly recommended to apply the following Firebase Security Rules to your Realtime Database. These rules ensure that:

1. Only numerical values can be written to the `counter`.
2. Writes are allowed only if:
   - The new value is greater than or equal to the current value.
   - The last write occurred more than 5 seconds ago.
3. A timestamp (`lastUpdate`) is validated to ensure its validity and recentness.

```json
{
  "rules": {
    "counter": {
      ".read": true,
      ".write": "newData.isNumber() && newData.val() >= data.val() && (data.child('lastUpdate').val() === null || now > data.child('lastUpdate').val() + 5000)"
    },
    "lastUpdate": {
      ".validate": "newData.isNumber() && newData.val() <= now"
    }
  }
}
```

---

### 日本語

不正アクセスや誤用を防ぐために、以下のFirebaseセキュリティルールをリアルタイムデータベースに適用することを強く推奨します。このルールは以下を保証します。

1. `counter`には数値のみが書き込めます。
2. 書き込みが許可される条件は次の通りです。
   - 新しい値が現在の値以上であること。
   - 最後の書き込みから5秒以上が経過していること。
3. タイムスタンプ（`lastUpdate`）が有効かつ最新であることを検証します。

```json
{
  "rules": {
    "counter": {
      ".read": true,
      ".write": "newData.isNumber() && newData.val() >= data.val() && (data.child('lastUpdate').val() === null || now > data.child('lastUpdate').val() + 5000)"
    },
    "lastUpdate": {
      ".validate": "newData.isNumber() && newData.val() <= now"
    }
  }
}
```

---

### Why These Rules Are Important

- **English**: These rules ensure that the counter functions securely and efficiently, preventing abuse such as spamming requests or invalid data entries.
- **日本語**: これらのルールは、不正なリクエストや無効なデータエントリを防ぎ、カウンターが安全かつ効率的に機能することを保証します。


## Credits / クレジット

### Sound Materials / 音声素材について
This application uses free sound materials from [Sound Effect Lab](https://soundeffect-lab.info/).

本アプリケーションでは、[効果音ラボ](https://soundeffect-lab.info/)のフリー音声素材を利用しています。