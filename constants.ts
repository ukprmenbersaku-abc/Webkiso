import { CourseModule, TechType } from './types';

export const CURRICULUM: CourseModule[] = [
  {
    id: 'html-basics',
    title: 'HTML初級：基礎中の基礎！Webの骨組みを作ろう',
    icon: 'html',
    color: 'bg-orange-100 text-orange-600',
    lessons: [
      {
        id: 'h1-hello',
        title: '1. はじめましての世界',
        description: 'Webページの基本、見出しタグを使ってみましょう。',
        tech: TechType.HTML,
        defaultCode: '<!-- ここにコードを書いてね -->\n',
        task: '<h1>タグを使って、「こんにちは！」と表示させてみましょう。',
        explanation: `
# 見出しタグ <h1> について
Webページを作る旅は、このタグから始まります。
\`<h1>\` は、ページの中で **一番重要な見出し** を表すタグです。

HTMLでは、このように \`<タグ名>\`（開始タグ）と \`</タグ名>\`（終了タグ）で文字を挟んで意味を持たせます。

## 書き方の例
\`\`\`html
<h1>今日の日記</h1>
\`\`\`
        `,
        hints: ['<h1> と </h1> で囲みます。'],
        validate: (code: string) => /<h1>\s*こんにちは！\s*<\/h1>/i.test(code) ? { passed: true, feedback: '合格！' } : { passed: false, feedback: '<h1>こんにちは！</h1> と書いてみましょう。' }
      },
      {
        id: 'p-text',
        title: '2. 文章を書いてみよう',
        description: '段落を作るには <p> タグを使います。',
        tech: TechType.HTML,
        defaultCode: '<h1>自己紹介</h1>\n',
        task: '<p>タグを使って、好きな食べ物を書いてください。',
        explanation: `
# 段落タグ <p>
文章のまとまり（段落）を作るには \`<p>\`（Paragraph）タグを使います。
        `,
        hints: ['<p>りんごが好き</p> のように書きます。'],
        validate: (code: string) => /<p>.*<\/p>/.test(code) ? { passed: true, feedback: '正解です！' } : { passed: false, feedback: '<p>タグで文章を囲みましょう。' }
      },
      {
        id: 'a-link',
        title: '3. 別のページへ飛ばす',
        description: 'リンク（<a>タグ）の作り方を学びます。',
        tech: TechType.HTML,
        defaultCode: '<p>Googleへ行こう</p>\n',
        task: '<a>タグを使って、Google（https://google.com）へのリンクを作ってください。',
        explanation: `
# リンク <a>
他のページへ移動するリンクを作るには \`<a>\`（Anchor）タグを使います。
\`href\`（エイチレフ）という属性で行き先を指定します。

## 書き方
\`\`\`html
<a href="URL">表示する文字</a>
\`\`\`
        `,
        hints: ['<a href="https://google.com">Google</a> と書きます。'],
        validate: (code: string) => /<a\s+href=["']https:\/\/google\.com["']\s*>.*<\/a>/i.test(code) ? { passed: true, feedback: 'リンクができましたね！' } : { passed: false, feedback: '<a href="https://google.com">Google</a> と書いてみましょう。' }
      },
      {
        id: 'img-cat',
        title: '4. 画像を表示する',
        description: '<img>タグで画像を表示してみましょう。',
        tech: TechType.HTML,
        defaultCode: '<!-- ここに画像を出す -->\n',
        task: '<img>タグを使って、cat.jpg を表示してください。',
        explanation: `
# 画像 <img>
画像を表示するには \`<img>\` タグを使います。
このタグは終了タグ（</img>）が必要ない珍しいタグです。

## 書き方
\`\`\`html
<img src="画像の名前">
\`\`\`
        `,
        hints: ['<img src="cat.jpg"> と書きます。'],
        validate: (code: string) => /<img\s+src=["']cat\.jpg["']\s*\/?>/i.test(code) ? { passed: true, feedback: '猫が表示されたはずです！' } : { passed: false, feedback: '<img src="cat.jpg"> と書いてみましょう。' }
      },
      {
        id: 'ul-list',
        title: '5. リストを作る',
        description: '箇条書き（ul, li）を学びます。',
        tech: TechType.HTML,
        defaultCode: '<ul>\n  <!-- ここにリストの中身を書く -->\n</ul>',
        task: '<li>タグを使って、好きなもの（例：りんご）を1つ追加してください。',
        explanation: `
# リスト <ul> と <li>
箇条書きを作るには、\`<ul>\`（枠組み）の中に \`<li>\`（各項目）を入れます。
\`\`\`html
<ul>
  <li>項目1</li>
  <li>項目2</li>
</ul>
\`\`\`
        `,
        hints: ['<li>りんご</li> のように書きます。'],
        validate: (code: string) => /<li>.*<\/li>/.test(code) ? { passed: true, feedback: 'リストができました！' } : { passed: false, feedback: '<li>タグを追加しましょう。' }
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSS初級：魔法のペンで色を塗ろう',
    icon: 'palette',
    color: 'bg-blue-100 text-blue-600',
    lessons: [
      {
        id: 'css-color',
        title: '1. 文字の色を変える',
        description: 'CSSを使って、文字を好きな色に変えてみましょう。',
        tech: TechType.CSS,
        defaultCode: 'h1 {\n  /* ここにスタイルを書く */\n}',
        task: 'h1の色（color）を "red"（赤）に設定してください。',
        explanation: `
# CSSの基本
CSSは見た目を整えるための言語です。
\`\`\`css
セレクタ { プロパティ: 値; }
\`\`\`
        `,
        hints: ['color: red; と書きます。'],
        validate: (code: string) => code.replace(/\s/g, '').includes('color:red;') ? { passed: true, feedback: '赤くなりました！' } : { passed: false, feedback: 'h1 { color: red; } と書きましょう。' }
      },
      {
        id: 'css-bg',
        title: '2. 背景色を変える',
        description: '背景（background-color）を設定します。',
        tech: TechType.CSS,
        defaultCode: 'body {\n  /* ここに背景色を書く */\n}',
        task: '背景色を "lightblue" にしてください。',
        explanation: `
# 背景色 background-color
画面全体の背景を変えるには \`body\` セレクタを使います。
        `,
        hints: ['background-color: lightblue;'],
        validate: (code: string) => code.replace(/\s/g, '').includes('background-color:lightblue;') ? { passed: true, feedback: '明るい青になりました！' } : { passed: false, feedback: 'background-color: lightblue; と書きます。' }
      },
      {
        id: 'css-font-size',
        title: '3. 文字の大きさを変える',
        description: 'font-size を使って文字の大きさを調整します。',
        tech: TechType.CSS,
        defaultCode: 'p {\n  /* ここにフォントサイズを書く */\n}',
        task: '文字の大きさを "24px" にしてください。',
        explanation: `
# 文字サイズ font-size
大きさを指定するには \`px\` という単位をよく使います。
        `,
        hints: ['font-size: 24px;'],
        validate: (code: string) => code.includes('24px') ? { passed: true, feedback: '大きくなりましたね！' } : { passed: false, feedback: 'font-size: 24px; と書いてみましょう。' }
      },
      {
        id: 'css-width',
        title: '4. 幅と高さを決める',
        description: '要素のサイズ（width, height）を設定します。',
        tech: TechType.CSS,
        defaultCode: '.box {\n  background: gold;\n  /* ここにサイズを書く */\n}',
        task: '幅（width）を "200px"、高さ（height）を "100px" にしてください。',
        explanation: `
# サイズ指定
\`width\`（幅）と \`height\`（高さ）で要素の大きさを固定できます。
        `,
        hints: ['width: 200px;', 'height: 100px;'],
        validate: (code: string) => (code.includes('width: 200px') && code.includes('height: 100px')) ? { passed: true, feedback: '形ができました！' } : { passed: false, feedback: 'width と height を設定してください。' }
      },
      {
        id: 'css-border',
        title: '5. 枠線をつける',
        description: 'border プロパティを学びます。',
        tech: TechType.CSS,
        defaultCode: 'h1 {\n  /* ここに枠線を書く */\n}',
        task: '「2pxの太さ、直線の実線(solid)、黒色(black)」の枠線をつけてください。',
        explanation: `
# 枠線 border
\`border: 太さ スタイル 色;\` の順に書きます。
\`\`\`css
border: 2px solid black;
\`\`\`
        `,
        hints: ['border: 2px solid black;'],
        validate: (code: string) => code.includes('2px') && code.includes('solid') && code.includes('black') ? { passed: true, feedback: '枠線がつきました！' } : { passed: false, feedback: 'border: 2px solid black; と書いてみましょう。' }
      }
    ]
  },
  {
    id: 'js-logic',
    title: 'JS初級：コンピュータに命令してみよう',
    icon: 'js',
    color: 'bg-yellow-100 text-yellow-600',
    lessons: [
      {
        id: 'alert-hello',
        title: '1. ポップアップを表示',
        description: 'alert() 関数を使ってみましょう。',
        tech: TechType.JS,
        defaultCode: '// ここにJavaScriptを書くよ\n',
        task: 'alert("Hello!"); と書いてください。',
        explanation: '# アラート\n動きを作る命令 \`alert()\` を使ってみましょう。',
        hints: ['alert("Hello!");'],
        validate: (code: string) => /alert\s*\(\s*["']Hello!["']\s*\)/.test(code) ? { passed: true, feedback: 'OK!' } : { passed: false, feedback: 'alert("Hello!"); と書きましょう。' }
      },
      {
        id: 'variable-const',
        title: '2. データを保存する',
        description: '変数（const）を学びます。',
        tech: TechType.JS,
        defaultCode: '// ここに書く\n',
        task: 'const name = "プログラミングくん"; と書いてみましょう。',
        explanation: '# 変数 const\nデータを名前をつけて保存する「箱」のようなものです。',
        hints: ['const name = "プログラミングくん";'],
        validate: (code: string) => code.includes('const') && code.includes('name') ? { passed: true, feedback: '保存できました！' } : { passed: false, feedback: '正しく変数を作りましょう。' }
      },
      {
        id: 'js-math',
        title: '3. 計算をさせよう',
        description: 'JavaScriptで算数をします。',
        tech: TechType.JS,
        defaultCode: 'const x = 10;\nconst y = 5;\n// ここで x + y を alert してください\n',
        task: 'alert(x + y); と書いて計算結果を表示させましょう。',
        explanation: '# 計算\n数値はそのまま計算できます。',
        hints: ['alert(x + y);'],
        validate: (code: string) => /alert\s*\(\s*x\s*\+\s*y\s*\)/.test(code) ? { passed: true, feedback: '15が出ましたね！' } : { passed: false, feedback: 'alert(x + y); と書きましょう。' }
      },
      {
        id: 'js-if',
        title: '4. もしも〜なら（条件分岐）',
        description: 'if文の使い方を学びます。',
        tech: TechType.JS,
        defaultCode: 'const age = 20;\n// もし age が 18以上なら alert("大人") としてください\n',
        task: 'if (age >= 18) { alert("大人"); } と書いてください。',
        explanation: '# 条件分岐 if\n「もし〜なら」をプログラムにします。',
        hints: ['if (age >= 18) { alert("大人"); }'],
        validate: (code: string) => code.includes('age >= 18') && code.includes('大人') ? { passed: true, feedback: '条件判定ができました！' } : { passed: false, feedback: 'if文を正しく書きましょう。' }
      },
      {
        id: 'js-console',
        title: '5. ログに記録する',
        description: '開発者がよく使う console.log を学びます。',
        tech: TechType.JS,
        defaultCode: '// ここに書く\n',
        task: 'console.log("テスト開始"); と書いてください。',
        explanation: '# ログ console.log\n画面に出さずに、裏側（コンソール）にメッセージを残します。',
        hints: ['console.log("テスト開始");'],
        validate: (code: string) => code.includes('console.log') ? { passed: true, feedback: 'ログが出ました！' } : { passed: false, feedback: 'console.log("テスト開始"); と書いてみましょう。' }
      }
    ]
  },
  {
    id: 'html-layout',
    title: 'HTML中級：本格的なWebサイトの構造作り',
    icon: 'layout',
    color: 'bg-emerald-100 text-emerald-600',
    lessons: [
      {
        id: 'input-form',
        title: '入力欄を作ろう',
        description: '<input> タグの使い方を学びます。',
        tech: TechType.HTML,
        defaultCode: '<!-- ここに入力欄 -->\n',
        task: '<input type="text"> と書いて入力欄を作ってください。',
        explanation: 'フォームの基本です。',
        hints: ['<input type="text">'],
        validate: (code: string) => code.includes('type="text"') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'button-submit',
        title: 'ボタンを置こう',
        description: '<button> タグの使い方を学びます。',
        tech: TechType.HTML,
        defaultCode: '<!-- ここにボタン -->\n',
        task: '<button>送信</button> と書いてください。',
        explanation: 'クリックできるボタンを作ります。',
        hints: ['<button>送信</button>'],
        validate: (code: string) => /<button>.*<\/button>/.test(code) ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'div-container',
        title: '3. グループ化する',
        description: '<div> タグで要素をまとめます。',
        tech: TechType.HTML,
        defaultCode: '<!-- divで囲もう -->\n<h1>タイトル</h1>\n<p>説明</p>',
        task: 'h1とpを <div> </div> で囲ってください。',
        explanation: 'レイアウトを作るための「透明な箱」です。',
        hints: ['<div> の中に h1 と p を入れます。'],
        validate: (code: string) => /<div>.*<h1>.*<\/h1>.*<p>.*<\/p>.*<\/div>/s.test(code) ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'html-nav',
        title: '4. ナビゲーション',
        description: '<nav> タグとリストを組み合わせます。',
        tech: TechType.HTML,
        defaultCode: '<nav>\n  <!-- ここに ul などを書く -->\n</nav>',
        task: '<nav>の中にリスト(ul, li)を作ってください。',
        explanation: 'メニューを作る時に使います。',
        hints: ['<nav><ul><li>メニュー</li></ul></nav>'],
        validate: (code: string) => /<nav>.*<ul>.*<li>.*<\/li>.*<\/ul>.*<\/nav>/s.test(code) ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'html-table',
        title: '5. 表を作ろう',
        description: '<table> タグで表を作成します。',
        tech: TechType.HTML,
        defaultCode: '<table>\n  <tr>\n    <td>名前</td>\n    <td>点数</td>\n  </tr>\n</table>',
        task: 'もう一組 <tr>...</tr> を追加してください。',
        explanation: 'データを整理して表示します。',
        hints: ['<tr>タグをコピーして下に貼り付けてみましょう。'],
        validate: (code: string) => (code.match(/<tr>/g) || []).length >= 2 ? {passed:true, feedback:'表が広がりました！'} : {passed:false, feedback:'<tr>を追加してください。'}
      }
    ]
  },
  {
    id: 'css-design',
    title: 'CSS中級：美しいデザインを形にする',
    icon: 'palette',
    color: 'bg-violet-100 text-violet-600',
    lessons: [
      {
        id: 'box-model-padding',
        title: '内側の余白をとる',
        description: 'padding を学びます。',
        tech: TechType.CSS,
        defaultCode: '.box {\n  border: 1px solid black;\n  /* ここに余白を書く */\n}',
        task: 'padding を "20px" に設定してください。',
        explanation: '中身と枠線の間の余白です。',
        hints: ['padding: 20px;'],
        validate: (code: string) => code.includes('padding: 20px') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'flex-center',
        title: '2. 中央に寄せる（Flexbox）',
        description: 'display: flex を使った配置。',
        tech: TechType.CSS,
        defaultCode: '.parent {\n  display: flex;\n  /* ここに追加 */\n}\n.child { width: 50px; height: 50px; background: red; }',
        task: 'justify-content: center; で横方向の中央に寄せてください。',
        explanation: 'モダンなレイアウトの必須技術です。',
        hints: ['justify-content: center;'],
        validate: (code: string) => code.includes('justify-content: center') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'css-shadow',
        title: '3. 影をつけて浮かせる',
        description: 'box-shadow プロパティ。',
        tech: TechType.CSS,
        defaultCode: '.card {\n  /* ここに影を書く */\n}',
        task: 'box-shadow: 2px 2px 10px rgba(0,0,0,0.1); を設定してください。',
        explanation: '立体感を出すテクニックです。',
        hints: ['box-shadow: 2px 2px 10px rgba(0,0,0,0.1);'],
        validate: (code: string) => code.includes('box-shadow') ? {passed:true, feedback:'影がつきました！'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'css-transition',
        title: '4. ふわっと動かす',
        description: 'transition プロパティ。',
        tech: TechType.CSS,
        defaultCode: 'button {\n  transition: background 0.3s;\n}\nbutton:hover {\n  /* hover時の背景色を変える */\n}',
        task: 'hover時の背景(background)を gray にしてください。',
        explanation: '変化を滑らかにします。',
        hints: ['background: gray;'],
        validate: (code: string) => code.includes('button:hover') && code.includes('gray') ? {passed:true, feedback:'ふわっとなりました！'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'css-media',
        title: '5. スマホ対応（基礎）',
        description: 'メディアクエリの書き方。',
        tech: TechType.CSS,
        defaultCode: '@media (max-width: 600px) {\n  body {\n    /* スマホ用の背景色を書く */\n  }\n}',
        task: 'スマホ時の背景色を yellow にしてください。',
        explanation: '画面幅に合わせてデザインを変えます。',
        hints: ['background: yellow;'],
        validate: (code: string) => code.includes('yellow') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      }
    ]
  },
  {
    id: 'js-interaction',
    title: 'JS中級：動きのあるUIを作ろう',
    icon: 'sparkles',
    color: 'bg-pink-100 text-pink-600',
    lessons: [
      {
        id: 'dom-get',
        title: '要素を捕まえる',
        description: 'document.getElementById を学びます。',
        tech: TechType.JS,
        defaultCode: '<!-- HTMLに <h1 id="title"></h1> があります -->\n',
        task: 'const title = document.getElementById("title"); と書いて要素を取得してください。',
        explanation: 'JavaScriptからHTMLを操作する第一歩です。',
        hints: ['document.getElementById("title")'],
        validate: (code: string) => code.includes('getElementById') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'js-click-event',
        title: '2. クリックに反応する',
        description: 'addEventListener を使います。',
        tech: TechType.JS,
        defaultCode: 'btn.addEventListener("click", () => {\n  /* ここに処理を書く */\n});',
        task: 'alert("クリックしたよ"); を入れてください。',
        explanation: 'ユーザーのアクションに反応します。',
        hints: ['alert("クリックしたよ");'],
        validate: (code: string) => code.includes('alert') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'js-inner-text',
        title: '3. 文字を書き換える',
        description: 'innerText の使い方。',
        tech: TechType.JS,
        defaultCode: 'const el = document.getElementById("target");\n// ここで文字を変える\n',
        task: 'el.innerText = "書き換え成功！"; としてください。',
        explanation: 'プログラムから画面の文字を動的に変えます。',
        hints: ['el.innerText = "書き換え成功！"'],
        validate: (code: string) => code.includes('innerText') ? {passed:true, feedback:'文字が変わりました！'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'js-class-toggle',
        title: '4. 見た目を切り替える',
        description: 'classList.toggle を学びます。',
        tech: TechType.JS,
        defaultCode: 'const box = document.getElementById("box");\n// ここでクラスを切り替える',
        task: 'box.classList.toggle("active"); と書いてください。',
        explanation: 'CSSクラスを付け外ししてアニメーションなどを発動させます。',
        hints: ['classList.toggle("active")'],
        validate: (code: string) => code.includes('toggle') ? {passed:true, feedback:'切り替え成功！'} : {passed:false, feedback:'NG'}
      },
      {
        id: 'js-function-args',
        title: '5. オリジナルの命令を作る',
        description: '関数の引数を学びます。',
        tech: TechType.JS,
        defaultCode: 'function say(message) {\n  alert(message);\n}\n// 関数を呼び出そう\n',
        task: 'say("こんにちは"); と書いて関数を実行してください。',
        explanation: '繰り返し使う処理を関数としてまとめます。',
        hints: ['say("こんにちは");'],
        validate: (code: string) => code.includes('say(') ? {passed:true, feedback:'関数が動きました！'} : {passed:false, feedback:'NG'}
      }
    ]
  },
  {
    id: 'web-advanced',
    title: '上級 - 本格ゲーム開発',
    icon: 'gamepad',
    color: 'bg-purple-100 text-purple-600',
    lessons: [
      {
        id: 'game-layout-grid',
        title: '1. 盤面をグリッドで作る',
        description: 'ゲームの基礎となる盤面を CSS Grid でレイアウトします。',
        tech: TechType.CSS,
        defaultCode: '.game-board {\n  /* ここにグリッドの設定を書く */\n  background: #7b5e3d;\n  padding: 20px;\n  border-radius: 15px;\n  gap: 15px;\n}',
        task: '.game-board に対して display: grid; と grid-template-columns: repeat(3, 1fr); を設定してください。',
        explanation: `
# 本格ゲーム開発：第1歩
今日から15個のレッスンを通して、一つの「モグラ叩きゲーム」を完成させます！
まずはモグラの穴をきれいに並べる「盤面（ボード）」が必要です。
        `,
        hints: ['display: grid;', 'grid-template-columns: repeat(3, 1fr);'],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/display:grid;?/i.test(clean) && /grid-template-columns:repeat\(3,1fr\);?/i.test(clean)) {
            return { passed: true, feedback: '正解です！3列の土台ができました。' };
          }
          return { passed: false, feedback: 'gridの設定を確認してください。' };
        }
      },
      {
        id: 'hole-circle',
        title: '2. 穴を丸くデザインする',
        description: 'モグラの穴を丸くし、中身がはみ出さないようにします。',
        tech: TechType.CSS,
        defaultCode: '.hole {\n  background: #4a3721;\n  aspect-ratio: 1 / 1;\n  /* ここにスタイルを追加 */\n}',
        task: 'border-radius: 50%; と overflow: hidden; を追加してください。',
        explanation: '省略',
        hints: ['border-radius: 50%;', 'overflow: hidden;'],
        validate: (code: string) => {
          const clean = code.replace(/\s/g, '');
          if (/border-radius:50%/i.test(clean) && /overflow:hidden/i.test(clean)) {
            return { passed: true, feedback: 'きれいな丸い穴ができました！' };
          }
          return { passed: false, feedback: 'border-radius: 50%; と overflow: hidden; を追加しましょう。' };
        }
      },
      {
        id: 'js-loop-holes',
        title: '3. JSで穴を9個作る',
        description: 'ループを使って穴を作ります。',
        tech: TechType.JS,
        defaultCode: 'for (let i = 0; i < 9; i++) {\n  const hole = document.createElement("div");\n  hole.className = "hole";\n  board.appendChild(hole);\n}',
        task: 'そのまま実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-mole-add',
        title: '4. 穴の中にモグラを入れる',
        description: 'モグラ要素を追加します。',
        tech: TechType.JS,
        defaultCode: 'const mole = document.createElement("div");\nmole.className = "mole";\nhole.appendChild(mole);',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'mole-css-hide',
        title: '5. モグラを地中に隠す',
        description: 'CSSで隠します。',
        tech: TechType.CSS,
        defaultCode: '.mole { transform: translateY(100%); }',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'mole-css-up',
        title: '6. モグラを出現させる',
        description: 'CSSで出現させます。',
        tech: TechType.CSS,
        defaultCode: '.hole.up .mole { transform: translateY(0); }',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-random-hole',
        title: '7. ランダムな穴を選ぶ',
        description: 'JSでランダムな穴を選びます。',
        tech: TechType.JS,
        defaultCode: 'function randomHole() { return holes[Math.floor(Math.random()*9)]; }',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-peep-show',
        title: '8. モグラを出現させる関数',
        description: 'peep関数を作ります。',
        tech: TechType.JS,
        defaultCode: 'function peep() { hole.classList.add("up"); }',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-score-var',
        title: '9. スコア管理',
        description: 'スコア変数を追加します。',
        tech: TechType.JS,
        defaultCode: 'let score = 0;',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-click-mole',
        title: '10. モグラを叩く',
        description: 'クリックイベントを設定します。',
        tech: TechType.JS,
        defaultCode: 'hole.addEventListener("click", () => { score++; });',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-game-start-btn',
        title: '11. スタートボタン',
        description: 'スタートボタンの実装。',
        tech: TechType.JS,
        defaultCode: 'btn.addEventListener("click", startGame);',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-game-timer',
        title: '12. 制限時間',
        description: '10秒のタイマー。',
        tech: TechType.JS,
        defaultCode: 'setTimeout(() => timeUp = true, 10000);',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-game-loop-fix',
        title: '13. ゲームループ',
        description: '何度も出現させます。',
        tech: TechType.JS,
        defaultCode: 'if (!timeUp) peep();',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-score-final',
        title: '14. スコア表示',
        description: '最後のアラート。',
        tech: TechType.JS,
        defaultCode: 'alert(score);',
        task: '実行してください。',
        explanation: '省略',
        hints: [],
        validate: () => ({passed:true, feedback:'OK'})
      },
      {
        id: 'js-high-score-final',
        title: '15. ハイスコア保存',
        description: 'LocalStorageに保存！',
        tech: TechType.JS,
        defaultCode: 'localStorage.setItem("highScore", score);',
        task: '実行してください。',
        explanation: '完成です！',
        hints: [],
        validate: () => ({passed:true, feedback:'完成おめでとう！'})
      }
    ]
  }
];
