import fs from 'fs';

// Constants for tags to avoid template literal issues
const BT = '`';
const BT3 = '```';

const content = `import { CourseModule, TechType } from './types';

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
        defaultCode: '<!-- ここにコードを書いてね -->\\n',
        task: '<h1>タグを使って、「こんにちは！」と表示させてみましょう。',
        explanation: \`
# 見出しタグ <h1> について

Webページを作る旅は、このタグから始まります。
\\\${BT}<h1>\\\${BT} は、ページの中で **一番重要な見出し** を表すタグです。新聞で言えば「一面のトップ記事のタイトル」のようなものです。

HTMLでは、このように \\\${BT}<タグ名>\\\${BT}（開始タグ）と \\\${BT}</タグ名>\\\${BT}（終了タグ）で文字を挟んで意味を持たせます。

## 書き方の例
\\\${BT3}html
<h1>今日の日記</h1>
\\\${BT3}

実は見出しには \\\${BT}<h1>\\\${BT} から \\\${BT}<h6>\\\${BT} まで6段階の大きさがありますが、まずは王様の \\\${BT}<h1>\\\${BT} を使いこなしましょう！
        \`,
        hints: [
          '<h1> と </h1> で囲むのを忘れていませんか？',
          '文字は「こんにちは！」と正確に入力しましょう。',
          '全て半角英数字でタグを書きます（文字は日本語でOK）。'
        ],
        validate: (code: string) => {
          const cleanCode = code.replace(/\\s+/g, ' ').trim();
          if (/[＜＞]/.test(code)) {
            return { passed: false, feedback: 'タグの記号 < や > が全角（＜＞）になっています。半角英文字で入力しましょう。' };
          }
          if (code.includes('H1')) {
            return { passed: false, feedback: 'タグは小文字 <h1> で書くのが一般的です。小文字に直してみましょう。' };
          }
          if (!cleanCode.includes('<h1>')) {
            return { passed: false, feedback: '開始タグ <h1> が見つかりません。' };
          }
          if (!cleanCode.includes('</h1>')) {
            return { passed: false, feedback: '終了タグ </h1> が見つかりません。タグは最後を </h1> で閉じます。' };
          }
          if (cleanCode.includes('こんにちは') && !cleanCode.includes('こんにちは！')) {
            return { passed: false, feedback: '「！」（びっくりマーク）を忘れていませんか？正確に入力しましょう。' };
          }
          if (/<h1>\\s*こんにちは！\\s*<\\/h1>/.test(cleanCode)) {
            return { passed: true, feedback: '完璧です！Web開発の第一歩を踏み出しましたね。' };
          }
          return { passed: false, feedback: 'タグの中身が「こんにちは！」と正確に一致しているか確認してください。' };
        }
      },
      {
        id: 'p-text',
        title: '文章を書いてみよう',
        description: '段落を作るには <p> タグを使います。',
        tech: TechType.HTML,
        defaultCode: '<h1>私の自己紹介</h1>\\n',
        task: '<p>タグを使って、好きな食べ物を書いてみましょう。（例: <p>りんごが好き</p>）',
        explanation: \`
# 段落タグ <p> について

見出しの下に普通の文章を書きたいときは、Paragraph（パラグラフ＝段落）の略である \\\${BT}<p>\\\${BT} タグを使います。

初心者のうちは改行するために適当なタグを使ってしまいがちですが、文章のまとまりごとに \\\${BT}<p>\\\${BT} で囲むのが正しい書き方です。

## 書き方の例
\\\${BT3}html
<p>私は猫が好きです。</p>
<p>犬も好きです。</p>
\\\${BT3}

このように書くと、ブラウザが自動的に少し隙間を空けて、読みやすく表示してくれます。
        \`,
        hints: [
          '<p>タグを追加していますか？',
          '<h1>タグは消さずに、その下に追加してみましょう。',
          '文章の内容は何でもOKです！'
        ],
        validate: (code: string) => {
          if (/[＜＞]/.test(code)) {
            return { passed: false, feedback: '全角の記号（＜＞）が使われています。半角の < > を使いましょう。' };
          }
          if (!/<p>/.test(code)) {
            return { passed: false, feedback: '開始タグ <p> が見つかりません。' };
          }
          if (!/<\\/p>/.test(code)) {
            return { passed: false, feedback: '終了タグ </p> が見つかりません。' };
          }
          if (!/<h1>.*<\\/h1>/s.test(code)) {
            return { passed: false, feedback: '元の <h1> タグを消してしまったようです。復活させてみましょう。' };
          }
          if (/<p>.*<\\/p>/.test(code)) {
            return { passed: true, feedback: 'いいですね。文章（段落）が追加されました！これでページの内容がどんどん充実していきます。' };
          }
          return { passed: false, feedback: '<p>自分の好きなもの</p> のように書いてみましょう。' };
        }
      }
    ]
  },
  {
    id: 'css-basics',
    title: 'CSSで色を塗ろう',
    icon: 'palette',
    color: 'bg-blue-100 text-blue-600',
    lessons: [
      {
        id: 'css-color',
        title: '文字の色を変える',
        description: 'CSSを使って、文字を好きな色に変えてみましょう。',
        tech: TechType.CSS,
        defaultCode: 'h1 {\\n  /* ここにスタイルを書く */\\n}',
        task: 'h1の色（color）を "red"（赤）に設定してください。',
        explanation: \`
# CSS（シーエスエス）の基本

HTMLが「骨組み」だとしたら、CSSは「化粧」や「服」です。
見た目を整えるための言語です。

## 書き方のルール
\\\${BT3}css
セレクタ {
  プロパティ: 値;
}
\\\${BT3}

- **セレクタ**: どのタグを変えるか（例: \\\${BT}h1\\\${BT}）
- **プロパティ**: 何を変えるか（例: \\\${BT}color\\\${BT}）
- **値**: どう変えるか（例: \\\${BT}red\\\${BT}）

最後にセミコロン \\\${BT};\\\${BT} をつけるのを忘れずに！
        \`,
        hints: [
          'color: red; と書きます。',
          'コロン : とセミコロン ; を間違えないように注意！',
          'すべて半角で入力します。'
        ],
        validate: (code: string) => {
          const clean = code.replace(/\\s/g, '');
          if (clean.includes('color:red;')) {
            return { passed: true, feedback: 'すごい！タイトルが赤くなりましたね。これで見た目を自由に操れるようになります。' };
          }
          if (clean.includes('color=red')) {
            return { passed: false, feedback: 'CSSでは = ではなく : （コロン）を使います。' };
          }
          return { passed: false, feedback: 'h1 { color: red; } と書いてみましょう。' };
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
        defaultCode: '// ここにJavaScriptを書くよ\\n',
        task: 'alert("Hello!"); と書いて、実行ボタンを押してみてください。',
        explanation: \`
# アラート alert()

JavaScriptは「動き」や「計算」を作ります。
ポップアップウィンドウを表示させる命令（関数） \\\${BT}alert()\\\${BT} を使ってみましょう。
        \`,
        hints: ['alert("Hello!"); と書きます。'],
        validate: (code: string) => {
          if (/alert\\s*\\(\\s*["\\']Hello!["\\']\\s*\\)/.test(code)) {
            return { passed: true, feedback: 'ポップアップが出ましたね！' };
          }
          return { passed: false, feedback: 'alert("Hello!"); と書いてみましょう。' };
        }
      }
    ]
  },
  {
    id: 'css-layout',
    title: 'CSSレイアウト・中級',
    icon: 'layers',
    color: 'bg-indigo-100 text-indigo-600',
    lessons: [
      {
        id: 'flex-card',
        title: 'カードレイアウト',
        description: '画像と文字がセットになった「カード」を作ります。',
        tech: TechType.CSS,
        defaultCode: '.card {\\n  display: flex;\\n  /* ここに追加 */\\n}',
        task: 'flex-direction: column; を追加してください。',
        explanation: '省略',
        hints: ['flex-direction: column;'],
        validate: (code: string) => code.includes('column') ? {passed:true, feedback:'OK'} : {passed:false, feedback:'NG'}
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
        description: 'クラスをトグルさせます。',
        tech: TechType.JS,
        defaultCode: 'menu.classList.toggle("open");',
        task: '実行してください。',
        explanation: '省略',
        hints: ['実行ボタンを押すだけ！'],
        validate: (code: string) => ({passed:true, feedback:'OK'})
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
        defaultCode: '.game-board {\\n  display: grid;\\n  grid-template-columns: repeat(3, 1fr);\\n}',
        task: '実行してください。',
        explanation: '省略',
        hints: ['そのまま実行！'],
        validate: (code: string) => ({passed:true, feedback:'OK'})
      }
    ]
  }
];
\`;

fs.writeFileSync('constants.ts', content);
console.log('Sanitized constants.ts created.');
