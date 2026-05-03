# OW2 Reference

身内向けのOW2ヒーロー/パーク/プレイヤー統計ビューです。ログイン、DB、サーバー処理は使わず、ブラウザだけで動く静的サイトです。

## 構成

- `index.html`: 画面
- `styles.css`: レイアウトと見た目
- `app.js`: OverFast APIからの取得、検索、表示

## データ取得元

- OverFast API: https://overfast-api.tekrop.fr/
- OverFast API GitHub: https://github.com/TeKrop/overfast-api
- Blizzard公式ヒーローページ: https://overwatch.blizzard.com/heroes/

OverFast APIはBlizzard公式ページを元にした非公式APIです。API停止、レート制限、Blizzard側のページ変更があると取得に失敗します。

## ローカル確認

`index.html` をブラウザで開けば動きます。ローカルサーバーで確認する場合は以下です。

```sh
python3 -m http.server 4173
```

その後、`http://localhost:4173` を開きます。

## 無料運用

静的サイトなので、以下の無料枠で運用できます。

- GitHub Pages
- Cloudflare Pages
- Vercel Hobby
- Netlify Free

最大10人程度の利用ならDBも認証も不要です。APIキーや秘密情報もありません。

## プレイヤー統計

初期表示の対象は `app.js` の `TRACKED_PLAYERS` で管理しています。

```js
const TRACKED_PLAYERS = ["ryukou0109", "Zeppri0204"];
```

BattleTagを使う場合は `Name#1234` ではなく、OverFast APIの形式に合わせて `Name-1234` にします。統計が出ない場合は、OW2側のキャリアプロフィールが公開になっているか確認してください。
