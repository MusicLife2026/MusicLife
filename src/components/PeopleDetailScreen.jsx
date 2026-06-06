import { useState } from "react";
import { peopleImages } from "../data/peopleImages";

const CAT_PORTRAIT = {
  player:    { bg: "linear-gradient(160deg, #1A2A4A 0%, #2E4A7A 60%, #4A6A9A 100%)", letter: "#C8D8F0" },
  conductor: { bg: "linear-gradient(160deg, #3A1A0A 0%, #6A3A1A 60%, #9A5A2A 100%)", letter: "#F0D8C0" },
  korea:     { bg: "linear-gradient(160deg, #0A2A1A 0%, #1A4A2A 60%, #2A6A3A 100%)", letter: "#C0F0D0" },
};

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

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  .d-page { max-width: 720px; margin: 0 auto; padding: 32px 24px 120px; }

  .d-back { display: flex; align-items: center; gap: 8px; background: none; border: none; cursor: pointer; font-family: 'Noto Serif KR', serif; font-size: 14px; color: var(--brown-mid); margin-bottom: 24px; padding: 0; transition: color 0.2s; letter-spacing: 0.02em; }
  .d-back:hover { color: var(--charcoal); }
  .d-back-arrow { font-size: 16px; line-height: 1; }

  .d-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px var(--shadow); margin-bottom: 20px; }

  .d-portrait { position: relative; width: 100%; overflow: hidden; }
  .d-portrait-img { width: 100%; height: auto; display: block; }
  .d-portrait-fallback { width: 100%; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; }
  .d-portrait-letter { font-family: 'Cormorant Garamond', serif; font-size: 140px; font-weight: 300; line-height: 1; opacity: 0.7; text-shadow: 0 6px 28px rgba(0,0,0,0.35); user-select: none; }
  .d-portrait-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.15) 100%); pointer-events: none; }

  .d-info { padding: 20px 24px 22px; }
  .d-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--charcoal); line-height: 1.2; margin-bottom: 4px; }
  .d-name-en { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 300; color: var(--brown-light); font-style: italic; margin-bottom: 14px; }
  .d-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .d-tag { background: var(--tag-bg); border-radius: 100px; padding: 4px 12px; font-size: 12px; color: var(--brown-mid); font-weight: 400; letter-spacing: 0.02em; }
  .d-tag.year { background: var(--gold-pale); color: var(--gold); font-weight: 500; }

  .d-tab-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px var(--shadow); margin-bottom: 20px; }
  .d-tab-bar { display: flex; border-bottom: 1px solid var(--border); padding: 0 24px; }
  .d-tab-btn { background: none; border: none; cursor: pointer; font-family: 'Noto Serif KR', serif; font-size: 14px; color: var(--brown-mid); padding: 16px 20px 14px; position: relative; letter-spacing: 0.02em; transition: color 0.2s; }
  .d-tab-btn::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.25s; }
  .d-tab-btn:hover { color: var(--charcoal); }
  .d-tab-btn.active { color: var(--gold); font-weight: 600; }
  .d-tab-btn.active::after { transform: scaleX(1); }
  .d-tab-content { padding: 24px; min-height: 160px; }
  .d-bio { font-size: 14px; font-weight: 300; color: var(--brown-mid); line-height: 2; letter-spacing: 0.02em; }
  .d-recordings { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .d-rec-row { display: flex; align-items: center; gap: 12px; background: var(--tag-bg); border-radius: 10px; padding: 14px 18px; transition: background 0.2s; cursor: pointer; }
  .d-rec-row:hover { background: var(--gold-pale); }
  .d-rec-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .d-rec-name { font-size: 14px; color: var(--charcoal); font-weight: 400; letter-spacing: 0.02em; flex: 1; }
  .d-rec-yt { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #FF0000; font-weight: 500; opacity: 0.75; flex-shrink: 0; }
  .d-rec-yt svg { width: 14px; height: 14px; }

  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 14px; }
    .d-page { padding: 24px 16px 100px; }
    .d-portrait-letter { font-size: 100px; }
    .d-name { font-size: 20px; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
`;

const TABS = [
  { id: "bio",        label: "소개" },
  { id: "recordings", label: "주요 음반" },
];

export default function PeopleDetailScreen({ person, onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [tab, setTab] = useState("bio");

  if (!person) {
    navigate("people");
    return null;
  }

  const portrait = CAT_PORTRAIT[person.cat] || CAT_PORTRAIT.player;
  const imgSrc = peopleImages[person.id];

  return (
    <>
      <style>{style}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>Music Life</div>
        <ul className="nav-menu">
          {["역사", "작곡가", "역대 인물", "에티켓", "내 페이지"].map((item, i) => {
            const pages = ["history", "composers", "people", "etiquette", "mypage"];
            return (
              <li key={item} className={pages[i] === "people" ? "active" : ""} onClick={() => navigate(pages[i])}>
                {item}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="d-page">
        <button className="d-back" onClick={() => navigate("people")}>
          <span className="d-back-arrow">←</span> 역대 인물 목록으로
        </button>

        <div className="d-card">
          <div className="d-portrait" style={{ background: portrait.bg }}>
            {imgSrc ? (
              <img src={imgSrc} alt={person.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
            ) : (
              <div className="d-portrait-fallback" style={{ background: portrait.bg }}>
                <span className="d-portrait-letter" style={{ color: portrait.letter }}>
                  {person.name[0]}
                </span>
              </div>
            )}
            <div className="d-portrait-overlay" />
          </div>

          <div className="d-info">
            <div className="d-name">{person.name}</div>
            <div className="d-name-en">{person.nameEn}</div>
            <div className="d-tags">
              <span className="d-tag">{person.catLabel}</span>
              <span className="d-tag">{person.role}</span>
              <span className="d-tag">{person.nat}</span>
              <span className="d-tag year">{person.years}</span>
            </div>
          </div>
        </div>

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
              <p className="d-bio">{person.desc}</p>
            )}
            {tab === "recordings" && (
              <ul className="d-recordings">
                {(person.recordings || []).map(r => (
                  <li
                    key={r}
                    className="d-rec-row"
                    onClick={() => window.open(
                      `https://www.youtube.com/results?search_query=${encodeURIComponent(person.nameEn + ' ' + r)}`,
                      '_blank'
                    )}
                  >
                    <div className="d-rec-dot" />
                    <span className="d-rec-name">{r}</span>
                    <span className="d-rec-yt">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      YouTube
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}
