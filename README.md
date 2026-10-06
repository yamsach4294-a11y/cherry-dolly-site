# Cherry Dolly

1950年代のアメリカンダイナーをイメージした、架空のカップケーキブランドの1ページサイトです。Next.js App Router、TypeScript、Tailwind CSS 4、Framer Motion を使用しています。

## 起動

Node.js 24（`.nvmrc`）と npm を推奨します。APIキー、データベース、外部サービスは不要です。

```sh
npm ci
npm run dev
```

開発サーバーはポート3000で起動します。本番モードの場合は `npm run build` の後に `npm start` を実行してください。

## 公開サイト

GitHub Pages: https://yamsach4294-a11y.github.io/cherry-dolly-site/

`main` ブランチに編集用のコードを、`gh-pages` ブランチに静的な公開ファイルを保存します。Pagesの公開元は `gh-pages` のルートです。

```sh
npm run build:pages
npm run deploy:pages
```

最初のコマンドは `/cherry-dolly-site` 配下で画像・フォント・JavaScriptが表示されるよう設定して、`out/` に静的サイトを出力します。次のコマンドはGitの `origin` にある `gh-pages` ブランチへ出力を保存します。GitHubへの書き込み権限が必要です。ソースの作業ブランチは変更せず、強制pushも行いません。Pagesの初期設定はGitHubの Settings → Pages で `gh-pages` / `/ (root)` を選択します。

公開用ビルドではPNGの内容から画像URLのバージョンを自動生成するため、同じファイル名で差し替えても以前の画像キャッシュを使い続けません。

通常の開発・本番サーバー起動には、従来どおり `npm run dev` または `npm run build` → `npm start` を使います。

## 構成

- `app/page.tsx`: ページ全体の組み立て
- `app/globals.css`: 色・フォント・レスポンシブ配置
- `components/Hero.tsx`: 浮遊する商品と3層のスクロール視差
- `components/LineupSection.tsx`: PCではスクロール連動、スマホではスワイプできる商品列
- `components/FeaturedSection.tsx`: おいしさのひみつ
- `components/BiteInteraction.tsx`: スクロール、タップ、クリック、Enter・Spaceに対応する即時切り替え
- `components/BrandMessage.tsx` / `Footer.tsx`: ブランドメッセージと締めくくり
- `components/ui/ProductImage.tsx`: 画像フォールバック
- `lib/products.ts`: フレーバー名、説明、商品色
- `public/images`: 差し替え可能な透明背景の商品素材

## 商品画像の差し替え

以下のPNGを同名で置き換えてください。透明背景の商品素材を同梱しているため、最初から表示できます。PNGが存在しない場合は `public/images/placeholders/` のSVGに自動で切り替わります。

| ファイル | 内容 |
| --- | --- |
| `hero-box.png` | Heroの持ち手付きピンクの紙箱 |
| `packaging-box.png` | 再利用用の持ち手付きピンクの紙箱 |
| `cupcake-vanilla.png` | Cherry Vanilla：淡いピンクのクリーム、赤いチェリー、ピンクのハート柄カップ |
| `cupcake-lemon.png` | Lemon Cream：淡い黄色のクリーム、レモンスライス、黄色のハート柄カップ |
| `cupcake-strawberry.png` | Strawberry Milk：ピンクのクリーム、赤いベリー、ピンクのハート柄カップ |
| `cupcake-chocolate.png` | Chocolate Sundae：チョコクリーム、チョコチップ、小さなピンクのハート、茶色のハート柄カップ |
| `cupcake-bite-vanilla.png` | ひとくち後の Cherry Vanilla |
| `cupcake-bite-lemon.png` | ひとくち後の Lemon Cream |
| `cupcake-bite-strawberry.png` | ひとくち後の Strawberry Milk |
| `cupcake-bite-chocolate.png` | ひとくち後の Chocolate Sundae |

カップケーキは6:7、箱は100:76の比率を推奨します。通常画像とbite画像は、同じキャンバスサイズ・構図・位置で揃えてください。biteセクションではバニラのペアを使用しています。PNGを変える場合も透明背景を維持すると重なりと影を活かせます。

見出し・コピー・大きなロゴはHTMLで、商品画像とは別に制御します。想定アセットの `logo-wordmark.png` は必須ではなく、可読性と拡大表示のためHTMLロゴを採用しています。パッケージ面に印刷された文字は商品画像の一部です。

同梱PNGは、ユーザー提供のポスターを参照してAIで再構成した、写真風の透明背景素材です。商品ごとの色、トッピング、ハート柄のカップと、淡いピンクの持ち手付き紙箱を参照しています。ひとくち後のPNGも、通常画像と対になる透明背景素材です。箱の印刷ロゴは、サイトと同じ赤い筆記体の `Cherry Dolly` に統一し、ロゴがある前面に薄いパステルブルーの水玉を配置しています。箱の前面トレーは本体と同じ幅に揃え、3個のカップケーキを並べています。サイトのHTMLロゴ・コピーと商品名も Cherry Dolly の設定を使用します。

`public/images/placeholders/` のSVGは、初期実装時に本プロジェクト用に作成した独自の仮イラストです。PNGの参照素材とは別に、画像未配置時の表示を保つために残しています。

フォントはnpmパッケージから配信するため、Google Fontsへの接続は不要です。

## 動きとアクセシビリティ

`prefers-reduced-motion: reduce` が有効な場合、浮遊・視差・揺れ・入場アニメーション・スムーズスクロールを止めます。商品列は通常の横スクロールに切り替わり、全フレーバーにアクセスできます。biteの画像切り替えは引き続き利用できます。

画像ボタンは通常とbiteの画像を先に読み込み、フェードなしで切り替えます。スクロール発動は一度だけで、その後は手動操作を優先します。スキップリンク、フォーカス表示、適切なalt、状態の読み上げ通知も用意しています。

## 検証

```sh
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

E2EテストはPlaywrightでデスクトップ・モバイル・小さい画面・reduced motionを検証します。クラウド環境では `/usr/bin/chromium` を使用します。ローカル環境にブラウザがない場合は `npx playwright install chromium` を実行してください。別のChromiumを指定する場合は `PLAYWRIGHT_CHROMIUM_EXECUTABLE` を設定してください。

このサイトはブランド表現のデモです。商品の購入、問い合わせ送信、SNS連携は実装していません。
