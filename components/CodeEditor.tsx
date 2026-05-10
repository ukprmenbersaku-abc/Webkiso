import React, { useState, useEffect, useRef } from 'react';
import { TechType } from '../types';
import { PlayIcon, SparklesIcon } from './Icons';

interface CodeEditorProps {
  initialCode: string;
  tech: TechType;
  onChange: (code: string) => void;
  onRun: () => void;
  isCorrect?: boolean | null;
}

interface SuggestionItem {
  label: string;      // 表示名 (例: <h1></h1>)
  insertText: string; // 実際に挿入されるテキスト
  cursorOffset: number; // 挿入後のカーソル位置（後ろからの文字数。例: 5なら </h1> の手前）
}

// 補完候補リスト (Snippet対応)
const SUGGESTIONS: Record<TechType, SuggestionItem[]> = {
  [TechType.HTML]: [
    { label: '!', insertText: '<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>', cursorOffset: 17 },
    { label: 'html', insertText: '<html>\n  \n</html>', cursorOffset: 8 },
    { label: 'head', insertText: '<head>\n  \n</head>', cursorOffset: 8 },
    { label: 'body', insertText: '<body>\n  \n</body>', cursorOffset: 8 },
    { label: 'h1', insertText: '<h1></h1>', cursorOffset: 5 },
    { label: 'h2', insertText: '<h2></h2>', cursorOffset: 5 },
    { label: 'h3', insertText: '<h3></h3>', cursorOffset: 5 },
    { label: 'p', insertText: '<p></p>', cursorOffset: 4 },
    { label: 'a', insertText: '<a href=""></a>', cursorOffset: 6 },
    { label: 'img', insertText: '<img src="" alt="">', cursorOffset: 9 },
    { label: 'button', insertText: '<button></button>', cursorOffset: 9 },
    { label: 'ul', insertText: '<ul>\n  <li></li>\n</ul>', cursorOffset: 11 },
    { label: 'li', insertText: '<li></li>', cursorOffset: 5 },
    { label: 'div', insertText: '<div></div>', cursorOffset: 6 },
    { label: 'span', insertText: '<span></span>', cursorOffset: 7 },
    { label: 'header', insertText: '<header></header>', cursorOffset: 9 },
    { label: 'footer', insertText: '<footer></footer>', cursorOffset: 9 },
    { label: 'main', insertText: '<main></main>', cursorOffset: 7 },
    { label: 'section', insertText: '<section></section>', cursorOffset: 10 },
    { label: '<style>', insertText: '<style>\n  \n</style>', cursorOffset: 9 },
    { label: 'script', insertText: '<script src=""></script>', cursorOffset: 11 },
    { label: 'link', insertText: '<link rel="stylesheet" href="">', cursorOffset: 2 },
    { label: 'class', insertText: 'class=""', cursorOffset: 1 },
    { label: 'id', insertText: 'id=""', cursorOffset: 1 },
    { label: 'src', insertText: 'src=""', cursorOffset: 1 },
    { label: 'style=""', insertText: 'style=""', cursorOffset: 1 },
    { label: 'href', insertText: 'href=""', cursorOffset: 1 },
  ],
  [TechType.CSS]: [
    { label: 'color', insertText: 'color: ;', cursorOffset: 1 },
    { label: 'background', insertText: 'background: ;', cursorOffset: 1 },
    { label: 'background-color', insertText: 'background-color: ;', cursorOffset: 1 },
    { label: 'font-size', insertText: 'font-size: px;', cursorOffset: 3 },
    { label: 'font-weight', insertText: 'font-weight: ;', cursorOffset: 1 },
    { label: 'font-family', insertText: 'font-family: ;', cursorOffset: 1 },
    { label: 'width', insertText: 'width: px;', cursorOffset: 3 },
    { label: 'height', insertText: 'height: px;', cursorOffset: 3 },
    { label: 'padding', insertText: 'padding: px;', cursorOffset: 3 },
    { label: 'padding-top', insertText: 'padding-top: px;', cursorOffset: 3 },
    { label: 'padding-bottom', insertText: 'padding-bottom: px;', cursorOffset: 3 },
    { label: 'margin', insertText: 'margin: px;', cursorOffset: 3 },
    { label: 'margin-top', insertText: 'margin-top: px;', cursorOffset: 3 },
    { label: 'margin-bottom', insertText: 'margin-bottom: px;', cursorOffset: 3 },
    { label: 'border', insertText: 'border: 1px solid black;', cursorOffset: 0 },
    { label: 'border-radius', insertText: 'border-radius: px;', cursorOffset: 3 },
    { label: 'text-align', insertText: 'text-align: center;', cursorOffset: 0 },
    { label: 'text-decoration', insertText: 'text-decoration: none;', cursorOffset: 0 },
    { label: 'display', insertText: 'display: flex;', cursorOffset: 0 },
    { label: 'flex-direction', insertText: 'flex-direction: column;', cursorOffset: 0 },
    { label: 'justify-content', insertText: 'justify-content: center;', cursorOffset: 0 },
    { label: 'align-items', insertText: 'align-items: center;', cursorOffset: 0 },
    { label: 'gap', insertText: 'gap: px;', cursorOffset: 3 },
    { label: 'position', insertText: 'position: relative;', cursorOffset: 0 },
    { label: 'top', insertText: 'top: px;', cursorOffset: 3 },
    { label: 'left', insertText: 'left: px;', cursorOffset: 3 },
    { label: 'z-index', insertText: 'z-index: ;', cursorOffset: 1 },
    { label: 'box-shadow', insertText: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);', cursorOffset: 0 },
    { label: 'transition', insertText: 'transition: all 0.3s ease;', cursorOffset: 0 },
  ],
  [TechType.JS]: [
    { label: 'alert', insertText: 'alert("");', cursorOffset: 3 },
    { label: 'console.log', insertText: 'console.log("");', cursorOffset: 3 },
    { label: 'getElementById', insertText: 'document.getElementById("")', cursorOffset: 2 },
    { label: 'querySelector', insertText: 'document.querySelector("")', cursorOffset: 2 },
    { label: 'querySelectorAll', insertText: 'document.querySelectorAll("")', cursorOffset: 2 },
    { label: 'addEventListener', insertText: 'addEventListener("click", (event) => {\n  \n});', cursorOffset: 4 },
    { label: 'const', insertText: 'const  = ', cursorOffset: 3 },
    { label: 'let', insertText: 'let  = ', cursorOffset: 3 },
    { label: 'function', insertText: 'function name() {\n  \n}', cursorOffset: 2 },
    { label: 'if', insertText: 'if () {\n  \n}', cursorOffset: 2 },
    { label: 'else', insertText: 'else {\n  \n}', cursorOffset: 2 },
    { label: 'for', insertText: 'for (let i = 0; i < .length; i++) {\n  \n}', cursorOffset: 21 },
    { label: 'forEach', insertText: 'forEach((item) => {\n  \n})', cursorOffset: 3 },
    { label: 'map', insertText: 'map((item) => {\n  return ;\n})', cursorOffset: 5 },
    { label: 'filter', insertText: 'filter((item) => {\n  return ;\n})', cursorOffset: 5 },
    { label: 'return', insertText: 'return ;', cursorOffset: 1 },
    { label: 'Math.random', insertText: 'Math.random()', cursorOffset: 0 },
    { label: 'Math.floor', insertText: 'Math.floor()', cursorOffset: 1 },
    { label: 'setInterval', insertText: 'setInterval(() => {\n  \n}, 1000);', cursorOffset: 11 },
    { label: 'setTimeout', insertText: 'setTimeout(() => {\n  \n}, 1000);', cursorOffset: 11 },
    { label: 'length', insertText: 'length', cursorOffset: 0 },
    { label: 'innerHTML', insertText: 'innerHTML = "";', cursorOffset: 2 },
    { label: 'textContent', insertText: 'textContent = "";', cursorOffset: 2 },
    { label: 'style', insertText: 'style. = "";', cursorOffset: 6 },
  ]
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, tech, onChange, onRun, isCorrect }) => {
  const [code, setCode] = useState(initialCode);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
    handleAutocomplete(newCode, e.target.selectionStart);
    setFocusedIndex(0); // リセット
  };

  const handleAutocomplete = (currentCode: string, cursorPosition: number) => {
    const textBeforeCursor = currentCode.slice(0, cursorPosition);
    // 直前の「単語」になりうる文字列を取得（英数字、記号の一部）
    const match = textBeforeCursor.match(/([a-zA-Z0-9_</>-]+)$/);
    
    if (!match) {
      setSuggestions([]);
      return;
    }

    const lastWord = match[1];
    
    // 最低1文字以上で補完開始
    if (lastWord.length < 1) {
      setSuggestions([]);
      return;
    }

    const candidates = SUGGESTIONS[tech] || [];
    const matches = candidates.filter(candidate => {
      const lowerLabel = candidate.label.toLowerCase();
      const lowerInput = lastWord.toLowerCase();
      
      // 完全一致（入力済み）の場合は候補から外す（ただし閉じタグ等は別）
      // ここでは簡易的に、入力とinsertTextが全く同じなら除外
      if (candidate.insertText === lastWord) return false;

      // HTMLの場合の特殊対応:
      // 入力 "<h" -> 候補 "h1" をヒットさせる
      if (tech === TechType.HTML) {
        const searchInput = lowerInput.startsWith('<') ? lowerInput.slice(1) : lowerInput;
        const strippedLabel = lowerLabel.replace(/^</, '');
        return strippedLabel.startsWith(searchInput) || lowerLabel.startsWith(searchInput);
      }

      return lowerLabel.startsWith(lowerInput);
    });

    setSuggestions(matches.slice(0, 5));
  };

  const applySuggestion = (suggestion: SuggestionItem) => {
    if (!textareaRef.current) return;
    
    const cursorPosition = textareaRef.current.selectionStart;
    const textBeforeCursor = code.slice(0, cursorPosition);
    const textAfterCursor = code.slice(cursorPosition);
    
    // 入力中の単語を特定して置換
    const match = textBeforeCursor.match(/([a-zA-Z0-9_</>-]+)$/);
    const lastWord = match ? match[1] : '';
    
    const prefix = textBeforeCursor.slice(0, -lastWord.length);
    
    // 現在の行のインデントを取得して、スニペットの各行に適用する
    const linesBefore = prefix.split('\n');
    const currentLinePrefix = linesBefore[linesBefore.length - 1];
    const indentationMatch = currentLinePrefix.match(/^\s*/);
    const indentation = indentationMatch ? indentationMatch[0] : "";

    // スニペット内の改行に現在の行のインデントを適用
    const indentedInsertText = suggestion.insertText.split('\n').map((line, i) => {
      if (i === 0) return line;
      return indentation + line;
    }).join('\n');
    
    const newCode = prefix + indentedInsertText + textAfterCursor;
    
    setCode(newCode);
    onChange(newCode);
    setSuggestions([]);
    
    // カーソル位置調整
    setTimeout(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            // カーソル位置計算: (入力前の先頭 + 挿入テキスト長) - オフセット
            const newCursorPos = prefix.length + indentedInsertText.length - suggestion.cursorOffset;
            textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (suggestions.length > 0) {
      if (e.key === 'Enter') {
        // Enterキーで確定。デフォルトの改行を防ぐ
        e.preventDefault();
        applySuggestion(suggestions[focusedIndex]);
        return;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % suggestions.length);
        return;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
        return;
      } else if (e.key === 'Escape') {
        setSuggestions([]);
        return;
      } else if (e.key === 'Tab') {
          // 候補がある時のTabも確定にする
          e.preventDefault();
          applySuggestion(suggestions[focusedIndex]);
          return;
      }
    }

    // Tabキーでインデント（スペース2つ）を挿入
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      const newValue = value.substring(0, start) + "  " + value.substring(end);
      setCode(newValue);
      onChange(newValue);
      
      // カーソル位置を更新
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
      return;
    }

    // 括弧や引用符の自動補完
    const autoCloseMap: Record<string, string> = {
      '(': ')',
      '[': ']',
      '{': '}',
      '"': '"',
      "'": "'",
    };

    if (autoCloseMap[e.key]) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      const closingChar = autoCloseMap[e.key];
      
      const newValue = value.substring(0, start) + e.key + closingChar + value.substring(end);
      setCode(newValue);
      onChange(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      }, 0);
      return;
    }

    // 閉じ括弧などが既にある場合は上書き（カーソル移動のみ）
    const closingChars = [')', ']', '}', '"', "'"];
    if (closingChars.includes(e.key)) {
      const start = e.currentTarget.selectionStart;
      const value = e.currentTarget.value;
      if (value[start] === e.key) {
        e.preventDefault();
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
        return;
      }
    }

    // Backspaceで自動補完されたペアを一緒に消す
    if (e.key === 'Backspace') {
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      if (start === end && start > 0) {
        const charBefore = value[start - 1];
        const charAfter = value[start];
        if (autoCloseMap[charBefore] === charAfter) {
          e.preventDefault();
          const newValue = value.substring(0, start - 1) + value.substring(start + 1);
          setCode(newValue);
          onChange(newValue);
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start - 1;
            }
          }, 0);
          return;
        }
      }
    }

    // Enterキーで自動インデント
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const value = e.currentTarget.value;
      
      // 現在の行のインデントを取得
      const linesBefore = value.substring(0, start).split('\n');
      const currentLine = linesBefore[linesBefore.length - 1];
      const indentationMatch = currentLine.match(/^\s*/);
      const indentation = indentationMatch ? indentationMatch[0] : "";
      
      const charBefore = value[start - 1];
      const charAfter = value[start];

      // タグの間 (><) や 中括弧の間 ({}) で改行した場合の特殊処理
      const isBetweenTags = tech === TechType.HTML && charBefore === '>' && charAfter === '<';
      const isBetweenBraces = charBefore === '{' && charAfter === '}';

      if (isBetweenTags || isBetweenBraces) {
        const extraIndent = "  ";
        const newValue = value.substring(0, start) + "\n" + indentation + extraIndent + "\n" + indentation + value.substring(start);
        setCode(newValue);
        onChange(newValue);
        
        setTimeout(() => {
          if (textareaRef.current) {
            const newPos = start + 1 + indentation.length + extraIndent.length;
            textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newPos;
          }
        }, 0);
        return;
      }

      // 通常の自動インデント
      let extraIndent = "";
      const trimmedLine = currentLine.trim();
      const lastChar = trimmedLine.slice(-1);
      
      if (lastChar === '{' || (tech === TechType.HTML && lastChar === '>' && !trimmedLine.startsWith('</'))) {
        extraIndent = "  ";
      }

      const newValue = value.substring(0, start) + "\n" + indentation + extraIndent + value.substring(start);
      setCode(newValue);
      onChange(newValue);
      
      // カーソル位置を改行後のインデント位置に合わせる
      setTimeout(() => {
        if (textareaRef.current) {
          const newPos = start + 1 + indentation.length + extraIndent.length;
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newPos;
        }
      }, 0);
      return;
    }
  };

  const getLanguageColor = () => {
    switch (tech) {
      case TechType.HTML: return 'text-orange-500';
      case TechType.CSS: return 'text-blue-500';
      case TechType.JS: return 'text-yellow-500';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 relative">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className={`ml-3 font-mono text-sm font-bold ${getLanguageColor()}`}>
            {tech === TechType.JS ? 'main.js' : tech === TechType.CSS ? 'style.css' : 'index.html'}
          </span>
        </div>
        {isCorrect === true && (
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-900/30 rounded-full animate-pulse">
            <SparklesIcon className="w-3 h-3" /> クリア！
          </span>
        )}
      </div>
      
      <div className="flex-1 relative group">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-4 bg-slate-900 text-slate-100 font-mono text-sm resize-none focus:outline-none leading-relaxed selection:bg-indigo-500/30"
          spellCheck={false}
          placeholder="ここにコードを書いてね..."
        />
        
        {/* Autocomplete Suggestions Overlay */}
        {suggestions.length > 0 && (
            <div className="absolute bottom-4 left-4 flex gap-2 z-10 animate-fade-in-up">
                <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-1 text-xs text-slate-400 flex flex-col gap-1 min-w-[160px]">
                    <div className="flex items-center justify-between px-2 py-1 border-b border-slate-700">
                      <span className="font-bold text-[10px] uppercase text-indigo-400">Suggestions</span>
                      <span className="text-[10px] bg-slate-700 px-1 rounded text-slate-300">Enter</span>
                    </div>
                    {suggestions.map((s, idx) => (
                        <button 
                            key={idx}
                            onClick={() => applySuggestion(s)}
                            onMouseEnter={() => setFocusedIndex(idx)}
                            className={`text-left px-2 py-1.5 rounded text-slate-200 font-mono transition-colors flex items-center justify-between group/item w-full
                              ${idx === focusedIndex ? 'bg-indigo-600 text-white' : 'hover:bg-slate-700'}`}
                        >
                            <span>{s.label}</span>
                            {idx === focusedIndex && <span className="text-[10px] opacity-70">⏎</span>}
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>
      
      <div className="p-2 bg-slate-800 border-t border-slate-700 flex justify-end">
        <button
          onClick={onRun}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm transition-colors shadow-lg hover:shadow-indigo-500/20 active:translate-y-0.5"
        >
          <PlayIcon className="w-4 h-4" />
          実行してチェック
        </button>
      </div>
    </div>
  );
};
