import { useState, useEffect } from "react";
import { COMPOSERS } from "./ComposersScreen";
import { composerImages } from "../data/composerImages";
import { PEOPLE } from "./PeopleScreen";
import { peopleImages } from "../data/peopleImages";

const ERA_LABELS = {
  medieval: "중세", renaissance: "르네상스",
  baroque: "바로크", classical: "고전주의", romantic: "낭만주의", modern: "현대",
};
const ERA_PERIODS = {
  medieval: "500 — 1450", renaissance: "1420 — 1600",
  baroque: "1600 — 1750", classical: "1750 — 1820",
  romantic: "1820 — 1900", modern: "1900 — 현재",
};

const ERA_BG = {
  baroque:   "linear-gradient(160deg, #3D2B1F 0%, #7A5C2E 55%, #C4A040 100%)",
  classical: "linear-gradient(160deg, #1C3A4E 0%, #2A5840 60%, #4A9070 100%)",
  romantic:  "linear-gradient(160deg, #2E1535 0%, #6B2D5E 65%, #A05A82 100%)",
  modern:    "linear-gradient(160deg, #151E30 0%, #1E3A5F 65%, #2D6090 100%)",
};
const ERA_LETTER_COLOR = {
  baroque: "#F0E4C4", classical: "#C8EAD8", romantic: "#F4D0E8", modern: "#C8D8F0",
};

const PROGRESS_DATA = [
  { label: "역사", done: 3, total: 8 },
  { label: "작곡가", done: 5, total: 12 },
  { label: "에티켓", done: 7, total: 10 },
];

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Noto+Serif+KR:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --cream: #F7F3ED; --warm-white: #FDFAF6;
    --gold: #B8962E; --gold-light: #D4AF6A; --gold-pale: #F0E4C4;
    --charcoal: #2C2820; --brown-mid: #6B5D4F; --brown-light: #A89880;
    --border: #DDD4C0; --shadow: rgba(44,40,32,0.08);
  }
  body { font-family: 'Noto Serif KR', serif; background: var(--cream); color: var(--charcoal); min-height: 100vh; }

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  .profile-hero { background: var(--warm-white); border-bottom: 1px solid var(--border); padding: 48px 24px 40px; text-align: center; }
  .profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: var(--gold-pale); border: 2px solid var(--gold-light); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 36px; color: var(--gold); }
  .profile-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; color: var(--charcoal); margin-bottom: 6px; }
  .profile-sub { font-size: 13px; font-weight: 300; color: var(--brown-mid); letter-spacing: 0.03em; margin-bottom: 28px; }
  .stats-row { display: flex; justify-content: center; gap: 48px; }
  .stat-item { text-align: center; }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 600; color: var(--gold); margin-bottom: 4px; }
  .stat-label { font-size: 11px; letter-spacing: 0.1em; color: var(--brown-light); text-transform: uppercase; font-weight: 300; }

  .section { max-width: 860px; margin: 0 auto; padding: 40px 24px 0; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; color: var(--charcoal); margin-bottom: 20px; display: flex; align-items: center; gap: 12px; }
  .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); max-width: 60px; }

  .progress-box { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; padding: 24px 28px; margin-bottom: 40px; }
  .progress-item { margin-bottom: 16px; }
  .progress-item:last-child { margin-bottom: 0; }
  .progress-label { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: var(--brown-mid); }
  .progress-count { font-size: 12px; color: var(--brown-light); }
  .progress-track { height: 5px; background: var(--gold-pale); border-radius: 99px; overflow: hidden; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), var(--gold-light)); border-radius: 99px; transition: width 1.2s cubic-bezier(0.4,0,0.2,1); }

  .fav-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 40px; }
  .fav-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; overflow: hidden; position: relative; }
  .fav-card:hover { border-color: var(--gold-light); box-shadow: 0 4px 16px var(--shadow); }

  .fav-thumb { width: 64px; height: 64px; flex-shrink: 0; position: relative; overflow: hidden; }
  .fav-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
  .fav-thumb-fallback { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 26px; }

  .fav-info { padding: 14px 14px 14px 0; flex: 1; min-width: 0; }
  .fav-name { font-size: 14px; font-weight: 500; color: var(--charcoal); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .fav-sub { font-size: 12px; font-weight: 300; color: var(--brown-light); }

  .era-fav-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; position: relative; }
  .era-fav-card:hover { border-color: var(--gold-light); box-shadow: 0 4px 16px var(--shadow); }
  .fav-remove { position: absolute; top: 6px; right: 6px; background: none; border: none; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--brown-light); font-size: 15px; border-radius: 50%; transition: background 0.15s, color 0.15s; line-height: 1; }
  .fav-remove:hover { background: rgba(44,40,32,0.09); color: var(--charcoal); }
  .era-icon { width: 40px; height: 40px; border-radius: 2px; background: var(--gold-pale); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 20px; color: var(--gold); flex-shrink: 0; }

  .empty-box { text-align: center; padding: 36px 24px; background: var(--warm-white); border: 1px dashed var(--border); border-radius: 4px; margin-bottom: 40px; }
  .empty-icon { font-size: 28px; margin-bottom: 10px; opacity: 0.45; }
  .empty-text { font-size: 14px; font-weight: 300; color: var(--brown-light); margin-bottom: 4px; }
  .empty-hint { font-size: 12px; font-weight: 300; color: var(--brown-light); opacity: 0.7; }

  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; margin-top: 40px; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 18px; }
    .stats-row { gap: 24px; }
    .fav-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
