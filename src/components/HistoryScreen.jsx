import { useState } from "react";
import { COMPOSERS } from "./ComposersScreen";
import {
  MEDIEVAL_CONTENT,
  RENAISSANCE_CONTENT,
  BAROQUE_CONTENT,
  CLASSICAL_CONTENT,
  ROMANTIC_CONTENT,
  MODERN_CONTENT,
} from "../data/eraContent";

const ERAS = [
  {
    id: "medieval",
    name: "중세",
    period: "500 — 1450",
    keyword: "신을 향한 단선율",
    desc: "서양 음악의 역사는 중세에서 시작됩니다. 대략 500년부터 1450년까지 약 1000년에 걸친 이 시기에, 오늘날 우리가 당연하게 여기는 악보, 음계, 화음의 기초가 모두 만들어졌습니다. 그레고리오 성가부터 다성음악의 탄생까지, 서양 음악의 뼈대가 이 시기에 형성되었습니다.",
    composers: ["기욤 드 마쇼", "페로티누스", "레오니누스", "필립 드 비트리", "죠스캥 데 프레"],
    features: ["그레고리오 성가", "오르가눔·다성음악의 탄생", "노트르담 악파", "아르스 노바"],
    fullContent: MEDIEVAL_CONTENT,
  },
  {
    id: "renaissance",
    name: "르네상스",
    period: "1420 — 1600",
    keyword: "인간을 향한 폴리포니",
    desc: "르네상스 음악은 약 1420년부터 1600년 사이, 약 180년에 걸친 시기의 서양 음악입니다. 중세 음악이 교회와 신 중심이었다면, 르네상스 음악은 점차 인간 중심으로 옮겨가는 흐름을 보입니다. 악보 인쇄술의 발명, 세속 음악의 급성장, 기악의 독립이라는 세 가지 변화가 이 시기를 주도했습니다.",
    composers: ["조스캥 데 프레", "팔레스트리나", "윌리엄 버드", "오를란도 디 라수스", "클라우디오 몬테베르디"],
    features: ["통모방 폴리포니 완성", "마드리갈 탄생", "프로테스탄트 코랄", "기악의 독립"],
    fullContent: RENAISSANCE_CONTENT,
  },
  {
    id: "baroque",
    name: "바로크",
    period: "1600 — 1750",
    keyword: "화려함과 대위법",
    desc: "바로크 시대는 화려한 장식과 복잡한 대위법이 특징입니다. 교회와 궁정의 후원 아래 오페라와 협주곡이 탄생했으며, 통주저음은 바로크 음악의 핵심 요소였습니다. 신을 향한 음악에서 인간의 감성을 탐구하는 예술로 진화하던 시기입니다.",
    composers: ["요한 세바스티안 바흐", "게오르크 프리드리히 헨델", "안토니오 비발디", "클라우디오 몬테베르디", "헨리 퍼셀"],
    features: ["대위법적 작곡 기법", "통주저음 (Basso Continuo)", "오페라의 탄생", "협주곡 형식 발전"],
    fullContent: BAROQUE_CONTENT,
  },
  {
    id: "classical",
    name: "고전주의",
    period: "1750 — 1820",
    keyword: "균형과 명료함",
    desc: "계몽주의 사상의 영향을 받아 감정의 절제와 형식의 완성을 추구한 시대입니다. 소나타 형식, 교향곡, 현악 4중주 등 오늘날 우리에게 친숙한 음악 형식이 확립되었으며, 빈 고전파를 중심으로 음악의 황금기가 열렸습니다.",
    composers: ["볼프강 아마데우스 모차르트", "프란츠 요제프 하이든", "루트비히 판 베토벤", "무치오 클레멘티"],
    features: ["소나타 형식 확립", "교향곡의 완성", "현악 4중주 발전", "오케스트라 표준화"],
    fullContent: CLASSICAL_CONTENT,
  },
  {
    id: "romantic",
    name: "낭만주의",
    period: "1820 — 1900",
    keyword: "감정과 표현의 해방",
    desc: "개인의 감정과 민족주의를 음악으로 표현한 낭만의 시대입니다. 피아노 음악이 전성기를 맞이했고 오케스트라 규모가 확대되었습니다. 베토벤의 정신을 이어받아 음악은 단순한 오락을 넘어 인간의 내면을 탐구하는 예술로 자리잡았습니다.",
    composers: ["프란츠 슈베르트", "프레데리크 쇼팽", "요하네스 브람스", "표트르 차이콥스키", "프란츠 리스트", "리하르트 바그너"],
    features: ["표제음악 발전", "피아노 음악 전성기", "민족주의 음악", "교향시 탄생"],
    fullContent: ROMANTIC_CONTENT,
  },
  {
    id: "modern",
    name: "현대",
    period: "1900 — 현재",
    keyword: "실험과 다양성",
    desc: "조성의 해체, 무조음악, 전자음악 등 경계 없는 실험이 이루어진 시대입니다. 인상주의, 표현주의, 신고전주의, 미니멀리즘 등 다양한 사조가 공존하며 음악의 언어를 확장했습니다. 오늘날 클래식 음악은 더욱 다양한 방식으로 진화하고 있습니다.",
    composers: ["클로드 드뷔시", "모리스 라벨", "이고르 스트라빈스키", "드미트리 쇼스타코비치", "아르놀트 쇤베르크", "필립 글라스"],
    features: ["인상주의 음악", "무조음악·십이음기법", "전자음악의 탄생", "미니멀리즘"],
    fullContent: MODERN_CONTENT,
  },
];

