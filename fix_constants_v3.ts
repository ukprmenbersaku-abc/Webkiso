import fs from 'fs';

const c = fs.readFileSync('constants.ts', 'utf8');

// Use placeholder for backticks
const BT = String.fromCharCode(96);

const beginnerJS = `
      {
        id: 'alert-hello',
        title: 'ポップアップを表示',
        description: '画面にメッセージを表示させる alert() 関数を使ってみましょう。',
        tech: TechType.JS,
        defaultCode: '// ここにJavaScriptを書くよ\\n',
        task: 'alert("Hello!"); と書いて、実行ボタンを押してみてください。',
        explanation: \${BT}
# アラート alert()

いよいよプログラミングです！
HTML/CSSは「表示」を作りましたが、JavaScriptは「動き」や「計算」を作ります。

まずは一番簡単な \\\${BT}alert()\\\${BT}（アラート）を使ってみましょう。
ブラウザから「警告！」のようなポップアップウィンドウを表示させる命令（関数）です。

## 書き方
\\\${BT}\\\${BT}\\\${BT}javascript
alert("表示したい文字");
\\\${BT}\\\${BT}\\\${BT}

文字はダブルクォーテーション \\\${BT}"\\\${BT} か シングルクォーテーション \\\${BT}'\\\${BT} で囲むのがルールです（**文字列**といいます）。
最後にセミコロン \\\${BT};\\\${BT} をつけて「命令終わり！」と伝えます。
        \${BT},
        hints: [
          'すべて半角で入力します（文字の中身は日本語でもOK）。',
          'カッコ () の中に "Hello!" を入れます。',
          'alert のスペルを確認しましょう。'
        ],
        validate: (code: string) => {
          if (/alert\\s*\\(\\s*["']Hello!["']\\s*\\)/.test(code)) {
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
        defaultCode: '// 変数を使ってみよう\\n',
        task: 'const greeting = "こんにちは"; と書いて、変数を作ってください。',
        explanation: \${BT}
# 変数（へんすう） const

プログラミングでは、データを入れておく「箱」のことを変数と呼びます。
箱に名前をつけておけば、後で何度でもその名前を使って中身を取り出せます。

JavaScriptでは、変化しない値（定数）を入れる箱を作るのに \\\${BT}const\\\${BT}（コンスト）を使います。

## 書き方
\\\${BT}\\\${BT}\\\${BT}javascript
const 箱の名前 = "中身";
\\\${BT}\\\${BT}\\\${BT}

数学と違って、ここでの \\\${BT}=\\\${BT} は「等しい」という意味ではなく、**「右のものを左の箱に入れる（代入）」** という意味です！

## 例
\\\${BT}\\\${BT}\\\${BT}javascript
const name = "タナカ";
\\\${BT}\\\${BT}\\\${BT}
これで \\\${BT}name\\\${BT} という箱に "タナカ" が保存されました。
        \${BT},
        hints: [
          'const greeting = "こんにちは"; とそのまま書いてみましょう。',
          'イコール（=）の前後にスペースを入れてもOKです。'
        ],
        validate: (code: string) => {
          if (code.includes('const') && code.includes('greeting') && /["']こんにちは["']/.test(code)) {
            return { passed: true, feedback: '正解です！これで挨拶を「箱」の中に保存できました。' };
          }
          return { passed: false, feedback: 'const greeting = "こんにちは"; と書いてみましょう。' };
        }
      },
      {
        id: 'js-operators-math',
        title: '計算してみる',
        description: 'JavaScriptで足し算や引き算などの計算を行いましょう。',
        tech: TechType.JS,
        defaultCode: 'const x = 10;\\nconst y = 5;\\n// ここで計算して結果を alert() してください\\n',
        task: 'alert(x + y); と書いて、計算結果を表示させてください。',
        explanation: \${BT}
# 計算（演算子）
JavaScriptは「計算」が大得意です。
\\\${BT}+\\\${BT}（足し算）、\\\${BT}-\\\${BT}（引き算）、\\\${BT}*\\\${BT}（掛け算）、\\\${BT}/\\\${BT}（割り算）が使えます。

数値を扱うときは、引用符 \\\${BT}"\\\${BT} で囲まないように注意しましょう。
囲むと「文字」として扱われてしまいます。
        \${BT},
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
        tech: TechType.JS,
        defaultCode: 'const score = 100;\\n// もしスコアが100なら "おめでとう" と alert してください\\n',
        task: 'if (score === 100) { alert("おめでとう"); } と書いてください。',
        explanation: \${BT}
# 条件分岐 if
「もし〜なら、これを実行する」という処理を作るには \\\${BT}if\\\${BT} 文を使います。

## 書き方
\\\${BT}\\\${BT}\\\${BT}javascript
if (条件) {
  // 条件が正しい時に実行される
}
\\\${BT}\\\${BT}\\\${BT}

等しいかどうかを比べるには \\\${BT}===\\\${BT}（イコール3つ）を使います。
        \${BT},
        hints: [
          'if (score === 100) { alert("おめでとう"); } と書きます。',
          'if のカッコ () と波カッコ { } の位置に注意しましょう。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, '');
          if (/if\\(score===100\\)\\{alert\\(["']おめでとう["']\\);?\\}/.test(clean)) {
            return { passed: true, feedback: '条件判定ができました！これで「特定の時だけ動く」プログラムが作れます。' };
          }
          return { passed: false, feedback: 'if (score === 100) { alert("おめでとう"); } と書いてみましょう。' };
        }
      },
      {
        id: 'js-dom-text',
        title: '文字を書き換える',
        description: 'JavaScriptを使ってHTMLの内容を書き換えます。',
        tech: TechType.JS,
        defaultCode: '// HTMLに <h1 id="title">タイトル</h1> があるとします\\n\\nconst h1 = document.getElementById("title");\\n',
        task: 'h1の文字（innerText）を「変更しました！」に書き換えてください。',
        explanation: \${BT}
# HTMLを操る DOM操作

JavaScriptの醍醐味は、HTMLを後から自由自在に書き換えられることです。
これを **DOM（ドム）操作** といいます。

あらかじめHTMLのタグを \\\${BT}getElementById\\\${BT}（IDで要素を取得）で取得して変数に入れておき、その変数を操作します。
中身のテキストを書き換えるには \\\${BT}innerText\\\${BT}（インナーテキスト）プロパティを使います。

## 書き方
\\\${BT}\\\${BT}\\\${BT}javascript
要素.innerText = "新しい文字";
\\\${BT}\\\${BT}\\\${BT}

## 例
\\\${BT}\\\${BT}\\\${BT}javascript
// h1の中身を書き換える
h1.innerText = "ようこそ！";
\\\${BT}\\\${BT}\\\${BT}
これを実行した瞬間に、画面の文字が変わります。
        \${BT},
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
          if (!/["']変更しました！["']/.test(code)) {
             return { passed: false, feedback: '変更後の文字は「変更しました！」にしましょう。' };
          }

          if (/h1\\.innerText\\s*=\\s*["']変更しました！["'];?/.test(code) || /h1\\.textContent\\s*=\\s*["']変更しました！["'];?/.test(code)) {
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
        defaultCode: '// ここに関数を作る\\n',
        task: 'sayHello という名前の関数を作り、中で alert("Hello"); を実行するようにしてください。',
        explanation: \${BT}
# 関数 function (ファンクション)

長いプログラムを書いていると、同じ処理を何度も使いたい時があります。
そんな時、処理をひとまとめにして名前をつけ、いつでも呼び出せるようにしたものを「関数」といいます。
自分だけのオリジナルの呪文を作るようなものです。

## 書き方
\\\${BT}\\\${BT}\\\${BT}javascript
function 名前() {
  // やりたい処理
}
\\\${BT}\\\${BT}\\\${BT}

作った関数は、あとで \\\${BT}名前()\\\${BT} と書くだけで実行できます。
        \${BT},
        hints: [
          'function sayHello() { ... } という形です。',
          '{ } の中に alert("Hello"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, ' ');
          if (/function\\s+sayHello\\s*\\(\\s*\\)\\s*\\{/.test(clean) && /alert\\s*\\(\\s*["']Hello["']\\s*\\)/.test(clean)) {
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
        defaultCode: '// HTMLに <button id="btn">押して</button> があるとします\\nconst btn = document.getElementById("btn");\\n\\n// ここにイベントリスナーを追加\\n',
        task: 'btnがクリックされたら、console.log("Clicked!"); するように addEventListener を使ってください。',
        explanation: \${BT}
# イベントリスナー addEventListener

Webサイトはユーザーとの対話です。
「クリックされたら」「キーが押されたら」「マウスが乗ったら」といったタイミングを検知して、関数を実行する仕組みがイベントリスナーです。

「耳を澄ませて（Listen）、イベントを待つ」という意味です。
        \${BT},
        hints: [
          'btn.addEventListener("click", function() { ... }); と書きます。',
          '{ } の中に console.log("Clicked!"); を入れます。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s+/g, ' ');
          const hasListener = /btn\\.addEventListener\\s*\\(\\s*["']click["']\\s*,\\s*(function\\s*\\(\\s*\\)\\s*\\{|\\(\\s*\\)\\s*=>\\s*\\{)/.test(clean);
          const hasLog = /console\\.log\\s*\\(\\s*["']Clicked!["']\\s*\\)/.test(clean);
          
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
        tech: TechType.JS,
        defaultCode: '// HTML: <div id="box" class="box"></div>\\nconst box = document.getElementById("box");\\n\\n// ここにコードを書く\\n',
        task: 'box.classList.add("active"); を使って、boxにactiveクラスを追加してください。',
        explanation: \${BT}
# クラスの追加・削除 classList

JavaScriptを使えば、「クリックしたら赤くする」「もう一度クリックしたら元に戻す」といった操作ができます。
を実現する一番賢い方法は、CSSで \\\${BT}.active\\\${BT} のようなクラスを作っておき、JSでそのクラスを **つけ外し** することです。

## クラス操作の呪文
- 追加: \\\${BT}要素.classList.add("クラス名")\\\${BT}
- 削除: \\\${BT}要素.classList.remove("クラス名")\\\${BT}
- 切り替え: \\\${BT}要素.classList.toggle("クラス名")\\\${BT}
        \${BT},
        hints: [
          'box.classList.add("active"); と書きます。',
          'classList (クラスリスト) の L は大文字です。'
        ],
        validate: (code: string) => {
           if (/box\\.classList\\.add\\s*\\(\\s*["']active["']\\s*\\)/.test(code)) {
             return { passed: true, feedback: 'クラスを追加できました！Web制作の楽しさがだんだん分かってきましたか？' };
           }
           return { passed: false, feedback: 'box.classList.add("active"); と書いてみましょう。' };
        }
      }
`;

const jsLogicStart = c.indexOf("id: 'js-logic'");
const jsLogicLessonsStart = c.indexOf('lessons: [', jsLogicStart) + 10;
const jsLogicLessonsEnd = c.lastIndexOf(']', c.indexOf("id: 'css-layout'")) + 1;

let newContent = c.slice(0, jsLogicLessonsStart) + beginnerJS + c.slice(jsLogicLessonsEnd);

// Fix total balance at the end
const lastClose = newContent.lastIndexOf('];');
if (lastClose !== -1) {
    newContent = newContent.slice(0, lastClose) + '];\\n';
}

fs.writeFileSync('constants.ts', newContent);
console.log('Restored js-logic.');
