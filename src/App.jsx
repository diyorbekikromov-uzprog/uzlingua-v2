
import { useState } from "react";

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

// ─── AUDIO URLs FROM CLOUD ─────────────────────────────────
const AUDIO_URLS = {
  "aka": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/KHdMPiGgCBPwzoWo.mp3",
  "assalomu": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/zhplTgcCQVqESAxK.mp3",
  "baliq": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/hhsLzJuRhzIBdhZf.mp3",
  "besh": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/bMLSnZdSoZfyRdot.mp3",
  "bir": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/DheUJciZZbxHCuYK.mp3",
  "choy": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/itgqJuZFPrwclFfE.mp3",
  "daftar": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/fVpVTbAnXxVtgHOS.mp3",
  "ikki": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/UvbdAJeJKTUmbdht.mp3",
  "iltimos": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/TrlExnBXGpsOWSWG.mp3",
  "it": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/nBCEpeyvENejytDk.mp3",
  "kechirasiz": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/IiYMbdRRqoBzkHNE.mp3",
  "kitob": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/PHYrTHzaZdVHrnZS.mp3",
  "ko'k": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/owoByIKNtokiDjKK.mp3",
  "mushuk": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/DTzhklUdfnpbJpnI.mp3",
  "non": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/mhQYeQJbHkJbVAhq.mp3",
  "o'qish": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/aYeAYySFXnWCQmbf.mp3",
  "oila": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/RwTQrcYHUtoyaytf.mp3",
  "ona": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/ZqydgAcpVpaXFArR.mp3",
  "oq": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/aTqhBUfqyDVvjhIC.mp3",
  "ot": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/iAjeZVxIRrBwmZiI.mp3",
  "ota": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/dBczSElnofaCzKTa.mp3",
  "plov": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/mmkCwLacFYsNBMCu.mp3",
  "qalam": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/mRjBXbCtMGiUcsBT.mp3",
  "qizil": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/tYTmdrYSHQgbspIe.mp3",
  "qora": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/oXLeAPTmhYkJkDDR.mp3",
  "qush": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/VhxEyLpapkRZqebX.mp3",
  "rahmat": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/ECXilCrTuDpeptbM.mp3",
  "sabzi": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/ozgaBOljnkGiMGsJ.mp3",
  "sariq": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/RTNPESFrHugYGjYv.mp3",
  "stol": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/haKhZLMHGZJGllwa.mp3",
  "stul": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/kWqclpKSfqzkOoUd.mp3",
  "suv": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/okbDHkkaPnBFqOff.mp3",
  "to'rt": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/svcJTFiELZtRKZgq.mp3",
  "uch": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/PbUQLvNGOfeFNWzh.mp3",
  "uka": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/lzbSnehaUptwQLjj.mp3",
  "uyqu": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/utIDDcQJfbBcnXVO.mp3",
  "xayr": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/sjtgPViVSGQlTNHu.mp3",
  "yozish": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/TWmGtsPBfPMrrSXC.mp3",
  "yugumoq": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/rBLEiqztnKGiSMuB.mp3",
  "yugurish": "https://files.manuscdn.com/user_upload_by_module/session_file/310519663494943296/FRNgGJtIKmlTNCZy.mp3"
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
  {code:"ru",name:"Русский",flag:"🇷🇺"},
  {code:"en",name:"English",flag:"🇬🇧"},
  {code:"ko",name:"한국어",flag:"🇰🇷"},
  {code:"zh",name:"中文",flag:"🇨🇳"},
  {code:"de",name:"Deutsch",flag:"🇩🇪"},
  {code:"tr",name:"Türkçe",flag:"🇹🇷"},
];

const LESSON_SIZE = 8;

// ─── PLAY AUDIO FROM CLOUD ─────────────────────────────────
function playAudio(wordKey) {
  const url = AUDIO_URLS[wordKey.toLowerCase()];
  if (url) {
    const audio = new Audio(url);
    audio.play().catch(e => console.log("Audio play error:", e));
  }
}

