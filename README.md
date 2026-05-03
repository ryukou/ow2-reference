# OW2 Reference

身内向けのOW2ヒーロー/パーク/キャラ組み合わせ例ビューです。ログイン、DB、サーバー処理は使わず、ブラウザだけで動く静的サイトです。

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

## おすすめ構成

Role Queue想定の `Tank 1 / Damage 2 / Support 2` で、定番構成、ルール別、ステージ傾向別、Stats候補を表示します。

- 定番構成: Dive / Rush / Poke / Pick
- ルール別: Control / Escort / Hybrid / Push / Flashpoint / Clash
- ステージ傾向別: 長射線 / 高台 / 狭所乱戦 / 広い移動マップ
- Stats候補: Competitive Console AsiaのPick/Winから自動生成
