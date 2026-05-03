# OW2 Reference

身内向けのOW2ヒーロー/パーク/おすすめ構成/プレイヤー統計ビューです。ログイン、DB、サーバー処理は使わず、ブラウザだけで動く静的サイトです。

## 構成

- `index.html`: 画面
- `styles.css`: レイアウト、簡易パスワード画面、見た目
- `app.js`: OverFast APIからの取得、検索、おすすめ構成、表示

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

## GitHub Pagesで公開

GitHub CLIにログインしてから、以下を実行します。

```sh
gh repo create ow2-reference --public --source=. --remote=origin --push
gh api --method POST repos/ryukou/ow2-reference/pages -f build_type=workflow
gh workflow run pages.yml
```

GitHub Freeで無料公開する場合、GitHub Pagesは公開リポジトリが前提です。公開リポジトリでは静的サイト内の簡易パスワードもソースから見えます。パスワードを隠したい場合は、非公開リポジトリ連携が使えるCloudflare PagesやVercelを使ってください。

## 簡易パスワード

初期パスワードは `1234567890` です。ブラウザ保存を有効にすると、同じブラウザでは次回から入力不要です。

このパスワードは静的サイト内の簡易ガードです。ソースを見られると分かるため、強い認証が必要になったらCloudflare Access、Vercelの保護、Supabase Authなどに切り替えてください。

## プレイヤー統計

初期表示の対象は `app.js` の `TRACKED_PLAYERS` で管理しています。

```js
const TRACKED_PLAYERS = [
  { label: "自分 RYUKO", name: "RYUKO" },
  { label: "ゆうき(弟) ZEPPLI0204", name: "ZEPPLI0204" },
  { label: "ゆうき(MAX) YUUKINGMAX", name: "YUUKINGMAX" },
];
```

BattleTagを使う場合は `Name#1234` ではなく、OverFast APIの形式に合わせて `Name-1234` にします。統計が出ない場合は、OW2側のキャリアプロフィールが公開になっているか確認してください。

Platformの初期値は `Console` です。

`Recent` はOverFast APIに直近試合履歴がないため、同じブラウザで前回取得したStatsとの差分から推定します。初回は `次回から` と表示されます。

## おすすめ構成

`/heroes/stats` のCompetitive Console Asiaデータを使い、Role Queue想定の `Tank 1 / Damage 2 / Support 2` を自動生成します。

- 安定構成: PickとWinのバランス
- 勝率重視: Win Rateを少し強めに評価
- 合わせやすさ重視: Pick Rateを強めに評価
