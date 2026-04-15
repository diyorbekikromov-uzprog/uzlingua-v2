
import { useState } from 'react';

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

// ─── DATA: 40 UZBEK WORDS ──────────────────────────
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

// ─── SPEECH SYNTHESIS ──────────────────────────────────────
function speak(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.85;
  u.pitch = 1;
  u.volume = 1;
  window.speechSynthesis.speak(u);
}

// ─── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("langs");
  const [lang, setLang] = useState(null);
  const [lesson, setLesson] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState("cards");
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAns, setQuizAns] = useState(null);
  const [showingAudio, setShowingAudio] = useState(false);

  const langObj = LANGS.find(l => l.code === lang);
  const lessonWords = WORDS.slice(lesson * LESSON_SIZE, (lesson + 1) * LESSON_SIZE);

  // ─── HANDLERS ──────────────────────────────────────────────
  const handleLangSelect = (code) => {
    setLang(code);
    setScreen("menu");
  };

  const handleStartLesson = (m) => {
    setMode(m);
    setScreen("lesson");
    setCardIdx(0);
    setFlipped(false);
    setQuizIdx(0);
    setQuizAns(null);
  };

  const handleCardFlip = () => {
    setFlipped(!flipped);
  };

  const handleCardNext = () => {
    if (cardIdx < lessonWords.length - 1) {
      setCardIdx(cardIdx + 1);
      setFlipped(false);
    } else {
      setXp(xp + 50);
      setStreak(streak + 1);
      setScreen("menu");
    }
  };

  const handleQuizAnswer = (correct) => {
    if (correct) {
      setXp(xp + 10);
      setStreak(streak + 1);
      if (quizIdx < lessonWords.length - 1) {
        setQuizIdx(quizIdx + 1);
        setQuizAns(null);
      } else {
        setXp(xp + 50);
        setScreen("menu");
      }
    } else {
      setQuizAns(false);
      setTimeout(() => setQuizAns(null), 1000);
    }
  };

  const handlePlayAudio = (text, lang) => {
    setShowingAudio(true);
    speak(text, lang);
    setTimeout(() => setShowingAudio(false), 2000);
  };

  const handleBack = () => {
    if (screen === "lesson") setScreen("menu");
    else if (screen === "menu") setLang(null), setScreen("langs");
  };

  // ─── RENDER: LANGUAGE SELECTION ────────────────────────────
  if (screen === "langs") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1 style={{ textAlign: "center", color: C.primary, marginBottom: "30px" }}>
            ✦ UzLingua ⚡ {xp} XP
          </h1>
          <p style={{ textAlign: "center", color: C.muted, marginBottom: "20px" }}>
            Ўзбекчадан ўрган 🌏 6 та тилни Ipak Yo'li usulida
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => handleLangSelect(l.code)}
                style={{
                  padding: "20px",
                  border: `2px solid ${C.border}`,
                  borderRadius: "12px",
                  background: C.card,
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: C.text,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.target.style.boxShadow = "none"}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{l.flag}</div>
                <div>{l.name}</div>
                <div style={{ fontSize: "12px", color: C.muted }}>⚡ 0 XP</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER: MENU ──────────────────────────────────────────
  if (screen === "menu") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <button
              onClick={handleBack}
              style={{
                padding: "8px 16px",
                background: C.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ← Orqaga
            </button>
            <h1 style={{ color: C.primary, margin: "0" }}>
              {langObj?.flag} {langObj?.name}
            </h1>
            <div style={{ fontSize: "14px", color: C.muted }}>
              ⚡ {xp} XP | 🔥 {streak}
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ color: C.text }}>Dars {lesson + 1}</h3>
            <div style={{
              background: C.tealLight,
              height: "8px",
              borderRadius: "4px",
              overflow: "hidden",
            }}>
              <div style={{
                background: C.teal,
                height: "100%",
                width: `${((lesson + 1) / 5) * 100}%`,
              }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <button
              onClick={() => handleStartLesson("cards")}
              style={{
                padding: "30px",
                background: C.goldLight,
                border: `2px solid ${C.goldBorder}`,
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                color: C.text,
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>🎴</div>
              <div>Kartochkalar</div>
            </button>

            <button
              onClick={() => handleStartLesson("quiz")}
              style={{
                padding: "30px",
                background: C.successBg,
                border: `2px solid ${C.success}`,
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                color: C.text,
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>❓</div>
              <div>Testlar</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RENDER: FLASHCARDS ────────────────────────────────────
  if (screen === "lesson" && mode === "cards") {
    const word = lessonWords[cardIdx];
    const translation = word.t[lang];

    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <button
              onClick={handleBack}
              style={{
                padding: "8px 16px",
                background: C.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ← Orqaga
            </button>
            <div style={{ fontSize: "14px", color: C.muted }}>
              {cardIdx + 1} / {lessonWords.length}
            </div>
          </div>

          <div
            onClick={handleCardFlip}
            style={{
              background: flipped ? C.card : C.primary,
              color: flipped ? C.text : "white",
              padding: "60px 20px",
              borderRadius: "16px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "30px",
              transition: "all 0.3s",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>
              {flipped ? "🔤" : "🎯"}
            </div>
            <div style={{ fontSize: flipped ? "32px" : "28px", fontWeight: "700" }}>
              {flipped ? translation : word.uz}
            </div>
            <div style={{ fontSize: "14px", marginTop: "20px", opacity: 0.7 }}>
              {flipped ? "Teskari aylantiring" : "Bosing"}
            </div>
          </div>

          {/* AUDIO BUTTONS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
            <button
              onClick={() => handlePlayAudio(word.uz, "uz-UZ")}
              style={{
                padding: "12px",
                background: C.teal,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              🔊 Ўзбекча
            </button>
            <button
              onClick={() => handlePlayAudio(translation, langObj.speech)}
              style={{
                padding: "12px",
                background: C.gold,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              🔊 {langObj?.name}
            </button>
          </div>

          {showingAudio && (
            <div style={{
              textAlign: "center",
              color: C.teal,
              fontSize: "14px",
              marginBottom: "20px",
              fontWeight: "600",
            }}>
              🔊 Ovoz ijro etilmoqda...
            </div>
          )}

          <button
            onClick={handleCardNext}
            style={{
              width: "100%",
              padding: "16px",
              background: C.success,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "700",
            }}
          >
            Keyingi →
          </button>
        </div>
      </div>
    );
  }

  // ─── RENDER: QUIZ ──────────────────────────────────────────
  if (screen === "lesson" && mode === "quiz") {
    const word = lessonWords[quizIdx];
    const options = [word.t[lang]];
    while (options.length < 4) {
      const randomWord = lessonWords[Math.floor(Math.random() * lessonWords.length)];
      if (!options.includes(randomWord.t[lang])) {
        options.push(randomWord.t[lang]);
      }
    }
    options.sort(() => Math.random() - 0.5);

    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "20px", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
            <button
              onClick={handleBack}
              style={{
                padding: "8px 16px",
                background: C.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ← Orqaga
            </button>
            <div style={{ fontSize: "14px", color: C.muted }}>
              {quizIdx + 1} / {lessonWords.length}
            </div>
          </div>

          <div style={{
            background: C.card,
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "30px",
            textAlign: "center",
            border: `2px solid ${C.border}`,
          }}>
            <div style={{ fontSize: "14px", color: C.muted, marginBottom: "10px" }}>
              Tarjimani toping:
            </div>
            <div style={{ fontSize: "36px", fontWeight: "700", color: C.primary }}>
              {word.uz}
            </div>
          </div>

          {/* AUDIO BUTTON FOR QUIZ */}
          <button
            onClick={() => handlePlayAudio(word.uz, "uz-UZ")}
            style={{
              width: "100%",
              padding: "12px",
              background: C.teal,
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            🔊 Eshit
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuizAnswer(opt === word.t[lang])}
                style={{
                  padding: "16px",
                  background: quizAns === null ? C.card : opt === word.t[lang] ? C.successBg : C.errorBg,
                  color: C.text,
                  border: `2px solid ${quizAns === null ? C.border : opt === word.t[lang] ? C.success : C.error}`,
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}