import { CourseModule, TechType } from './types';

// アイコンは文字列キーで管理し、UI側でコンポーネントにマッピングします
export const CURRICULUM: CourseModule[] = [
  // --- 初級 ---
  {
    id: 'html-basics',
    title: 'HTMLをはじめよう',
    icon: 'html',
    color: 'bg-orange-100 text-orange-600',
    lessons: [
      {
        id: 'h1-hello',
        title: 'はじめましての世界',
        description: 'Webページの基本、見出しタグを使ってみましょう。',
        tech: TechType.HTML,
        defaultCode: '<!-- ここにコードを書いてね -->\n',
        task: '<h1>タグを使って、「こんにちは！」と表示させてみましょう。',
        explanation: `
# 見出しタグ <h1> について

Webページを作る旅は、このタグから始まります。
\`<h1>\` は、ページの中で **一番重要な見出し** を表すタグです。新聞で言えば「一面のトップ記事のタイトル」のようなものです。

HTMLでは、このように \`<タグ名>\`（開始タグ）と \`</タグ名>\`（終了タグ）で文字を挟んで意味を持たせます。

## 書き方の例
\`\`\`html
<h1>今日の日記</h1>
\`\`\`

実は見出しには \`<h1>\` から \`<h6>\` まで6段階の大きさがありますが、まずは王様の \`<h1>\` を使いこなしましょう！
        `,
        hints: [
          '<h1> と </h1> で囲むのを忘れていませんか？',
          '文字は「こんにちは！」と正確に入力しましょう。',
          '全て半角英数字でタグを書きます（文字は日本語でOK）。'
        ],
        validate: (code: string) => {
          const cleanCode = code.replace(/\s+/g, ' ').trim();
          if (!cleanCode.includes('<h1>')) {
            return { passed: false, feedback: '<h1>タグが見つかりません。開始タグを書いてみましょう。' };
          }
          if (!cleanCode.includes('</h1>')) {
            return { passed: false, feedback: '</h1>タグが見つかりません。終了タグを忘れていませんか？' };
          }
          if (/<h1>\s*こんにちは！\s*<\/h1>/.test(cleanCode)) {
            return { passed: true, feedback: '完璧です！Web開発の第一歩を踏み出しましたね。' };
          }
          return { passed: false, feedback: 'タグの中身が「こんにちは！」になっているか確認しましょう。' };
        }
      },
      {
        id: 'p-text',
        title: '文章を書いてみよう',
        description: '段落を作るには <p> タグを使います。',
        tech: TechType.HTML,
        defaultCode: '<h1>私の自己紹介</h1>\n',
        task: '<p>タグを使って、好きな食べ物を書いてみましょう。（例: <p>りんごが好き</p>）',
        explanation: `
# 段落タグ <p> について

見出しの下に普通の文章を書きたいときは、Paragraph（パラグラフ＝段落）の略である \`<p>\` タグを使います。

初心者のうちは改行するために適当なタグを使ってしまいがちですが、文章のまとまりごとに \`<p>\` で囲むのが正しい書き方です。

## 書き方の例
\`\`\`html
<p>私は猫が好きです。</p>
<p>犬も好きです。</p>
\`\`\`

このように書くと、ブラウザが自動的に少し隙間を空けて、読みやすく表示してくれます。
        `,
        hints: [
          '<p>タグを追加していますか？',
          '<h1>タグは消さずに、その下に追加してみましょう。',
          '文章の内容は何でもOKです！'
        ],
        validate: (code: string) => {
          if (!/<p>/.test(code) || !/<\/p>/.test(code)) {
            return { passed: false, feedback: '<p>タグと</p>タグを使って文章を囲んでください。' };
          }
          const match = code.match(/<p>(.*?)<\/p>/s);
          if (match && match[1].trim().length > 0) {
             return { passed: true, feedback: '素晴らしい！文章が表示されました。Webサイトらしくなってきましたね。' };
          }
          return { passed: false, feedback: '<p>タグの中に何か文字を書いてみましょう。' };
        }
      },
      {
        id: 'img-tag',
        title: '画像を貼ってみよう',
        description: 'Webページに画像を表示する方法を学びます。',
        tech: TechType.HTML,
        defaultCode: '<h1>かわいい猫</h1>\n<p>これを見て！</p>\n',
        task: '<img>タグを使って、猫の画像を表示してください。src属性に "cat.png" と指定しましょう。',
        explanation: `
# 画像タグ <img> について

文字だけじゃ寂しいですよね。画像を表示するには \`<img>\` タグを使います。
このタグは少し特別で、中身の文字がないので **終了タグがいりません**。

## 重要な「属性」
画像を表示するには「どの画像？」という情報が必要です。それを \`src\`（ソース）属性に書きます。

\`\`\`html
<img src="画像の場所">
\`\`\`

## 豆知識：alt属性
本来は \`alt="猫の写真"\` のように画像の説明も書くのが良いマナーです（画像が表示されない時に代わりに表示されます）。

\`\`\`html
<img src="cat.png" alt="かわいい猫">
\`\`\`
        `,
        hints: [
          '<img> タグには終了タグ </img > は不要です。',
          'src="cat.png" のように属性を書きます。',
          '<img src="cat.png"> という形になります。'
        ],
        validate: (code: string) => {
          if (!/<img/.test(code)) return { passed: false, feedback: '<img>タグを使ってみましょう。' };
          if (!/src=["']cat\.png["']/.test(code)) return { passed: false, feedback: 'src属性に "cat.png" を指定してください。' };
          return { passed: true, feedback: 'バッチリです！画像が表示されると一気に華やかになりますね。（プレビューでは仮の画像が表示されます）' };
        }
      },
      {
        id: 'list-ul',
        title: 'リストを作ろう',
        description: '箇条書きリストを作る方法です。',
        tech: TechType.HTML,
        defaultCode: '<h1>買い物リスト</h1>\n',
        task: '<ul>と<li>を使って、3つの項目のリストを作ってください。',
        explanation: `
# 箇条書きリスト <ul> と <li>

買い物リストやメニューなど、項目を並べる時はリストタグを使います。
これは親子関係のタグになります。

1. **親**: \`<ul>\` (Unordered List = 順序のないリスト)
2. **子**: \`<li>\` (List Item = リストの項目)

## 書き方の例
\`\`\`html
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>
\`\`\`

必ず \`<ul>\` の中に \`<li>\` を入れるのがルールです。
ちなみに、順序があるリスト（1位、2位...）を作りたい時は \`<ol>\` を使います。
        `,
        hints: [
          'まず <ul> と </ul> を書きます。',
          'その中に <li>項目</li> を書きます。',
          '<li>タグは3回使いましょう。'
        ],
        validate: (code: string) => {
          if (!/<ul>/.test(code)) return { passed: false, feedback: '<ul>タグで全体を囲みましょう。' };
          const liMatches = code.match(/<li>/g);
          if (!liMatches || liMatches.length < 3) return { passed: false, feedback: '<li>タグを使って項目を3つ以上作ってみましょう。' };
          return { passed: true, feedback: 'きれいなリストができました！情報の整理整頓はとても大切です。' };
        }
      },
      {
        id: 'table-tag',
        title: '表を作ってみよう',
        description: '情報を整理して見せる「表（テーブル）」の作り方を学びます。',
        tech: TechType.HTML,
        defaultCode: '<h1>成績表</h1>\n',
        task: '<table>タグを使って表を作り、<tr>と<td>で「国語」「80点」の1行を作ってください。',
        explanation: `
# 表タグ <table>

時刻表や料金表など、情報を整理するには「表」が便利です。
表は3種類のタグの組み合わせで作ります。

1. \`<table>\`: 表全体を囲む箱
2. \`<tr>\`: Table Row（テーブル・ロウ）。**横の行**を作ります。
3. \`<td>\`: Table Data（テーブル・データ）。**中身のセル**を作ります。

## 書き方の例
\`\`\`html
<table>
  <tr>
    <td>みかん</td>
    <td>100円</td>
  </tr>
</table>
\`\`\`
これで「みかん」と「100円」が横に並びます。
        `,
        hints: [
          'まず <table> で囲みます。',
          'その中に <tr> を書きます。',
          'その中に <td>国語</td><td>80点</td> を書きます。'
        ],
        validate: (code: string) => {
          if (!/<table>/.test(code)) return { passed: false, feedback: '<table>タグで全体を囲みましょう。' };
          if (!/<tr>/.test(code)) return { passed: false, feedback: '<tr>タグで行を作りましょう。' };
          if (!/<td>/.test(code)) return { passed: false, feedback: '<td>タグでデータを作りましょう。' };
          return { passed: true, feedback: '表ができました！複雑に見えますが、<tr>（行）の中に<td>（データ）を入れるルールさえ覚えれば簡単です。' };
        }
      },
      {
        id: 'link-a',
        title: 'リンクで世界とつながる',
        description: '他のページに移動するリンクを作ります。Web（クモの巣）の由来です！',
        tech: TechType.HTML,
        defaultCode: '<h1>検索サイト</h1>\n<p>調べ物はこちら：</p>\n',
        task: '<a>タグを使って、Googleへのリンクを作ってください。href属性に "https://google.com" を指定し、テキストは「Googleへ」にしましょう。',
        explanation: `
# リンクタグ <a> について

ページを移動するリンクを作るには Anchor（アンカー＝船の錨）の略である \`<a>\` タグを使います。
インターネットが「ウェブ（クモの巣）」と呼ばれるのは、このリンクで世界中のページが繋がっているからです。

## 書き方
\`\`\`html
<a href="飛び先のURL">クリックする文字</a>
\`\`\`

\`href\`（エイチレフ）属性にURLを書きます。

## 豆知識
新しいタブで開きたいときは \`target="_blank"\` という属性を追加します。
\`\`\`html
<a href="..." target="_blank">別タブで開く</a>
\`\`\`
        `,
        hints: [
          '<a href="URL">文字</a> という形です。',
          'URLは https://google.com です。',
          'タグの間に「Googleへ」と書きましょう。'
        ],
        validate: (code: string) => {
          if (!/<a/.test(code)) return { passed: false, feedback: '<a>タグを使ってみましょう。' };
          if (!/href=["']https:\/\/google\.com["']/.test(code)) return { passed: false, feedback: 'href属性に "https://google.com" を正しく指定してください。' };
          if (!/Googleへ/.test(code)) return { passed: false, feedback: 'リンクの文字を「Googleへ」にしてください。' };
          return { passed: true, feedback: '完璧です！これであなたのサイトから世界中のサイトへ繋がることができます。' };
        }
      },
      {
        id: 'input-text',
        title: '入力フォームを作る',
        description: 'ユーザーが文字を入力できる場所を作ります。',
        tech: TechType.HTML,
        defaultCode: '<h1>お問い合わせ</h1>\n<p>お名前を教えてね：</p>\n',
        task: '<input>タグを使って、1行の入力欄を作ってください。type属性は "text" です。',
        explanation: `
# 入力タグ <input> について

Webサイトは見るだけではありません。ユーザーから情報を受け取ることもできます。
それには \`<input>\` タグを使います。これも終了タグが不要なタグです。

## 書き方と種類
\`type\` 属性を変えることで、色々な入力欄に変身します。

- 文字入力: \`<input type="text">\`
- パスワード: \`<input type="password">\`
- 日付: \`<input type="date">\`

今回は基本の \`text\` を使いましょう。
        `,
        hints: [
          '<input> タグを使います（閉じタグなし）。',
          'type="text" を追加しましょう。',
          'placeholder="名前を入れてね" と書くと、うっすらヒントが表示できますよ（今回は必須ではありません）。'
        ],
        validate: (code: string) => {
          if (!/<input/.test(code)) return { passed: false, feedback: '<input>タグを使ってみましょう。' };
          if (!/type=["']text["']/.test(code)) return { passed: false, feedback: 'type属性を "text" に指定してください。' };
          return { passed: true, feedback: 'できました！プレビュー画面の入力欄に実際に文字が打てるか試してみてください。' };
        }
      },
      {
        id: 'div-group',
        title: 'グループにまとめる',
        description: '<div>タグを使って要素をグループ化する方法を学びます。',
        tech: TechType.HTML,
        defaultCode: '<h1>タイトル</h1>\n<p>説明文です。</p>\n',
        task: '<h1>と<p>を、<div>タグで囲んでグループにしてください。',
        explanation: `
# グループ化タグ <div> について

Webサイトを作るとき、「ヘッダー部分」「記事部分」「サイドバー」のように、要素をグループにまとめたいことがよくあります。
そんなときに使うのが \`<div>\`（ディビジョン＝分割）タグです。

\`<div>\` 自体には「見出し」や「段落」のような意味はありません。
**「ただの箱」** です。
でも、この箱に入れておくことで、後でCSSを使って「箱ごとデザインを変える」や「箱ごと移動させる」といったことができるようになります。

## 書き方
\`\`\`html
<div>
  <h1>見出し</h1>
  <p>文章...</p>
</div>
\`\`\`
        `,
        hints: [
          '<h1>の上に <div> を書きます。',
          '<p>の下に </div> を書きます。',
          'サンドイッチのように挟むイメージです。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s+/g, '');
          // <div><h1>...</h1><p>...</p></div> の構造をチェック
          if (/<div>.*<h1>.*<\/h1>.*<p>.*<\/p>.*<\/div>/.test(clean)) {
             return { passed: true, feedback: '正解です！見た目は変わりませんが、裏側ではしっかりグループ化されています。これがレイアウトの基礎になります。' };
          }
          return { passed: false, feedback: '<div>と</div>で、h1とpの両方を囲んでみましょう。' };
        }
      },
      {
        id: 'button-click',
        title: 'ボタンを作ろう',
        description: 'ユーザーが押せるボタンを作ります。',
        tech: TechType.HTML,
        defaultCode: '<h1>アプリ</h1>\n<p>ボタンを押してね</p>\n',
        task: '<button>タグを使って、「スタート」という文字のボタンを作ってください。',
        explanation: `
# ボタンタグ <button> について

クリックできるボタンを作るには \`<button>\` タグを使います。
「送信」や「次へ」など、ユーザーにアクションを促す重要な要素です。

## 書き方の例
\`\`\`html
<button>送信する</button>
\`\`\`

## 豆知識
さっき学んだ \`<input>\` と組み合わせることも多いですが、JavaScriptで動かすアプリのようなボタンを作る時は、この \`<button>\` タグが主役になります。
        `,
        hints: [
          '<button>スタート</button> という形になります。',
          'タグのスペルは b-u-t-t-o-n です。'
        ],
        validate: (code: string) => {
          if (!/<button>/.test(code)) return { passed: false, feedback: '<button>タグを使ってみましょう。' };
          if (/<button>\s*スタート\s*<\/button>/.test(code)) {
            return { passed: true, feedback: '正解！クリックできるボタンができました。押した時の動きはJavaScriptで作りますよ。' };
          }
           return { passed: false, feedback: 'ボタンの文字を「スタート」にしてください。' };
        }
      },
      {
        id: 'class-attr',
        title: '名札をつけよう',
        description: 'class属性を使って、特定の要素に名前（名札）をつける方法です。',
        tech: TechType.HTML,
        defaultCode: '<h1>タイトル</h1>\n<p>これは普通の文章。</p>\n<p>これは特別な文章。</p>\n',
        task: '2つ目の<p>タグに、class="special" という属性を追加してください。',
        explanation: `
# クラス属性 class

たくさんのタグの中で、「これだけ赤くしたい」「これだけ大きくしたい」という時がありますよね。
そんな時は \`class\`（クラス）属性を使って、タグに **名札（あだ名）** をつけます。

同じクラス名を複数のタグにつけることもできます（「1組の生徒」みたいなイメージです）。

## 書き方
\`\`\`html
<タグ名 class="好きな名前">
\`\`\`

## 例
\`\`\`html
<p class="red-text">赤くなる予定の文字</p>
<p class="red-text">こっちも赤くなるよ</p>
\`\`\`
        `,
        hints: [
          '<p class="special"> と書きます。',
          'ダブルクォーテーション " で囲むのを忘れずに。'
        ],
        validate: (code: string) => {
          if (/<p\s+class=["']special["']\s*>/.test(code)) {
            return { passed: true, feedback: '名札がつきました！これで次のCSSのレッスンで、このタグだけ特別扱いすることができます。' };
          }
          return { passed: false, feedback: '2つ目のpタグを <p class="special"> に書き換えてみましょう。' };
        }
      }
    ]
  },
  {
    id: 'css-styling',
    title: 'CSSでオシャレに',
    icon: 'css',
    color: 'bg-blue-100 text-blue-600',
    lessons: [
      {
        id: 'color-change',
        title: '文字の色を変える',
        description: 'CSSを使うと見た目を変えられます。colorプロパティを使いましょう。',
        tech: TechType.CSS,
        defaultCode: 'h1 {\n  color: black;\n}',
        task: 'h1の色を "blue" に変えてみましょう。',
        explanation: `
# 文字色を変える color

ここからはCSS（スタイルシート）の出番です。HTMLが「骨組み」なら、CSSは「飾り付け」です。
まずは基本の \`color\` プロパティで文字の色を変えてみましょう。

## 書き方のルール
\`\`\`css
誰を {
  何を: どうする;
}
\`\`\`
というのがCSSの基本文法です。

例：
\`\`\`css
h1 {
  color: red; /* h1の 文字色を 赤にする */
}
\`\`\`

色の名前は \`red\`, \`blue\`, \`green\` などの他に、\`#ff0000\` のようなカラーコードも使えます。
        `,
        hints: [
          'black を blue に書き換えてみましょう。',
          'コロン(:)とセミコロン(;)を消さないように注意！これは「区切り」の合図です。'
        ],
        validate: (code: string) => {
           const clean = code.replace(/\s/g, '');
           if (/h1\{[^}]*color:blue;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: 'キレイな青色になりましたね！自分の好きな色に変えられると楽しくなります。' };
           }
           if (/color:/.test(clean)) {
             return { passed: false, feedback: '値が blue になっているか確認しましょう。' };
           }
           return { passed: false, feedback: 'colorプロパティが見当たりません。' };
        }
      },
      {
        id: 'bg-color',
        title: '背景色を変える',
        description: '背景の色を変えると、ページの印象がガラッと変わります。',
        tech: TechType.CSS,
        defaultCode: 'body {\n  /* ここに背景色を指定してね */\n}',
        task: 'bodyの背景色（background-color）を "lightyellow" にしてください。',
        explanation: `
# 背景色 background-color

要素の背景を塗るには \`background-color\` を使います。
特に \`body\` タグに対して指定すると、ページ全体の色を変えることができます。

Webデザインでは、文字の色と背景色の **コントラスト（明暗差）** が大切です。
背景が暗いなら文字は白く、背景が明るいなら文字は黒くすると読みやすくなります。

## 例
\`\`\`css
body {
  background-color: #f0f0f0; /* 薄いグレー */
}
\`\`\`
        `,
        hints: [
          'background-color: lightyellow; と書きます。',
          'スペルが長いので注意しましょう。ハイフンも必要です。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/body\{[^}]*background-color:lightyellow;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '明るい雰囲気になりました！背景色はサイトの第一印象を決める重要な要素です。' };
          }
          return { passed: false, feedback: 'background-color プロパティを使ってみましょう。' };
        }
      },
      {
        id: 'font-size',
        title: '大きさを変える',
        description: 'font-sizeプロパティで文字の大きさを調整します。',
        tech: TechType.CSS,
        defaultCode: 'p {\n  font-size: 16px;\n}',
        task: 'pタグの文字の大きさを "24px" に変更してください。',
        explanation: `
# 文字サイズ font-size

文字の大きさを指定するには \`font-size\` を使います。
大きさの単位には \`px\`（ピクセル）を使うのが一番わかりやすいです。

## 目安
- **16px**: 一般的なブラウザの標準サイズ。読みやすい大きさ。
- **24px~32px**: 見出しにちょうどいい大きさ。
- **12px**: 注釈など、小さめの文字。

## 例
\`\`\`css
p {
  font-size: 30px;
}
\`\`\`
        `,
        hints: [
          '16px を 24px に変えます。',
          'px を消さないようにしましょう。数値と単位の間にはスペースを入れません（24 px はダメ）。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/p\{[^}]*font-size:24px;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '文字が大きくなって、インパクトが出ました！' };
          }
          return { passed: false, feedback: 'font-size を 24px に設定してみましょう。' };
        }
      },
      {
        id: 'text-align',
        title: '配置を変える',
        description: '文字を真ん中に寄せたり、右に寄せたりしてみましょう。',
        tech: TechType.CSS,
        defaultCode: 'h1 {\n  /* ここに配置を指定してね */\n}',
        task: 'h1の文字を中央揃え（center）にしてください。text-alignプロパティを使います。',
        explanation: `
# 文字の配置 text-align

Wordなどの文書作成ソフトと同じように、Webでも文字を揃える位置を変えられます。
\`text-align\`（テキスト・アライン）を使います。

## 値の種類
- \`left\` : 左寄せ（これが標準）
- \`center\` : 中央揃え（タイトルなどでよく使う）
- \`right\` : 右寄せ（日付や署名などで使う）

## 例
\`\`\`css
h1 {
  text-align: center;
}
\`\`\`
        `,
        hints: [
          'text-align: center; と書きます。',
          'align（整列）のスペルに注意！'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/h1\{[^}]*text-align:center;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: 'タイトルが真ん中に来て、堂々とした感じになりました！' };
          }
          return { passed: false, feedback: 'text-align: center; を追加してみましょう。' };
        }
      },
      {
        id: 'box-padding',
        title: '内側の余白を作る',
        description: '要素の内側に隙間を作って、窮屈な見た目を解消しましょう。',
        tech: TechType.CSS,
        defaultCode: 'button {\n  background-color: orange;\n  color: white;\n  /* ここに余白を追加 */\n}',
        task: 'buttonに "10px" のpadding（パディング）をつけてください。',
        explanation: `
# 内側の余白 padding

Webデザインで一番大事なのは「余白（スペース）」と言っても過言ではありません。
\`padding\`（パディング）は、要素の **内側の余白** です。

ボタンを作る時、文字が枠にくっついているとかっこ悪いですよね？
paddingを入れると、文字の周りにスペースができて、読みやすく、押しやすいボタンになります。

## 例
\`\`\`css
div {
  padding: 20px;
}
\`\`\`
これを「箱の中に詰め物（パッド）をする」とイメージすると覚えやすいですよ。
        `,
        hints: [
          'padding: 10px; と書きます。',
          '数字の後に px を忘れずに。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/button\{[^}]*padding:10px;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: 'ボタンがふっくらとして、クリックしたくなるデザインになりました！' };
          }
          return { passed: false, feedback: 'padding: 10px; を追加してみましょう。' };
        }
      },
      {
        id: 'box-margin',
        title: '外側の余白を作る',
        description: '要素の外側に隙間を作って、隣の要素と距離をとりましょう。',
        tech: TechType.CSS,
        defaultCode: 'div {\n  background-color: lightblue;\n  /* ここに外側の余白を追加 */\n}',
        task: 'divに "20px" のmargin（マージン）をつけてください。',
        explanation: `
# 外側の余白 margin

\`padding\` が内側なら、\`margin\`（マージン）は **外側の余白** です。
隣の要素との距離（ソーシャルディスタンス）を確保するために使います。

## paddingとの違い
- 背景色がある場合、\`padding\` は背景色が広がります。
- \`margin\` は背景色の **外** に透明な隙間を作ります。

## 例
\`\`\`css
p {
  margin: 30px;
}
\`\`\`
        `,
        hints: [
          'margin: 20px; と書きます。',
          'プレビューを見ながら、paddingとの違いを感じてみてください。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/div\{[^}]*margin:20px;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '要素の周りにスペースが空きました！要素同士がくっつきすぎていると見づらいので、marginは必須です。' };
          }
          return { passed: false, feedback: 'margin: 20px; を追加してみましょう。' };
        }
      },
      {
        id: 'border-style',
        title: '枠線をつける',
        description: '要素の周りに線を引いてみましょう。',
        tech: TechType.CSS,
        defaultCode: 'p {\n  padding: 10px;\n  /* ここに枠線を追加 */\n}',
        task: 'pタグに、太さ2px、実線（solid）、赤色（red）の枠線（border）をつけてください。',
        explanation: `
# 枠線 border

枠線を引くには \`border\` プロパティを使います。
「太さ」「種類」「色」の3つをスペースで区切って一度に指定するのが一般的です。

## 書き方
\`\`\`css
border: 太さ 種類 色;
\`\`\`

## 種類（スタイル）
- \`solid\` : 実線（普通の線）
- \`dotted\` : 点線
- \`dashed\` : 破線

## 例
\`\`\`css
/* 5pxの太さで、実線(solid)の、黒い線 */
border: 5px solid black;
\`\`\`
        `,
        hints: [
          'border: 2px solid red; と書きます。',
          '3つの値の順番は変えても動きますが、太さ・種類・色の順が一般的です。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, ''); // border:2pxsolidred;
          if (/border:2pxsolidred;?/i.test(clean)) {
            return { passed: true, feedback: 'くっきりとした枠線がつきました！強調したい場所や、ボタンの縁取りに使えます。' };
          }
          // 順番が変わってもOKにするための簡易チェック
          if (/border:/.test(clean) && /2px/.test(clean) && /solid/.test(clean) && /red/.test(clean)) {
             return { passed: true, feedback: '正解です！' };
          }
          return { passed: false, feedback: 'border: 2px solid red; のように3つの値を指定してみましょう。' };
        }
      },
      {
        id: 'border-radius',
        title: '角を丸くする',
        description: '角ばった四角形を、丸みのある優しい形に変身させます。',
        tech: TechType.CSS,
        defaultCode: 'button {\n  background: orange;\n  padding: 10px;\n  border: none;\n  /* ここに角丸の設定を追加 */\n}',
        task: 'buttonに border-radius: 10px; を設定して、角を丸くしてください。',
        explanation: `
# 角丸 border-radius

スマホのアイコンやボタンなど、最近のデザインは「角が丸い」ことが多いですよね。
\`border-radius\`（ボーダー・ラディウス）を使うと、簡単に角を丸くできます。

## 書き方
\`\`\`css
border-radius: 半径の大きさ;
\`\`\`

値を大きくするほど丸くなります。\
\`50%\` にすると、正方形なら完全な「円」になります。

## 例
\`\`\`css
div {
  border-radius: 8px; /* 少し丸い */
}
\`\`\`
        `,
        hints: [
          'border-radius: 10px; と書きます。',
          'radius のスペルに注意！'
        ],
        validate: (code: string) => {
           const clean = code.replace(/\s/g, '');
           if (/button\{[^}]*border-radius:10px;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: '角が取れて、モダンで優しい雰囲気のボタンになりましたね！' };
           }
           return { passed: false, feedback: 'border-radius: 10px; を追加してみましょう。' };
        }
      },
      {
        id: 'class-selector',
        title: '名札でデザイン',
        description: 'HTMLでつけたclass（名札）を使って、特定の要素だけデザインします。',
        tech: TechType.CSS,
        defaultCode: '/* HTMLには <p class="special"> があるとします */\n\n.special {\n  /* ここにCSSを書く */\n}',
        task: '.special クラスの文字色（color）を "orange" にしてください。',
        explanation: `
# クラスセレクタ . (ドット)

HTML編で \`class="special"\` のような名札をつけましたよね？
CSSでその名札がついた要素だけをデザインするには、名前の前にドット \`.\` をつけます。

## 書き方
\`\`\`css
.クラス名 {
  プロパティ: 値;
}
\`\`\`

ドットを忘れると、「special」という名前のタグ（そんなタグはないので無視されます）を探そうとしてしまいます。
**「ドットはクラスの合図」** と覚えましょう！

## 例
\`\`\`css
.alert-text {
  color: red;
  font-weight: bold;
}
\`\`\`
        `,
        hints: [
          'color: orange; を { } の中に書きます。',
          '.special は最初から書かれています。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/\.special\{[^}]*color:orange;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '完璧です！これで「特定の場所だけデザインを変える」ことができるようになりました。' };
          }
          return { passed: false, feedback: '.special の中に color: orange; を書いてみましょう。' };
        }
      },
      {
        id: 'hover-effect',
        title: 'カーソルが乗ったら',
        description: 'マウスカーソルを合わせた時にデザインを変える「ホバー」を学びます。',
        tech: TechType.CSS,
        defaultCode: 'button {\n  background: blue;\n  color: white;\n}\n\n/* ここにホバー時の設定を追加 */\n',
        task: 'button:hover を使って、カーソルが乗った時に背景色（background）を "red" にしてください。',
        explanation: `
# ホバー効果 :hover

ボタンにマウスを乗せた時、色がふわっと変わると「あ、押せるんだな」と分かりやすくなります。
これをホバー効果といいます。
要素の後ろに \`:hover\`（コロン・ホバー）をつけるだけです。

## 書き方
\`\`\`css
要素:hover {
  変えたいプロパティ: 値;
}
\`\`\`

## 例
\`\`\`css
/* 通常時 */
a { color: blue; }

/* カーソルが乗った時 */
a:hover { color: orange; }
\`\`\`
        `,
        hints: [
          'button:hover { ... } というブロックを作ります。',
          '中に background: red; を書きます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/button:hover\{[^}]*background:red;?[^}]*\}/i.test(clean) || /button:hover\{[^}]*background-color:red;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: 'プレビュー画面のボタンにマウスを乗せてみてください。赤くなりましたか？動きがあるとWebサイトが生き生きとします！' };
          }
          return { passed: false, feedback: 'button:hover { background: red; } を追加してみましょう。' };
        }
      },
      {
        id: 'flex-row',
        title: '横に並べる魔法',
        description: '最近のWeb制作で必須の「Flexbox」を使って、要素を横並びにします。',
        tech: TechType.CSS,
        defaultCode: '.container {\n  /* ここに魔法をかける */\n  gap: 10px;\n}',
        task: '.container に display: flex; を追加して、中身を横並びにしてください。',
        explanation: `
# フレックスボックス display: flex

通常、HTMLの要素は積み木のように上から下へと積まれていきます。
これを横並びにするのは、昔はとても大変でした。

しかし、今は魔法の呪文があります。それが **Flexbox** です。
親要素（入れ物）に \`display: flex;\` をつけるだけで、中の要素が自動的に横一列に並びます。

## 例
\`\`\`css
.menu-bar {
  display: flex;
}
\`\`\`

さらに \`justify-content: center;\` などを組み合わせると、中央揃えなども自由自在です（今回は flex だけでOK！）。
        `,
        hints: [
          'display: flex; と書きます。',
          'flex (フレックス) のスペルに注意。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/\.container\{[^}]*display:flex;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '横に並びました！これを使えば、メニューバーやカードレイアウトも自由自在です。現代のCSSの必須スキルです。' };
          }
          return { passed: false, feedback: 'display: flex; を追加してみましょう。' };
        }
      },
      {
        id: 'flex-justify',
        title: 'Flexboxで整列',
        description: '初級で学んだFlexboxを極めましょう。要素を真ん中に寄せたり、端に寄せたりします。',
        tech: TechType.CSS,
        defaultCode: '.container {\n  display: flex;\n  /* ここに整列の設定を追加 */\n  border: 1px solid gray;\n}',
        task: '.container に justify-content: center; を追加して、中身を中央寄せにしてください。',
        explanation: `
# 軸方向の整列 justify-content

\`display: flex;\` で横並びにした後、「左寄せ」「右寄せ」「中央寄せ」などを決めるのが \`justify-content\`（ジャスティファイ・コンテント）です。

## 主な値
- \`flex-start\`: 左寄せ（デフォルト）
- \`flex-end\`: 右寄せ
- \`center\`: 中央寄せ
- \`space-between\`: 両端に配置して、間を均等に空ける（ナビゲーションバーでよく使う！）

これを使えば、面倒なレイアウト計算をしなくてもきれいに配置できます。
        `,
        hints: [
          'justify-content: center; と書きます。',
          'justify (正当化する) という単語は少し難しいですが、デザイン用語として覚えちゃいましょう。'
        ],
        validate: (code: string) => {
           const clean = code.replace(/\s/g, '');
           if (/\.container\{[^}]*justify-content:center;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: '真ん中に集まりました！これでボタンや画像をど真ん中に置くのも簡単です。' };
           }
           return { passed: false, feedback: 'justify-content: center; を追加してみましょう。' };
        }
      },
      {
        id: 'flex-align',
        title: 'Flexboxで上下中央',
        description: '実は難しかった「上下の中央揃え」も、Flexboxなら一発です。',
        tech: TechType.CSS,
        defaultCode: '.box {\n  height: 200px;\n  display: flex;\n  justify-content: center;\n  /* ここに上下中央の設定を追加 */\n  border: 1px solid gray;\n}',
        task: '.box に align-items: center; を追加して、中身を上下方向の真ん中に来させてください。',
        explanation: `
# 交差方向の整列 align-items

横並び（横軸）の整列が \`justify-content\` なら、縦方向（交差軸）の整列は \`align-items\`（アライン・アイテムズ）です。

## 上下中央への道
1. 親要素に高さがあること（height）
2. \`display: flex;\`
3. \`align-items: center;\`

この3つが揃えば、要素は完璧に上下の真ん中に配置されます。昔のWeb制作ではこれが本当に大変だったんです！
        `,
        hints: [
          'align-items: center; と書きます。',
          'items は複数形です（sがつきます）。'
        ],
        validate: (code: string) => {
           const clean = code.replace(/\s/g, '');
           if (/\.box\{[^}]*align-items:center;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: '完璧な「ど真ん中」配置ができました！このテクニックは一生使えます。' };
           }
           return { passed: false, feedback: 'align-items: center; を追加してみましょう。' };
        }
      },
      {
        id: 'flex-direction',
        title: '縦並びにもできる',
        description: 'Flexboxは横並びだけじゃありません。縦並びモードに切り替えてみましょう。',
        tech: TechType.CSS,
        defaultCode: '.card {\n  display: flex;\n  /* ここに縦並びの設定を追加 */\n  border: 1px solid black;\n}',
        task: '.card に flex-direction: column; を追加して、中身を縦並びにしてください。',
        explanation: `
# 並ぶ方向 flex-direction

Flexboxの便利なところは、レイアウトの方向を簡単に変えられることです。
スマホ画面では縦に並べて、PC画面では横に並べる、といったレスポンシブデザインで大活躍します。

## 値
- \`row\`: 横並び（デフォルト）
- \`column\`: 縦並び

\`column\`（カラム＝円柱、縦の列）にすると、\`justify-content\` と \`align-items\` の役割が逆転するので注意が必要です！
        `,
        hints: [
          'flex-direction: column; と書きます。',
          'direction (ディレクション＝方向) のスペルに注意。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/\.card\{[^}]*flex-direction:column;?[^}]*\}/i.test(clean)) {
            return { passed: true, feedback: '縦並びになりました！これで「スマホ対応」の基礎が身につきました。' };
          }
          return { passed: false, feedback: 'flex-direction: column; を追加してみましょう。' };
        }
      },
      {
        id: 'position-abs',
        title: '自由な位置に配置',
        description: '画像の上に文字を重ねたい時などに使う「絶対配置」を学びます。',
        tech: TechType.CSS,
        defaultCode: '.parent { position: relative; height: 100px; border: 1px solid blue; }\n.child {\n  /* ここに絶対配置を書く */\n  bottom: 0;\n  right: 0;\n}',
        task: '.child に position: absolute; を追加して、親要素の右下に配置してください。',
        explanation: `
# 絶対配置 position: absolute

通常の積み木のようなルールを無視して、好きな場所に要素を配置する方法です。

## ルール
1. 親要素に \`position: relative;\` (基準だよ！という合図) をつける。
2. 子要素に \`position: absolute;\` (絶対配置だ！) をつける。
3. \`top\`, \`bottom\`, \`left\`, \`right\` で位置を指定する。

これを忘れると、画面の左上を基準に飛んでいってしまいます。
        `,
        hints: [
          'position: absolute; を .child に追加します。',
          '親要素(.parent)の relative は既に書いてあります。'
        ],
        validate: (code: string) => {
           const clean = code.replace(/\s/g, '');
           if (/\.child\{[^}]*position:absolute;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: '配置できました！画像の上に「SALE」バッジを乗せたりする時によく使います。' };
           }
           return { passed: false, feedback: 'position: absolute; を追加してみましょう。' };
        }
      },
      {
        id: 'box-shadow',
        title: '影をつける',
        description: '要素に影をつけて、浮き上がっているように見せましょう。',
        tech: TechType.CSS,
        defaultCode: 'div {\n  width: 100px; height: 100px; background: white;\n  /* ここに影を追加 */\n}',
        task: 'box-shadow: 5px 5px 10px gray; を追加して、影をつけてください。',
        explanation: `
# ボックスシャドウ box-shadow

要素に影をつけると立体感が生まれ、ユーザーの注目を集めることができます。

## 書き方
\`\`\`css
box-shadow: 横ズレ 縦ズレ ぼかし 色;
\`\`\`

## 例
\`\`\`css
/* 右に5px、下に5px、10pxぼかした黒い影 */
box-shadow: 5px 5px 10px black;
\`\`\`
        `,
        hints: [
          'box-shadow: 5px 5px 10px gray; と書きます。',
          '値の間はスペースで区切ります。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/box-shadow:5px5px10pxgray;?/i.test(clean)) {
            return { passed: true, feedback: '浮き上がって見えますね！最近のデザイン（マテリアルデザインなど）では、この影の使い方がとても重要です。' };
          }
          return { passed: false, feedback: 'box-shadow: 5px 5px 10px gray; を追加してみましょう。' };
        }
      },
      {
        id: 'bg-image',
        title: '背景画像',
        description: '色だけでなく、画像を背景に設定してみましょう。',
        tech: TechType.CSS,
        defaultCode: 'div {\n  width: 100%; height: 200px;\n  /* ここに背景画像を設定 */\n  background-size: cover;\n}',
        task: 'background-image: url("bg.jpg"); を追加して、背景画像を表示してください。',
        explanation: `
# 背景画像 background-image

要素の背景に画像を表示するには \`url("画像のパス")\` を使います。

## 重要なプロパティ
画像が要素より大きい/小さい場合の表示方法も重要です。
- \`background-size: cover;\`: 要素全体を覆うように拡大縮小（よく使う！）
- \`background-size: contain;\`: 画像全体が入るように調整

\`\`\`css
div {
  background-image: url("star.png");
}
\`\`\`
        `,
        hints: [
          'background-image: url("bg.jpg"); と書きます。',
          'urlのカッコと、中の引用符を忘れずに。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/background-image:url\(["']?bg\.jpg["']?\);?/i.test(clean) || /background:url\(["']?bg\.jpg["']?\)/i.test(clean)) {
            return { passed: true, feedback: 'きれいな背景が入りました！サイトの雰囲気を決める重要なテクニックです。' };
          }
          return { passed: false, feedback: 'background-image: url("bg.jpg"); を追加してみましょう。' };
        }
      },
      {
        id: 'transform-rotate',
        title: '要素を回転させる',
        description: 'transformプロパティを使って、要素をぐるっと回してみましょう。',
        tech: TechType.CSS,
        defaultCode: 'div {\n  width: 50px; height: 50px; background: red;\n  /* ここに回転を追加 */\n}',
        task: 'transform: rotate(45deg); を追加して、45度回転させてください。',
        explanation: `
# 変形 transform

要素を変形（回転、拡大縮小、移動）させるには \`transform\`（トランスフォーム）を使います。

## 回転 rotate
\`deg\`（ディグリー＝度）という単位を使います。
- \`rotate(45deg)\`: 時計回りに45度
- \`rotate(-90deg)\`: 反時計回りに90度

他にも \`scale(1.5)\`（1.5倍に拡大）などがあります。
        `,
        hints: [
          'transform: rotate(45deg); と書きます。',
          'カッコの中に角度を書きます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/transform:rotate\(45deg\);?/i.test(clean)) {
            return { passed: true, feedback: '回りました！アイコンを少し傾けたり、アニメーションで回したりする時に使えます。' };
          }
          return { passed: false, feedback: 'transform: rotate(45deg); を追加してみましょう。' };
        }
      },
      {
        id: 'css-transition',
        title: 'アニメーションの基礎',
        description: '色が変わる時、パッと変わるのではなく「ふわっ」と変わるようにします。',
        tech: TechType.CSS,
        defaultCode: 'button {\n  background: blue;\n  color: white;\n  /* ここにtransitionを追加 */\n}\nbutton:hover {\n  background: red;\n}',
        task: 'button に transition: 0.5s; を追加して、変化に時間をかけてください。',
        explanation: `
# 変化の時間 transition

ホバー効果などでスタイルが変わる時、\`transition\`（トランジション）を設定すると、その変化にかかる時間を指定できます。

## 書き方
\`\`\`css
transition: 時間;
\`\`\`
時間は \`s\`（秒）で指定します。
- \`0.5s\`: 0.5秒
- \`1s\`: 1秒

これがあるだけで、サイトが急に「高級感」を帯びてきます。
        `,
        hints: [
          'transition: 0.5s; を button の中に書きます（hoverの中ではありません）。',
          '数字のあとの s を忘れずに。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/button\{[^}]*transition:0\.5s;?[^}]*\}/i.test(clean)) {
             return { passed: true, feedback: 'ふわっと色が変わりましたね！この「余韻」が、使い心地の良さに繋がります。' };
          }
          return { passed: false, feedback: 'transition: 0.5s; を追加してみましょう。' };
        }
      }
    ]
  },
  {
    id: 'js-logic',
    title: 'JavaScriptで動かす',
    icon: 'js',
    color: 'bg-yellow-100 text-yellow-600',
    lessons: [
      {
        id: 'alert-hello',
        title: 'ポップアップを表示',
        description: '画面にメッセージを表示させる alert() 関数を使ってみましょう。',
        tech: TechType.JS,
        defaultCode: '// ここにJavaScriptを書くよ\n',
        task: 'alert("Hello!"); と書いて、実行ボタンを押してみてください。',
        explanation: `
# アラート alert()

いよいよプログラミングです！
HTML/CSSは「表示」を作りましたが、JavaScriptは「動き」や「計算」を作ります。

まずは一番簡単な \`alert()\`（アラート）を使ってみましょう。
ブラウザから「警告！」のようなポップアップウィンドウを表示させる命令（関数）です。

## 書き方
\`\`\`javascript
alert("表示したい文字");
\`\`\`

文字はダブルクォーテーション \`"\` か シングルクォーテーション \`'\` で囲むのがルールです（**文字列**といいます）。
最後にセミコロン \`;\` をつけて「命令終わり！」と伝えます。
        `,
        hints: [
          'すべて半角で入力します（文字の中身は日本語でもOK）。',
          'カッコ () の中に "Hello!" を入れます。',
          'alert のスペルを確認しましょう。'
        ],
        validate: (code: string) => {
          if (/alert\s*\(\s*["']Hello!["']\s*\)/.test(code)) {
            return { passed: true, feedback: 'ポップアップが出ましたね！あなたが書いた命令通りにコンピュータが動きました。' };
          }
          if (/alert/.test(code)) {
            return { passed: false, feedback: '書き方は alert("Hello!"); です。カッコや引用符を確認してね。' };
          }
          return { passed: false, feedback: 'alert という命令を使ってみましょう。' };
        }
      },
      {
        id: 'variable-const',
        title: 'データを箱に入れる',
        description: '変数（へんすう）を使ってデータを保存してみましょう。',
        tech: TechType.JS,
        defaultCode: '// 変数を使ってみよう\n',
        task: 'const greeting = "こんにちは"; と書いて、変数を作ってください。',
        explanation: `
# 変数（へんすう） const

プログラミングでは、データを入れておく「箱」のことを変数と呼びます。
箱に名前をつけておけば、後で何度でもその名前を使って中身を取り出せます。

JavaScriptでは、変化しない値（定数）を入れる箱を作るのに \`const\`（コンスト）を使います。

## 書き方
\`\`\`javascript
const 箱の名前 = "中身";
\`\`\`

数学と違って、ここでの \`=\` は「等しい」という意味ではなく、**「右のものを左の箱に入れる（代入）」** という意味です！

## 例
\`\`\`javascript
const name = "タナカ";
\`\`\`
これで \`name\` という箱に "タナカ" が保存されました。
        `,
        hints: [
          'const greeting = "こんにちは"; とそのまま書いてみましょう。',
          'イコール（=）の前後にスペースを入れると見やすいです。'
        ],
        validate: (code: string) => {
          if (/const\s+greeting\s*=\s*["']こんにちは["'];?/.test(code)) {
            return { passed: true, feedback: '完璧です！変数「greeting」を作ることができました。' };
          }
          return { passed: false, feedback: 'const greeting = "こんにちは"; と書いてみましょう。' };
        }
      },
      {
        id: 'console-log',
        title: 'コンソールに挨拶',
        description: '開発者ツールにメッセージを送る console.log() です。',
        tech: TechType.JS,
        defaultCode: '',
        task: 'console.log("Start"); と書いてみましょう。',
        explanation: `
# コンソールログ console.log()

プログラマーが一番よく使う命令がこれです。
\`alert\` は邪魔になりますが、\`console.log()\` は裏側の「コンソール」という場所にこっそりメッセージを表示します。

プログラムが正しく動いているか確認したり、変の中身をチェックしたりする（デバッグといいます）のに使います。
（このアプリでは、プレビュー画面の下の方にコンソール画面があります）

## 書き方
\`\`\`javascript
console.log("メッセージ");
\`\`\`
        `,
        hints: [
          'console.log の . (ドット) を忘れずに。',
          '"Start" をカッコの中に入れます。'
        ],
        validate: (code: string) => {
          if (/console\.log\s*\(\s*["']Start["']\s*\)/.test(code)) {
            return { passed: true, feedback: 'ログが表示されました！エラーが出た時なども、まずはここにログを出して原因を探るのがプログラマーの習慣です。' };
          }
          return { passed: false, feedback: 'console.log("Start"); と正確に入力してみましょう。' };
        }
      },
      {
        id: 'basic-math',
        title: '計算させてみよう',
        description: 'コンピュータは計算が得意です。足し算をやってみましょう。',
        tech: TechType.JS,
        defaultCode: '// 計算してみよう\n',
        task: '変数 price を作り、100 + 50 の計算結果を入れてください。',
        explanation: `
# 数値の計算

変数の良いところは、計算結果を保存できるところです。
ここでは引用符 \`"\` で **囲まない** のがポイントです。囲むと「文字」になりますが、囲まないと「数値」として計算されます。

## 使える記号
- 足し算: \`+\`
- 引き算: \`-\`
- 掛け算: \`*\` (アスタリスク)
- 割り算: \`/\` (スラッシュ)

## 例
\`\`\`javascript
const apple = 100;
const total = apple + 50; // totalの中身は 150 になる
\`\`\`
        `,
        hints: [
          'const price = 100 + 50; と書きます。',
          '数字に " (引用符) は不要です。つけると "10050" という文字になっちゃいます！'
        ],
        validate: (code: string) => {
          if (/const\s+price\s*=\s*100\s*\+\s*50;?/.test(code)) {
            return { passed: true, feedback: '正解！JavaScriptは強力な電卓としても使えますね。買い物サイトの合計金額などもこうやって計算しています。' };
          }
          return { passed: false, feedback: 'const price = 100 + 50; のように書いてみましょう。' };
        }
      },
      {
        id: 'if-statement',
        title: 'もしも...なら',
        description: '条件によって動きを変える「条件分岐（if文）」を学びます。',
        tech: TechType.JS,
        defaultCode: 'const score = 100;\n\n// ここにif文を書く\n',
        task: 'もし score が 100 だったら、console.log("満点！") を実行するif文を書いてください。',
        explanation: `
# 条件分岐 if (イフ)

「もし雨なら傘を持つ、そうでなければ手ぶら」のように、状況に合わせて行動を変えるには \`if\` を使います。

プログラミングでは「等しい」かどうか調べるには \`=\` ではなく \`===\` (イコール3つ) を使います。
（\`=\` は「代入」でしたよね！）

## 書き方
\`\`\`javascript
if (条件) {
  // 条件が合っている時に動くコード
}
\`\`\`

## 例
\`\`\`javascript
const age = 20;
if (age === 20) {
  console.log("祝！成人");
}
\`\`\`
        `,
        hints: [
          'if (score === 100) { ... } という形です。',
          '波カッコ { } の中に console.log("満点！") を入れます。',
          'イコールは3つ === です。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/if\(score===100\)/.test(clean) && /console\.log\(["']満点！["']\)/.test(clean)) {
            return { passed: true, feedback: '条件分岐クリア！「もし〇〇なら」というロジックは、ゲームやアプリを作る上で最も重要な考え方の一つです。' };
          }
          return { passed: false, feedback: 'if (score === 100) { console.log("満点！"); } のように書いてみましょう。' };
        }
      },
      {
        id: 'array-list',
        title: 'リストで管理',
        description: '複数のデータをまとめて管理できる「配列（はいれつ）」を学びます。',
        tech: TechType.JS,
        defaultCode: '// 好きな果物をリストに入れよう\n',
        task: '変数 fruits を作り、["りんご", "みかん"] という配列を入れてください。',
        explanation: `
# 配列 Array (アレイ)

変数は「箱」でしたが、**配列** は「仕切りのある長いケース」のようなものです。
たくさんのデータを一つの名前で管理できます。

## 書き方
\`[ ]\`（角カッコ）を使って、データをカンマ \`,\` で区切って並べます。

\`\`\`javascript
const colors = ["赤", "青", "黄"];
\`\`\`

中身を取り出す時は \`colors[0]\` のように番号（インデックス）を使います。
**※プログラミングでは番号は0から始まります！**
        `,
        hints: [
          'const fruits = ["りんご", "みかん"]; と書きます。',
          '角カッコ [ ] を使うのがポイントです。'
        ],
        validate: (code: string) => {
          if (/const\s+fruits\s*=\s*\[\s*["']りんご["']\s*,\s*["']みかん["']\s*\]/.test(code)) {
            return { passed: true, feedback: '配列が作れました！これで何百個のデータがあっても、ひとつの変数で管理できます。' };
          }
          return { passed: false, feedback: 'const fruits = ["りんご", "みかん"]; のように書いてみましょう。' };
        }
      },
      {
        id: 'dom-manipulation',
        title: '画面を書き換える',
        description: 'JavaScriptからHTMLの中身を変更する魔法、DOM操作に挑戦！',
        tech: TechType.JS,
        defaultCode: '// HTMLには <h1 id="title">タイトル</h1> があるとします\n\nconst h1 = document.getElementById("title");\n',
        task: 'h1の文字（innerText）を「変更しました！」に書き換えてください。',
        explanation: `
# HTMLを操る DOM操作

JavaScriptの醍醐味は、HTMLを後から自由自在に書き換えられることです。
これを **DOM（ドム）操作** といいます。

あらかじめHTMLのタグを \`getElementById\`（IDで要素を取得）で取得して変数に入れておき、その変数を操作します。
中身のテキストを書き換えるには \`innerText\`（インナーテキスト）プロパティを使います。

## 書き方
\`\`\`javascript
要素.innerText = "新しい文字";
\`\`\`

## 例
\`\`\`javascript
// h1の中身を書き換える
h1.innerText = "ようこそ！";
\`\`\`
これを実行した瞬間に、画面の文字が変わります。
        `,
        hints: [
          'h1.innerText = "変更しました！"; と書きます。',
          'innerText の T は大文字です（キャメルケースといいます）。'
        ],
        validate: (code: string) => {
          if (/h1\.innerText\s*=\s*["']変更しました！["'];?/.test(code) || /h1\.textContent\s*=\s*["']変更しました！["'];?/.test(code)) {
            return { passed: true, feedback: 'おめでとうございます！JSでHTMLを操作できました。チャットアプリで新着メッセージが表示されたりするのは、全部この仕組みです！' };
          }
          return { passed: false, feedback: 'h1.innerText = "変更しました！"; と書いてみましょう。' };
        }
      },
      {
        id: 'function-basic',
        title: '魔法の呪文を作る',
        description: '何度も使う処理をひとまとめにする「関数（かんすう）」を作ります。',
        tech: TechType.JS,
        defaultCode: '// ここに関数を作る\n',
        task: 'sayHello という名前の関数を作り、中で alert("Hello"); を実行するようにしてください。',
        explanation: `
# 関数 function (ファンクション)

長いプログラムを書いていると、同じ処理を何度も使いたい時があります。
そんな時、処理をひとまとめにして名前をつけ、いつでも呼び出せるようにしたものを「関数」といいます。
自分だけのオリジナルの呪文を作るようなものです。

## 書き方
\`\`\`javascript
function 名前() {
  // やりたい処理
}
\`\`\`

作った関数は、あとで \`名前()\` と書くだけで実行できます。

## 例
\`\`\`javascript
function jump() {
  console.log("ジャンプした！");
}

// 実行
jump();
\`\`\`
        `,
        hints: [
          'function sayHello() { ... } という形です。',
          '{ } の中に alert("Hello"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s+/g, ' ');
          if (/function\s+sayHello\s*\(\s*\)\s*\{/.test(clean) && /alert\s*\(\s*["']Hello["']\s*\)/.test(clean)) {
            return { passed: true, feedback: '関数が定義できました！今は定義しただけですが、sayHello() と書けばいつでも挨拶できます。' };
          }
          return { passed: false, feedback: 'function sayHello() { alert("Hello"); } のように書いてみましょう。' };
        }
      },
      {
        id: 'event-listener',
        title: 'クリックに反応する',
        description: 'ボタンが押された時にプログラムを動かす「イベントリスナー」を使います。',
        tech: TechType.JS,
        defaultCode: '// HTMLに <button id="btn">押して</button> があるとします\nconst btn = document.getElementById("btn");\n\n// ここにイベントリスナーを追加\n',
        task: 'btnがクリックされたら、console.log("Clicked!"); するように addEventListener を使ってください。',
        explanation: `
# イベントリスナー addEventListener

Webサイトはユーザーとの対話です。
「クリックされたら」「キーが押されたら」「マウスが乗ったら」といったタイミングを検知して、関数を実行する仕組みがイベントリスナーです。

「耳を澄ませて（Listen）、イベントを待つ」という意味です。

## 書き方
\`\`\`javascript
要素.addEventListener("イベント名", function() {
  // 実行したい処理
});
\`\`\`

## 例
\`\`\`javascript
btn.addEventListener("click", function() {
  alert("痛い！");
});
\`\`\`
        `,
        hints: [
          'btn.addEventListener("click", function() { ... }); と書きます。',
          '{ } の中に console.log("Clicked!"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s+/g, ' ');
          // アロー関数か通常関数かどちらでもOKにする
          const hasListener = /btn\.addEventListener\s*\(\s*["']click["']\s*,\s*(function\s*\(\)\s*\{|\(\)\s*=>\s*\{)/.test(clean);
          const hasLog = /console\.log\s*\(\s*["']Clicked!["']\s*\)/.test(clean);
          
          if (hasListener && hasLog) {
            return { passed: true, feedback: '素晴らしい！ユーザーの操作に反応する、インタラクティブなWebサイトの完成です！これでWeb開発の基礎コースは修了です。おめでとうございます！' };
          }
          return { passed: false, feedback: 'btn.addEventListener("click", function() { console.log("Clicked!"); }); のように書いてみましょう。' };
        }
      },
      {
        id: 'toggle-class',
        title: '見た目をスイッチ',
        description: 'ボタンを押して、CSSのクラスをつけたり外したり（トグル）してみましょう。',
        tech: TechType.JS,
        defaultCode: '// HTML: <div id="box" class="box"></div>\nconst box = document.getElementById("box");\n\n// ここにコードを書く\n',
        task: 'box.classList.add("active"); を使って、boxにactiveクラスを追加してください。',
        explanation: `
# クラスの追加・削除 classList

JavaScriptを使えば、「クリックしたら赤くする」「もう一度クリックしたら元に戻す」といった操作ができます。
これを実現する一番賢い方法は、CSSで \`.active\` のようなクラスを作っておき、JSでそのクラスを **つけ外し** することです。

## クラス操作の呪文
- 追加: \`要素.classList.add("クラス名")\`
- 削除: \`要素.classList.remove("クラス名")\`
- 切り替え: \`要素.classList.toggle("クラス名")\`

\`toggle\`（トグル）はスイッチのように、なければ追加、あれば削除を自動でやってくれます。
        `,
        hints: [
          'box.classList.add("active"); と書きます。',
          'classList (クラスリスト) の L は大文字です。'
        ],
        validate: (code: string) => {
           if (/box\.classList\.add\s*\(\s*["']active["']\s*\)/.test(code)) {
             return { passed: true, feedback: 'クラスを追加できました！CSSのアニメーションと組み合わせれば、リッチな動きのあるサイトが作れるようになります。' };
           }
           return { passed: false, feedback: 'box.classList.add("active"); と書いてみましょう。' };
        }
      }
    ]
  },
  // --- 中級 ---
  {
    id: 'css-layout',
    title: 'CSSレイアウト・中級',
    icon: 'layers',
    color: 'bg-indigo-100 text-indigo-600',
    lessons: [
      {
        id: 'flex-card',
        title: 'カードレイアウト',
        description: '画像と文字がセットになった「カード」を作ります。Webサイトで一番よく使う形です！',
        tech: TechType.CSS,
        defaultCode: '.card {\n  width: 200px;\n  border: 1px solid #ccc;\n  /* ここにFlexboxの設定を追加 */\n}',
        task: '.card に display: flex; と flex-direction: column; を追加して、縦並びのカードにしてください。',
        explanation: `
# カード型レイアウト

InstagramやPinterest、ニュースサイトなど、Webの世界は「カード」で溢れています。
これをきれいに作るには、Flexboxを縦向き（column）に使います。

## 構造
1. 親の \`.card\` （枠）
2. 子の \`img\` （写真）
3. 子の \`.text\` （説明文）

これらをFlexboxで縦に並べると、高さが揃ったり、余白の調整が簡単になります。
        `,
        hints: [
          'display: flex; を追加します。',
          'flex-direction: column; で縦並びにします。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/display:flex;?/.test(clean) && /flex-direction:column;?/.test(clean)) {
            return { passed: true, feedback: 'きれいなカードができました！これをたくさん並べれば、もう立派なWebサービスのような見た目になります。' };
          }
          return { passed: false, feedback: 'display: flex; と flex-direction: column; の両方を追加してみましょう。' };
        }
      },
      {
        id: 'media-query',
        title: 'スマホ対応させる',
        description: 'PCとスマホでデザインを変える「レスポンシブデザイン」の魔法です。',
        tech: TechType.CSS,
        defaultCode: 'body {\n  background-color: white;\n}\n\n/* 画面幅が600px以下なら... */\n@media (max-width: 600px) {\n  body {\n    /* ここにスマホ用の色を書く */\n  }\n}',
        task: '@media (max-width: 600px) の中で、bodyの background-color を "lightblue" にしてください。',
        explanation: `
# メディアクエリ @media

「画面が狭くなったら文字を小さくしたい」「スマホの時だけメニューを隠したい」
そんな時に使うのがメディアクエリです。

## 書き方
\`\`\`css
@media (max-width: 600px) {
  /* 600px以下（スマホなど）の時だけ適用されるCSS */
  body {
    background-color: red;
  }
}
\`\`\`

プレビュー画面の幅を狭くしたり広くしたりして、色が切り替わるのを確認してみましょう！
        `,
        hints: [
          'body { background-color: lightblue; } を @media の波カッコの中に書きます。',
          '外側のカッコを消さないように注意。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/@media\(max-width:600px\)\{body\{[^}]*background-color:lightblue;?[^}]*\}\}/i.test(clean)) {
            return { passed: true, feedback: 'レスポンシブ対応完了！今のWebサイト制作では「スマホ対応」は必須スキルです。' };
          }
          return { passed: false, feedback: '@mediaの中で background-color: lightblue; を設定してみましょう。' };
        }
      },
      {
        id: 'modal-window',
        title: 'ポップアップ画面',
        description: '画面の上に重なって表示される「モーダルウィンドウ」を作ります。',
        tech: TechType.CSS,
        defaultCode: '.modal {\n  display: none;\n  background: rgba(0,0,0,0.5);\n  /* ここに固定配置の設定を追加 */\n  width: 100%;\n  height: 100%;\n}',
        task: '.modal に position: fixed; と top: 0; left: 0; を設定して、画面全体を覆ってください。',
        explanation: `
# モーダルウィンドウ position: fixed

「ログイン」ボタンを押した時などに、画面全体が暗くなって入力画面が出てくるアレです。

## 仕組み
1. \`position: fixed;\` で画面に対して固定配置する。
2. \`top: 0; left: 0; width: 100%; height: 100%;\` で画面いっぱいに広げる。
3. \`z-index\` で他の要素より手前に表示する（今回は省略）。

これをJSで表示/非表示(display: none/block)切り替えれば完成です。
        `,
        hints: [
          'position: fixed; を追加します。',
          'top: 0; と left: 0; も忘れずに。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/position:fixed;?/i.test(clean) && /top:0;?/i.test(clean) && /left:0;?/i.test(clean)) {
            return { passed: true, feedback: '画面全体を覆うレイヤーができました！ユーザーに注目してほしい情報はこうやって表示します。' };
          }
          return { passed: false, feedback: 'position: fixed; と top: 0; left: 0; を追加してみましょう。' };
        }
      }
    ]
  },
  {
    id: 'js-ui',
    title: 'JavaScript UI・中級',
    icon: 'sparkles',
    color: 'bg-pink-100 text-pink-600',
    lessons: [
      {
        id: 'toggle-menu',
        title: 'ハンバーガーメニュー',
        description: 'スマホでよく見る、クリックするとパカッと開くメニューを作ります。',
        tech: TechType.JS,
        defaultCode: '// HTML: <nav id="menu" class="menu">...</nav> <button id="btn">Menu</button>\nconst menu = document.getElementById("menu");\nconst btn = document.getElementById("btn");\n\nbtn.addEventListener("click", () => {\n  // ここでクラスをトグル\n});',
        task: 'ボタンクリック時に、menu.classList.toggle("open"); を実行してください。',
        explanation: `
# メニューの開閉ロジック

スマホサイトの定番UI、「ハンバーガーメニュー（三本線のアイコン）」の仕組みです。
実はこれも、初級でやった「クラスのつけ外し（トグル）」だけで作れます。

1. CSSで \`.menu\` は隠しておく (\`display: none\` や画面外に配置)。
2. CSSで \`.menu.open\` は表示する設定を書く。
3. JSでボタンを押したら \`open\` クラスをつけたり消したりする。

これだけで、プロっぽい動きのあるメニューの完成です。
        `,
        hints: [
          'menu.classList.toggle("open"); と書きます。',
          'add ではなく toggle を使うのがコツです（開く・閉じるを繰り返せるから）。'
        ],
        validate: (code: string) => {
          if (/menu\.classList\.toggle\s*\(\s*["']open["']\s*\)/.test(code)) {
            return { passed: true, feedback: 'メニューが動きました！クラス操作とCSSを組み合わせれば、Web上のほとんどのアニメーションは作れてしまいます。' };
          }
          return { passed: false, feedback: 'menu.classList.toggle("open"); を使ってみましょう。' };
        }
      },
      {
        id: 'form-validate',
        title: '入力チェック',
        description: '「名前が入力されていません」のようなエラーメッセージを出してみましょう。',
        tech: TechType.JS,
        defaultCode: '// HTML: <input id="name"> <p id="error"></p> <button id="btn">送信</button>\nconst nameInput = document.getElementById("name");\nconst error = document.getElementById("error");\nconst btn = document.getElementById("btn");\n\nbtn.addEventListener("click", () => {\n  const val = nameInput.value;\n  if (val === "") {\n    // ここにエラー表示処理\n  }\n});',
        task: 'もし入力が空(val === "")なら、error.innerText = "名前を入力してください"; を実行してください。',
        explanation: `
# バリデーション（入力チェック）

ユーザーが正しいデータを入力したかチェックすることを「バリデーション」といいます。
\`input.value\` で入力された文字を取得し、それが空文字 \`""\` かどうかを \`if\` 文で調べます。

## 例
\`\`\`javascript
if (input.value === "") {
  alert("ダメです！");
}
\`\`\`
        `,
        hints: [
          'error.innerText = "名前を入力してください"; をif文の中に書きます。',
          'alertではなく、画面上の文字(innerText)を書き換えるのがモダンなやり方です。'
        ],
        validate: (code: string) => {
          if (/error\.innerText\s*=\s*["']名前を入力してください["']/.test(code) || /error\.textContent\s*=\s*["']名前を入力してください["']/.test(code)) {
             return { passed: true, feedback: 'バリデーション完成！これでユーザーに親切なフォームになりました。Webアプリには欠かせない機能です。' };
          }
          return { passed: false, feedback: 'error.innerText = "名前を入力してください"; と書いてみましょう。' };
        }
      },
      {
        id: 'tab-ui',
        title: 'タブ切り替え',
        description: 'クリックで内容が切り替わるタブメニューを作ります。',
        tech: TechType.JS,
        defaultCode: '// タブボタンたち\nconst tabs = document.querySelectorAll(".tab");\n\ntabs.forEach(tab => {\n  tab.addEventListener("click", () => {\n    // まず全てのタブからactiveを消す\n    tabs.forEach(t => t.classList.remove("active"));\n    \n    // ここでクリックされたタブ(tab)にactiveを追加\n  });\n});',
        task: 'クリックされた tab に対して classList.add("active"); を実行してください。',
        explanation: `
# 複数要素の操作 querySelectorAll

これまで \`getElementById\` で1つの要素を操作してきましたが、タブのように「同じ役割のものがたくさんある」場合は \`querySelectorAll\` を使います。

## forEachで一括処理
「全部のタブからクラスを消す」→「クリックしたタブだけクラスをつける」というロジックは、タブUIの基本中の基本です。
上級コースのゲーム開発でも、この「たくさんの要素をループで処理する」考え方がとても重要になります！
        `,
        hints: [
          'tab.classList.add("active"); と書きます。',
          'forEachの中でクリックされた要素は tab という変数に入っています。'
        ],
        validate: (code: string) => {
          if (/tab\.classList\.add\s*\(\s*["']active["']\s*\)/.test(code)) {
            return { passed: true, feedback: 'タブが切り替わりました！この「選択状態の管理」ができれば、スライドショーなども作れるようになります。いよいよ上級コースへの準備万端です！' };
          }
          return { passed: false, feedback: 'tab.classList.add("active"); を追加してみましょう。' };
        }
      }
    ]
  },
  // --- 上級 ---
  {
    id: 'web-advanced',
    title: '上級 - 本格ゲーム開発',
    icon: 'gamepad',
    color: 'bg-purple-100 text-purple-600',
    lessons: [
      {
        id: 'game-layout',
        title: '1. 盤面を作る',
        description: 'モグラ叩きゲームの盤面を CSS Grid で作ります。',
        tech: TechType.CSS,
        defaultCode: '.game-board {\n  /* ここにグリッドの設定を書いてね */\n  gap: 10px;\n}',
        task: '.game-board に対して display: grid; と grid-template-columns: repeat(3, 1fr); を設定し、3x3のマス目を作ってください。',
        explanation: `
# CSS Grid レイアウト

本格的なゲーム作りスタートです！まずは「モグラの穴」を3x3で並べる盤面を作ります。
Flexboxが「1次元（横か縦）」のレイアウトなら、**Grid**は「2次元（縦と横）」のレイアウトが得意です。

## 書き方
\`\`\`css
display: grid;
grid-template-columns: repeat(3, 1fr);
\`\`\`

\`repeat(3, 1fr)\` は「1fr（均等なサイズ）を3回繰り返す」という意味です。これで自動的に3列になります。
        `,
        hints: [
          'display: grid; と書きます。',
          'grid-template-columns: repeat(3, 1fr); と書きます。スペルに注意！'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/display:grid;?/i.test(clean) && /grid-template-columns:repeat\(3,1fr\);?/i.test(clean)) {
             return { passed: true, feedback: 'きれいな3列グリッドができました！これがゲームのフィールドになります。' };
          }
          return { passed: false, feedback: 'display: grid; と grid-template-columns を正しく設定してみましょう。' };
        }
      },
      {
        id: 'create-holes',
        title: '2. 穴を生成する',
        description: 'JavaScriptを使って、9個の穴を自動的に作ってみましょう。',
        tech: TechType.JS,
        defaultCode: 'const board = document.querySelector(".game-board");\n\n// 9回繰り返して穴を作るよ\nfor (let i = 0; i < 9; i++) {\n  // ここに処理を書く\n}',
        task: 'ループの中で div 要素を作成し、classNameに "hole" を設定して、board に appendChild してください。',
        explanation: `
# DOM生成とループ

HTMLで \`<div class="hole"></div>\` を9回書くのは面倒ですよね？
プログラマーなら、ループを使って自動生成しましょう。

## 手順
1. \`document.createElement("div")\` で要素を作る
2. \`element.className = "hole"\` でクラスをつける
3. \`board.appendChild(element)\` で盤面に追加する

これを \`for\` ループの中に入れれば、一瞬で9個の穴が出来上がります。
        `,
        hints: [
          'const hole = document.createElement("div");',
          'hole.className = "hole";',
          'board.appendChild(hole);'
        ],
        validate: (code: string) => {
          if (/createElement\s*\(\s*["']div["']\s*\)/.test(code) && /className\s*=\s*["']hole["']/.test(code) && /appendChild/.test(code)) {
            return { passed: true, feedback: '9個の穴が生成されました！手作業でHTMLを書くよりずっと効率的で、数の変更も簡単ですね。' };
          }
          return { passed: false, feedback: 'createElement, className, appendChild をループの中で使ってみましょう。' };
        }
      },
      {
        id: 'random-mole',
        title: '3. モグラ出現',
        description: 'ランダムな穴からモグラをひょっこり出してみましょう。',
        tech: TechType.JS,
        defaultCode: '// 穴のリスト\nconst holes = document.querySelectorAll(".hole");\n\nfunction randomHole() {\n  // 0〜8のランダムな数字を作る\n  const index = Math.floor(Math.random() * holes.length);\n  const hole = holes[index];\n  \n  // ここでクラスを追加\n  \n  // 0.8秒後に消す\n  setTimeout(() => {\n    hole.classList.remove("up");\n  }, 800);\n}',
        task: 'randomHole関数の中で、選ばれた hole に対して classList.add("up") をしてモグラを表示させてください。',
        explanation: `
# ランダム出現ロジック

「モグラが出る」＝「穴(\`.hole\`)にクラス(\`.up\`)をつける」という仕組みにします。CSSで \`.hole.up .mole { top: 0; }\` のようにアニメーションさせています。

## 必要な技術
1. **ランダム選択**: \`Math.random()\` で穴を選ぶ。
2. **クラス操作**: \`classList.add("up")\` で表示。
3. **時間差処理**: \`setTimeout\` を使って、一定時間後に \`classList.remove("up")\` して隠す。

これで「出たり入ったり」する動きが作れます。
        `,
        hints: [
          'hole.classList.add("up"); を書くだけです！',
          '変数 hole は既に定義されています。'
        ],
        validate: (code: string) => {
          if (/hole\.classList\.add\s*\(\s*["']up["']\s*\)/.test(code)) {
            return { passed: true, feedback: 'モグラが動きました！setTimeoutで「0.8秒後に消す」という処理が入っているのがポイントです。' };
          }
          return { passed: false, feedback: 'hole.classList.add("up"); を追加してみましょう。' };
        }
      },
      {
        id: 'whack-mole',
        title: '4. 叩く！',
        description: 'モグラをクリックした時に点数が入るようにします。',
        tech: TechType.JS,
        defaultCode: 'let score = 0;\nconst holes = document.querySelectorAll(".hole");\n\n// すべての穴にイベントを設定\nholes.forEach(hole => {\n  hole.addEventListener("click", () => {\n    // ここに判定ロジックを書く\n  });\n});',
        task: 'クリックされた穴が "up" クラスを持っていたら、scoreを1増やし、ログに出力し、"up" クラスを削除（叩かれた演出）してください。',
        explanation: `
# イベントと条件判定

「クリックした時」に「もしモグラが出ていたら」という条件判定を行います。

## ロジック
1. \`hole.classList.contains("up")\` でモグラがいるかチェック。
2. いてら \`score++\`。
3. そして \`hole.classList.remove("up")\` して即座に隠す（叩かれた感が出る）。

空振りした時は何もしないようにするのがコツです。
        `,
        hints: [
          'if (hole.classList.contains("up")) { ... }',
          'score++;',
          'hole.classList.remove("up");'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s+/g, '');
          const hasContains = /classList\.contains\(["']up["']\)/.test(clean);
          const hasIncrement = /score\+\+/.test(clean) || /score\+=1/.test(clean) || /score=score\+1/.test(clean);
          const hasRemove = /classList\.remove\(["']up["']\)/.test(clean);
          
          if (hasContains && hasIncrement && hasRemove) {
            return { passed: true, feedback: 'ナイスヒット！これで「叩く」というゲームの核となる部分が完成しました。' };
          }
          return { passed: false, feedback: 'contains("up") で確認し、scoreを増やし、remove("up") してみてください。' };
        }
      },
      {
        id: 'game-loop',
        title: '5. ゲームループ',
        description: '制限時間を設け、その間ずっとモグラが出続けるようにします。',
        tech: TechType.JS,
        defaultCode: 'let timeUp = false;\n\nfunction startGame() {\n  // ゲーム開始！\n  timeUp = false;\n  peep(); // モグラを出す関数\n  \n  // 10秒後に終了\n  setTimeout(() => {\n    // ここでゲーム終了フラグを立てる\n    alert("Game Over!");\n  }, 10000);\n}\n\nfunction peep() {\n  // ...モグラを出す処理...\n  // もし時間切れでなければ、またpeepを呼ぶ（再帰）\n  if (!timeUp) {\n    setTimeout(peep, 800);\n  }\n}',
        task: 'setTimeoutの中で timeUp = true; と設定して、ゲームが終了するようにしてください。',
        explanation: `
# ゲームループとフラグ管理

ゲームはずっと続くわけではありません。「開始」と「終了」があります。
これを管理するのが \`timeUp\` という**フラグ（旗）**変数です。

1. 開始時: \`timeUp = false\` (終わってない)
2. モグラ出現: \`timeUp\` が \`false\` なら、また次のモグラを出す（自分自身を呼び出す＝**再帰**）。
3. 終了時: \`setTimeout\` で10秒後に \`timeUp = true\` にする。

これで「10秒間だけループする」仕組みが作れます。
        `,
        hints: [
          'timeUp = true; と書きます。',
          'これで peep() 関数の中の if(!timeUp) が動かなくなり、モグラが止まります。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/timeUp=true/.test(clean)) {
            return { passed: true, feedback: 'ゲームオーバーの仕組みができました！これで「開始→プレイ→終了」という一連の流れが完成です。' };
          }
          return { passed: false, feedback: 'timeUp = true; を設定してみましょう。' };
        }
      },
      {
        id: 'high-score',
        title: '6. ハイスコア保存',
        description: 'ブラウザにデータを保存する LocalStorage を使って、ハイスコアを記録しましょう。',
        tech: TechType.JS,
        defaultCode: 'let score = 10; // 今回のスコア\n// 保存されているハイスコアを取得（なければ0）\nlet highScore = localStorage.getItem("highScore") || 0;\n\nif (score > highScore) {\n  // ここで保存処理\n  console.log("New High Score!");\n}',
        task: 'scoreがhighScoreより高い場合、localStorage.setItem("highScore", score) で新しいスコアを保存してください。',
        explanation: `
# ローカルストレージ localStorage

ゲームを閉じてもスコアを覚えておきたいですよね？
ブラウザには \`localStorage\` という、データを保存できる金庫があります。

## 書き方
- 保存: \`localStorage.setItem("キー", 値)\`
- 取得: \`localStorage.getItem("キー")\`

ここに保存したデータは、ブラウザを閉じても消えません。
        `,
        hints: [
          'localStorage.setItem("highScore", score); と書きます。',
          'キー名 "highScore" は取得時と同じにする必要があります。'
        ],
        validate: (code: string) => {
          if (/localStorage\.setItem\s*\(\s*["']highScore["']\s*,\s*score\s*\)/.test(code)) {
             return { passed: true, feedback: '保存完了！これで何度遊んでもハイスコアへの挑戦が楽しめる、本格的なゲームになりました。全コース制覇おめでとうございます！！' };
          }
          return { passed: false, feedback: 'localStorage.setItem("highScore", score) を使ってみましょう。' };
        }
      }
    ]
  }
];