// ─── COMPONENT ──────────────────────────────────────────────
export default function UzLingua() {
  const [lang, setLang] = useState(null);
  const [page, setPage] = useState("home");
  const [lessonIdx, setLessonIdx] = useState(0);
  const [xp, setXp] = useState(4100);
  const [streak, setStreak] = useState(7);
  const [cardIdx, setCardIdx] = useState(0);
  const [testIdx, setTestIdx] = useState(0);
  const [testAnswered, setTestAnswered] = useState(false);
  const [testCorrect, setTestCorrect] = useState(false);

  const lessons = lang ? Array.from({length: Math.ceil(WORDS.length/LESSON_SIZE)}, (_, i) => 
    WORDS.slice(i*LESSON_SIZE, (i+1)*LESSON_SIZE)
  ) : [];
  
  const currentLesson = lessons[lessonIdx] || [];
  const currentWord = currentLesson[cardIdx];
  const testWord = currentLesson[testIdx];

  const handleLangSelect = (code) => {
    setLang(code);
    setPage("lessons");
  };

  const handleCardFlip = () => {
    setCardIdx(c => c < currentLesson.length - 1 ? c + 1 : 0);
  };

  const handleTestAnswer = (answer) => {
    const correct = answer === testWord.t[lang];
    setTestCorrect(correct);
    setTestAnswered(true);
    if (correct) {
      setXp(x => x + 10);
      setStreak(s => s + 1);
    }
  };

  const handleNextTest = () => {
    if (testIdx < currentLesson.length - 1) {
      setTestIdx(t => t + 1);
      setTestAnswered(false);
    } else {
      setPage("lessons");
      setLessonIdx(l => l + 1);
      setCardIdx(0);
      setTestIdx(0);
    }
  };

  // HOME PAGE
  if (page === "home") {
    return (
      <div style={{background: C.bg, minHeight: "100vh", padding: "20px", fontFamily: "'DM Sans', sans-serif"}}>
        <div style={{maxWidth: "500px", margin: "0 auto"}}>
          <h1 style={{color: C.primary, textAlign: "center", marginBottom: "30px"}}>🇺🇿 UzLingua</h1>
          <p style={{color: C.muted, textAlign: "center", marginBottom: "40px"}}>Ўзбекчани ўргани</p>
          
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px"}}>
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => handleLangSelect(l.code)}
                style={{
                  padding: "20px",
                  border: "2px solid " + C.border,
                  background: C.card,
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: C.text,
                  transition: "all 0.3s"
                }}
              >
                <div style={{fontSize: "24px", marginBottom: "8px"}}>{l.flag}</div>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // LESSONS PAGE
  if (page === "lessons") {
    return (
      <div style={{background: C.bg, minHeight: "100vh", padding: "20px", fontFamily: "'DM Sans', sans-serif"}}>
        <div style={{maxWidth: "500px", margin: "0 auto"}}>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <button onClick={() => setPage("home")} style={{background: "none", border: "none", fontSize: "20px", cursor: "pointer"}}>←</button>
            <div style={{textAlign: "center"}}>
              <span style={{color: C.primary, fontWeight: "700", fontSize: "18px"}}>⭐ {xp} XP</span>
              <span style={{color: C.success, fontWeight: "700", fontSize: "18px", marginLeft: "15px"}}>🔥 {streak} дни</span>
            </div>
          </div>

          {/* CARD SECTION */}
          {currentWord && (
            <div style={{marginBottom: "30px"}}>
              <div style={{background: C.card, padding: "30px", borderRadius: "15px", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
                <div style={{fontSize: "48px", marginBottom: "15px"}}>📚</div>
                <div style={{fontSize: "32px", color: C.primary, fontWeight: "700", marginBottom: "10px"}}>{currentWord.uz}</div>
                <div style={{fontSize: "18px", color: C.muted, marginBottom: "20px"}}>{currentWord.t[lang]}</div>
                
                <div style={{display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px"}}>
                  <button
                    onClick={() => playAudio(currentWord.uz)}
                    style={{
                      padding: "10px 20px",
                      background: C.gold,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px"
                    }}
                  >
                    🔊 Ўзбекча
                  </button>
                  <button
                    onClick={() => playAudio(currentWord.t[lang])}
                    style={{
                      padding: "10px 20px",
                      background: C.teal,
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px"
                    }}
                  >
                    🔊 {LANGS.find(l => l.code === lang)?.name}
                  </button>
                </div>

                <button
                  onClick={handleCardFlip}
                  style={{
                    padding: "12px 24px",
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    width: "100%"
                  }}
                >
                  Кейинги →
                </button>
              </div>
            </div>
          )}

          {/* TEST SECTION */}
          {testWord && (
            <div>
              <h3 style={{color: C.primary, marginBottom: "15px"}}>Тест: {testWord.uz} нима?</h3>
              <div style={{display: "grid", gap: "10px"}}>
                {[testWord.t[lang], ...WORDS.filter(w => w.id !== testWord.id).slice(0, 3).map(w => w.t[lang])].sort(() => Math.random() - 0.5).map((ans, i) => (
                  <button
                    key={i}
                    onClick={() => !testAnswered && handleTestAnswer(ans)}
                    disabled={testAnswered}
                    style={{
                      padding: "15px",
                      background: testAnswered ? (ans === testWord.t[lang] ? C.successBg : C.errorBg) : C.card,
                      color: testAnswered ? (ans === testWord.t[lang] ? C.success : C.error) : C.text,
                      border: "2px solid " + (testAnswered ? (ans === testWord.t[lang] ? C.success : C.error) : C.border),
                      borderRadius: "8px",
                      cursor: testAnswered ? "default" : "pointer",
                      fontWeight: "600",
                      fontSize: "16px"
                    }}
                  >
                    {ans}
                  </button>
                ))}
              </div>
              {testAnswered && (
                <button
                  onClick={handleNextTest}
                  style={{
                    padding: "12px 24px",
                    background: C.primary,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    width: "100%",
                    marginTop: "15px"
                  }}
                >
                  {testIdx < currentLesson.length - 1 ? "Кейинги" : "Дарс тамом"} →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}