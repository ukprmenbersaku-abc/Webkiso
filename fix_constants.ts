import fs from 'fs';

const techJS = 'TechType.JS';
const techCSS = 'TechType.CSS';

// 1. BEGINNER JS (8 lessons)
const beginnerJS = `
      {
        id: 'alert-hello',
        title: 'ポップアップを表示',
        description: '画面にメッセージを表示させる alert() 関数を使ってみましょう。',
        tech: ${techJS},
        defaultCode: '// ここにJavaScriptを書くよ\\n',
        task: 'alert("Hello!"); と書いて、実行ボタンを押してみてください。',
        explanation: \`
# アラート alert()

いよいよプログラミングです！
HTML/CSSは「表示」を作りましたが、JavaScriptは「動き」や「計算」を作ります。

まずは一番簡単な \\\`alert()\\\`（アラート）を使ってみましょう。
ブラウザから「警告！」のようなポップアップウィンドウを表示させる命令（関数）です。

## 書き方
\\\`\\\`\\\`javascript
alert("表示したい文字");
\\\`\\\`\\\`

文字はダブルクォーテーション \\\`"\\\` か シングルクォーテーション \\\`\'\\\` で囲むのがルールです（**文字列**といいます）。
最後にセミコロン \\\`;\\\` をつけて「命令終わり！」と伝えます。
        \`,
        hints: [
          'すべて半角で入力します（文字の中身は日本語でもOK）。',
          'カッコ () の中に "Hello!" を入れます。',
          'alert のスペルを確認しましょう。'
        ],
        validate: (code: string) => {
          if (/alert\\s*\\(\\s*["\']Hello!["\']\\s*\\)/.test(code)) {
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
        tech: ${techJS},
        defaultCode: '// 変数を使ってみよう\\n',
        task: 'const greeting = "こんにちは"; と書いて、変数を作ってください。',
        explanation: \`
# 変数（へんすう） const

プログラミングでは、データを入れておく「箱」のことを変数と呼びます。
箱に名前をつけておけば、後で何度でもその名前を使って中身を取り出せます。

JavaScriptでは、変化しない値（定数）を入れる箱を作るのに \\\`const\\\`（コンスト）を使います。

## 書き方
\\\`\\\`\\\`javascript
const 箱の名前 = "中身";
\\\`\\\`\\\`

数学と違って、ここでの \\\`=\\\` は「等しい」という意味ではなく、**「右のものを左の箱に入れる（代入）」** という意味です！

## 例
\\\`\\\`\\\`javascript
const name = "タナカ";
\\\`\\\`\\\`
これで \\\`name\\\` という箱に "タナカ" が保存されました。
        \`,
        hints: [
          'const greeting = "こんにちは"; とそのまま書いてみましょう。',
          'イコール（=）の前後にスペースを入れてもOKです。'
        ],
        validate: (code: string) => {
          if (code.includes('const') && code.includes('greeting') && /["\']こんにちは["\']/.test(code)) {
            return { passed: true, feedback: '正解です！これで挨拶を「箱」の中に保存できました。' };
          }
          return { passed: false, feedback: 'const greeting = "こんにちは"; と書いてみましょう。' };
        }
      },
      {
        id: 'js-operators-math',
        title: '計算してみる',
        description: 'JavaScriptで足し算や引き算などの計算を行いましょう。',
        tech: ${techJS},
        defaultCode: 'const x = 10;\\nconst y = 5;\\n// ここで計算して結果を alert() してください\\n',
        task: 'alert(x + y); と書いて、計算結果を表示させてください。',
        explanation: \`
# 計算（演算子）
JavaScriptは「計算」が大得意です。
\\\`+\\\`（足し算）、\\\`-\\\`（引き算）、\\\`*\\\`（掛け算）、\\\`/\\\`（割り算）が使えます。

数値を扱うときは、引用符 \\\`"\\\` で囲まないように注意しましょう。
囲むと「文字」として扱われてしまいます。
        \`,
        hints: [
          'alert(x + y); と書きます。',
          'セミコロン ; を忘れずに。'
        ],
        validate: (code: string) => {
          if (/alert\\s*\\(\\s*x\\s*\\+\\s*y\\s*\\)/.test(code) || /alert\\s*\\(\\s*15\\s*\\)/.test(code)) {
            return { passed: true, feedback: '正解です！10 + 5 の結果である 15 が表示されましたね。' };
          }
          return { passed: false, feedback: 'alert(x + y); と書いてみましょう。' };
        }
      },
      {
        id: 'js-if-condition',
        title: 'もしも〜なら（条件分岐）',
        description: '「もしスコアが100点なら」のような条件判定を作ります。',
        tech: ${techJS},
        defaultCode: 'const score = 100;\\n// もしスコアが100なら "おめでとう" と alert してください\\n',
        task: 'if (score === 100) { alert("おめでとう"); } と書いてください。',
        explanation: \`
# 条件分岐 if
「もし〜なら、これを実行する」という処理を作るには \\\`if\\\` 文を使います。

## 書き方
\\\`\\\`\\\`javascript
if (条件) {
  // 条件が正しい時に実行される
}
\\\`\\\`\\\`

等しいかどうかを比べるには \\\`===\\\`（イコール3つ）を使います。
        \`,
        hints: [
          'if (score === 100) { alert("おめでとう"); } と書きます。',
          'if のカッコ () と波カッコ { } の位置に注意しましょう。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, '');
          if (/if\\(score===100\\)\\{alert\\(["\']おめでとう["\']\\);?\\}/.test(clean)) {
            return { passed: true, feedback: '条件判定ができました！これで「特定の時だけ動く」プログラムが作れます。' };
          }
          return { passed: false, feedback: 'if (score === 100) { alert("おめでとう"); } と書いてみましょう。' };
        }
      },
      {
        id: 'js-dom-text',
        title: '文字を書き換える',
        description: 'JavaScriptを使ってHTMLの内容を書き換えます。',
        tech: ${techJS},
        defaultCode: '// HTMLに <h1 id="title">タイトル</h1> があるとします\\n\\nconst h1 = document.getElementById("title");\\n',
        task: 'h1の文字（innerText）を「変更しました！」に書き換えてください。',
        explanation: \`
# HTMLを操る DOM操作

JavaScriptの醍醐味は、HTMLを後から自由自在に書き換えられることです。
これを **DOM（ドム）操作** といいます。

あらかじめHTMLのタグを \\\`getElementById\\\`（IDで要素を取得）で取得して変数に入れておき、その変数を操作します。
中身のテキストを書き換えるには \\\`innerText\\\`（インナーテキスト）プロパティを使います。

## 書き方
\\\`\\\`\\\`javascript
要素.innerText = "新しい文字";
\\\`\\\`\\\`

## 例
\\\`\\\`\\\`javascript
// h1の中身を書き換える
h1.innerText = "ようこそ！";
\\\`\\\`\\\`
これを実行した瞬間に、画面の文字が変わります。
        \`,
        hints: [
          'h1.innerText = "変更しました！"; と書きます。',
          'innerText の T は大文字です（キャメルケースといいます）。'
        ],
        validate: (code: string) => {
          if (!/innerText/.test(code) && !/textContent/.test(code)) {
             return { passed: false, feedback: '中身のテキストを変えるには .innerText プロパティを使いましょう。' };
          }
          if (code.includes('innerText') && !code.includes('=')) {
             return { passed: false, feedback: '値を書き換えるには 代入（=）を使います。要素.innerText = "..." の形にしましょう。' };
          }
          if (!/["\']変更しました！["\']/.test(code)) {
             return { passed: false, feedback: '変更後の文字は「変更しました！」にしましょう。' };
          }

          if (/h1\\.innerText\\s*=\\s*["\']変更しました！["\'];?/.test(code) || /h1\\.textContent\\s*=\\s*["\']変更しました！["\'];?/.test(code)) {
            return { passed: true, feedback: 'おめでとうございます！JSでHTMLを操作できました。チャットアプリで新着メッセージが表示されたりするのは、全部この仕組みです！' };
          }
          return { passed: false, feedback: 'h1.innerText = "変更しました！"; と書いてみましょう。' };
        }
      },
      {
        id: 'function-basic',
        title: '魔法の呪文を作る',
        description: '何度も使う処理をひとまとめにする「関数（かんすう）」を作ります。',
        tech: ${techJS},
        defaultCode: '// ここに関数を作る\\n',
        task: 'sayHello という名前の関数を作り、中で alert("Hello"); を実行するようにしてください。',
        explanation: \`
# 関数 function (ファンクション)

長いプログラムを書いていると、同じ処理を何度も使いたい時があります。
そんな時、処理をひとまとめにして名前をつけ、いつでも呼び出せるようにしたものを「関数」といいます。
自分だけのオリジナルの呪文を作るようなものです。

## 書き方
\\\`\\\`\\\`javascript
function 名前() {
  // やりたい処理
}
\\\`\\\`\\\`

作った関数は、あとで \\\`名前()\\\` と書くだけで実行できます。
        \`,
        hints: [
          'function sayHello() { ... } という形です。',
          '{ } の中に alert("Hello"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, ' ');
          if (/function\\s+sayHello\\s*\\(\\s*\\)\\s*\\{/.test(clean) && /alert\\s*\\(\\s*["\']Hello["\']\\s*\\)/.test(clean)) {
            return { passed: true, feedback: '関数が定義できました！今は定義しただけですが、sayHello() と書けばいつでも挨拶できます。' };
          }
          return { passed: false, feedback: 'function sayHello() { alert("Hello"); } のように書いてみましょう。' };
        }
      },
      {
        id: 'event-listener',
        title: 'クリックに反応する',
        description: 'ボタンが押された時にプログラムを動かす「イベントリスナー」を使います。',
        tech: ${techJS},
        defaultCode: '// HTMLに <button id="btn">押して</button> があるとします\\nconst btn = document.getElementById("btn");\\n\\n// ここにイベントリスナーを追加\\n',
        task: 'btnがクリックされたら、console.log("Clicked!"); するように addEventListener を使ってください。',
        explanation: \`
# イベントリスナー addEventListener

Webサイトはユーザーとの対話です。
「クリックされたら」「キーが押されたら」「マウスが乗ったら」といったタイミングを検知して、関数を実行する仕組みがイベントリスナーです。

「耳を澄ませて（Listen）、イベントを待つ」という意味です。
        \`,
        hints: [
          'btn.addEventListener("click", function() { ... }); と書きます。',
          '{ } の中に console.log("Clicked!"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, ' ');
          const hasListener = /btn\\.addEventListener\\s*\\(\\s*["\']click["\']\\s*,\\s*(function\\s*\\(\\s*\\)\\s*\\{|\\(\\s*\\)\\s*=>\\s*\\{)/.test(clean);
          const hasLog = /console\\.log\\s*\\(\\s*["\']Clicked!["\']\\s*\\)/.test(clean);
          
          if (hasListener && hasLog) {
            return { passed: true, feedback: '素晴らしい！ユーザーの操作に反応する、インタラクティブなWebサイトの完成です！これでWeb開発の基礎コースは修了です。' };
          }
          return { passed: false, feedback: 'btn.addEventListener("click", function() { console.log("Clicked!"); }); のように書いてみましょう。' };
        }
      },
      {
        id: 'toggle-class',
        title: '見た目をスイッチ',
        description: 'ボタンを押して、CSSのクラスをつけたり外したり（トグル）してみましょう。',
        tech: ${techJS},
        defaultCode: '// HTML: <div id="box" class="box"></div>\\nconst box = document.getElementById("box");\\n\\n// ここにコードを書く\\n',
        task: 'box.classList.add("active"); を使って、boxにactiveクラスを追加してください。',
        explanation: \`
# クラスの追加・削除 classList

JavaScriptを使えば、「クリックしたら赤くする」「もう一度クリックしたら元に戻す」といった操作ができます。
を実現する一番賢い方法は、CSSで \\\`.active\\\` のようなクラスを作っておき、JSでそのクラスを **つけ外し** することです。

## クラス操作の呪文
- 追加: \\\`要素.classList.add("クラス名")\\\`
- 削除: \\\`要素.classList.remove("クラス名")\\\`
- 切り替え: \\\`要素.classList.toggle("クラス名")\\\`
        \`,
        hints: [
          'box.classList.add("active"); と書きます。',
          'classList (クラスリスト) の L は大文字です。'
        ],
        validate: (code: string) => {
           if (/box\\.classList\\.add\\s*\\(\\s*["\']active["\']\\s*\\)/.test(code)) {
             return { passed: true, feedback: 'クラスを追加できました！Web制作の楽しさがだんだん分かってきましたか？' };
           }
           return { passed: false, feedback: 'box.classList.add("active"); と書いてみましょう。' };
        }
      }
`;

