import { useState, useCallback } from "react";

// ─── PALETTE ───────────────────────────────────────────────
const C = {
  bg: "#F4EFE6",
  primary: "#1C4587",
  primaryDk: "#0F2D5E",
  gold: "#C9920A",
  goldLight: "#FFF8E1",
  goldBorder: "#E8C547",
  teal: "#0D7377",
  tealLight: "#E0F4F4",
  card: "#FFFFFF",
  success: "#1B5E3B",
  successBg: "#E6F4EA",
  error: "#B71C1C",
  errorBg: "#FDECEA",
  text: "#1A1A2E",
  muted: "#6B6B7B",
  border: "#DDD5C3",
};

// ─── DATA: 40 CORRECT UZBEK WORDS ──────────────────────────
const WORDS = [
  {id:1,uz:"Salom",cat:"Salomlashish",t:{ru:"Привет",en:"Hello",ko:"안녕하세요",zh:"你好",de:"Hallo",tr:"Merhaba"}},
  {id:2,uz:"Xayr",cat:"Salomlashish",t:{ru:"До свидания",en:"Goodbye",ko:"안녕히 가세요",zh:"再见",de:"Auf Wiedersehen",tr:"Hoşça kal"}},
  {id:3,uz:"Rahmat",cat:"Odob",t:{ru:"Спасибо",en:"Thank you",ko:"감사합니다",zh:"谢谢",de:"Danke",tr:"Teşekkür ederim"}},
  {id:4,uz:"Iltimos",cat:"Odob",t:{ru:"Пожалуйста",en:"Please",ko:"부탁합니다",zh:"请",de:"Bitte",tr:"Lütfen"}},
  {id:5,uz:"Kechirasiz",cat:"Odob",t:{ru:"Извините",en:"Excuse me",ko:"실례합니다",zh:"打扰一下",de:"Entschuldigung",tr:"Affedersiniz"}},
  {id:6,uz:"Ha",cat:"Asosiy",t:{ru:"Да",en:"Yes",ko:"네",zh:"是",de:"Ja",tr:"Evet"}},
  {id:7,uz:"Yo'q",cat:"Asosiy",t:{ru:"Нет",en:"No",ko:"아니요",zh:"不",de:"Nein",tr:"Hayır"}},
  {id:8,uz:"Yaxshi",cat:"Sifat",t:{ru:"Хорошо",en:"Good",ko:"좋아요",zh:"好",de:"Gut",tr:"İyi"}},
  {id:9,uz:"Men",cat:"Olmosh",t:{ru:"Я",en:"I",ko:"나",zh:"我",de:"Ich",tr:"Ben"}},
  {id:10,uz:"Sen",cat:"Olmosh",t:{ru:"Ты",en:"You",ko:"너",zh:"你",de:"Du",tr:"Sen"}},
  {id:11,uz:"U",cat:"Olmosh",t:{ru:"Он / Она",en:"He / She",ko:"그 / 그녀",zh:"他 / 她",de:"Er / Sie",tr:"O"}},
  {id:12,uz:"Biz",cat:"Olmosh",t:{ru:"Мы",en:"We",ko:"우리",zh:"我们",de:"Wir",tr:"Biz"}},
  {id:13,uz:"Bir",cat:"Son",t:{ru:"Один",en:"One",ko:"하나",zh:"一",de:"Eins",tr:"Bir"}},
  {id:14,uz:"Ikki",cat:"Son",t:{ru:"Два",en:"Two",ko:"둘",zh:"二",de:"Zwei",tr:"İki"}},
  {id:15,uz:"Uch",cat:"Son",t:{ru:"Три",en:"Three",ko:"셋",zh:"三",de:"Drei",tr:"Üç"}},
  {id:16,uz:"To'rt",cat:"Son",t:{ru:"Четыре",en:"Four",ko:"넷",zh:"四",de:"Vier",tr:"Dört"}},
  {id:17,uz:"Besh",cat:"Son",t:{ru:"Пять",en:"Five",ko:"다섯",zh:"五",de:"Fünf",tr:"Beş"}},
  {id:18,uz:"O'n",cat:"Son",t:{ru:"Десять",en:"Ten",ko:"열",zh:"十",de:"Zehn",tr:"On"}},
  {id:19,uz:"Non",cat:"Ovqat",t:{ru:"Хлеб",en:"Bread",ko:"빵",zh:"面包",de:"Brot",tr:"Ekmek"}},
  {id:20,uz:"Suv",cat:"Ovqat",t:{ru:"Вода",en:"Water",ko:"물",zh:"水",de:"Wasser",tr:"Su"}},
  {id:21,uz:"Go'sht",cat:"Ovqat",t:{ru:"Мясо",en:"Meat",ko:"고기",zh:"肉",de:"Fleisch",tr:"Et"}},
  {id:22,uz:"Meva",cat:"Ovqat",t:{ru:"Фрукт",en:"Fruit",ko:"과일",zh:"水果",de:"Obst",tr:"Meyve"}},
  {id:23,uz:"Choy",cat:"Ovqat",t:{ru:"Чай",en:"Tea",ko:"차",zh:"茶",de:"Tee",tr:"Çay"}},
  {id:24,uz:"Guruch",cat:"Ovqat",t:{ru:"Рис",en:"Rice",ko:"쌀",zh:"米饭",de:"Reis",tr:"Pirinç"}},
  {id:25,uz:"Ona",cat:"Oila",t:{ru:"Мама",en:"Mother",ko:"어머니",zh:"妈妈",de:"Mutter",tr:"Anne"}},
  {id:26,uz:"Ota",cat:"Oila",t:{ru:"Папа",en:"Father",ko:"아버지",zh:"爸爸",de:"Vater",tr:"Baba"}},
  {id:27,uz:"Aka",cat:"Oila",t:{ru:"Старший брат",en:"Older brother",ko:"형 / 오빠",zh:"哥哥",de:"Älterer Bruder",tr:"Ağabey"}},
  {id:28,uz:"Opa",cat:"Oila",t:{ru:"Старшая сестра",en:"Older sister",ko:"누나 / 언니",zh:"姐姐",de:"Ältere Schwester",tr:"Abla"}},
  {id:29,uz:"Uy",cat:"Joy",t:{ru:"Дом",en:"House",ko:"집",zh:"家",de:"Haus",tr:"Ev"}},
  {id:30,uz:"Maktab",cat:"Joy",t:{ru:"Школа",en:"School",ko:"학교",zh:"学校",de:"Schule",tr:"Okul"}},
  {id:31,uz:"Do'kon",cat:"Joy",t:{ru:"Магазин",en:"Shop",ko:"가게",zh:"商店",de:"Laden",tr:"Dükkan"}},
  {id:32,uz:"Kitob",cat:"Narsa",t:{ru:"Книга",en:"Book",ko:"책",zh:"书",de:"Buch",tr:"Kitap"}},
  {id:33,uz:"Qalam",cat:"Narsa",t:{ru:"Ручка",en:"Pen",ko:"펜",zh:"笔",de:"Stift",tr:"Kalem"}},
  {id:34,uz:"Do'st",cat:"Odamlar",t:{ru:"Друг",en:"Friend",ko:"친구",zh:"朋友",de:"Freund",tr:"Arkadaş"}},
  {id:35,uz:"Qizil",cat:"Rang",t:{ru:"Красный",en:"Red",ko:"빨간색",zh:"红色",de:"Rot",tr:"Kırmızı"}},
  {id:36,uz:"Ko'k",cat:"Rang",t:{ru:"Синий",en:"Blue",ko:"파란색",zh:"蓝色",de:"Blau",tr:"Mavi"}},
  {id:37,uz:"Yashil",cat:"Rang",t:{ru:"Зелёный",en:"Green",ko:"초록색",zh:"绿色",de:"Grün",tr:"Yeşil"}},
  {id:38,uz:"Bormoq",cat:"Fe'l",t:{ru:"Идти",en:"To go",ko:"가다",zh:"去",de:"Gehen",tr:"Gitmek"}},
  {id:39,uz:"Kelmoq",cat:"Fe'l",t:{ru:"Приходить",en:"To come",ko:"오다",zh:"来",de:"Kommen",tr:"Gelmek"}},
  {id:40,uz:"Yemoq",cat:"Fe'l",t:{ru:"Есть / Кушать",en:"To eat",ko:"먹다",zh:"吃",de:"Essen",tr:"Yemek"}},
];

