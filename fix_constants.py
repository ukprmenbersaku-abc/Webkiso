import os

file_path = 'constants.ts'
with open(file_path, 'rb') as f:
    content = f.read()

# Fix 1: line 1216
# Search for the start of game-layout-grid
marker1 = b"id: 'game-layout-grid'"
pos1 = content.find(marker1)
if pos1 != -1:
    prev_marker1 = b"'const greeting ="
    prev_pos1 = content.rfind(prev_marker1, 0, pos1)
    if prev_pos1 != -1:
        nl_pos1 = content.find(b"\n", prev_pos1)
        if nl_pos1 != -1:
            brace_pos1 = content.rfind(b"{", 0, pos1)
            fix1 = b'          \'イコール（=）の前後にスペースを入れてもOKです。\'\n        ],\n        validate: (code: string) => {\n          if (code.includes(\'const\') && code.includes(\'greeting\') && /["\']こんにちは["\']/.test(code)) {\n            return { passed: true, feedback: \'正解です！\' };\n          }\n          return { passed: false, feedback: \'const greeting = "こんにちは"; と書いてみましょう。\' };\n        }\n      },\n      '
            content = content[:nl_pos1+1] + fix1 + content[brace_pos1:]

# Fix 2: Around line 1562 (now shifted due to fix1)
# Search for '変更しました！' task
marker2 = b"task: 'h1\xe3\x81\xae\xe6\x96\x87\xe5\xad\x97\xef\xbc\x88innerText\xef\xbc\x89\xe3\x82\x92\xe3\x80\x8c\xe5\xa4\x89\xe6\x9b\x8a\xe3\x81\x97\xe3\x81\xbe\xe3\x81\x97\xe3\x81\x9f\xef\xbc\x81\xe3\x80\x8d\xe3\x81\xab\xe6\x9b\xb8\xe3\x81\x8d\xe6\x8f\x9b\xe3\x81\x88\xe3\x81\x96\xe3\x81\x8f\xe3\x81\xa0\xe3\x81\x95\xe3\x81\x84\xe3\x80\x82'"
# "h1の文字（innerText）を「変更しました！」に書き換えてください。" in bytes
marker2 = "h1の文字（innerText）を「変更しました！」に書き換えてください。".encode('utf-8')
pos2 = content.find(marker2)
if pos2 != -1:
    # previous lesson ends and current lesson begins
    # 1561:       }イトル</h1>...
    # Look for the start of the explanation field or the '{' of the lesson
    lesson_start2 = content.rfind(b"{", 0, pos2)
    # We want to fix the explanation part
    explanation_marker2 = b"explanation: `"
    exp_pos2 = content.rfind(explanation_marker2, 0, pos2)
    if exp_pos2 != -1:
        # Replace the broken start of the explanation
        fix2_text = """
# HTMLを操る DOM操作

JavaScriptの醍醐味は、HTMLを後から自由自在に書き換えられることです。
これを **DOM（ドム）操作** といいます。

あらかじめHTMLのタグを `getElementById`（IDで要素を取得）で取得して変数に入れておき、その変数を操作します。
中身のテキストを書き換えるには `innerText`（インナーテキスト）プロパティを使います。

## 書き方
```javascript
要素.innerText = "新しい文字";
```

## 例
```javascript
// h1の中身を書き換える
h1.innerText = "ようこそ！";
```

たとえば、画面に `<h1>タイトル</h1>` があるとします。
""".strip()
        fix2 = b"explanation: `\n" + fix2_text.encode('utf-8') + b"\n"
        # We need to find where the bad bytes are. They are between exp_pos2 and marker2
        content = content[:exp_pos2] + fix2 + content[pos2:]

with open(file_path, 'wb') as f:
    f.write(content)
