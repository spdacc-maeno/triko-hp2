# 株式会社トリコ コーポレートサイト

https://triko.co.jp/ のソースです。静的 HTML / CSS / JavaScript のみで構成し、ビルドツールは使いません。GitHub Pages で公開しています（`CNAME` = `triko.co.jp`）。

設計の根拠は `docs/requirements/triko_HP全面改善_要件書.md`（git 管理外。原本は `triko-hp-design` リポジトリ）を参照してください。

## ファイル構成

```
triko-hp/
├── index.html                    # トップページ
├── contact.html                  # お問い合わせ（Google フォーム埋め込み）
├── 404.html
├── services/
│   ├── erp/index.html            # 01 基幹システムの段階的刷新
│   ├── efficiency/index.html     # 02 業務の効率化
│   └── management/index.html     # 03 経営管理と統制の高度化
├── assets/
│   ├── css/
│   │   ├── tokens.css            # 配色・フォント・余白のカスタムプロパティ
│   │   ├── base.css              # リセット、見出し、セクション共通
│   │   ├── components.css        # ヘッダー、ナビ、ボタン、カード、表、フッター
│   │   └── pages.css             # 各ページ固有のレイアウト・図版
│   ├── js/main.js                # ナビ、スクロール表示、図版アニメーション
│   └── img/                      # ロゴ、favicon、OGP 画像
├── sitemap.xml
├── robots.txt
└── CNAME
```

## 文言を直すとき

- 各ページの本文はそのページの HTML ファイルに直接書かれています。該当のセクション（`id="issues"` など）を探して編集してください。
- **ヘッダーとフッターは 6 ファイル（index / contact / 404 / services 3 ページ）に同じものが複製されています。** ナビやフッターを変えるときは全ファイルを同時に直し、`diff` で一致を確認してください。
- 実績数値・社名・製品名・事例は掲載しない方針です（要件書 第11章）。
- お問い合わせフォームの項目は Google フォーム側で変更します（HTML の変更は不要）。

## デザインの決まりごと

- 配色はロゴ由来の紺（`--ink`）・金（`--gold`）・銀（`--silver`）と紙色（`--paper`）。値は `assets/css/tokens.css` にまとめています。金は 1 画面に 1〜2 か所のアクセントに限定します。
- フォントは IBM Plex Sans JP（本文・見出し）と IBM Plex Mono（英字ラベル・番号）を Google Fonts から読み込みます。
- 図版はインライン SVG または HTML/CSS で作成し、写真・ストックフォト・生成イラストは使いません。
- アニメーションは控えめに 1 回のみ。`prefers-reduced-motion` では無効になります。

## ローカルで確認する

```bash
cd triko-hp
python3 -m http.server 8000
# http://localhost:8000/ を開く
```

パスは `/assets/...` のようにルート絶対で書いているため、`file://` で開くとスタイルが当たりません。必ずローカルサーバー経由で確認してください。

## 公開する

`main` ブランチへ push すると GitHub Pages に反映されます。公開前に次を確認してください。

- 375px 幅で横スクロールが出ないこと
- 各ページの `<title>` / `meta description` / OGP が正しいこと
- ヘッダー・フッターが全ページで一致していること
- `sitemap.xml` の `lastmod` を更新したこと
