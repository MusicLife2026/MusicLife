import { useState } from "react";
import { composerImages } from "../data/composerImages";

const ERA_PORTRAIT = {
  baroque:   { bg: "linear-gradient(160deg, #3D2B1F 0%, #7A5C2E 55%, #C4A040 100%)", letter: "#F0E4C4" },
  classical: { bg: "linear-gradient(160deg, #1C3A4E 0%, #2A5840 60%, #4A9070 100%)", letter: "#C8EAD8" },
  romantic:  { bg: "linear-gradient(160deg, #2E1535 0%, #6B2D5E 65%, #A05A82 100%)", letter: "#F4D0E8" },
  modern:    { bg: "linear-gradient(160deg, #151E30 0%, #1E3A5F 65%, #2D6090 100%)", letter: "#C8D8F0" },
};

const TABS = [
  { id: "bio",   label: "전기" },
  { id: "works", label: "주요 작품" },
  { id: "style", label: "음악 스타일" },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+KR:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --cream: #F7F3ED; --warm-white: #FDFAF6;
    --gold: #B8962E; --gold-light: #D4AF6A; --gold-pale: #F0E4C4;
    --charcoal: #2C2820; --brown-mid: #6B5D4F; --brown-light: #A89880;
    --border: #DDD4C0; --shadow: rgba(44,40,32,0.1);
    --tag-bg: #EAE5DC;
  }
  body { font-family: 'Noto Serif KR', serif; background: var(--cream); color: var(--charcoal); min-height: 100vh; }

  /* NAV */
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  /* PAGE */
  .d-page { max-width: 720px; margin: 0 auto; padding: 32px 24px 120px; }

  /* BACK BUTTON */
  .d-back { display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; font-family: 'Noto Serif KR', serif; font-size: 14px; color: var(--brown-mid); margin-bottom: 24px; padding: 0; transition: color 0.2s; letter-spacing: 0.02em; }
  .d-back:hover { color: var(--charcoal); }
  .d-back-arrow { font-size: 16px; line-height: 1; }

  /* COMPOSER CARD */
  .d-composer-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px var(--shadow); margin-bottom: 20px; }

  /* PORTRAIT */
  .d-portrait { position: relative; width: 100%; overflow: hidden; background: transparent; }
  .d-portrait-img { width: 100%; height: auto; display: block; }
  .d-portrait-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
  .d-portrait-letter { font-family: 'Cormorant Garamond', serif; font-size: 140px; font-weight: 300; line-height: 1; opacity: 0.7; text-shadow: 0 6px 28px rgba(0,0,0,0.35); user-select: none; }
  .d-portrait-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.15) 100%); pointer-events: none; }

  /* COMPOSER INFO */
  .d-composer-info { padding: 20px 24px 22px; }
  .d-name-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
  .d-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--charcoal); line-height: 1.2; flex: 1; }
  .d-name-en { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 300; color: var(--brown-light); font-style: italic; margin-top: 3px; }
  .d-bm { background: none; border: none; cursor: pointer; padding: 4px; margin-top: 2px; flex-shrink: 0; transition: transform 0.15s; }
  .d-bm:hover { transform: scale(1.1); }
  .d-bm-shape { width: 18px; height: 26px; background: var(--border); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%); transition: background 0.2s; }
  .d-bm.on .d-bm-shape { background: var(--gold); }
  .d-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .d-tag { background: var(--tag-bg); border-radius: 100px; padding: 4px 12px; font-size: 12px; color: var(--brown-mid); font-weight: 400; letter-spacing: 0.02em; }
  .d-tag.year { background: var(--gold-pale); color: var(--gold); font-weight: 500; }

  /* TAB CARD */
  .d-tab-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px var(--shadow); margin-bottom: 20px; }
  .d-tab-bar { display: flex; border-bottom: 1px solid var(--border); padding: 0 24px; }
  .d-tab-btn { background: none; border: none; cursor: pointer; font-family: 'Noto Serif KR', serif; font-size: 14px; color: var(--brown-mid); padding: 16px 20px 14px; position: relative; letter-spacing: 0.02em; transition: color 0.2s; }
  .d-tab-btn::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.25s; }
  .d-tab-btn:hover { color: var(--charcoal); }
  .d-tab-btn.active { color: var(--gold); font-weight: 600; }
  .d-tab-btn.active::after { transform: scaleX(1); }
  .d-tab-content { padding: 24px; min-height: 160px; }

  /* BIO TAB */
  .d-bio { font-size: 14px; font-weight: 300; color: var(--brown-mid); line-height: 2; letter-spacing: 0.02em; }

  /* WORKS TAB */
  .d-works { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .d-work-row { display: flex; align-items: center; gap: 12px; background: var(--tag-bg); border-radius: 10px; padding: 14px 18px; transition: background 0.2s; cursor: pointer; }
  .d-work-row:hover { background: var(--gold-pale); }
  .d-work-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .d-work-name { font-size: 14px; color: var(--charcoal); font-weight: 400; letter-spacing: 0.02em; flex: 1; }
  .d-work-yt { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #FF0000; font-weight: 500; letter-spacing: 0.03em; opacity: 0.75; flex-shrink: 0; }
  .d-work-yt svg { width: 14px; height: 14px; }

  /* STYLE TAB */
  .d-style { font-size: 14px; font-weight: 300; color: var(--brown-mid); line-height: 2; letter-spacing: 0.02em; }

  /* QUIZ BUTTON */
  .d-quiz-btn { width: 100%; background: var(--gold); color: #fff; font-family: 'Noto Serif KR', serif; font-size: 16px; font-weight: 500; letter-spacing: 0.08em; padding: 18px; border: none; border-radius: 12px; cursor: pointer; transition: background 0.2s, transform 0.15s; box-shadow: 0 4px 16px rgba(184,150,46,0.35); }
  .d-quiz-btn:hover { background: #9E7E22; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(184,150,46,0.45); }
  .d-quiz-btn:active { transform: translateY(0); }

  /* FOOTER */
  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 18px; }
    .d-page { padding: 24px 16px 100px; }
    .d-portrait-letter { font-size: 100px; }
    .d-name { font-size: 20px; }
    .d-tab-btn { padding: 14px 14px 12px; font-size: 13px; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
`;

export default function ComposerDetailScreen({ composer, onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [tab, setTab] = useState("bio");
  const [isFav, setIsFav] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fav_composers") || "[]").includes(composer?.id);
    } catch { return false; }
  });

  if (!composer) {
    navigate("composers");
    return null;
  }

  const portrait = ERA_PORTRAIT[composer.era] || ERA_PORTRAIT.baroque;
  const imgSrc = composerImages[composer.id];

  const toggleFav = () => {
    try {
      const favs = JSON.parse(localStorage.getItem("fav_composers") || "[]");
      const next = favs.includes(composer.id)
        ? favs.filter(x => x !== composer.id)
        : [...favs, composer.id];
      localStorage.setItem("fav_composers", JSON.stringify(next));
      setIsFav(next.includes(composer.id));
    } catch {}
  };

  return (
    <>
      <style>{style}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Music Life</div>
        <ul className="nav-menu">
          {["역사", "작곡가", "역대 인물", "에티켓", "내 페이지"].map((item, i) => {
            const pages = ["history", "composers", "people", "etiquette", "mypage"];
            return (
              <li key={item} className={pages[i] === "composers" ? "active" : ""} onClick={() => navigate(pages[i])}>
                {item}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="d-page">
        <button className="d-back" onClick={() => navigate("composers")}>
          <span className="d-back-arrow">←</span> 작곡가 목록으로
        </button>

        {/* 작곡가 카드 */}
        <div className="d-composer-card">
          <div className="d-portrait" style={{ background: portrait.bg }}>
            {imgSrc ? (
              <img
                src={imgSrc}
                alt={composer.name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            ) : (
              <div className="d-portrait-fallback" style={{ background: portrait.bg }}>
                <span className="d-portrait-letter" style={{ color: portrait.letter }}>
                  {composer.name[0]}
                </span>
              </div>
            )}
            <div className="d-portrait-overlay" />
          </div>

          <div className="d-composer-info">
            <div className="d-name-row">
              <div>
                <div className="d-name">{composer.name}</div>
                <div className="d-name-en">{composer.nameEn}</div>
              </div>
              <button className={`d-bm${isFav ? " on" : ""}`} onClick={toggleFav}>
                <div className="d-bm-shape" />
              </button>
            </div>
            <div className="d-tags">
              <span className="d-tag">{composer.eraLabel}</span>
              <span className="d-tag">{composer.nat}</span>
              <span className="d-tag year">{composer.years}</span>
            </div>
          </div>
        </div>

        {/* 탭 섹션 */}
        <div className="d-tab-card">
          <div className="d-tab-bar">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`d-tab-btn${tab === t.id ? " active" : ""}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="d-tab-content">
            {tab === "bio" && (
              <p className="d-bio">{composer.desc}</p>
            )}
            {tab === "works" && (
              <ul className="d-works">
                {composer.works.map(w => (
                  <li
                    key={w}
                    className="d-work-row"
                    onClick={() => window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(composer.nameEn + ' ' + w)}`,
                      '_blank'
                    )}
                  >
                    <div className="d-work-dot" />
                    <span className="d-work-name">{w}</span>
                    <span className="d-work-yt">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {tab === "style" && (
              <p className="d-style">{composer.style}</p>
            )}
          </div>
        </div>

        {/* 퀴즈 버튼 */}
        <button className="d-quiz-btn" onClick={() => navigate("quiz")}>
          퀴즈 풀기
        </button>
      </div>

      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}