const LANGS = [
  {code:"ru",name:"Русский",flag:"🇷🇺",speech:"ru-RU"},
  {code:"en",name:"English",flag:"🇬🇧",speech:"en-US"},
  {code:"ko",name:"한국어",flag:"🇰🇷",speech:"ko-KR"},
  {code:"zh",name:"中文",flag:"🇨🇳",speech:"zh-CN"},
  {code:"de",name:"Deutsch",flag:"🇩🇪",speech:"de-DE"},
  {code:"tr",name:"Türkçe",flag:"🇹🇷",speech:"tr-TR"},
];

const LESSON_SIZE = 8;

// ─── SPEECH ────────────────────────────────────────────────
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang; u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

// ─── AI HELPERS ────────────────────────────────────────────
async function aiGenExercise(word, translation, langName) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: `Make a simple short sentence in ${langName} using the word "${translation}". Replace the word with "___". Reply ONLY with valid JSON, no markdown: {"sentence":"...","answer":"${translation}"}`
      }]
    })
  });
  const d = await res.json();
  const raw = d.content?.find(b => b.type === "text")?.text || "{}";
  try { return JSON.parse(raw.replace(/```json|```/g,"").trim()); }
  catch { return { sentence: `___ (${word})`, answer: translation }; }
}

async function aiCheckAnswer(userAns, correctAns, langName) {
  if (userAns.trim().toLowerCase() === correctAns.trim().toLowerCase())
    return { correct: true, msg: "Ajoyib! Bilasiz! 🎉" };
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 80,
      messages: [{
        role: "user",
        content: `In ${langName}: is "${userAns}" an acceptable equivalent of "${correctAns}"? Reply ONLY JSON: {"correct":true/false,"msg":"short feedback in Uzbek max 8 words"}`
      }]
    })
  });
  const d = await res.json();
  const raw = d.content?.find(b => b.type === "text")?.text || '{"correct":false,"msg":"Xato"}';
  try { return JSON.parse(raw.replace(/```json|```/g,"").trim()); }
  catch { return { correct: false, msg: `To'g'ri javob: ${correctAns}` }; }
}

