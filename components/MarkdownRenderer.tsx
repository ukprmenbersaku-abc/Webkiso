import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  
  lines.forEach((line, index) => {
    // テンプレートリテラルのベースインデントを除去するための簡易処理は今回省略し、
    // 行ごとの処理を行う
    const trimmedLine = line.trim();

    // コードブロックの処理 (```)
    if (trimmedLine.startsWith('```')) {
      if (inCodeBlock) {
        // ブロック終了
        elements.push(
          <div key={`code-block-${index}`} className="my-5 bg-slate-800 text-slate-100 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-sm border border-slate-700">
            <pre className="whitespace-pre"><code>{codeBlockContent.join('\n')}</code></pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockContent = [];
      } else {
        // ブロック開始
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // 見出し (#)
    if (line.match(/^\s*#\s/)) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl font-black text-slate-800 mt-8 mb-4 pb-2 border-b-2 border-slate-100 flex items-center gap-2">
          {line.replace(/^\s*#\s/, '')}
        </h3>
      );
      return;
    }
    // 小見出し (##)
    if (line.match(/^\s*##\s/)) {
      elements.push(
        <h4 key={`h4-${index}`} className="text-lg font-bold text-slate-700 mt-6 mb-3 pl-3 border-l-4 border-indigo-400">
          {line.replace(/^\s*##\s/, '')}
        </h4>
      );
      return;
    }

    // リスト (-)
    if (line.match(/^\s*-\s/)) {
       elements.push(
        <div key={`li-${index}`} className="flex items-start gap-2 mb-2 ml-2">
          <span className="text-indigo-500 mt-1.5">•</span>
          <span className="text-slate-600">{formatInline(line.replace(/^\s*-\s/, ''))}</span>
        </div>
      );
      return;
    }

    // 空行はスキップ
    if (trimmedLine === '') {
      return;
    }

    // 通常の段落
    elements.push(
      <p key={`p-${index}`} className="mb-3 text-slate-600 leading-7">
        {formatInline(line)}
      </p>
    );
  });

  return <div className="markdown-content">{elements}</div>;
};

// インラインコード `code` や強調 **bold** の簡易フォーマッター
const formatInline = (text: string): React.ReactNode => {
  // `code` と **bold** を分割して処理
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded text-sm font-mono font-bold mx-0.5 border border-indigo-100">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-slate-900 bg-yellow-100 px-1 rounded">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};
