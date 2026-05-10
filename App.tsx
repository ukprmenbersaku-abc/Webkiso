import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { CURRICULUM } from './constants';
import { Button } from './components/Button';
import { CodeEditor } from './components/CodeEditor';
import { Preview } from './components/Preview';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { TechType } from './types';
import { 
  HtmlIcon, CssIcon, JsIcon, 
  CheckCircleIcon, XCircleIcon, BulbIcon, TargetIcon, 
  ArrowLeftIcon, ArrowRightIcon, BeakerIcon,
  MenuIcon, PlusIcon, HomeIcon, ListIcon, GamepadIcon, LayersIcon, SparklesIcon
} from './components/Icons';

// アイコンマッピング用ヘルパー
const getModuleIcon = (iconKey: string, className: string) => {
  switch (iconKey) {
    case 'html': return <HtmlIcon className={className} />;
    case 'css': return <CssIcon className={className} />;
    case 'js': return <JsIcon className={className} />;
    case 'gamepad': return <GamepadIcon className={className} />;
    case 'layers': return <LayersIcon className={className} />;
    case 'sparkles': return <SparklesIcon className={className} />;
    default: return null;
  }
};

const PLAYGROUND_DEFAULT = {
  html: '<h1>私の作品</h1>\n<p id="msg">ボタンを押してね</p>\n<button onclick="changeText()">クリック</button>',
  css: 'h1 {\n  color: #4f46e5;\n}\nbutton {\n  padding: 10px 20px;\n  background: #ec4899;\n  color: white;\n  border: none;\n  border-radius: 8px;\n}',
  js: 'function changeText() {\n  const p = document.getElementById("msg");\n  p.textContent = "すごい！動いたよ！";\n  p.style.color = "red";\n}'
};

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Playground State
  const [isPlayground, setIsPlayground] = useState(false);
  const [playgroundTab, setPlaygroundTab] = useState<TechType>(TechType.HTML);
  const [playgroundCode, setPlaygroundCode] = useState(PLAYGROUND_DEFAULT);

  const [code, setCode] = useState<string>("");
  
  // Lesson State
  const [isChecking, setIsChecking] = useState(false);
  const [feedback, setFeedback] = useState<{ passed: boolean; feedback: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  
  // Sidebar State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // モバイル用ドロワー制御
  const [isCollapsed, setIsCollapsed] = useState(false); // デスクトップ用折り畳み制御
  
  // Home Screen State
  const [expandedModuleId, setExpandedModuleId] = useState<string | null>(null);

  // Resizing State
  const [leftPanelWidth, setLeftPanelWidth] = useState(33.33); // %
  const [rightPanelSplitRatio, setRightPanelSplitRatio] = useState(50); // %
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Refs
  const lessonContentRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const activeModule = CURRICULUM.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    // Cookieからデータを読み込む
    const savedModuleId = Cookies.get('activeModuleId');
    const savedLessonId = Cookies.get('activeLessonId');
    const savedCompleted = Cookies.get('completedLessons');
    
    if (savedCompleted) {
      try {
        setCompletedLessons(JSON.parse(savedCompleted));
      } catch (e) {
        console.error("Failed to parse completedLessons cookie", e);
      }
    }
    
    if (savedModuleId && savedLessonId) {
      setActiveModuleId(savedModuleId);
      setActiveLessonId(savedLessonId);
    }
    
    setIsInitialized(true);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 状態が変わるたびにCookieに保存
  useEffect(() => {
    if (!isInitialized) return;
    
    if (activeModuleId) Cookies.set('activeModuleId', activeModuleId, { expires: 365 });
    else Cookies.remove('activeModuleId');
    
    if (activeLessonId) Cookies.set('activeLessonId', activeLessonId, { expires: 365 });
    else Cookies.remove('activeLessonId');
  }, [activeModuleId, activeLessonId, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    Cookies.set('completedLessons', JSON.stringify(completedLessons), { expires: 365 });
  }, [completedLessons, isInitialized]);

  // ドラッグ処理
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingLeft && mainContainerRef.current) {
        const containerRect = mainContainerRef.current.getBoundingClientRect();
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        // 最小20%、最大70%
        if (newWidth > 20 && newWidth < 70) {
          setLeftPanelWidth(newWidth);
        }
      }
      
      if (isDraggingRight && rightPanelRef.current) {
        const panelRect = rightPanelRef.current.getBoundingClientRect();
        const newRatio = ((e.clientX - panelRect.left) / panelRect.width) * 100;
        // 最小10%、最大90%
        if (newRatio > 10 && newRatio < 90) {
          setRightPanelSplitRatio(newRatio);
        }
      }
    };
    
    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
    
    if (isDraggingLeft || isDraggingRight) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none'; // テキスト選択防止
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight]);

  useEffect(() => {
    if (activeLesson) {
      setCode(activeLesson.defaultCode);
      setFeedback(null);
      setShowHint(false);
    }
  }, [activeLesson]);

  // レッスンが切り替わったらスクロールをトップに戻す
  useEffect(() => {
    if (lessonContentRef.current) {
      lessonContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeLessonId]);

  const handleRunAndCheck = async () => {
    if (!activeLesson) return;
    setIsChecking(true);
    setFeedback(null);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = activeLesson.validate(code);
    
    if (result.passed && !completedLessons.includes(activeLesson.id)) {
      setCompletedLessons(prev => [...prev, activeLesson.id]);
    }
    
    setFeedback(result);
    setIsChecking(false);
  };

  const updatePlaygroundCode = (newCode: string) => {
    if (playgroundTab === TechType.HTML) setPlaygroundCode({ ...playgroundCode, html: newCode });
    else if (playgroundTab === TechType.CSS) setPlaygroundCode({ ...playgroundCode, css: newCode });
    else if (playgroundTab === TechType.JS) setPlaygroundCode({ ...playgroundCode, js: newCode });
  };

  const getPlaygroundCurrentCode = () => {
    if (playgroundTab === TechType.HTML) return playgroundCode.html;
    if (playgroundTab === TechType.CSS) return playgroundCode.css;
    return playgroundCode.js;
  };

  // --- Sidebar Component ---
  const Sidebar = () => (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-30 bg-[#f0f4f9] border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'}
        md:translate-x-0 md:${isCollapsed ? 'w-20' : 'w-72'}
      `}
    >
      <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <button 
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileMenuOpen(false);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          title={isCollapsed ? "メニューを展開" : "メニューを折り畳む"}
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {!isCollapsed && (
          <div className="font-black text-xl text-slate-700 tracking-tight flex items-center gap-2 flex-1 ml-2 whitespace-nowrap overflow-hidden">
             Web<span className="text-indigo-600">Kiso</span>
          </div>
        )}
      </div>

      <div className="px-3 pb-4 flex-1 overflow-y-auto overflow-x-hidden">
        
        {!isCollapsed && <div className="mb-2 px-3 text-xs font-bold text-slate-500 animate-fade-in mt-2">メニュー</div>}
        
        <nav className="space-y-1">
          <button
            onClick={() => {
              setActiveModuleId(null);
              setIsPlayground(false);
              setIsMobileMenuOpen(false);
            }}
            className={`
              flex items-center gap-3 rounded-full font-medium transition-colors cursor-pointer
              ${isCollapsed ? 'justify-center w-12 h-12 mx-auto p-0' : 'w-full px-4 py-2.5 text-sm'}
              ${!activeModuleId && !isPlayground ? 'bg-[#d3e3fd] text-indigo-900' : 'text-slate-600 hover:bg-slate-200'}
            `}
            title="ホーム（コース一覧）"
          >
            <HomeIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">ホーム</span>}
          </button>
        </nav>

        {!isCollapsed && <div className="mt-6 mb-2 px-3 text-xs font-bold text-slate-500 animate-fade-in">学習コース</div>}
        
        <nav className="space-y-1">
          {CURRICULUM.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setActiveModuleId(module.id);
                if (activeModuleId !== module.id) {
                   setActiveLessonId(module.lessons[0].id);
                }
                setIsPlayground(false);
                setIsMobileMenuOpen(false);
              }}
              className={`
                flex items-center gap-3 rounded-full font-medium transition-colors cursor-pointer
                ${isCollapsed ? 'justify-center w-12 h-12 mx-auto p-0 mb-1' : 'w-full px-4 py-2.5 text-sm'}
                ${activeModuleId === module.id && !isPlayground ? 'bg-[#d3e3fd] text-indigo-900' : 'text-slate-600 hover:bg-slate-200'}
              `}
              title={module.title}
            >
              <div className={`w-5 h-5 flex-shrink-0 ${activeModuleId === module.id ? 'text-indigo-700' : 'text-slate-500'}`}>
                {getModuleIcon(module.icon, "w-full h-full")}
              </div>
              {!isCollapsed && <span className="truncate">{module.title}</span>}
            </button>
          ))}
        </nav>

        {!isCollapsed && <div className="mt-6 mb-2 px-3 text-xs font-bold text-slate-500 animate-fade-in">その他</div>}

        <button
          onClick={() => {
            setIsPlayground(true);
            setActiveModuleId(null);
            setIsMobileMenuOpen(false);
          }}
          className={`
            flex items-center gap-3 bg-[#dde3ea] hover:bg-white hover:shadow-md transition-all text-slate-700 font-bold rounded-xl mb-6 cursor-pointer
            ${isCollapsed ? 'justify-center w-12 h-12 p-0 mx-auto' : 'w-full py-3 px-4'}
          `}
          title="自由研究（プレイグラウンド）"
        >
          <PlusIcon className="w-6 h-6 text-indigo-600 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm whitespace-nowrap">自由研究</span>}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-auto p-4 border-t border-slate-200">
           <div className="text-xs text-slate-500 text-center whitespace-nowrap">
              WebKiso - Powered by Gemini
           </div>
        </div>
      )}
    </aside>
  );

  // --- Main Content Render Logic ---

  const renderMainContent = () => {
    // 1. Playground View
    if (isPlayground) {
      return (
        <div className="h-full flex flex-col bg-white overflow-hidden rounded-tl-2xl border-l border-slate-200 shadow-sm">
          <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 md:hidden cursor-pointer"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg">
                 <BeakerIcon className="w-6 h-6" />
                 自由研究
              </div>
            </div>
            <div className="hidden md:block text-sm text-slate-500">
              HTML, CSS, JSを自由に組み合わせてみよう！
            </div>
          </header>

          <main className="flex-1 flex flex-col md:flex-row overflow-hidden p-4 gap-4 bg-slate-50">
             <div className="w-full md:w-1/2 flex flex-col h-full gap-2">
               <div className="flex bg-slate-200 p-1 rounded-xl w-fit">
                  {[TechType.HTML, TechType.CSS, TechType.JS].map(tech => (
                    <button
                      key={tech}
                      onClick={() => setPlaygroundTab(tech)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                        playgroundTab === tech 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
               </div>
               <div className="flex-1">
                  <CodeEditor
                     tech={playgroundTab}
                     initialCode={getPlaygroundCurrentCode()}
                     onChange={updatePlaygroundCode}
                     onRun={() => {}}
                  />
               </div>
             </div>
             <div className="w-full md:w-1/2 h-full">
               <Preview 
                  code="" 
                  htmlCode={playgroundCode.html}
                  cssCode={playgroundCode.css}
                  jsCode={playgroundCode.js}
               />
             </div>
          </main>
        </div>
      );
    }

    // 2. Curriculum List (Home)
    if (!activeModuleId) {
      return (
        <div className="min-h-full bg-white rounded-tl-2xl border-l border-slate-200 shadow-sm flex flex-col">
          <header className="p-4 flex items-center md:hidden">
             <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 cursor-pointer"
              >
                <MenuIcon className="w-6 h-6" />
             </button>
          </header>
          
          <div className="p-6 md:p-12 overflow-y-auto flex-1">
            <div className="max-w-5xl mx-auto">
              <header className="mb-12 text-center pt-8">
                <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight flex items-center justify-center gap-2">
                  Web<span className="text-indigo-600">Kiso</span>
                </h1>
                <p className="text-xl text-slate-500 font-medium">
                  作って学ぶ、はじめてのWebプログラミング。
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 items-start">
                {CURRICULUM.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setActiveLessonId(module.lessons[0].id);
                    }}
                    className={`flex flex-col bg-white rounded-3xl p-6 shadow-sm transition-all duration-300 border-2 border-slate-100 cursor-pointer h-full
                      ${expandedModuleId === module.id ? 'ring-2 ring-indigo-100' : 'hover:shadow-md hover:border-indigo-200'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                         <div className={`w-14 h-14 rounded-2xl ${module.color} flex items-center justify-center flex-shrink-0`}>
                           {getModuleIcon(module.icon as string, "w-7 h-7")}
                         </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-slate-800 mb-1">
                      {module.title}
                    </h2>
                    
                    {/* Progress Bar */}
                    {(() => {
                      const moduleLessons = module.lessons.map(l => l.id);
                      const completedCount = completedLessons.filter(id => moduleLessons.includes(id)).length;
                      const progress = (completedCount / module.lessons.length) * 100;
                      
                      return (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-slate-400 font-medium text-xs">
                              {module.lessons.length} レッスン
                            </span>
                            <span className="text-indigo-600 font-bold text-xs">
                              {completedCount} / {module.lessons.length}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                    
                    <div className="mt-auto flex gap-2">
                         <button
                           className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer text-sm"
                         >
                           始める <ArrowRightIcon className="w-3.5 h-3.5" />
                         </button>
                         <button
                            onClick={(e) => {
                                e.stopPropagation(); // 親のクリックイベントを止める
                                setExpandedModuleId(expandedModuleId === module.id ? null : module.id);
                            }}
                            className={`px-3 rounded-xl font-bold border-2 transition-colors flex items-center gap-2 cursor-pointer
                                ${expandedModuleId === module.id 
                                  ? 'bg-slate-100 border-slate-200 text-slate-600' 
                                  : 'border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50'
                                }`}
                            title="目次を見る"
                         >
                            <ListIcon className="w-4 h-4" />
                         </button>
                    </div>

                    {/* Table of Contents Accordion */}
                    <div className={`
                         overflow-hidden transition-all duration-300 ease-in-out w-full
                         ${expandedModuleId === module.id ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-slate-100' : 'max-h-0 opacity-0'}
                    `}>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">レッスン一覧</h3>
                        <div className="space-y-1 overflow-y-auto max-h-48 pr-1 custom-scrollbar">
                            {module.lessons.map((lesson, idx) => {
                               const isCompleted = completedLessons.includes(lesson.id);
                               return (
                                 <button
                                   key={lesson.id}
                                   onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveModuleId(module.id);
                                      setActiveLessonId(lesson.id);
                                   }}
                                   className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-2 group cursor-pointer
                                     ${isCompleted ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
                                 >
                                    <span className={`w-5 h-5 flex-shrink-0 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors
                                      ${isCompleted 
                                        ? 'bg-emerald-100 text-emerald-600' 
                                        : 'bg-slate-100 text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600'}`}>
                                        {isCompleted ? <CheckCircleIcon className="w-3 h-3" /> : idx + 1}
                                    </span>
                                    <span className="truncate">{lesson.title}</span>
                                 </button>
                               );
                            })}
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Playground Banner */}
              <div 
                onClick={() => setIsPlayground(true)}
                className="group cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-2xl"
              >
                 <div className="flex items-center gap-6">
                    <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                      <BeakerIcon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                       <h2 className="text-2xl font-bold mb-2">自由研究（プレイグラウンド）</h2>
                       <p className="text-indigo-100">学んだことを活かして、自由にWebサイトを作ってみよう！</p>
                    </div>
                 </div>
                 <button
                   className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-bold shadow-md transition-colors whitespace-nowrap cursor-pointer"
                 >
                    やってみる
                 </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. Lesson View (With Resizable Layout)
    return (
      <div className="h-full flex flex-col bg-white overflow-hidden rounded-tl-2xl border-l border-slate-200 shadow-sm">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between z-10 gap-4 flex-shrink-0">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-500 md:hidden cursor-pointer"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeModule?.color}`}>
                  {activeModule && getModuleIcon(activeModule.icon as string, "w-5 h-5")}
               </div>
               <h1 className="font-bold text-slate-800 text-sm md:text-base">{activeModule?.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-start md:justify-end w-full md:w-auto">
              <div className="flex flex-wrap gap-1">
                {activeModule?.lessons.map((l) => {
                  const isCompleted = completedLessons.includes(l.id);
                  const isActive = activeLessonId === l.id;
                  
                  return (
                    <button
                      key={l.id}
                      onClick={() => setActiveLessonId(l.id)}
                      className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer relative
                        ${isActive 
                          ? 'bg-indigo-600 text-white shadow-md' 
                          : isCompleted
                            ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-400 hover:bg-indigo-100 hover:text-indigo-500'}`}
                    >
                      {isCompleted && !isActive && <CheckCircleIcon className="w-3 h-3 absolute -top-1 -right-1 bg-white rounded-full text-emerald-500 shadow-sm" />}
                      {activeModule.lessons.indexOf(l) + 1}
                    </button>
                  );
                })}
              </div>
          </div>
        </header>

        {/* Resizable Main Content */}
        <div ref={mainContainerRef} className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50 relative">
          
          {/* Left Panel: Explanation */}
          <div 
            className="flex flex-col bg-white z-0 h-full overflow-hidden"
            style={{ 
              width: isMobile ? '100%' : `${leftPanelWidth}%`,
              minWidth: isMobile ? 'auto' : '250px'
            }}
          >
            <div ref={lessonContentRef} className="flex-1 overflow-y-auto p-6 md:p-8">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold mb-4">
                {activeLesson?.tech}
              </span>
              <h2 className="text-3xl font-black text-slate-800 mb-6 leading-tight">
                {activeLesson?.title}
              </h2>
              
              <div className="prose prose-slate prose-lg mb-8 max-w-none">
                 <MarkdownRenderer content={activeLesson?.explanation || ''} />
              </div>

              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl mb-8">
                <h3 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <TargetIcon className="w-5 h-5" /> 今日のミッション
                </h3>
                <p className="text-indigo-800 font-medium">
                  {activeLesson?.task}
                </p>
              </div>

              {activeLesson?.hints && activeLesson.hints.length > 0 && (
                  <div className="mb-8">
                      {!showHint ? (
                          <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowHint(true)}
                              className="text-slate-400 hover:text-indigo-500 flex items-center gap-2"
                          >
                              <BulbIcon className="w-4 h-4" /> ヒントを見る
                          </Button>
                      ) : (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 animate-fade-in">
                              <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                  <BulbIcon className="w-5 h-5" /> ヒント
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-yellow-800/80 text-sm">
                                  {activeLesson.hints.map((hint, i) => (
                                      <li key={i}>{hint}</li>
                                  ))}
                              </ul>
                          </div>
                      )}
                  </div>
              )}

              {feedback && (
                <div className={`p-6 rounded-xl border-2 mb-8 animate-fade-in ${feedback.passed ? 'bg-emerald-50 border-emerald-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex items-start gap-4">
                     <div className={`p-2 rounded-full ${feedback.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'} ${feedback.passed ? 'animate-bounce' : ''}`}>
                       {feedback.passed ? <CheckCircleIcon className="w-8 h-8" /> : <XCircleIcon className="w-8 h-8" />}
                     </div>
                     <div className="flex-1">
                       <h4 className={`font-bold mb-1 ${feedback.passed ? 'text-emerald-800' : 'text-orange-800'}`}>
                         {feedback.passed ? '正解！' : '惜しい！'}
                       </h4>
                       <p className={`text-sm ${feedback.passed ? 'text-emerald-700' : 'text-orange-700'}`}>
                         {feedback.feedback}
                       </p>
                     </div>
                  </div>
                  {feedback.passed && (
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="secondary" 
                        onClick={() => {
                           const currentIndex = activeModule!.lessons.findIndex(l => l.id === activeLessonId);
                           if (currentIndex < activeModule!.lessons.length - 1) {
                             setActiveLessonId(activeModule!.lessons[currentIndex + 1].id);
                           } else {
                             alert("このコースはすべて完了です！おめでとうございます！");
                             setActiveModuleId(null);
                           }
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        次のレッスンへ <ArrowRightIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Resizer: Left <-> Right */}
          {!isMobile && (
            <div
              className="w-1.5 hover:w-2 bg-slate-200 hover:bg-indigo-400 cursor-col-resize z-20 transition-all flex items-center justify-center group flex-shrink-0"
              onMouseDown={() => setIsDraggingLeft(true)}
            >
               <div className="w-0.5 h-8 bg-slate-400 rounded group-hover:bg-white" />
            </div>
          )}

          {/* Right Panel: Editor & Preview */}
          <div 
            ref={rightPanelRef}
            className={`flex ${isMobile ? 'flex-col gap-4 h-[600px] p-4' : 'flex-row h-full'}`}
            style={{ 
              width: isMobile ? '100%' : `${100 - leftPanelWidth}%`
            }}
          >
             {/* Editor */}
             <div 
               className="h-full flex-shrink-0 relative"
               style={{ 
                 width: isMobile ? '100%' : `${rightPanelSplitRatio}%`,
                 height: isMobile ? '50%' : '100%'
               }}
             >
                <div className={`h-full w-full ${!isMobile ? 'p-2' : ''}`}>
                  {activeLesson && (
                    <CodeEditor
                      tech={activeLesson.tech}
                      initialCode={code}
                      onChange={setCode}
                      onRun={handleRunAndCheck}
                      isCorrect={feedback?.passed}
                    />
                  )}
                </div>
             </div>

             {/* Resizer: Editor <-> Preview */}
             {!isMobile && (
               <div
                  className="w-1.5 hover:w-2 bg-slate-200 hover:bg-indigo-400 cursor-col-resize z-20 transition-all flex items-center justify-center group flex-shrink-0"
                  onMouseDown={() => setIsDraggingRight(true)}
               >
                 <div className="w-0.5 h-8 bg-slate-400 rounded group-hover:bg-white" />
               </div>
             )}

             {/* Preview */}
             <div 
                className="flex-1 h-full relative"
                style={{ 
                    height: isMobile ? '50%' : '100%',
                    pointerEvents: (isDraggingLeft || isDraggingRight) ? 'none' : 'auto' 
                }}
             >
                <div className={`h-full w-full ${!isMobile ? 'p-2' : ''}`}>
                  {activeLesson && <Preview code={code} tech={activeLesson.tech} />}
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#f0f4f9] overflow-hidden">
      <Sidebar />
      <main 
        className={`
          flex-1 flex flex-col min-w-0 transition-all duration-300
          md:${isCollapsed ? 'ml-20' : 'ml-72'}
        `}
      >
         {renderMainContent()}
      </main>
      
      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}