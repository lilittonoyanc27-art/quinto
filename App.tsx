import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Search,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Layers,
  GraduationCap,
  Eye,
  EyeOff,
  Columns,
  ListFilter,
  Copy,
  Check,
  Globe2,
  BookMarked
} from 'lucide-react';
import {
  UNIT_HEADER,
  FULL_TEXT_PARAGRAPHS,
  DETAILED_SECTIONS,
  VOCABULARY,
  QUESTIONS_ANSWERS,
  SHORT_TEXT_PARAGRAPHS,
  BilingualItem,
  QuestionAnswer,
  VocabularyWord
} from './geosphereData';
import { speakSpanish } from './audio';

type ActiveTab = 'all' | 'fulltext' | 'detailed' | 'vocab' | 'qa' | 'exam' | 'quiz';
type ViewMode = 'interactive' | 'side-by-side' | 'hidden';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('interactive');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>('all');
  const [activeEarthLayer, setActiveEarthLayer] = useState<'corteza' | 'manto' | 'nucleo-ext' | 'nucleo-int' | null>(null);

  // Quiz state for exam questions
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizScore, setQuizScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Toggle reveal for a single item ID
  const toggleReveal = (id: string) => {
    setRevealedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isRevealed = (id: string): boolean => {
    if (viewMode === 'side-by-side') return true;
    if (viewMode === 'hidden') return false;
    return !!revealedIds[id];
  };

  const handleRevealAll = () => {
    setViewMode('side-by-side');
  };

  const handleHideAll = () => {
    setViewMode('interactive');
    setRevealedIds({});
  };

  const handlePlayAudio = (id: string, text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSpeakingId(id);
    speakSpanish(text, () => {
      setSpeakingId(null);
    });
  };

  const handleCopy = (id: string, text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Filter vocabulary
  const filteredVocab = useMemo(() => {
    return VOCABULARY.filter(item => {
      const matchesCategory = selectedVocabCategory === 'all' || item.category === selectedVocabCategory;
      const matchesSearch = !searchQuery.trim() || 
        item.es.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.arm.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedVocabCategory, searchQuery]);

  // Filter Q&A
  const filteredQA = useMemo(() => {
    if (!searchQuery.trim()) return QUESTIONS_ANSWERS;
    const q = searchQuery.toLowerCase();
    return QUESTIONS_ANSWERS.filter(item => 
      item.questionEs.toLowerCase().includes(q) ||
      item.questionArm.toLowerCase().includes(q) ||
      item.answerEs.toLowerCase().includes(q) ||
      item.answerArm.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Search match counts
  const searchResultsCount = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    let count = 0;
    FULL_TEXT_PARAGRAPHS.forEach(p => {
      if (p.es.toLowerCase().includes(q) || p.arm.toLowerCase().includes(q)) count++;
    });
    VOCABULARY.forEach(v => {
      if (v.es.toLowerCase().includes(q) || v.arm.toLowerCase().includes(q)) count++;
    });
    QUESTIONS_ANSWERS.forEach(qa => {
      if (qa.questionEs.toLowerCase().includes(q) || qa.questionArm.toLowerCase().includes(q) ||
          qa.answerEs.toLowerCase().includes(q) || qa.answerArm.toLowerCase().includes(q)) count++;
    });
    SHORT_TEXT_PARAGRAPHS.forEach(p => {
      if (p.es.toLowerCase().includes(q) || p.arm.toLowerCase().includes(q)) count++;
    });
    return count;
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-stone-800 flex flex-col font-sans">
      {/* Top Bar - Clean 3-zone contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand title wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-xs">
              G
            </div>
            <div>
              <div className="font-display font-bold text-stone-900 tracking-tight leading-tight text-lg">
                La Geosfera <span className="text-amber-700 font-sans font-medium text-sm">/ Գեոսֆերա</span>
              </div>
              <div className="text-[11px] text-stone-500 font-medium hidden sm:block">
                Español ➔ Հայերեն · Ուսումնական ուղեցույց
              </div>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'all' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              Բոլոր բաժինները
            </button>
            <button
              onClick={() => setActiveTab('fulltext')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'fulltext' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              1. Լիարժեք տեքստ
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'detailed' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              2. Բացատրություն
            </button>
            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'vocab' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              3. Բառապաշար
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'qa' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              4. Հարցեր & Պատասխաններ
            </button>
            <button
              onClick={() => setActiveTab('exam')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === 'exam' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-stone-100 text-stone-700'}`}
            >
              5. Կարճ տեքստ
            </button>
          </nav>

          {/* Zone 3: Primary Action / Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-xs ${
                activeTab === 'quiz'
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              title="Ինքնաստուգում"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ինքնաստուգման վիկտորինա</span>
              <span className="sm:hidden">Թեստ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden bg-white border-b border-stone-200 px-4 py-2 overflow-x-auto flex gap-1.5 scrollbar-none text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'all' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          Բոլորը
        </button>
        <button
          onClick={() => setActiveTab('fulltext')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'fulltext' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          1. Տեքստ
        </button>
        <button
          onClick={() => setActiveTab('detailed')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'detailed' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          2. Բացատրություն
        </button>
        <button
          onClick={() => setActiveTab('vocab')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'vocab' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          3. Բառարան
        </button>
        <button
          onClick={() => setActiveTab('qa')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'qa' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          4. Հարց ու պատասխան
        </button>
        <button
          onClick={() => setActiveTab('exam')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${activeTab === 'exam' ? 'bg-amber-600 text-white font-medium' : 'bg-stone-100 text-stone-700'}`}
        >
          5. Կարճ տեքստ
        </button>
      </div>

      {/* Hero / Header Unit Presentation */}
      <section className="bg-gradient-to-b from-amber-50/60 via-stone-50 to-[#FBFBFA] border-b border-stone-200/80 pt-8 pb-7 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
                {UNIT_HEADER.unit}
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
                {UNIT_HEADER.titleEs}
                <span className="block text-2xl sm:text-3xl font-sans font-medium text-stone-600 mt-1">
                  {UNIT_HEADER.titleArm}
                </span>
              </h1>
              <p className="text-sm text-stone-600 mt-2 max-w-xl">
                Ինտերակտիվ նյութեր իսպաներենից հայերեն. <strong>սեղմեք ցանկացած իսպաներեն նախադասության կամ բառի վրա</strong>՝ հայերեն թարգմանությունն ակնթարթորեն բացելու համար:
              </p>
            </div>

            {/* Global Controls & Mode Switcher */}
            <div className="bg-white p-2.5 rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center gap-2 self-start md:self-auto">
              <span className="text-xs font-medium text-stone-500 px-1">Ռեժիմ:</span>
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'interactive'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
                title="Սեղմեք իսպաներենին՝ հայերենը բացելու համար"
              >
                <Eye className="w-3.5 h-3.5" />
                Սեղմումով բացել
              </button>
              <button
                onClick={handleRevealAll}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'side-by-side'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
                title="Ցուցադրել բոլոր թարգմանությունները միանգամից"
              >
                <Columns className="w-3.5 h-3.5" />
                Բացել բոլորը
              </button>
              <button
                onClick={handleHideAll}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  viewMode === 'hidden'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
                title="Թաքցնել թարգմանությունները ինքնաստուգման համար"
              >
                <EyeOff className="w-3.5 h-3.5" />
                Թաքցնել
              </button>
            </div>
          </div>

          {/* Quick Search & Interactive Earth Layers Widget */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Որոնել բառ կամ նախադասություն (իսպաներեն կամ հայերեն)... օր. manto, corteza, ապար..."
                className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
              {searchResultsCount !== null && (
                <div className="mt-1 text-xs text-stone-500 px-1">
                  Գտնվել է <span className="font-semibold text-amber-700">{searchResultsCount}</span> համընկնում
                </div>
              )}
            </div>

            {/* Earth Visual Diagram & Quick Layer Selector */}
            <div className="bg-white p-3 rounded-xl border border-stone-200 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-stone-500 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-600" />
                  Երկրի շերտերը (Կտտացրեք):
                </span>
                {activeEarthLayer && (
                  <button
                    onClick={() => setActiveEarthLayer(null)}
                    className="text-[11px] text-stone-400 hover:text-stone-700"
                  >
                    Մաքրել
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => {
                    const next = activeEarthLayer === 'corteza' ? null : 'corteza';
                    setActiveEarthLayer(next);
                    if (next) {
                      toggleReveal('corteza-1');
                      toggleReveal('corteza-2');
                      toggleReveal('corteza-3');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all font-medium border ${
                    activeEarthLayer === 'corteza'
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-amber-50/70 border-amber-200/80 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  Corteza · Երկրակեղև
                </button>
                <button
                  onClick={() => {
                    const next = activeEarthLayer === 'manto' ? null : 'manto';
                    setActiveEarthLayer(next);
                    if (next) {
                      toggleReveal('manto-1');
                      toggleReveal('manto-2');
                      toggleReveal('manto-3');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all font-medium border ${
                    activeEarthLayer === 'manto'
                      ? 'bg-orange-600 border-orange-600 text-white shadow-xs'
                      : 'bg-orange-50/70 border-orange-200/80 text-orange-900 hover:bg-orange-100'
                  }`}
                >
                  Manto · Թիկնոց
                </button>
                <button
                  onClick={() => {
                    const next = activeEarthLayer === 'nucleo-int' ? null : 'nucleo-int';
                    setActiveEarthLayer(next);
                    if (next) {
                      toggleReveal('nucleo-1');
                      toggleReveal('nucleo-2');
                      toggleReveal('nucleo-3');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all font-medium border ${
                    activeEarthLayer === 'nucleo-int'
                      ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                      : 'bg-rose-50/70 border-rose-200/80 text-rose-900 hover:bg-rose-100'
                  }`}
                >
                  Núcleo · Միջուկ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-12">
        {/* VIEW: QUIZ PRACTICE MODE */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Գիտելիքի մարզիչ</span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  Հարց {currentQuizIndex + 1} / {QUESTIONS_ANSWERS.length}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentQuizIndex(0);
                    setQuizRevealed(false);
                    setQuizScore({ correct: 0, total: 0 });
                  }}
                  className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg text-xs flex items-center gap-1"
                  title="Սկսել սկզբից"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Վերսկսել
                </button>
              </div>
            </div>

            {/* Question Card */}
            {(() => {
              const currentQA = QUESTIONS_ANSWERS[currentQuizIndex];
              return (
                <div className="space-y-6">
                  {/* Spanish Question */}
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5 mb-1">
                          <span>🇪🇸</span> Pregunta (Հարց)
                        </span>
                        <div className="text-lg sm:text-xl font-medium text-stone-900">
                          {currentQA.questionEs}
                        </div>
                        <div className="text-sm text-stone-600 mt-1 font-sans">
                          {currentQA.questionArm}
                        </div>
                      </div>
                      <button
                        onClick={(e) => handlePlayAudio(`quiz-q-${currentQA.id}`, currentQA.questionEs, e)}
                        className="p-2 rounded-lg text-stone-500 hover:text-amber-700 hover:bg-amber-50 transition-colors"
                        title="Լսել իսպաներեն հարցը"
                      >
                        <Volume2 className={`w-5 h-5 ${speakingId === `quiz-q-${currentQA.id}` ? 'text-amber-600 animate-pulse' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Answer Reveal Area */}
                  {!quizRevealed ? (
                    <div className="text-center py-8 bg-amber-50/40 rounded-xl border border-dashed border-amber-200">
                      <p className="text-stone-600 text-sm mb-3">
                        Մտածեք պատասխանը իսպաներենով կամ հայերենով, ապա սեղմեք ստուգելու համար:
                      </p>
                      <button
                        onClick={() => setQuizRevealed(true)}
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm rounded-xl shadow-xs transition-colors"
                      >
                        Բացել պատասխանը (Mostrar respuesta)
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mb-1">
                              <span>🇪🇸</span> Respuesta (Պատասխան)
                            </span>
                            <div className="text-lg font-medium text-stone-900">
                              {currentQA.answerEs}
                            </div>
                            <div className="text-sm text-stone-700 mt-1.5 font-sans pt-1 border-t border-emerald-100">
                              🇦🇲 {currentQA.answerArm}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handlePlayAudio(`quiz-a-${currentQA.id}`, currentQA.answerEs, e)}
                            className="p-2 rounded-lg text-stone-500 hover:text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Լսել իսպաներեն պատասխանը"
                          >
                            <Volume2 className={`w-5 h-5 ${speakingId === `quiz-a-${currentQA.id}` ? 'text-emerald-600 animate-pulse' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => {
                            if (currentQuizIndex > 0) {
                              setCurrentQuizIndex(prev => prev - 1);
                              setQuizRevealed(false);
                            }
                          }}
                          disabled={currentQuizIndex === 0}
                          className="px-4 py-2 border border-stone-200 rounded-lg text-sm text-stone-700 disabled:opacity-40 hover:bg-stone-50"
                        >
                          ← Նախորդ
                        </button>
                        <button
                          onClick={() => {
                            if (currentQuizIndex < QUESTIONS_ANSWERS.length - 1) {
                              setCurrentQuizIndex(prev => prev + 1);
                              setQuizRevealed(false);
                            } else {
                              alert("Շնորհավորում ենք: Դուք ավարտեցիք բոլոր 16 հարցերը:");
                            }
                          }}
                          className="px-6 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-medium"
                        >
                          {currentQuizIndex < QUESTIONS_ANSWERS.length - 1 ? 'Հաջորդ հարցը →' : 'Ավարտել'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* SECTION 1: TEXTO COMPLETO / ԼԻԱՐԺԵՔ ՏԵՔՍՏ */}
        {(activeTab === 'all' || activeTab === 'fulltext') && (
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">1. Բաժին</span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  Texto completo
                  <span className="text-base sm:text-lg font-sans font-normal text-stone-500 ml-2">
                    / Լիարժեք տեքստ
                  </span>
                </h2>
              </div>
              <div className="text-xs text-stone-500 bg-amber-50/80 px-3 py-1.5 rounded-lg border border-amber-200/60 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Սեղմեք յուրաքանչյուր նախադասության վրա՝ թարգմանությունը տեսնելու համար
              </div>
            </div>

            {/* Paragraph list with interactive click-to-reveal */}
            <div className="space-y-4">
              {FULL_TEXT_PARAGRAPHS.map((item, index) => {
                const open = isRevealed(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleReveal(item.id)}
                    className={`group cursor-pointer rounded-xl p-4 transition-all border ${
                      open
                        ? 'bg-amber-50/40 border-amber-200/80 shadow-xs'
                        : 'bg-stone-50/70 hover:bg-stone-50 border-stone-200/80 hover:border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Sentence Index & Tag */}
                        <div className="flex items-center gap-2 mb-1.5 text-[11px] text-stone-400 font-mono">
                          <span className="w-5 h-5 rounded-full bg-stone-200/80 text-stone-600 flex items-center justify-center font-semibold text-[10px]">
                            {index + 1}
                          </span>
                          <span>🇪🇸 Español</span>
                          {!open && viewMode !== 'side-by-side' && (
                            <span className="text-amber-700 font-sans text-xs underline decoration-dotted">
                              (սեղմեք հայերենի համար)
                            </span>
                          )}
                        </div>

                        {/* Spanish Text */}
                        <p className="text-base text-stone-900 leading-relaxed font-medium">
                          {item.es}
                        </p>

                        {/* Armenian Translation (Toggled on click) */}
                        {open && (
                          <div className="mt-3 pt-3 border-t border-amber-200/60 text-stone-700 text-sm leading-relaxed bg-white/70 p-3 rounded-lg animate-in fade-in duration-200">
                            <div className="text-[11px] font-semibold text-amber-800 mb-1 flex items-center gap-1">
                              <span>🇦🇲 Հայերեն թարգմանություն:</span>
                            </div>
                            <p className="font-sans text-stone-800 font-normal">
                              {item.arm}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right action buttons: Audio & Copy */}
                      <div className="flex items-center gap-1 shrink-0 pt-1">
                        <button
                          onClick={(e) => handlePlayAudio(item.id, item.es, e)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-amber-700 hover:bg-white transition-colors"
                          title="Լսել արտասանությունը"
                        >
                          <Volume2 className={`w-4 h-4 ${speakingId === item.id ? 'text-amber-600 animate-pulse' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => handleCopy(item.id, `${item.es}\n${item.arm}`, e)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white transition-colors"
                          title="Պատճենել"
                        >
                          {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 2: EXPLICACIÓN DETALLADA / ՄԱՆՐԱՄԱՍՆ ԲԱՑԱՏՐՈՒԹՅՈՒՆ */}
        {(activeTab === 'all' || activeTab === 'detailed') && (
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">2. Բաժին</span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                Explicación detallada
                <span className="text-base sm:text-lg font-sans font-normal text-stone-500 ml-2">
                  / Մանրամասն բացատրություն
                </span>
              </h2>
            </div>

            <div className="space-y-8">
              {DETAILED_SECTIONS.map((sec) => (
                <div key={sec.id} className="border border-stone-200 rounded-xl p-5 bg-[#FDFDFC]">
                  {/* Section Title */}
                  <div className="flex items-baseline gap-2 mb-4 pb-2 border-b border-stone-200">
                    <span className="text-amber-700 font-bold font-mono text-lg">{sec.num}.</span>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-display">
                        {sec.titleEs}
                      </h3>
                      <div className="text-sm font-medium text-stone-600 font-sans">
                        {sec.titleArm}
                      </div>
                    </div>
                  </div>

                  {/* Direct Items if present */}
                  {sec.items && sec.items.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {sec.items.map((item) => {
                        const open = isRevealed(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleReveal(item.id)}
                            className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                              open
                                ? 'bg-amber-50/50 border-amber-200'
                                : 'bg-white hover:bg-stone-50 border-stone-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="text-xs font-semibold text-stone-400 mb-1 flex items-center gap-1.5">
                                  <span>🇪🇸</span>
                                  {!open && viewMode !== 'side-by-side' && (
                                    <span className="text-amber-700 text-[11px] underline">սեղմեք թարգմանության համար</span>
                                  )}
                                </div>
                                <div className="text-stone-900 font-medium text-sm sm:text-base">
                                  {item.es}
                                </div>
                                {open && (
                                  <div className="mt-2 pt-2 border-t border-amber-200/60 text-stone-700 text-sm font-sans">
                                    <span className="font-semibold text-amber-800 text-xs">🇦🇲 </span>
                                    {item.arm}
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={(e) => handlePlayAudio(item.id, item.es, e)}
                                className="p-1 text-stone-400 hover:text-amber-700"
                                title="Լսել"
                              >
                                <Volume2 className={`w-4 h-4 ${speakingId === item.id ? 'text-amber-600 animate-pulse' : ''}`} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Subsections (like Corteza, Manto, Núcleo) */}
                  {sec.subsections && sec.subsections.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {sec.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between">
                          <div>
                            {sub.subtitleEs && (
                              <div className="mb-3 pb-2 border-b border-stone-100">
                                <h4 className="font-bold text-amber-900 text-base">{sub.subtitleEs}</h4>
                                <div className="text-xs text-stone-600">{sub.subtitleArm}</div>
                              </div>
                            )}

                            <div className="space-y-2.5">
                              {sub.items.map((item) => {
                                const open = isRevealed(item.id);
                                return (
                                  <div
                                    key={item.id}
                                    onClick={() => toggleReveal(item.id)}
                                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                                      open ? 'bg-amber-50/60 border-amber-200' : 'bg-stone-50/50 hover:bg-stone-50 border-stone-100'
                                    }`}
                                  >
                                    <div className="text-stone-900 font-medium">{item.es}</div>
                                    {open && (
                                      <div className="mt-1.5 pt-1.5 border-t border-amber-200 text-stone-700 font-sans">
                                        🇦🇲 {item.arm}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* "Para recordar" Note */}
                          {sub.noteEs && (
                            <div className="mt-3 pt-3 border-t border-stone-200 text-xs bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                              <div className="font-semibold text-amber-900">📌 {sub.noteEs}</div>
                              <div className="text-amber-800 mt-0.5">{sub.noteArm}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bullet items (e.g. propiedades de minerales, procesos internos, procesos externos) */}
                  {sec.bulletItems && (
                    <div className="mt-4 pt-3 border-t border-stone-200">
                      {sec.bulletItems.map((bGroup, bIdx) => (
                        <div key={bIdx} className="space-y-2">
                          <div className="text-xs font-semibold text-stone-600 flex items-center gap-2">
                            <span>🇪🇸 {bGroup.labelEs}</span>
                            <span className="text-stone-400">·</span>
                            <span>🇦🇲 {bGroup.labelArm}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            {bGroup.items?.map((item) => {
                              const open = isRevealed(item.id);
                              return (
                                <div
                                  key={item.id}
                                  onClick={() => toggleReveal(item.id)}
                                  className={`p-3 rounded-lg border cursor-pointer text-sm transition-all flex items-center justify-between ${
                                    open
                                      ? 'bg-amber-100/70 border-amber-300 text-amber-950 font-medium'
                                      : 'bg-white hover:bg-amber-50/40 border-stone-200 text-stone-800'
                                  }`}
                                >
                                  <div>
                                    <span className="font-semibold">🇪🇸 {item.es}</span>
                                    {open ? (
                                      <span className="block text-xs font-normal text-amber-900 mt-1">
                                        🇦🇲 {item.arm}
                                      </span>
                                    ) : (
                                      <span className="block text-[11px] text-stone-400 mt-0.5">
                                        (սեղմեք թարգմանության համար)
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={(e) => handlePlayAudio(item.id, item.es, e)}
                                    className="p-1 text-stone-400 hover:text-amber-800"
                                    title="Լսել"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: VOCABULARIO IMPORTANTE / ԿԱՐԵՎՈՐ ԲԱՌԱՊԱՇԱՐ */}
        {(activeTab === 'all' || activeTab === 'vocab') && (
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">3. Բաժին</span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  Vocabulario importante
                  <span className="text-base sm:text-lg font-sans font-normal text-stone-500 ml-2">
                    / Կարևոր բառապաշար
                  </span>
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs bg-stone-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedVocabCategory('all')}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    selectedVocabCategory === 'all' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Բոլոր 20 բառերը
                </button>
                <button
                  onClick={() => setSelectedVocabCategory('capas')}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    selectedVocabCategory === 'capas' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Շերտեր (Capas)
                </button>
                <button
                  onClick={() => setSelectedVocabCategory('materiales')}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    selectedVocabCategory === 'materiales' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Ապարներ & Հանքեր
                </button>
                <button
                  onClick={() => setSelectedVocabCategory('procesos')}
                  className={`px-3 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    selectedVocabCategory === 'procesos' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Գործընթացներ
                </button>
              </div>
            </div>

            {/* Vocab Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredVocab.map((word) => {
                const wordId = `vocab-${word.id}`;
                const open = isRevealed(wordId);
                return (
                  <div
                    key={word.id}
                    onClick={() => toggleReveal(wordId)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      open
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                        : 'bg-stone-50/60 hover:bg-amber-50/30 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 text-[11px] text-stone-400 mb-1">
                        <span className="font-mono">#{word.id}</span>
                        <button
                          onClick={(e) => handlePlayAudio(wordId, word.es, e)}
                          className="p-1 hover:text-amber-700"
                          title="Լսել"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-base font-semibold text-stone-900 tracking-tight">
                        {word.es}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/60">
                      {open ? (
                        <div className="text-sm font-medium text-amber-900 font-sans animate-in fade-in">
                          🇦🇲 {word.arm}
                        </div>
                      ) : (
                        <div className="text-xs text-stone-400 flex items-center justify-between">
                          <span>Սեղմեք բացելու</span>
                          <span>🔒</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 4: PREGUNTAS Y RESPUESTAS / ՀԱՐՑԵՐ ԵՎ ՊԱՏԱՍԽԱՆՆԵՐ (16 Q&As) */}
        {(activeTab === 'all' || activeTab === 'qa') && (
          <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">4. Բաժին</span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900">
                  Preguntas y respuestas
                  <span className="text-base sm:text-lg font-sans font-normal text-stone-500 ml-2">
                    / Հարցեր և պատասխաններ (16)
                  </span>
                </h2>
              </div>
              <div className="text-xs text-stone-500">
                Սեղմեք հարցի կամ պատասխանի վրա՝ հայերենը բացելու համար
              </div>
            </div>

            <div className="space-y-4">
              {filteredQA.map((qa) => {
                const qId = `qa-q-${qa.id}`;
                const aId = `qa-a-${qa.id}`;
                const qOpen = isRevealed(qId);
                const aOpen = isRevealed(aId);

                return (
                  <div key={qa.id} className="border border-stone-200 rounded-xl overflow-hidden bg-[#FAFAF9]">
                    {/* Question Row */}
                    <div
                      onClick={() => toggleReveal(qId)}
                      className={`p-4 cursor-pointer transition-colors border-b border-stone-200/80 flex items-start justify-between gap-3 ${
                        qOpen ? 'bg-amber-50/60' : 'bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-700 flex items-center justify-center text-xs font-bold font-mono">
                            {qa.id}
                          </span>
                          <span className="text-xs font-semibold text-stone-500">Հարց (Pregunta)</span>
                        </div>
                        <div className="text-stone-900 font-semibold text-base">
                          {qa.questionEs}
                        </div>
                        {qOpen && (
                          <div className="mt-2 text-stone-700 text-sm font-sans pt-1 border-t border-stone-200/60">
                            🇦🇲 {qa.questionArm}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => handlePlayAudio(qId, qa.questionEs, e)}
                          className="p-1.5 text-stone-400 hover:text-amber-700"
                          title="Լսել հարցը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${qOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    {/* Answer Row */}
                    <div
                      onClick={() => toggleReveal(aId)}
                      className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                        aOpen ? 'bg-emerald-50/50' : 'bg-[#FAFAF9] hover:bg-stone-100/60'
                      }`}
                    >
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-emerald-800 block mb-1">
                          Պատասխան (Respuesta)
                        </span>
                        <div className="text-stone-900 font-medium text-sm sm:text-base">
                          {qa.answerEs}
                        </div>
                        {aOpen ? (
                          <div className="mt-2 text-stone-700 text-sm font-sans pt-1 border-t border-emerald-200/50">
                            🇦🇲 {qa.answerArm}
                          </div>
                        ) : (
                          <div className="text-xs text-stone-400 mt-1">
                            (սեղմեք հայերեն պատասխանի համար)
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => handlePlayAudio(aId, qa.answerEs, e)}
                        className="p-1.5 text-stone-400 hover:text-emerald-700"
                        title="Լսել պատասխանը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 5: TEXTO CORTO PARA RESPONDER / ԿԱՐՃ ՏԵՔՍՏ ՊԱՏԱՍԽԱՆԵԼՈՒ ՀԱՄԱՐ */}
        {(activeTab === 'all' || activeTab === 'exam') && (
          <section className="bg-gradient-to-br from-amber-50/90 via-white to-stone-50 rounded-2xl border-2 border-amber-300/80 p-6 sm:p-8 shadow-sm">
            <div className="border-b border-amber-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  5. Ամփոփում
                </span>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-stone-900 mt-2">
                  Texto corto para responder
                  <span className="block sm:inline text-sm sm:text-base font-sans font-normal text-stone-600 sm:ml-2">
                    / Կարճ տեքստ՝ պատասխանելու համար
                  </span>
                </h2>
              </div>
              <button
                onClick={(e) => {
                  const fullEs = SHORT_TEXT_PARAGRAPHS.map(p => p.es).join(' ');
                  handlePlayAudio('exam-all', fullEs, e);
                }}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-xs self-start"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Լսել ամբողջ տեքստը
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Spanish Column */}
              <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                  <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <span>🇪🇸</span> Español (Հիմնական պատասխան)
                  </span>
                  <button
                    onClick={(e) => handleCopy('exam-es', SHORT_TEXT_PARAGRAPHS.map(p => p.es).join('\n'), e)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Պատճենել
                  </button>
                </div>
                <div className="space-y-3">
                  {SHORT_TEXT_PARAGRAPHS.map((item, idx) => {
                    const open = isRevealed(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleReveal(item.id)}
                        className={`p-3 rounded-lg cursor-pointer transition-all border ${
                          open
                            ? 'bg-amber-50/80 border-amber-300'
                            : 'bg-stone-50 hover:bg-amber-50/40 border-stone-200/80'
                        }`}
                      >
                        <p className="text-stone-900 text-sm leading-relaxed font-medium">
                          {item.es}
                        </p>
                        {open && (
                          <div className="mt-2 pt-2 border-t border-amber-200 text-xs text-stone-700 font-sans">
                            🇦🇲 {item.arm}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Armenian Translation Column */}
              <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-100">
                  <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                    <span>🇦🇲</span> Հայերեն (Թարգմանություն և իմաստ)
                  </span>
                  <button
                    onClick={(e) => handleCopy('exam-arm', SHORT_TEXT_PARAGRAPHS.map(p => p.arm).join('\n'), e)}
                    className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Պատճենել
                  </button>
                </div>
                <div className="space-y-3">
                  {SHORT_TEXT_PARAGRAPHS.map((item) => (
                    <div key={`arm-${item.id}`} className="p-3 rounded-lg bg-stone-50/80 border border-stone-200/80">
                      <p className="text-stone-800 text-sm leading-relaxed font-sans">
                        {item.arm}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-6 text-stone-500 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            UNIT 1: THE GEOSPHERE · LA GEOSFERA · ԳԵՈՍՖԵՐԱՆ
          </div>
          <div className="text-stone-400">
            Իսպաներեն-հայերեն ինտերակտիվ ուսումնական ձեռնարկ
          </div>
        </div>
      </footer>
    </div>
  );
}
