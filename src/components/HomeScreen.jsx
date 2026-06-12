import { useState, useEffect } from "react";
import { ERAS } from "./HistoryScreen";
import { COMPOSERS } from "./ComposersScreen";
import { ETIQUETTE_ITEMS } from "./Etiquette";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+KR:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #F7F3ED;
    --warm-white: #FDFAF6;
    --gold: #B8962E;
    --gold-light: #D4AF6A;
    --gold-pale: #F0E4C4;
    --charcoal: #2C2820;
    --brown-mid: #6B5D4F;
    --brown-light: #A89880;
    --border: #DDD4C0;
    --shadow: rgba(44, 40, 32, 0.08);
  }

  body {
    font-family: 'Noto Serif KR', serif;
    background-color: var(--cream);
    color: var(--charcoal);
    min-height: 100vh;
  }

  /* NAV */
  .nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(247, 243, 237, 0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 400;
    letter-spacing: 0.06em;
    color: var(--charcoal);
    cursor: pointer;
  }
  .nav-menu {
    display: flex;
    gap: 36px;
    list-style: none;
  }
  .nav-menu li {
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.04em;
    color: var(--brown-mid);
    cursor: pointer;
    position: relative;
    padding-bottom: 2px;
    transition: color 0.2s;
  }
  .nav-menu li::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0; height: 1px;
    background: var(--gold);
    transition: width 0.3s ease;
  }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  /* HERO */
  .hero {
    position: relative;
    text-align: center;
    padding: 96px 24px 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 60% at 50% 30%, rgba(184,150,46,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-ornament {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    letter-spacing: 0.25em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 20px;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.1s forwards;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: var(--charcoal);
    margin-bottom: 16px;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.2s forwards;
  }
  .hero-subtitle {
    font-size: 15px;
    font-weight: 300;
    color: var(--brown-mid);
    letter-spacing: 0.03em;
    margin-bottom: 40px;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.3s forwards;
  }
  .btn-primary {
    display: inline-block;
    background: var(--gold);
    color: #fff;
    font-family: 'Noto Serif KR', serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.06em;
    padding: 14px 40px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
    box-shadow: 0 4px 20px rgba(184,150,46,0.3);
    opacity: 0;
    animation: fadeUp 0.8s ease 0.4s forwards;
  }
  .btn-primary::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
  }
  .btn-primary:hover {
    background: #9E7E22;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(184,150,46,0.4);
  }
  .btn-primary:active { transform: translateY(0); }

  /* DIVIDER */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    max-width: 200px;
    margin: 0 auto 56px;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.5s forwards;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-diamond {
    width: 6px; height: 6px;
    background: var(--gold-light);
    transform: rotate(45deg);
    flex-shrink: 0;
  }

  /* FEATURE CARDS */
  .cards-section {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px 72px;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .feature-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 32px 28px;
    cursor: pointer;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
    position: relative;
    overflow: hidden;
    opacity: 0;
    animation: fadeUp 0.7s ease forwards;
  }
  .feature-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .feature-card:hover {
    border-color: var(--gold-light);
    box-shadow: 0 8px 32px var(--shadow);
    transform: translateY(-3px);
  }
  .feature-card:hover::before { transform: scaleX(1); }
  .card-icon {
    font-size: 28px;
    margin-bottom: 16px;
    display: block;
    filter: sepia(0.3);
  }
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 8px;
    letter-spacing: 0.01em;
  }
  .card-desc {
    font-size: 13px;
    font-weight: 300;
    color: var(--brown-light);
    line-height: 1.7;
    letter-spacing: 0.02em;
  }

  /* SECTION WRAPPER */
  .section {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 24px 48px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 24px;
    letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .section-title::after {
    content: '';
    flex: 1; height: 1px;
    background: var(--border);
    max-width: 60px;
  }

  /* PROGRESS */
  .progress-box {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 28px 32px;
  }
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .progress-badge {
    font-size: 11px;
    letter-spacing: 0.12em;
    color: var(--gold);
    text-transform: uppercase;
    font-weight: 500;
  }
  .progress-item {
    margin-bottom: 18px;
  }
  .progress-item:last-child { margin-bottom: 0; }
  .progress-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 13px;
    color: var(--brown-mid);
    font-weight: 400;
  }
  .progress-count {
    font-size: 12px;
    color: var(--brown-light);
  }
  .progress-track {
    height: 5px;
    background: var(--gold-pale);
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    border-radius: 99px;
    width: 0;
    transition: width 1.2s cubic-bezier(0.4,0,0.2,1);
  }

  /* QUIZ */
  .quiz-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 48px;
  }
  .quiz-card {
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 24px 22px;
    cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
  }
  .quiz-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .quiz-card:hover {
    border-color: var(--gold-light);
    box-shadow: 0 4px 16px var(--shadow);
    transform: translateY(-2px);
  }
  .quiz-card:hover::before { transform: scaleX(1); }
  .quiz-card-icon {
    font-size: 24px;
    margin-bottom: 12px;
  }
  .quiz-card-name {
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: 6px;
  }
  .quiz-card-desc {
    font-size: 12px;
    color: var(--brown-light);
    font-weight: 300;
    letter-spacing: 0.02em;
    line-height: 1.5;
  }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--border);
    padding: 28px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: var(--brown-light);
    letter-spacing: 0.05em;
  }
  .footer-text {
    font-size: 12px;
    color: var(--brown-light);
    font-weight: 300;
    letter-spacing: 0.03em;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .nav-menu { gap: 20px; }
    .cards-grid { grid-template-columns: 1fr; }
    .quiz-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
  }