// ─── STYLES ────────────────────────────────────────────────
const S = {
  app: { minHeight:"100vh", background:C.bg, fontFamily:"'DM Sans',system-ui,sans-serif", color:C.text },
  // header
  header: { background:`linear-gradient(135deg,${C.primaryDk},${C.primary})`, padding:"14px 16px", position:"sticky", top:0, zIndex:50 },
  headerRow: { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 },
  logo: { display:"flex", alignItems:"center", gap:8 },
  logoIcon: { width:36, height:36, background:`linear-gradient(135deg,${C.gold},#F5C842)`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 },
  logoText: { fontSize:20, fontWeight:800, color:"#fff", letterSpacing:-0.5 },
  pill: { display:"flex", alignItems:"center", gap:4, padding:"4px 10px", borderRadius:20, fontSize:13, fontWeight:700 },
  // home
  hero: { padding:"24px 16px 8px", textAlign:"center" },
  heroTitle: { fontSize:26, fontWeight:900, color:C.primary, marginBottom:6 },
  heroSub: { fontSize:14, color:C.muted },
  grid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"12px 14px 32px" },
  langCard: { background:C.card, borderRadius:16, padding:"14px 12px 12px", cursor:"pointer", border:`2px solid ${C.border}`, transition:"all .15s", userSelect:"none" },
  langCardActive: { borderColor:C.primary, boxShadow:`0 0 0 3px ${C.primary}22` },
  langFlag: { fontSize:32, display:"block", marginBottom:6 },
  langName: { fontSize:14, fontWeight:800, color:C.text, marginBottom:2 },
  langXP: { fontSize:11, color:C.muted, fontWeight:600, marginBottom:8 },
  startBtn: { width:"100%", padding:"9px 0", background:`linear-gradient(135deg,${C.primary},${C.teal})`, border:"none", borderRadius:10, color:"#fff", fontSize:13, fontWeight:800, cursor:"pointer", borderBottom:`3px solid ${C.primaryDk}` },
  // progress
  progressTrack: { height:10, background:"rgba(255,255,255,0.2)", borderRadius:6, overflow:"hidden" },
  progressFill: { height:"100%", background:`linear-gradient(90deg,${C.goldBorder},${C.gold})`, borderRadius:6, transition:"width .4s ease" },
  counterText: { fontSize:11, color:"rgba(255,255,255,0.6)", textAlign:"right", marginTop:3, fontWeight:600 },
  backBtn: { background:"rgba(255,255,255,0.15)", border:"none", cursor:"pointer", padding:"7px 10px", borderRadius:10, color:"#fff", fontSize:14, fontWeight:700, display:"flex", alignItems:"center", gap:4 },
  xpPill: { background:C.goldLight, color:C.gold, border:`1px solid ${C.goldBorder}` },
  // lesson
  lessonBody: { padding:"16px 14px", display:"flex", flexDirection:"column", gap:12 },
  wordCard: { background:C.card, borderRadius:18, padding:"24px 16px 20px", textAlign:"center", border:`1.5px solid ${C.border}`, boxShadow:"0 2px 12px rgba(0,0,0,0.06)" },
  catBadge: { display:"inline-block", padding:"3px 10px", borderRadius:20, background:C.tealLight, color:C.teal, fontSize:11, fontWeight:700, marginBottom:8 },
  wordBig: { fontSize:48, fontWeight:900, color:C.primary, margin:"8px 0", letterSpacing:-1 },
  audioBtn: { background:"none", border:`1.5px solid ${C.border}`, borderRadius:20, padding:"6px 14px", color:C.muted, cursor:"pointer", fontSize:13, fontWeight:600, display:"inline-flex", alignItems:"center", gap:5 },
  // exercise pick
  exPickGrid: { display:"grid", gridTemplateColumns:"1fr", gap:8 },
  exBtn: { padding:"14px 16px", border:`2px solid ${C.border}`, borderRadius:14, background:C.card, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:12, fontFamily:"inherit" },
  exBtnEmoji: { fontSize:24, width:36, textAlign:"center" },
  exBtnLabel: { fontSize:15, fontWeight:800, color:C.text, display:"block" },
  exBtnSub: { fontSize:12, color:C.muted, fontWeight:500 },
  // flashcard reveal
  revealCard: { background:`linear-gradient(135deg,${C.tealLight},#E8F4FF)`, border:`1.5px solid #B2DFDB`, borderRadius:16, padding:"28px 16px", textAlign:"center" },
  revealLabel: { fontSize:11, color:C.teal, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:6 },
  revealWord: { fontSize:36, fontWeight:900, color:C.primary },
  // multiple choice
  mcQ: { fontSize:15, fontWeight:700, color:C.muted, textAlign:"center" },
  mcOpts: { display:"flex", flexDirection:"column", gap:8 },
  mcOpt: { padding:"14px 16px", border:`2px solid ${C.border}`, borderRadius:12, background:C.card, cursor:"pointer", fontSize:16, fontWeight:700, color:C.text, textAlign:"left", fontFamily:"inherit", transition:"all .12s" },
  mcOptCorrect: { background:C.successBg, borderColor:C.success, color:C.success },
  mcOptWrong: { background:C.errorBg, borderColor:C.error, color:C.error },
  // AI exercise
  aiCard: { background:C.card, borderRadius:16, padding:"20px 16px", border:`1.5px solid ${C.goldBorder}` },
  aiLabel: { fontSize:11, color:C.gold, fontWeight:700, textTransform:"uppercase", letterSpacing:1, marginBottom:8, display:"flex", alignItems:"center", gap:5 },
  aiSentence: { fontSize:17, fontWeight:700, color:C.text, lineHeight:1.6, marginBottom:14 },
  aiInput: { width:"100%", padding:"12px 14px", border:`2px solid ${C.border}`, borderRadius:12, fontSize:16, fontWeight:600, fontFamily:"inherit", color:C.text, background:"#FAFAFA", outline:"none", boxSizing:"border-box" },
  aiInputFocus: { borderColor:C.primary },
  checkBtn: { width:"100%", padding:"14px", background:`linear-gradient(135deg,${C.primary},${C.teal})`, border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", borderBottom:`3px solid ${C.primaryDk}`, fontFamily:"inherit" },
  // feedback
  feedbackBox: { borderRadius:14, padding:"14px 16px", textAlign:"center" },
  feedbackOk: { background:C.successBg, border:`1.5px solid ${C.success}` },
  feedbackErr: { background:C.errorBg, border:`1.5px solid ${C.error}` },
  feedbackTitle: { fontSize:18, fontWeight:900, marginBottom:4 },
  feedbackSub: { fontSize:13, fontWeight:600, marginBottom:10 },
  // action buttons
  greenBtn: { width:"100%", padding:"15px", background:"#1B7F4A", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", borderBottom:"3px solid #145C35", fontFamily:"inherit" },
  redBtn: { width:"100%", padding:"15px", background:C.error, border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", borderBottom:"3px solid #7F1010", fontFamily:"inherit" },
  // complete
  completeWrap: { padding:"20px 14px" },
  completeCard: { background:C.card, borderRadius:20, padding:"36px 20px", textAlign:"center", border:`1.5px solid ${C.border}`, boxShadow:"0 4px 20px rgba(0,0,0,0.08)" },
  trophyAnim: { fontSize:64, marginBottom:16, display:"block" },
  completeTitle: { fontSize:30, fontWeight:900, color:C.primary, marginBottom:6 },
  completeSub: { fontSize:15, color:C.muted, marginBottom:20 },
  xpBig: { background:C.goldLight, border:`2px solid ${C.goldBorder}`, borderRadius:14, padding:"16px", marginBottom:20 },
  xpBigNum: { fontSize:38, fontWeight:900, color:C.gold },
  xpBigLabel: { fontSize:12, color:C.gold, fontWeight:700 },
  statRow: { display:"flex", gap:10, marginBottom:20 },
  statBox: { flex:1, borderRadius:12, padding:"14px 10px", textAlign:"center" },
  homeBtn: { width:"100%", padding:"15px", background:`linear-gradient(135deg,${C.primary},${C.teal})`, border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", borderBottom:`3px solid ${C.primaryDk}`, fontFamily:"inherit" },
  // loading spinner
  spinner: { display:"inline-block", width:20, height:20, border:"3px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.8s linear infinite" },
};

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function UzLingua() {
  const [screen, setScreen]           = useState("home");
  const [lang, setLang]               = useState(null);
  const [sessionWords, setSessionWords] = useState([]);
  const [idx, setIdx]                 = useState(0);
  const [exType, setExType]           = useState(null);
  const [sessionXP, setSessionXP]     = useState(0);
  const [totalXP, setTotalXP]         = useState(0);
  const [langXP, setLangXP]           = useState({});
  const [mcOpts, setMcOpts]           = useState([]);
  const [chosen, setChosen]           = useState(null);
  const [isOk, setIsOk]               = useState(null);
  const [aiEx, setAiEx]               = useState(null);
  const [aiLoading, setAiLoading]     = useState(false);
  const [inputVal, setInputVal]       = useState("");
  const [inputFocus, setInputFocus]   = useState(false);
  const [aiFb, setAiFb]               = useState(null);
  const [checking, setChecking]       = useState(false);
  const [answered, setAnswered]       = useState(false);

  const word = sessionWords[idx];
  const langData = LANGS.find(l => l.code === lang);
  const trans = word?.t[lang] ?? "";
  const progress = sessionWords.length ? (idx / sessionWords.length) * 100 : 0;

  // ── Start lesson ──
  const startLesson = useCallback((code) => {
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5).slice(0, LESSON_SIZE);
    setLang(code); setSessionWords(shuffled); setIdx(0);
    setExType(null); setSessionXP(0); setAnswered(false);
    setChosen(null); setIsOk(null); setAiEx(null); setAiFb(null);
    setScreen("lesson");
  }, []);

  // ── Next word ──
  const nextWord = useCallback((xpGain = 0) => {
    const newXP = sessionXP + xpGain;
    setSessionXP(newXP);
    if (idx + 1 >= sessionWords.length) {
      setTotalXP(p => p + newXP);
      setLangXP(p => ({ ...p, [lang]: (p[lang] || 0) + newXP }));
      setScreen("complete");
    } else {
      setIdx(i => i + 1);
      setExType(null); setChosen(null); setIsOk(null);
      setAiEx(null); setAiFb(null); setInputVal(""); setAnswered(false);
    }
    window.scrollTo(0, 0);
  }, [idx, sessionWords.length, sessionXP, lang]);

  // ── Choose exercise ──
  const pickEx = useCallback(async (type) => {
    setExType(type);
    if (type === "choice") {
      const others = WORDS.filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.t[lang]);
      setMcOpts([trans, ...others].sort(() => Math.random() - 0.5));
    }
    if (type === "ai") {
      setAiLoading(true);
      try {
        const ex = await aiGenExercise(word.uz, trans, langData?.name ?? "English");
        setAiEx(ex);
      } catch { setAiEx({ sentence: `___ (${word.uz})`, answer: trans }); }
      setAiLoading(false);
    }
  }, [word, trans, lang, langData]);

  // ── Multiple choice answer ──
  const chooseAnswer = useCallback((opt) => {
    if (answered) return;
    setChosen(opt); setAnswered(true);
    setIsOk(opt === trans);
  }, [answered, trans]);

  // ── AI submit ──
  const submitAI = useCallback(async () => {
    if (!inputVal.trim() || checking) return;
    setChecking(true);
    const result = await aiCheckAnswer(inputVal.trim(), trans, langData?.name ?? "");
    setAiFb(result); setChecking(false); setAnswered(true);
  }, [inputVal, trans, langData, checking]);

  // ─── HOME SCREEN ──────────────────────────────────────────
  if (screen === "home") return (
    <div style={S.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');@keyframes spin{to{transform:rotate(360deg)}}@keyframes pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerRow}>
          <div style={S.logo}>
            <div style={S.logoIcon}>✦</div>
            <span style={S.logoText}>UzLingua</span>
          </div>
          <div style={{display:"flex",gap:8}}>
            <div style={{...S.pill, background:"rgba(255,255,255,0.15)", color:"#fff"}}>
              ⚡ {totalXP} XP
            </div>
          </div>
        </div>
      </div>
      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroTitle}>Ўзбекчадан ўрган 🌏</div>
        <div style={S.heroSub}>6 та тилни Ipak Yo'li usulida</div>
      </div>
      {/* Language grid */}
      <div style={S.grid}>
        {LANGS.map(l => (
          <div key={l.code} style={{...S.langCard}} onClick={() => startLesson(l.code)}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.primary}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
            <span style={S.langFlag}>{l.flag}</span>
            <div style={S.langName}>{l.name}</div>
            <div style={S.langXP}>⚡ {langXP[l.code] || 0} XP</div>
            <button style={S.startBtn}>Boshlash →</button>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── COMPLETE SCREEN ─────────────────────────────────────
  if (screen === "complete") return (
    <div style={S.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
      <div style={S.header}>
        <div style={S.headerRow}>
          <div style={S.logo}><div style={S.logoIcon}>✦</div><span style={S.logoText}>UzLingua</span></div>
        </div>
      </div>
      <div style={S.completeWrap}>
        <div style={S.completeCard}>
          <span style={{...S.trophyAnim, animation:"bounce 1.2s ease infinite"}}>🏆</span>
          <div style={S.completeTitle}>Barakalla!</div>
          <div style={S.completeSub}>Siz {sessionWords.length} ta so'zni o'rgandingiz</div>
          <div style={S.xpBig}>
            <div style={S.xpBigLabel}>Bugun qazanildi</div>
            <div style={S.xpBigNum}>⚡ +{sessionXP} XP</div>
          </div>
          <div style={S.statRow}>
            <div style={{...S.statBox, background:"#EEF2FF", border:"1.5px solid #C7D2FE"}}>
              <div style={{fontSize:26,fontWeight:900,color:C.primary}}>{langData?.flag}</div>
              <div style={{fontSize:12,color:C.muted,fontWeight:700,marginTop:4}}>{langData?.name}</div>
            </div>
            <div style={{...S.statBox, background:C.goldLight, border:`1.5px solid ${C.goldBorder}`}}>
              <div style={{fontSize:26,fontWeight:900,color:C.gold}}>⚡{totalXP + sessionXP}</div>
              <div style={{fontSize:12,color:C.gold,fontWeight:700,marginTop:4}}>Jami XP</div>
            </div>
          </div>
          <button style={S.homeBtn} onClick={() => setScreen("home")}>
            Bosh sahifaga qaytish 🏠
          </button>
        </div>
      </div>
    </div>
  );

  // ─── LESSON SCREEN ───────────────────────────────────────
  return (
    <div style={S.app}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');@keyframes spin{to{transform:rotate(360deg)}}@keyframes pop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}`}</style>

      {/* Header */}
      <div style={S.header}>
        <div style={S.headerRow}>
          <button style={S.backBtn} onClick={() => setScreen("home")}>← Orqaga</button>
          <span style={{color:"#fff",fontWeight:800,fontSize:15}}>{langData?.flag} {langData?.name}</span>
          <div style={{...S.pill, ...S.xpPill}}>⚡+{sessionXP}</div>
        </div>
        <div style={S.progressTrack}>
          <div style={{...S.progressFill, width:`${progress}%`}} />
        </div>
        <div style={S.counterText}>{idx + 1} / {sessionWords.length}</div>
      </div>

      <div style={S.lessonBody}>
        {/* Word Card */}
        <div style={S.wordCard}>
          <div style={S.catBadge}>{word?.cat}</div>
          <div style={S.wordBig}>{word?.uz}</div>
          <button style={S.audioBtn} onClick={() => speak(word?.uz ?? "", "tr-TR")}>
            🔊 Eshit (O'zbekcha)
          </button>
        </div>

        {/* ── No exercise chosen yet ── */}
        {!exType && (
          <div style={S.exPickGrid}>
            <div style={{fontSize:13, color:C.muted, fontWeight:700, textAlign:"center"}}>
              Mashq turini tanlang:
            </div>
            {[
              {type:"flash", emoji:"📖", label:"Flesh-karta", sub:"Tarjimani ko'rsatish"},
              {type:"choice", emoji:"🎯", label:"Test", sub:"4 ta variant ichidan tanlash"},
              {type:"ai", emoji:"🤖", label:"AI Topshiriq", sub:"Claude sizga mashq beradi"},
            ].map(({type,emoji,label,sub}) => (
              <button key={type} style={S.exBtn} onClick={() => pickEx(type)}>
                <span style={S.exBtnEmoji}>{emoji}</span>
                <div>
                  <span style={S.exBtnLabel}>{label}</span>
                  <span style={S.exBtnSub}>{sub}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Flashcard ── */}
        {exType === "flash" && (
          <>
            <div style={{...S.revealCard, animation:"pop .3s ease"}}>
              <div style={S.revealLabel}>Tarjima — {langData?.name}</div>
              <div style={S.revealWord}>{trans}</div>
              <div style={{marginTop:10}}>
                <button style={S.audioBtn} onClick={() => speak(trans, langData?.speech ?? "en-US")}>
                  🔊 Eshit
                </button>
              </div>
            </div>
            <button style={S.greenBtn} onClick={() => nextWord(5)}>
              O'rgandim ✓  (+5 XP)
            </button>
          </>
        )}

        {/* ── Multiple choice ── */}
        {exType === "choice" && (
          <>
            <div style={S.mcQ}>"{word?.uz}" — qaysi ma'nosi?</div>
            <div style={S.mcOpts}>
              {mcOpts.map((opt, i) => {
                const base = {...S.mcOpt};
                if (answered && opt === trans) Object.assign(base, S.mcOptCorrect);
                else if (answered && opt === chosen && opt !== trans) Object.assign(base, S.mcOptWrong);
                return (
                  <button key={i} style={base} onClick={() => chooseAnswer(opt)}>
                    {opt}
                    {answered && opt === trans && " ✓"}
                    {answered && opt === chosen && opt !== trans && " ✗"}
                  </button>
                );
              })}
            </div>
            {answered && (
              <div style={{...S.feedbackBox, ...(isOk ? S.feedbackOk : S.feedbackErr), animation:"pop .3s ease"}}>
                <div style={{...S.feedbackTitle, color: isOk ? C.success : C.error}}>
                  {isOk ? "✓ To'g'ri!" : "✗ Xato"}
                </div>
                {!isOk && <div style={{...S.feedbackSub, color:C.error}}>To'g'ri javob: {trans}</div>}
                {isOk
                  ? <button style={S.greenBtn} onClick={() => nextWord(10)}>Keyingi so'z → (+10 XP)</button>
                  : <button style={S.redBtn} onClick={() => { setAnswered(false); setChosen(null); setIsOk(null); setMcOpts(p => [...p].sort(() => Math.random()-.5)); }}>Qayta urining</button>
                }
              </div>
            )}
          </>
        )}

        {/* ── AI Exercise ── */}
        {exType === "ai" && (
          <>
            {aiLoading && (
              <div style={{textAlign:"center", padding:"32px 0", color:C.muted}}>
                <div style={{fontSize:14, fontWeight:700, marginBottom:10}}>🤖 Claude mashq tayyorlamoqda...</div>
                <div style={S.spinner} />
              </div>
            )}
            {!aiLoading && aiEx && (
              <div style={{...S.aiCard, animation:"pop .3s ease"}}>
                <div style={S.aiLabel}>🤖 AI Topshiriq</div>
                <div style={S.aiSentence}>
                  {aiEx.sentence.split("___").map((part, i, arr) =>
                    i < arr.length - 1
                      ? <span key={i}>{part}<span style={{background:C.goldLight,border:`1.5px dashed ${C.gold}`,borderRadius:6,padding:"2px 14px",color:answered ? C.gold : "transparent",transition:"color .3s"}}>{answered ? aiEx.answer : "___"}</span></span>
                      : <span key={i}>{part}</span>
                  )}
                </div>
                {!answered && (
                  <>
                    <input
                      style={{...S.aiInput, ...(inputFocus ? S.aiInputFocus : {})}}
                      placeholder={`${langData?.name} tilida yozing...`}
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onFocus={() => setInputFocus(true)}
                      onBlur={() => setInputFocus(false)}
                      onKeyDown={e => e.key === "Enter" && submitAI()}
                    />
                    <div style={{height:10}} />
                    <button style={{...S.checkBtn, opacity: checking ? 0.7 : 1}} onClick={submitAI} disabled={checking}>
                      {checking ? "Tekshirilmoqda..." : "Tekshirish ✓"}
                    </button>
                  </>
                )}
              </div>
            )}
            {aiFb && (
              <div style={{...S.feedbackBox, ...(aiFb.correct ? S.feedbackOk : S.feedbackErr), animation:"pop .3s ease"}}>
                <div style={{...S.feedbackTitle, color: aiFb.correct ? C.success : C.error}}>
                  {aiFb.correct ? "✓ Ajoyib!" : "✗ Xato"}
                </div>
                <div style={{...S.feedbackSub, color:C.muted}}>{aiFb.msg}</div>
                {aiFb.correct
                  ? <button style={S.greenBtn} onClick={() => nextWord(15)}>Keyingi → (+15 XP)</button>
                  : <button style={S.redBtn} onClick={() => { setAiFb(null); setAnswered(false); setInputVal(""); }}>Qayta urining</button>
                }
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