`;

export default function MyPageScreen({ onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [filled, setFilled] = useState(false);
  const [favEras, setFavEras] = useState([]);
  const [favComposers, setFavComposers] = useState([]);
  const [favPeople, setFavPeople] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 300);
    try {
      setFavEras(JSON.parse(localStorage.getItem("fav_eras") || "[]"));
      setFavComposers(JSON.parse(localStorage.getItem("fav_composers") || "[]"));
      setFavPeople(JSON.parse(localStorage.getItem("fav_people") || "[]"));
    } catch {}
    return () => clearTimeout(t);
  }, []);

  const totalFav = favEras.length + favComposers.length + favPeople.length;

  const removeEra = (id, e) => {
    e.stopPropagation();
    const next = favEras.filter(x => x !== id);
    setFavEras(next);
    localStorage.setItem("fav_eras", JSON.stringify(next));
  };
  const removeComposer = (id, e) => {
    e.stopPropagation();
    const next = favComposers.filter(x => x !== id);
    setFavComposers(next);
    localStorage.setItem("fav_composers", JSON.stringify(next));
  };
  const removePerson = (id, e) => {
    e.stopPropagation();
    const next = favPeople.filter(x => x !== id);
    setFavPeople(next);
    localStorage.setItem("fav_people", JSON.stringify(next));
  };

  const goToComposer = (id) => {
    const composer = COMPOSERS.find(c => c.id === id);
    if (composer) navigate("composer-detail", composer);
  };

  const goToPerson = (id) => {
    const person = PEOPLE.find(p => p.id === id);
    if (person) navigate("people-detail", person);
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
              <li key={item} className={pages[i] === "mypage" ? "active" : ""} onClick={() => navigate(pages[i])}>
                {item}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="profile-hero">
        <div className="profile-avatar">♪</div>
        <div className="profile-title">클래식 탐험가</div>
        <div className="profile-sub">나만의 클래식 음악 여정</div>
        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-num">{totalFav}</div>
            <div className="stat-label">즐겨찾기</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">15</div>
            <div className="stat-label">학습 완료</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4</div>
            <div className="stat-label">탐험 시대</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-title">학습 진도</div>
        <div className="progress-box">
          {PROGRESS_DATA.map(({ label, done, total }) => (
            <div className="progress-item" key={label}>
              <div className="progress-label">
                <span>{label}</span>
                <span className="progress-count">{done}/{total} 완료</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: filled ? `${(done / total) * 100}%` : "0%" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="section-title">즐겨찾기한 시대</div>
        {favEras.length > 0 ? (
          <div className="fav-grid">
            {favEras.map(id => (
              <div key={id} className="era-fav-card" onClick={() => navigate("history")}>
                <div className="era-icon">♩</div>
                <div>
                  <div className="fav-name">{ERA_LABELS[id] || id}</div>
                  <div className="fav-sub">{ERA_PERIODS[id] || ""}</div>
                </div>
                <button className="fav-remove" onClick={e => removeEra(id, e)}>×</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            <div className="empty-icon">♡</div>
            <div className="empty-text">즐겨찾기한 시대가 없습니다</div>
            <div className="empty-hint">역사 페이지에서 ♡ 버튼을 눌러 추가해보세요</div>
          </div>
        )}

        <div className="section-title">즐겨찾기한 작곡가</div>
        {favComposers.length > 0 ? (
          <div className="fav-grid">
            {favComposers.map(id => {
              const composer = COMPOSERS.find(c => c.id === id);
              if (!composer) return null;
              const img = composerImages[id];
              const bg = ERA_BG[composer.era] || ERA_BG.baroque;
              const letterColor = ERA_LETTER_COLOR[composer.era] || "#F0E4C4";
              return (
                <div key={id} className="fav-card" onClick={() => goToComposer(id)}>
                  <div className="fav-thumb" style={{ background: bg }}>
                    {img ? (
                      <img src={img} alt={composer.name} />
                    ) : (
                      <div className="fav-thumb-fallback" style={{ color: letterColor }}>
                        {composer.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="fav-info">
                    <div className="fav-name">{composer.name}</div>
                    <div className="fav-sub">{composer.eraLabel} · {composer.nat}</div>
                  </div>
                  <button className="fav-remove" onClick={e => removeComposer(id, e)}>×</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-box">
            <div className="empty-icon">♡</div>
            <div className="empty-text">즐겨찾기한 작곡가가 없습니다</div>
            <div className="empty-hint">작곡가 페이지에서 북마크를 눌러 추가해보세요</div>
          </div>
        )}

        <div className="section-title">즐겨찾기한 역대 인물</div>
        {favPeople.length > 0 ? (
          <div className="fav-grid">
            {favPeople.map(id => {
              const person = PEOPLE.find(p => p.id === id);
              if (!person) return null;
              const img = peopleImages[id];
              const CAT_BG = {
                player:    "linear-gradient(160deg, #1A2A4A 0%, #2E4A7A 60%, #4A6A9A 100%)",
                conductor: "linear-gradient(160deg, #3A1A0A 0%, #6A3A1A 60%, #9A5A2A 100%)",
                korea:     "linear-gradient(160deg, #0A2A1A 0%, #1A4A2A 60%, #2A6A3A 100%)",
              };
              const CAT_LETTER = { player: "#C8D8F0", conductor: "#F0D8C0", korea: "#C0F0D0" };
              const bg = CAT_BG[person.cat] || CAT_BG.player;
              const letterColor = CAT_LETTER[person.cat] || "#C8D8F0";
              return (
                <div key={id} className="fav-card" onClick={() => goToPerson(id)}>
                  <div className="fav-thumb" style={{ background: bg }}>
                    {img ? (
                      <img src={img} alt={person.name} />
                    ) : (
                      <div className="fav-thumb-fallback" style={{ color: letterColor }}>
                        {person.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="fav-info">
                    <div className="fav-name">{person.name}</div>
                    <div className="fav-sub">{person.catLabel} · {person.nat}</div>
                  </div>
                  <button className="fav-remove" onClick={e => removePerson(id, e)}>×</button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-box">
            <div className="empty-icon">♡</div>
            <div className="empty-text">즐겨찾기한 역대 인물이 없습니다</div>
            <div className="empty-hint">역대 인물 페이지에서 북마크를 눌러 추가해보세요</div>
          </div>
        )}
      </div>

      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">My Page</div>
      </footer>
    </>
  );
}