`;

const PROGRESS_DATA = [
  { label: "역사", done: 0, total: ERAS.length },
  { label: "작곡가", done: 0, total: COMPOSERS.length },
  { label: "에티켓", done: 0, total: ETIQUETTE_ITEMS.length },
];


const CARDS = [
  {
    icon: "📖",
    title: "역사 탐험",
    desc: "수 세기에 걸친 음악의 진화를 여행하세요",
    page: "history",
    delay: "0.6s",
  },
  {
    icon: "🎵",
    title: "작곡가 발견",
    desc: "불멸의 명곡을 만든 천재들을 만나보세요",
    page: "composers",
    delay: "0.75s",
  },
  {
    icon: "✨",
    title: "공연 준비",
    desc: "에티켓을 배우고 경험을 향상시키세요",
    page: "etiquette",
    delay: "0.9s",
  },
];

export default function HomeScreen({ onNavigate }) {
  const [filled, setFilled] = useState(false);
  const navigate = onNavigate || (() => {});

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Music Life</div>
        <ul className="nav-menu">
          {["역사", "작곡가", "역대 인물", "에티켓", "내 페이지"].map((item, i) => {
            const pages = ["history", "composers", "people", "etiquette", "mypage"];
            return (
              <li key={item} onClick={() => navigate(pages[i])}>
                {item}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <p className="hero-ornament">♩ Music Life ♩</p>
        <h1 className="hero-title">클래식 음악 여정을<br />시작하세요</h1>
        <p className="hero-subtitle">자신만의 속도로 클래식 음악의 아름다움을 발견하세요</p>
        <button className="btn-primary" onClick={() => navigate("composers")}>
          학습 시작
        </button>

        <div className="divider">
          <div className="divider-line" />
          <div className="divider-diamond" />
          <div className="divider-line" />
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="cards-section">
        <div className="cards-grid">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="feature-card"
              style={{ animationDelay: card.delay }}
              onClick={() => navigate(card.page)}
            >
              <span className="card-icon">{card.icon}</span>
              <div className="card-title">{card.title}</div>
              <div className="card-desc">{card.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRESS */}
      <section className="section">
        <div className="section-title">학습 진도도</div>
        <div className="progress-box">
          <div className="progress-header">
            <span style={{ fontSize: 13, color: "var(--brown-light)", fontWeight: 300 }}>
              오늘도 한 걸음 더
            </span>
            <span className="progress-badge">↗ 진행 중</span>
          </div>
          {PROGRESS_DATA.map(({ label, done, total }) => (
            <div className="progress-item" key={label}>
              <div className="progress-label">
                <span>{label}</span>
                <span className="progress-count">{done}/{total} 완료</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: filled ? `${(done / total) * 100}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUIZ */}
      <section className="section">
        <div className="section-title">퀴즈 도전</div>
        <div className="quiz-grid">
          <div className="quiz-card" onClick={() => navigate("history-quiz")}>
            <div className="quiz-card-icon">📖</div>
            <div className="quiz-card-name">역사 퀴즈</div>
            <div className="quiz-card-desc">음악사의 흐름을 테스트해보세요</div>
          </div>
          <div className="quiz-card" onClick={() => navigate("quiz")}>
            <div className="quiz-card-icon">🎵</div>
            <div className="quiz-card-name">작곡가 퀴즈</div>
            <div className="quiz-card-desc">위대한 작곡가들을 얼마나 아는지 확인하세요</div>
          </div>
          <div className="quiz-card" onClick={() => navigate("etiquette-quiz")}>
            <div className="quiz-card-icon">✨</div>
            <div className="quiz-card-name">에티켓 퀴즈</div>
            <div className="quiz-card-desc">공연장 예절을 완벽하게 익혀보세요</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">Home</div>
      </footer>
    </>
  );
}