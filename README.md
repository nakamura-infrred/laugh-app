# laugh-app prototype sample

## Description (English)
This project, "laugh-app prototype sample," is a simple web-based application designed to simulate the effect of a "laughing bag." It serves as a prototype to test and demonstrate the functionality of playing various laughter sounds with a single click. 

The app is created as a lightweight and straightforward implementation to evaluate potential user engagement and the feasibility of adding future interactive features. Feel free to explore and share your feedback!

## 説明 (日本語)
このプロジェクト「laugh-app prototype sample」は、「笑い袋」の効果をシミュレートするためのシンプルなWebアプリケーションです。クリック一つで様々な笑い声を再生する機能を検証し、動作をデモンストレーションするためのプロトタイプとして作成されています。

軽量かつ簡易な構成で実装されており、将来的なインタラクティブ機能の追加やユーザーの反応を評価することを目的としています。ぜひお試しいただき、ご意見をお寄せください！

## Firebase設定について

このプロジェクトでは、Firebaseを使用してクリックカウンターを管理しています。
公開リポジトリであるため、デフォルトのFirebase設定が含まれていますが、フォークしたプロジェクトでは、独自のFirebase設定に変更する必要があります。

### Firebase設定を変更する手順

1. [Firebase Console](https://console.firebase.google.com/)にアクセスし、新しいプロジェクトを作成します。
2. 作成したプロジェクトの「設定」セクションから、以下の情報を取得します:
   - APIキー (`apiKey`)
   - 認証ドメイン (`authDomain`)
   - データベースURL (`databaseURL`)
   - プロジェクトID (`projectId`)
   - ストレージバケット (`storageBucket`)
   - メッセージング送信者ID (`messagingSenderId`)
   - アプリID (`appId`)
   - 測定ID (`measurementId`)
3. `script.js`内の`firebaseConfig`を取得した情報に置き換えます。

### セキュリティについて

- Firebaseのセキュリティルールを適切に設定することで、不正なデータアクセスを防止できます。
- 推奨されるセキュリティルール:
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

## Credits / クレジット

### Sound Materials / 音声素材について
This application uses free sound materials from [Sound Effect Lab](https://soundeffect-lab.info/).

本アプリケーションでは、[効果音ラボ](https://soundeffect-lab.info/)のフリー音声素材を利用しています。