// 2. WHACK-A-MOLE (15 lessons)
const advancedLessons = `
      {
        id: 'game-layout-grid',
        title: '1. 盤面をグリッドで作る',
        description: 'ゲームの基礎となる盤面を CSS Grid でレイアウトします。',
        tech: ${techCSS},
        defaultCode: '.game-board {\\n  /* ここにグリッドの設定を書く */\\n  background: #7b5e3d;\\n  padding: 20px;\\n  border-radius: 15px;\\n  gap: 15px;\\n}',
        task: '.game-board に対して display: grid; と grid-template-columns: repeat(3, 1fr); を設定してください。',
        explanation: \`
# 本格ゲーム開発：第1歩
今日から15個のレッスンを通して、一つの「モグラ叩きゲーム」を完成させます！
まずはモグラの穴をきれいに並べる「盤面（ボード）」が必要です。

## CSS Grid
要素を格子状に並べるには **CSS Grid** が最適です。
- \\\`display: grid;\\\`: グリッドレイアウトを使います。
- \\\`grid-template-columns: repeat(3, 1fr);\\\`: 横に3個、同じ幅(1fr)で並べます。
        \`,
        hints: [
          'display: grid;',
          'grid-template-columns: repeat(3, 1fr);'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s/g, '');
          if (/display:grid;?/i.test(clean) && /grid-template-columns:repeat\\(3,1fr\\);?/i.test(clean)) {
            return { passed: true, feedback: '正解です！3列の土台ができました。' };
          }
          return { passed: false, feedback: 'gridの設定を確認してください。' };
        }
      },
      {
        id: 'hole-circle',
        title: '2. 穴を丸くデザインする',
        description: 'モグラの穴を丸くし、中身がはみ出さないようにします。',
        tech: ${techCSS},
        defaultCode: '.hole {\\n  background: #4a3721;\\n  aspect-ratio: 1 / 1;\\n  /* ここにスタイルを追加 */\\n}',
        task: 'border-radius: 50%; と overflow: hidden; を追加してください。',
        explanation: \`
# 穴のデザイン
四角いままでは「穴」に見えません。\\\`border-radius: 50%\\\` で円形にします。

## はみ出し禁止！
\\\`overflow: hidden\\\` を設定すると、穴からはみ出したモグラ（地中のモグラ）を隠すことができます。これが出現アニメーションの鍵になります。
        \`,
        hints: [
          'border-radius: 50%;',
          'overflow: hidden;'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s/g, '');
          if (/border-radius:50%/i.test(clean) && /overflow:hidden/i.test(clean)) {
            return { passed: true, feedback: 'きれいな丸い穴ができました！' };
          }
          return { passed: false, feedback: 'border-radius: 50%; と overflow: hidden; を追加しましょう。' };
        }
      },
      {
        id: 'js-loop-holes',
        title: '3. JSで穴を9個作る',
        description: '手動で書かずに、ループを使って効率的に穴を作ります。',
        tech: ${techJS},
        defaultCode: 'const board = document.querySelector(".game-board");\\n\\nfor (let i = 0; i < 9; i++) {\\n  const hole = document.createElement("div");\\n  // ここでクラス名を設定\\n  \\n  board.appendChild(hole);\\n}',
        task: 'hole.className = "hole"; を設定してください。',
        explanation: \`
# ループの魔法
HTMLで同じことを9回書く必要はありません。JavaScriptの \\\`for\\\` 文を使いましょう。

\\\`document.createElement("div")\\\` で新しい要素を作り、CSSで用意した \\\`hole\\\` クラスを割り当てます。
        \`,
        hints: [
          'hole.className = "hole";'
        ],
        validate: (code: string) => {
          if (code.includes('className') && /["\']hole["\']/.test(code)) {
            return { passed: true, feedback: '9個の穴が一瞬で生成されました！' };
          }
          return { passed: false, feedback: 'hole.className = "hole"; を追加しましょう。' };
        }
      },
      {
        id: 'js-mole-add',
        title: '4. 穴の中にモグラを入れる',
        description: '各穴の中に、モグラとなる要素を追加します。',
        tech: ${techJS},
        defaultCode: 'for (let i = 0; i < 9; i++) {\\n  const hole = document.createElement("div");\\n  hole.className = "hole";\\n  \\n  const mole = document.createElement("div");\\n  // moleにクラス名を設定\\n  \\n  // holeの中にmoleを入れる\\n  \\n  board.appendChild(hole);\\n}',
        task: 'mole.className = "mole"; を設定し、hole.appendChild(mole); を追加してください。',
        explanation: \`
# 親子構造
「穴（hole）」の中に「モグラ（mole）」を入れる入れ子構造にします。

1. モグラ要素を作る
2. クラス名をつける
3. 穴に追加する (\\\`appendChild\\\`)
        \`,
        hints: [
          'mole.className = "mole";',
          'hole.appendChild(mole);'
        ],
        validate: (code: string) => {
          if (code.includes('mole.className') && code.includes('hole.appendChild(mole)')) {
            return { passed: true, feedback: '各穴にモグラが配置されました。まだ隠れていますね。' };
          }
          return { passed: false, feedback: 'moleのクラス設定と穴への追加を行いましょう。' };
        }
      },
      {
        id: 'mole-css-hide',
        title: '5. モグラを地中に隠す',
        description: 'モグラの初期状態（地中にいる状態）を CSS で作ります。',
        tech: ${techCSS},
        defaultCode: '.mole {\\n  width: 100%;\\n  height: 100%;\\n  background: #f4a460;\\n  border-radius: 50% 50% 0 0;\\n  /* ここに地中に隠す設定を追加 */\\n  transition: transform 0.4s;\\n}',
        task: 'transform: translateY(100%); を設定してください。',
        explanation: \`
# 地中のモグラ
モグラの初期状態は、自分の高さ（100%）分だけ下にずらしておきます。
先ほど穴に \\\`overflow: hidden\\\` を設定したので、このずらした部分は見えなくなります。
        \`,
        hints: [
          'transform: translateY(100%);'
        ],
        validate: (code: string) => {
          if (code.includes('translateY(100%)')) {
            return { passed: true, feedback: 'モグラが地中に隠れました！準備万端です。' };
          }
          return { passed: false, feedback: 'transform: translateY(100%); を設定しましょう。' };
        }
      },
      {
        id: 'mole-css-up',
        title: '6. モグラを出現させる',
        description: 'クラスがついた時にモグラが上がってくるようにします。',
        tech: ${techCSS},
        defaultCode: '.hole.up .mole {\\n  /* ここに出現時の設定を追加 */\\n}',
        task: 'transform: translateY(0); を設定してください。',
        explanation: \`
# ひょっこり！
\\\`hole\\\` 要素に \\\`up\\\` というクラスがついた時、モグラを元の位置（0）に戻します。
\\\`transition\\\` がかかっているので、シュッと上がってくる動きになります。
        \`,
        hints: [
          'transform: translateY(0);'
        ],
        validate: (code: string) => {
          if (code.includes('translateY(0)')) {
            return { passed: true, feedback: 'モグラが出る仕組みがCSSで完成しました！' };
          }
          return { passed: false, feedback: 'transform: translateY(0); を設定しましょう。' };
        }
      },
      {
        id: 'js-random-hole',
        title: '7. ランダムな穴を選ぶ',
        description: 'モグラを出す穴をランダムに選ぶ関数を作ります。',
        tech: ${techJS},
        defaultCode: 'const holes = document.querySelectorAll(".hole");\\n\\nfunction randomHole() {\\n  const index = Math.floor(Math.random() * holes.length);\\n  const hole = holes[index];\\n  // 選んだ穴を返す\\n}',
        task: 'return hole; を追加して、選ばれた穴を関数の外に渡せるようにしてください。',
        explanation: \`
# 運命の選択
\\\`Math.random()\\\` と穴の数（9個）を掛け合わせることで、0から8の数字を作ります。
それを元に \\\`holes\\\` の中から1つの穴を選びます。
        \`,
        hints: [
          'return hole;'
        ],
        validate: (code: string) => {
          if (/return\\s+hole;?/.test(code)) {
            return { passed: true, feedback: 'ランダムな穴選びができるようになりました！' };
          }
          return { passed: false, feedback: 'return hole; を追加してください。' };
        }
      },
      {
        id: 'js-peep-show',
        title: '8. モグラを出現させる関数',
        description: '一定時間モグラを出し、その後隠す「peep」関数を作ります。',
        tech: ${techJS},
        defaultCode: 'function peep() {\\n  const hole = randomHole();\\n  // クラスを追加して出現させる\\n  \\n  setTimeout(() => {\\n    // クラスを削除して隠す\\n  }, 800);\\n}',
        task: 'hole.classList.add("up"); と、setTimeoutの中で hole.classList.remove("up"); を追加してください。',
        explanation: \`
# 出て、入る
まずは \\\`add("up")\\\` で出現。
\\\`setTimeout\\\` を使って、800ミリ秒後に \\\`remove("up")\\\` することで自動的に引っ込むようになります。
        \`,
        hints: [
          'hole.classList.add("up");',
          'hole.classList.remove("up");'
        ],
        validate: (code: string) => {
          if (code.includes('classList.add("up")') && code.includes('classList.remove("up")')) {
            return { passed: true, feedback: 'モグラが自動で出て引っ込むようになりました！' };
          }
          return { passed: false, feedback: 'classList の add と remove を使いましょう。' };
        }
      },
      {
        id: 'js-score-var',
        title: '9. スコア変数を管理する',
        description: 'プレイヤーの得点を記録する変数と表示を用意します。',
        tech: ${techJS},
        defaultCode: 'const scoreBoard = document.querySelector(".score");\\nlet score = 0;\\n\\nfunction updateScore() {\\n  score++;\\n  // 表示を更新\\n}',
        task: 'scoreBoard.innerText = score; を追加して、画面の表示を更新してください。',
        explanation: \`
# スコアの更新
プログラムの中で \\\`score\\\` を増やしても、画面を書き換えないとプレイヤーには分かりません。
\\\`innerText\\\` などを使い、現在の数値を画面に反映させましょう。
        \`,
        hints: [
          'scoreBoard.innerText = score;'
        ],
        validate: (code: string) => {
          if (code.includes('scoreBoard.innerText') && code.includes('score')) {
            return { passed: true, feedback: 'スコア表示の準備ができました。' };
          }
          return { passed: false, feedback: 'scoreBoard.innerText = score; を追加してください。' };
        }
      },
      {
        id: 'js-click-mole',
        title: '10. モグラを叩く',
        description: 'モグラをクリックした時に点数が入るようにします。',
        tech: ${techJS},
        defaultCode: 'let score = 0;\\nconst holes = document.querySelectorAll(".hole");\\n\\n// すべての穴にイベントを設定\\nholes.forEach(hole => {\\n  hole.addEventListener("click", () => {\\n    // ここに判定ロジックを書く\\n  });\\n});',
        task: 'クリックされた穴が "up" クラスを持っていたら、scoreを1増やし、"up" クラスを削除してください。',
        explanation: \`
# 叩いた判定
クリックされた要素が \\\`up\\\` クラスを持っていれば、それは「モグラが出ている時に叩いた」ことになります。
\\\`classList.contains("up")\\\` で確認しましょう。
        \`,
        hints: [
          'if (hole.classList.contains("up")) { ... }',
          'score++;',
          'hole.classList.remove("up");'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, '');
          if (clean.includes('contains("up")') && clean.includes('score++') && clean.includes('remove("up")')) {
            return { passed: true, feedback: 'ナイスヒット！叩く処理ができました。' };
          }
          return { passed: false, feedback: 'contains("up") で確認し、スコアを増やして、upクラスを削除してください。' };
        }
      },
      {
        id: 'js-game-start-btn',
        title: '11. ゲーム開始ボタン',
        description: 'ボタンを押したらゲームが始まるようにします。',
        tech: ${techJS},
        defaultCode: 'const startBtn = document.querySelector("#start");\\n\\nstartBtn.addEventListener("click", () => {\\n  // スコアをリセットして、モグラを出す\\n});',
        task: 'score = 0; と peep(); を実行するようにしてください。',
        hints: ['score = 0; と peep(); を書きます。'],
        explanation: '省略',
        validate: (code: string) => {
          if (code.includes('score = 0') && code.includes('peep()')) {
            return { passed: true, feedback: 'ゲームが始められるようになりました！' };
          }
          return { passed: false, feedback: 'scoreのリセットとpeepの呼び出しが必要です。' };
        }
      },
      {
        id: 'js-game-timer',
        title: '12. 制限時間を作る',
        description: '10秒経ったらゲームが終わるようにします。',
        tech: ${techJS},
        defaultCode: 'let timeUp = false;\\n\\nfunction startGame() {\\n  timeUp = false;\\n  peep();\\n  // 10秒後に timeUp を true にする\\n}',
        task: 'setTimeout(() => { timeUp = true; }, 10000); を追加してください。',
        explanation: '省略',
        hints: ['setTimeout を使って10秒後(10000)に timeUp = true; にします。'],
        validate: (code: string) => {
          if (code.includes('timeUp = true') && code.includes('10000')) {
            return { passed: true, feedback: '制限時間ができました！' };
          }
          return { passed: false, feedback: '10秒後に timeUp = true になるよう設定してください。' };
        }
      },
      {
        id: 'js-game-loop-fix',
        title: '13. ゲームをループさせる',
        description: '時間内であれば、モグラを出し続けるようにします。',
        tech: ${techJS},
        defaultCode: 'function peep() {\\n  const hole = randomHole();\\n  hole.classList.add("up");\\n  \\n  setTimeout(() => {\\n    hole.classList.remove("up");\\n    // もし時間切れでなければ、次のモグラを出す\\n  }, 800);\\n}',
        task: 'if (!timeUp) peep(); をsetTimeoutの中に書き足して、ループさせてください。',
        explanation: '再帰呼び出しを使って、時間内は何度も出現させます。',
        hints: ['if (!timeUp) peep();'],
        validate: (code: string) => {
          if (/if\\s*\\(!timeUp\\)\\s*peep\\(\\)/.test(code)) {
            return { passed: true, feedback: 'モグラが次々と出てくるようになりました！' };
          }
          return { passed: false, feedback: 'timeUpでない時にpeep()を呼ぶようにしてください。' };
        }
      },
      {
        id: 'js-score-final',
        title: '14. 最終スコアを表示',
        description: 'ゲーム終了時にアラートでスコアを表示します。',
        tech: ${techJS},
        defaultCode: 'setTimeout(() => {\\n  timeUp = true;\\n  // ここでアラート表示\\n}, 10000);',
        task: 'alert("終了！スコアは " + score + " です"); と書いてください。',
        explanation: '省略',
        hints: ['alert("終了！スコアは " + score + " です");'],
        validate: (code: string) => {
          if (code.includes('alert') && code.includes('score')) {
            return { passed: true, feedback: '結果発表ができるようになりました！' };
          }
          return { passed: false, feedback: 'alertでスコアを表示しましょう。' };
        }
      },
      {
        id: 'js-high-score-final',
        title: '15. ハイスコアの保存（完成！）',
        description: 'ハイスコアをブラウザに保存しましょう。',
        tech: ${techJS},
        defaultCode: 'if (score > highScore) {\\n  highScore = score;\\n  // localStorageに保存\\n}',
        task: 'localStorage.setItem("highScore", score); を追加してください。',
        explanation: \`
# ついに完成！
これで、リロードしても消えないハイスコア機能付きモグラ叩きゲームの完成です。
すべての技術（HTML/CSS/JS）を組み合わせて一つの作品ができました！
        \`,
        hints: ['localStorage.setItem("highScore", score);'],
        validate: (code: string) => {
          if (code.includes('localStorage.setItem') && code.includes('highScore')) {
            return { passed: true, feedback: 'おめでとうございます！最高なゲームが完成しました！' };
          }
          return { passed: false, feedback: 'localStorageへの保存を実装しましょう。' };
        }
      }
`;