function renderFullContent(text) {
  const lines = text.split("\n");
  const elements = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === "---") {
      elements.push(<div key={key++} className="era-content-divider" />);
    } else if (/^\d+\./.test(line) || line.startsWith("전체 흐름 요약")) {
      const title = line.replace(/^\d+\.\s*/, "");
      elements.push(<h4 key={key++} className="era-content-heading">{title}</h4>);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: "6px" }} />);
    } else {
      elements.push(<p key={key++} className="era-content-para">{line}</p>);
    }
  }
  return elements;
}

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

  .page-header { padding: 64px 24px 48px; text-align: center; }
  .page-header-ornament { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 0.25em; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
  .page-header-title { font-family: 'Playfair Display', serif; font-size: clamp(28px,4vw,42px); font-weight: 700; color: var(--charcoal); margin-bottom: 12px; }
  .page-header-sub { font-size: 14px; font-weight: 300; color: var(--brown-mid); letter-spacing: 0.03em; }

  .timeline { max-width: 800px; margin: 0 auto; padding: 0 24px 80px; position: relative; }
  .timeline::before { content: ''; position: absolute; left: calc(24px + 19px); top: 8px; bottom: 80px; width: 1px; background: var(--border); }
  .era-item { position: relative; padding-left: 56px; margin-bottom: 32px; }
  .era-dot { position: absolute; left: 11px; top: 26px; width: 16px; height: 16px; border-radius: 50%; background: var(--cream); border: 2px solid var(--border); transition: all 0.25s; }
  .era-dot.active { background: var(--gold); border-color: var(--gold); box-shadow: 0 0 0 5px rgba(184,150,46,0.15); }
  .era-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s; }
  .era-card.open { border-color: var(--gold-light); box-shadow: 0 6px 24px var(--shadow); }
  .era-header { padding: 22px 24px; cursor: pointer; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .era-period { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.2em; color: var(--gold); margin-bottom: 6px; }
  .era-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--charcoal); margin-bottom: 4px; }
  .era-keyword { font-size: 13px; font-weight: 300; color: var(--brown-mid); font-style: italic; }
  .era-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; padding-top: 2px; }
  .fav-btn { background: none; border: none; cursor: pointer; font-size: 18px; color: var(--brown-light); transition: color 0.2s, transform 0.15s; padding: 2px; line-height: 1; }
  .fav-btn:hover { transform: scale(1.2); }
  .fav-btn.on { color: #D45C5C; }
  .toggle-icon { font-size: 14px; color: var(--brown-light); user-select: none; line-height: 1; }
  .era-body { border-top: 1px solid var(--border); padding: 22px 24px; }
  .era-desc { font-size: 14px; font-weight: 300; color: var(--brown-mid); line-height: 1.9; margin-bottom: 22px; }
  .sub-label { font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; margin-bottom: 10px; }
  .tag-wrap { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 20px; }
  .tag { background: var(--gold-pale); border: 1px solid var(--border); border-radius: 2px; padding: 3px 10px; font-size: 12px; color: var(--brown-mid); letter-spacing: 0.02em; }
  .tag.linked { cursor: pointer; transition: background 0.2s, border-color 0.2s; }
  .tag.linked:hover { background: var(--gold-light); border-color: var(--gold); color: #fff; }
  .feat-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
  .feat-list li { font-size: 13px; font-weight: 300; color: var(--brown-mid); padding-left: 14px; position: relative; }
  .feat-list li::before { content: '—'; position: absolute; left: 0; color: var(--gold-light); }

  .era-full-section { border-top: 1px solid var(--border); margin-top: 4px; }
  .era-full-toggle { width: 100%; background: none; border: none; padding: 12px 0; font-family: 'Cormorant Garamond', serif; font-size: 11px; letter-spacing: 0.2em; color: var(--gold); text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: color 0.2s; text-align: left; }
  .era-full-toggle:hover { color: var(--charcoal); }
  .era-full-content { max-height: 520px; overflow-y: auto; padding: 4px 0 8px; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
  .era-full-content::-webkit-scrollbar { width: 4px; }
  .era-full-content::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
  .era-content-heading { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: var(--charcoal); margin: 18px 0 8px; letter-spacing: 0.01em; }
  .era-content-para { font-size: 13px; font-weight: 300; color: var(--brown-mid); line-height: 1.85; margin-bottom: 4px; }
  .era-content-divider { height: 1px; background: var(--border); margin: 14px 0; }

  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; margin-top: 40px; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 18px; }
    .timeline::before { left: calc(20px + 19px); }
    .era-item { padding-left: 52px; }
    .feat-list { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
`;

const findComposer = (fullName) =>
  COMPOSERS.find(c => fullName.includes(c.name) || c.name.includes(fullName));

export default function HistoryScreen({ onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [openEra, setOpenEra] = useState(null);
  const [expandedContent, setExpandedContent] = useState({});
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fav_eras") || "[]"); }
    catch { return []; }
  });

  const toggleFav = (id, e) => {
    e.stopPropagation();
    const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("fav_eras", JSON.stringify(next));
  };

  const toggleContent = (id, e) => {
    e.stopPropagation();
    setExpandedContent(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{style}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>My Classic</div>
        <ul className="nav-menu">
          {["역사", "작곡가", "역대 인물", "에티켓", "내 페이지"].map((item, i) => {
            const pages = ["history", "composers", "people", "etiquette", "mypage"];
            return (
              <li key={item} className={pages[i] === "history" ? "active" : ""} onClick={() => navigate(pages[i])}>
                {item}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="page-header">
        <p className="page-header-ornament">♩ History ♩</p>
        <h1 className="page-header-title">클래식 음악의 역사</h1>
        <p className="page-header-sub">중세부터 현대까지, 음악이 진화해온 여정을 탐험하세요</p>
      </div>

      <div className="timeline">
        {ERAS.map(era => {
          const isOpen = openEra === era.id;
          const isFav = favorites.includes(era.id);
          const isContentExpanded = !!expandedContent[era.id];
          return (
            <div key={era.id} className="era-item">
              <div className={`era-dot${isOpen ? " active" : ""}`} />
              <div className={`era-card${isOpen ? " open" : ""}`}>
                <div className="era-header" onClick={() => setOpenEra(isOpen ? null : era.id)}>
                  <div>
                    <div className="era-period">{era.period}</div>
                    <div className="era-name">{era.name}</div>
                    <div className="era-keyword">{era.keyword}</div>
                  </div>
                  <div className="era-actions">
                    <button className={`fav-btn${isFav ? " on" : ""}`} onClick={e => toggleFav(era.id, e)}>
                      {isFav ? "♥" : "♡"}
                    </button>
                    <span className="toggle-icon">{isOpen ? "∧" : "∨"}</span>
                  </div>
                </div>
                {isOpen && (
                  <div className="era-body">
                    <p className="era-desc">{era.desc}</p>
                    <div className="sub-label">주요 작곡가</div>
                    <div className="tag-wrap">
                      {era.composers.map(c => {
                        const match = findComposer(c);
                        return (
                          <span
                            key={c}
                            className={`tag${match ? " linked" : ""}`}
                            onClick={match ? e => { e.stopPropagation(); navigate("composer-detail", match); } : undefined}
                          >
                            {c}
                          </span>
                        );
                      })}
                    </div>
                    <div className="sub-label">시대적 특징</div>
                    <ul className="feat-list">
                      {era.features.map(f => <li key={f}>{f}</li>)}
                    </ul>

                    {era.fullContent && (
                      <div className="era-full-section">
                        <button className="era-full-toggle" onClick={e => toggleContent(era.id, e)}>
                          <span>{isContentExpanded ? "∧" : "∨"}</span>
                          {isContentExpanded ? "상세 설명 접기" : "상세 설명 전체 보기"}
                        </button>
                        {isContentExpanded && (
                          <div className="era-full-content">
                            {renderFullContent(era.fullContent)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <footer>
        <div className="footer-logo">My Classic</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}
