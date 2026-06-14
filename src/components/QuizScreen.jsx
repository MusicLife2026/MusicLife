import { useState, useMemo } from "react";
import { quizData } from "../data/quizData";

const QUIZ_COUNT = 5;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(quizData) {
  const pool = [];
  Object.entries(quizData).forEach(([composerId, questions]) => {
    questions.forEach(q => pool.push({ ...q, composerId }));
  });
  return pool;
}

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+KR:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --cream: #F7F3ED; --warm-white: #FDFAF6;
    --gold: #B8962E; --gold-light: #D4AF6A; --gold-pale: #F0E4C4;
    --charcoal: #2C2820; --brown-mid: #6B5D4F; --brown-light: #A89880;
    --border: #DDD4C0; --shadow: rgba(44,40,32,0.1);
    --navy: #1E2A4A;
    --danger: #E05A2B;
  }
  body { font-family: 'Noto Serif KR', serif; background: var(--cream); color: var(--charcoal); min-height: 100vh; }

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }

  .qz-page { max-width: 680px; margin: 0 auto; padding: 36px 24px 80px; }

  .qz-back { display: flex; align-items: center; gap: 6px; font-size: 14px; color: var(--brown-mid); cursor: pointer; margin-bottom: 24px; width: fit-content; transition: color 0.2s; letter-spacing: 0.02em; }
  .qz-back:hover { color: var(--charcoal); }
  .qz-back svg { flex-shrink: 0; }

  .qz-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .qz-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--navy); letter-spacing: -0.01em; }
  .qz-counter { font-size: 14px; color: var(--brown-mid); font-weight: 300; letter-spacing: 0.03em; }

  .qz-bar-track { height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; margin-bottom: 28px; }
  .qz-bar-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-light)); border-radius: 99px; transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }

  .qz-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; padding: 28px 32px 24px; margin-bottom: 16px; }
  .qz-question { font-size: 15px; font-weight: 400; color: var(--navy); line-height: 1.7; margin-bottom: 20px; letter-spacing: 0.01em; }

  .qz-options { display: flex; flex-direction: column; gap: 10px; }
  .qz-option { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border: 1.5px solid var(--border); border-radius: 10px; background: var(--cream); cursor: pointer; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; }
  .qz-option:hover:not(.disabled) { border-color: var(--gold-light); background: var(--gold-pale); }
  .qz-option.selected { border-color: var(--gold); background: var(--gold-pale); }
  .qz-option.disabled { cursor: default; }

  .qz-radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s, background 0.2s; }
  .qz-option.selected .qz-radio { border-color: var(--gold); background: var(--gold); }
  .qz-radio-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; opacity: 0; transition: opacity 0.15s; }
  .qz-option.selected .qz-radio-dot { opacity: 1; }
  .qz-option-text { font-size: 14px; color: var(--navy); font-weight: 400; letter-spacing: 0.01em; }

  .qz-next { width: 100%; padding: 16px; border: none; border-radius: 10px; font-family: 'Noto Serif KR', serif; font-size: 15px; font-weight: 500; letter-spacing: 0.04em; cursor: pointer; transition: background 0.25s, color 0.25s, transform 0.15s, box-shadow 0.25s; }
  .qz-next.inactive { background: #DDD8D0; color: #B0A898; cursor: not-allowed; }
  .qz-next.active { background: var(--gold); color: #fff; box-shadow: 0 4px 18px rgba(184,150,46,0.3); }
  .qz-next.active:hover { background: #9E7E22; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(184,150,46,0.4); }
  .qz-next.active:active { transform: translateY(0); }

  .qz-result { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; padding: 40px 36px 32px; text-align: center; }
  .qz-result-icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
  .qz-result-icon.good { background: transparent; border: 3px solid var(--gold); }
  .qz-result-icon.bad  { background: transparent; border: 3px solid var(--danger); }
  .qz-result-icon svg { display: block; }

  .qz-result-label { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 10px; }
  .qz-result-score { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--navy); line-height: 1; margin-bottom: 6px; }
  .qz-result-pts { font-size: 14px; color: var(--brown-mid); font-weight: 300; margin-bottom: 24px; }

  .qz-wrong-box { background: #FDF4EE; border: 1px solid #F0D8C0; border-radius: 10px; padding: 18px 20px; text-align: left; margin-bottom: 28px; }
  .qz-wrong-title { font-size: 14px; font-weight: 500; color: var(--navy); margin-bottom: 12px; }
  .qz-wrong-item { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--brown-mid); font-weight: 300; line-height: 1.6; margin-bottom: 6px; }
  .qz-wrong-item:last-child { margin-bottom: 0; }
  .qz-wrong-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--danger); flex-shrink: 0; margin-top: 6px; }

  .qz-result-btns { display: flex; gap: 12px; justify-content: center; }
  .qz-btn-retry { padding: 12px 28px; background: var(--gold); color: #fff; border: none; border-radius: 8px; font-family: 'Noto Serif KR', serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: background 0.2s, transform 0.15s; letter-spacing: 0.03em; }
  .qz-btn-retry:hover { background: #9E7E22; transform: translateY(-1px); }
  .qz-btn-home { padding: 12px 28px; background: #E0DBD3; color: var(--brown-mid); border: none; border-radius: 8px; font-family: 'Noto Serif KR', serif; font-size: 14px; font-weight: 400; cursor: pointer; transition: background 0.2s, transform 0.15s; letter-spacing: 0.03em; }
  .qz-btn-home:hover { background: #D0C9C0; transform: translateY(-1px); }

  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { display: none; }
    .qz-page { padding: 28px 16px 80px; }
    .qz-card { padding: 20px 18px; }
    .qz-result { padding: 32px 20px 28px; }
    .qz-result-btns { flex-direction: column; }
    .qz-btn-retry, .qz-btn-home { width: 100%; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; margin-bottom: 62px; }
  }
`;

const NAV_ITEMS = [
  { label: "역사",     page: "history" },
  { label: "작곡가",   page: "composers" },
  { label: "에티켓",   page: "etiquette" },
  { label: "내 페이지", page: "mypage" },
];

export default function QuizScreen({ composerId, onNavigate }) {
  const navigate = onNavigate || (() => {});

  // composerId가 있으면 해당 작곡가 문제만, 없으면 전체 풀에서 랜덤
  const questions = useMemo(() => {
    const pool = composerId && quizData[composerId]
      ? quizData[composerId].map(q => ({ ...q, composerId }))
      : buildPool(quizData);
    return shuffle(pool).slice(0, QUIZ_COUNT);
  }, [composerId]);

  const [current, setCurrent]         = useState(0);
  const [selected, setSelected]       = useState(null);
  const [answers, setAnswers]         = useState([]);
  const [finalAnswers, setFinalAnswers] = useState(null);

  const done  = finalAnswers !== null;
  const q     = questions[current];
  const total = questions.length;

  const handleSelect = (idx) => {
    //if (selected !== null) return;
    setSelected(idx);
  };

const handleNext = () => {
  if (selected === null) return;
  const newAnswers = [...answers, { question: q.question, chosen: selected, answer: q.answer }];

  if (current + 1 >= total) {
    setFinalAnswers(newAnswers);

    // 퀴즈 푼 횟수 +1
    try {
      const prev = parseInt(localStorage.getItem("quiz_composer_count") || "0", 10);
      localStorage.setItem("quiz_composer_count", String(prev + 1));
    } catch {}

  } else {
    setAnswers(newAnswers);
    setCurrent(c => c + 1);
    setSelected(null);
  }
};

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setFinalAnswers(null);
  };

  const correctCount = (finalAnswers || []).filter(a => a.chosen === a.answer).length;
  const wrongAnswers = (finalAnswers || []).filter(a => a.chosen !== a.answer);
  const isGood = correctCount >= Math.ceil(total / 2);

  return (
    <>
      <style>{style}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Music Life</div>
        <ul className="nav-menu">
          {NAV_ITEMS.map(({ label, page }) => (
            <li key={page} onClick={() => navigate(page)}>{label}</li>
          ))}
        </ul>
      </nav>

      <div className="qz-page">
        <div className="qz-back" onClick={() => navigate(composerId ? "composer-detail" : "home")}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          돌아가기
        </div>

        {!done ? (
          <>
            <div className="qz-header">
              <div className="qz-title">작곡가 퀴즈</div>
              <div className="qz-counter">문제 {current + 1} / {total}</div>
            </div>

            <div className="qz-bar-track">
              <div className="qz-bar-fill" style={{ width: `${(current / total) * 100}%` }} />
            </div>

            <div className="qz-card">
              <div className="qz-question">{q.question}</div>
              <div className="qz-options">
                {q.options.map((opt, idx) => (
                  <div
                    key={idx}
                    //className={`qz-option${selected === idx ? " selected" : ""}${selected !== null ? " disabled" : ""}`}
                    className={`qz-option${selected === idx ? " selected" : ""}`}
                    onClick={() => handleSelect(idx)}
                  >
                    <div className="qz-radio">
                      <div className="qz-radio-dot" />
                    </div>
                    <span className="qz-option-text">{opt}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`qz-next${selected !== null ? " active" : " inactive"}`}
              onClick={handleNext}
              disabled={selected === null}
            >
              {current + 1 === total ? "결과 보기" : "다음 문제"}
            </button>
          </>
        ) : (
          <div className="qz-result">
            <div className={`qz-result-icon ${isGood ? "good" : "bad"}`}>
              {isGood ? (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14.5L11.5 20L22 9" stroke="#B8962E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M8 8L20 20M20 8L8 20" stroke="#E05A2B" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>

            <div className="qz-result-label">퀴즈 완료!</div>
            <div className="qz-result-score">{correctCount}/{total}</div>
            <div className="qz-result-pts">{correctCount * 20}점을 받았습니다</div>

            {wrongAnswers.length > 0 && (
              <div className="qz-wrong-box">
                <div className="qz-wrong-title">복습이 필요한 영역:</div>
                {wrongAnswers.map((a, i) => (
                  <div key={i} className="qz-wrong-item">
                    <div className="qz-wrong-dot" />
                    <span>{a.question}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="qz-result-btns">
              <button className="qz-btn-retry" onClick={handleRetry}>다시 풀기</button>
              <button className="qz-btn-home" onClick={() => navigate("home")}>콘텐츠로 돌아가기</button>
            </div>
          </div>
        )}
      </div>

      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}
