import React, { useMemo } from 'react';
import { TechType } from '../types';

interface PreviewProps {
  code: string;
  tech?: TechType; // プレイグラウンドモードでは省略可能
  // プレイグラウンド用（全コード結合用）
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
}

export const Preview: React.FC<PreviewProps> = ({ code, tech, htmlCode, cssCode, jsCode }) => {
  
  const srcDoc = useMemo(() => {
    // 1. プレイグラウンドモード (htmlCodeなどが渡された場合)
    if (htmlCode !== undefined || cssCode !== undefined || jsCode !== undefined) {
      const safeHtml = htmlCode || '';
      const safeCss = cssCode || '';
      const safeJs = jsCode || '';

      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', sans-serif; padding: 1rem; color: #333; line-height: 1.6; }
              /* ユーザーCSS */
              ${safeCss}
            </style>
          </head>
          <body>
            ${safeHtml}
            <script>
              // エラーハンドリング
              window.onerror = function(msg, url, line) {
                 const err = document.createElement('div');
                 err.style.color = 'red';
                 err.style.background = '#fee';
                 err.style.padding = '4px';
                 err.style.marginTop = '4px';
                 err.style.borderRadius = '4px';
                 err.style.fontFamily = 'monospace';
                 err.textContent = 'Error: ' + msg;
                 document.body.appendChild(err);
                 return false;
              };

              try {
                ${safeJs}
              } catch (e) {
                console.error(e);
              }
            </script>
          </body>
        </html>
      `;
    }

    // 2. レッスンモード (既存ロジック)
    // ダミー画像の差し替えスクリプト
    const imageReplacer = `
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const imgs = document.querySelectorAll('img');
          imgs.forEach(img => {
            const src = img.getAttribute('src');
            // ダミー画像ロジック: cat.pngなどをプレースホルダーに置換
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
               img.src = 'https://placehold.co/100x100/orange/white?text=' + src;
               img.style.maxWidth = '100%';
            }
          });
        });
      </script>
    `;

    if (tech === TechType.HTML) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
             <style>body { font-family: sans-serif; padding: 1rem; color: #333; line-height: 1.6; }</style>
             ${imageReplacer}
          </head>
          <body>
            ${code}
          </body>
        </html>
      `;
    } else if (tech === TechType.CSS) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: sans-serif; padding: 1rem; color: #333; line-height: 1.6; }
              ${code}
            </style>
          </head>
          <body>
            <h1>見出しのサンプル</h1>
            <p>これは段落のサンプルテキストです。CSSでどう変わるかな？</p>
            <div style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; display: inline-block;">ボックス要素</div>
          </body>
        </html>
      `;
    } else if (tech === TechType.JS) {
      // Chrome DevTools風のデザイン
      return `
        <!DOCTYPE html>
        <html>
          <head>
             <style>
                body { 
                  margin: 0; 
                  padding: 0; 
                  background-color: #242424; /* Dark BG */
                  color: #e8eaed; 
                  font-family: Consolas, Menlo, Monaco, "Courier New", monospace; 
                  font-size: 13px; 
                  overflow-x: hidden;
                }
                #console-header {
                  padding: 4px 8px;
                  background: #333;
                  border-bottom: 1px solid #444;
                  color: #aaa;
                  font-size: 11px;
                  display: flex;
                  gap: 10px;
                }
                .log-entry { 
                  border-bottom: 1px solid #3c4043; 
                  padding: 4px 8px; 
                  display: flex; 
                  align-items: flex-start; 
                  line-height: 1.4; 
                  word-break: break-all;
                }
                .log-entry:hover {
                  background-color: #2a2d31;
                }
                .log-entry.error { 
                  background-color: #290000; 
                  color: #ff8080; 
                  border-left: 2px solid #ff8080; 
                }
                .log-entry.warn { 
                  background-color: #332b00; 
                  color: #f2c744; 
                  border-left: 2px solid #f2c744; 
                }
                .icon { 
                  margin-right: 6px; 
                  font-weight: bold;
                  display: inline-block;
                  width: 14px;
                }
                .timestamp { 
                  color: #888; 
                  margin-right: 8px; 
                  font-size: 11px; 
                  margin-top: 2px;
                }
                .val-string { color: #ce9178; }
                .val-number { color: #b5cea8; }
                .val-boolean { color: #569cd6; }
                .val-null { color: #569cd6; }
                .val-object { color: #9cdcfe; }
             </style>
          </head>
          <body>
            <div id="console-header">
               <span>Console</span>
               <span>Filter</span>
            </div>
            <div id="output"></div>
            <script>
              const output = document.getElementById('output');
              
              function formatValue(val) {
                 if (val === null) return '<span class="val-null">null</span>';
                 if (val === undefined) return '<span class="val-null">undefined</span>';
                 if (typeof val === 'number') return '<span class="val-number">' + val + '</span>';
                 if (typeof val === 'string') return '<span class="val-string">"' + val + '"</span>';
                 if (typeof val === 'boolean') return '<span class="val-boolean">' + val + '</span>';
                 if (typeof val === 'object') {
                    try {
                        return '<span class="val-object">' + JSON.stringify(val, null, 2) + '</span>';
                    } catch(e) { return '[object Object]'; }
                 }
                 return String(val);
              }

              function getTime() {
                 const now = new Date();
                 return now.getHours().toString().padStart(2, '0') + ':' + 
                        now.getMinutes().toString().padStart(2, '0') + ':' + 
                        now.getSeconds().toString().padStart(2, '0');
              }

              function addLog(type, args) {
                const line = document.createElement('div');
                line.className = 'log-entry ' + type;
                
                let icon = '';
                if (type === 'error') icon = '✕';
                else if (type === 'warn') icon = '⚠';
                else icon = '>';

                const content = args.map(formatValue).join(' ');
                
                line.innerHTML = 
                  '<span class="timestamp">[' + getTime() + ']</span>' +
                  '<span class="icon">' + icon + '</span>' + 
                  '<span>' + content + '</span>';
                
                output.appendChild(line);
                window.scrollTo(0, document.body.scrollHeight);
              }

              // Override console methods
              const originalLog = console.log;
              const originalError = console.error;
              const originalWarn = console.warn;

              console.log = function(...args) {
                addLog('log', args);
                originalLog.apply(console, args);
              };

              console.error = function(...args) {
                addLog('error', args);
                originalError.apply(console, args);
              };
              
              console.warn = function(...args) {
                addLog('warn', args);
                originalWarn.apply(console, args);
              };
              
              window.onerror = function(msg, url, line) {
                 addLog('error', [msg]);
                 return false; // Let default handler run too
              };

              // Alert hook to show in console too
              const originalAlert = window.alert;
              window.alert = function(msg) {
                 addLog('warn', ['[Alert Displayed]', msg]);
                 // We rely on iframe allow-modals for the actual alert
                 setTimeout(() => originalAlert(msg), 10); 
              };

              try {
                ${code}
              } catch (e) {
                console.error(e);
              }
            </script>
          </body>
        </html>
      `;
    }
    return '';
  }, [code, tech, htmlCode, cssCode, jsCode]);

  return (
    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200 flex flex-col">
       <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
         <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
           {tech === TechType.JS ? 'Console' : 'Preview'}
         </span>
         <div className="flex gap-1">
           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
           <div className="w-2 h-2 rounded-full bg-slate-300"></div>
         </div>
       </div>
       {/* 
         sandbox属性に 'allow-modals' を追加して alert() を許可 
         allow-same-originはセキュリティリスクがあるため、今回は外しておく（alertはmodalsのみで動作する）
       */}
       <iframe
        title="preview"
        srcDoc={srcDoc}
        className="w-full flex-1 border-none bg-white"
        sandbox="allow-scripts allow-modals"
      />
    </div>
  );
};