const constantsContent = fs.readFileSync('constants.ts', 'utf8');

// Extraction logic
const splitHeader = 'export const CURRICULUM: CourseModule[] = [';
const jsLogicHeader = "id: 'js-logic',";
const cssLayoutHeader = "id: 'css-layout',";
const jsUiHeader = "id: 'js-ui',";
const advancedHeader = "id: 'web-advanced',";

const headerPart = constantsContent.slice(0, constantsContent.indexOf(jsLogicHeader));
// jsLogic structure
const jsLogicFinal = \`
  {
    id: 'js-logic',
    title: 'JavaScriptで動かす',
    icon: 'js',
    color: 'bg-yellow-100 text-yellow-600',
    lessons: [\${beginnerJS}    ]
  },
\`;

// Extract middle parts exactly as they are currently
const cssLayoutStart = constantsContent.indexOf('{', constantsContent.indexOf(cssLayoutHeader) - 20);
const cssLayoutEnd = constantsContent.indexOf('},', constantsContent.indexOf(jsUiHeader) - 20) + 2;
const cssLayoutPart = constantsContent.slice(cssLayoutStart, cssLayoutEnd);

const jsUiStart = constantsContent.indexOf('{', constantsContent.indexOf(jsUiHeader) - 20);
const jsUiEnd = constantsContent.indexOf('},', constantsContent.indexOf(advancedHeader) - 20) + 2;
const jsUiPart = constantsContent.slice(jsUiStart, jsUiEnd);

const advancedFinal = \`
  {
    id: 'web-advanced',
    title: '上級 - 本格ゲーム開発',
    icon: 'gamepad',
    color: 'bg-purple-100 text-purple-600',
    lessons: [\${advancedLessons}    ]
  }
\`;

const finalFile = headerPart + jsLogicFinal + '  ' + cssLayoutPart + '\\n  ' + jsUiPart + '\\n' + advancedFinal + '\\n];\\n';

fs.writeFileSync('constants.ts', finalFile);
console.log('Constants.ts has been fully reconstructed and sanitized.');
