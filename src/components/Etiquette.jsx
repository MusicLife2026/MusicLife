import { useState } from "react";

// ── Etiquette data (from prj/datas/Etiquette.txt) ──
export const ETIQUETTE_ITEMS = [
  {
    id: "arrival",
    emoji: "📋",
    title: "도착과 입장",
    subtitle: "콘서트 홀에 부드럽게 입장하세요",
    content:
      "공연 시작 20분 전까지 도착하여 티켓을 발권하고 좌석을 확인한 후 입장해 주시기 바랍니다. 부득이하게 지각할 경우에는 공연장 안내에 따라 인터미션에 입장할 수 있습니다. 단, 연주가 진행되는 중에는 다른 관객과 연주자에게 방해가 될 수 있으므로 입장이 제한됩니다.",
  },
  {
    id: "phone",
    emoji: "📵",
    title: "휴대전화 매너",
    subtitle: "공연장에서는 전원 끄기 또는 무음 설정",
    content:
      "클래식 공연에서는 휴대전화 전원을 끄는 것이 기본 예절입니다. 공연장 특성상 작은 소리도 크게 들릴 수 있어 연주와 관람에 방해가 될 수 있습니다. 또한 공연 중에는 과도한 움직임이나 소음을 유발하는 행동을 자제해 주시기 바랍니다.",
  },
  {
    id: "dress",
    emoji: "👔",
    title: "옷차림",
    subtitle: "상황에 맞게 적절하게 옷을 입으세요",
    content:
      "과거에는 클래식 공연장을 방문할 때 정장을 입는 것이 일반적이었습니다. 하지만 현재는 편안한 복장으로도 충분히 공연을 관람할 수 있습니다. 다만 공연에 대한 존중의 의미로 지나치게 눈에 띄는 의상보다는 단정하고 깔끔한 복장을 권장합니다.",
  },
  {
    id: "photo",
    emoji: "📷",
    title: "사진 촬영과 녹음",
    subtitle: "공연과 저작권 규칙을 존중하세요",
    content:
      "공연 중에는 사전에 허가를 받은 관계자만 촬영할 수 있습니다. 관객의 사진 촬영이나 동영상 촬영은 주변 관객과 연주자 모두에게 방해가 될 수 있습니다. 일부 공연에서는 모든 연주가 끝난 후 연주자가 인사하는 커튼콜 시간에 한해 촬영이 허용되기도 합니다. 또한 공연 중과 앙코르 연주 시에는 녹음이 금지됩니다. 이를 위반할 경우 안내 요원의 조치에 따라 퇴장될 수 있으며 재입장이 제한될 수 있습니다.",
  },
  {
    id: "applause",
    emoji: "👏",
    title: "박수를 칠 때",
    subtitle: "감사를 표현하는 완벽한 순간을 아세요",
    content:
      "대중음악 공연에서는 곡이 끝날 때마다 박수를 치는 것이 일반적입니다. 하지만 클래식 음악은 여러 악장으로 구성된 경우가 많습니다. 악장 사이에 박수를 치면 다른 관객들에게 혼란을 줄 수 있고 연주자의 집중을 방해할 수도 있습니다. 작품에 익숙하지 않다면 지휘자가 지휘봉을 완전히 내리거나 연주가 완전히 끝난 뒤 박수를 치는 것이 좋습니다.",
  },
  {
    id: "cough",
    emoji: "🤧",
    title: "기침과 재채기 대처",
    subtitle: "피할 수 없는 방해를 우아하게 관리하세요",
    content:
      "공연 중 기침이나 재채기는 피하기 어렵지만, 최대한 조용히 처리하는 것이 중요합니다. 손수건이나 소매로 입을 가리고, 피아니시모(매우 조용한) 구간을 피해 포르테(강한) 구간에 기침을 하면 주변에 주는 방해를 최소화할 수 있습니다. 기침이 심하게 날 것 같다면 잠시 로비로 나가는 것도 배려입니다.",
  },
  {
    id: "program",
    emoji: "📄",
    title: "프로그램 읽기",
    subtitle: "프로그램 노트로 경험을 향상시키세요",
    content:
      "공연 전에 배부되는 프로그램 노트를 미리 읽어 두면 음악 감상의 깊이가 달라집니다. 작품의 배경, 작곡가의 의도, 악장 구성 등을 파악해 두면 어디서 박수를 쳐야 할지도 자연스럽게 알 수 있습니다. 프로그램 노트 확인은 공연장 로비에서 좌석 착석 전에 미리 해두시길 권장합니다.",
  },
  {
    id: "children",
    emoji: "👶",
    title: "어린이 동반",
    subtitle: "젊은 콘서트 관객을 위한 안내",
    content:
      "어린이와 함께 공연을 관람할 때는 연령 제한 및 공연 특성을 미리 확인해 주세요. 클래식 공연은 긴 집중 시간이 필요하므로, 어린이가 충분히 참여할 수 있는 패밀리 콘서트나 교육 프로그램부터 시작하는 것을 추천합니다. 아이가 공연 중 소란을 피울 경우를 대비해 출구와 가까운 좌석을 선택하는 것도 좋은 방법입니다.",
  },
  {
    id: "encore",
    emoji: "🎵",
    title: "앙코르 이해하기",
    subtitle: "마지막 곡 후에 일어나는 일",
    content:
      "열정적인 박수 후에 연주자들은 앙코르를 연주할 수 있습니다 – 프로그램에 나열되지 않은 추가 짧은 곡. 연주자들이 무대를 완전히 떠날 때까지 앉아서 계속 박수를 치세요. 때때로 여러 번의 앙코르가 연주됩니다. 객석 조명이 켜질 때까지 기다렸다가 떠나세요.",
  },
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

  /* ── NAV ── */
  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  /* ── PAGE ── */
  .e-page { max-width: 760px; margin: 0 auto; padding: 48px 24px 80px; }
  .e-header { margin-bottom: 36px; }
  .e-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--charcoal); margin-bottom: 8px; letter-spacing: -0.01em; }
  .e-subtitle { font-size: 14px; font-weight: 300; color: var(--brown-mid); letter-spacing: 0.02em; }

  /* ── ACCORDION LIST ── */
  .e-list { display: flex; flex-direction: column; gap: 12px; }

  .e-item { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s; }
  .e-item:hover { border-color: var(--gold-light); }
  .e-item.open { border-color: var(--gold-light); box-shadow: 0 4px 18px var(--shadow); }

  .e-item-header { display: flex; align-items: center; gap: 16px; padding: 18px 20px; cursor: pointer; user-select: none; }
  .e-emoji { width: 44px; height: 44px; background: var(--tag-bg); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .e-text { flex: 1; min-width: 0; }
  .e-item-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 600; color: var(--charcoal); margin-bottom: 3px; }
  .e-item-sub { font-size: 13px; font-weight: 300; color: var(--brown-mid); }

  .e-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

  /* bookmark */
  .e-bm { background: none; border: none; cursor: pointer; padding: 4px; transition: transform 0.15s; }
  .e-bm:hover { transform: scale(1.15); }
  .e-bm-shape { width: 14px; height: 20px; background: var(--border); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%); transition: background 0.2s; }
  .e-bm.on .e-bm-shape { background: var(--gold); }

  /* chevron */
  .e-chevron { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: var(--brown-light); transition: transform 0.25s; }
  .e-chevron.open { transform: rotate(180deg); }
  .e-chevron svg { display: block; }

  /* expandable content */
  .e-body { border-top: 1px solid var(--border); padding: 16px 20px 18px; }
  .e-body-text { font-size: 13px; font-weight: 300; color: var(--brown-mid); line-height: 1.85; letter-spacing: 0.01em; }

  /* ── FOOTER ── */
  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 14px; }
    .e-page { padding: 32px 16px 60px; }
    .e-title { font-size: 28px; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
`;

export default function EtiquetteScreen({ onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [openId, setOpenId] = useState(null);
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fav_etiquette") || "[]"); }
    catch { return []; }
  });

  const toggleOpen = (id) => setOpenId(prev => prev === id ? null : id);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    const next = bookmarks.includes(id)
      ? bookmarks.filter(x => x !== id)
      : [...bookmarks, id];
    setBookmarks(next);
    localStorage.setItem("fav_etiquette", JSON.stringify(next));
  };

  const NAV_ITEMS = [
    { label: "역사",     page: "history" },
    { label: "작곡가",   page: "composers" },
    { label: "역대 인물", page: "people" },
    { label: "에티켓",   page: "etiquette" },
    { label: "내 페이지", page: "mypage" },
  ];

  return (
    <>
      <style>{style}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate("home")}>My Classic</div>
        <ul className="nav-menu">
          {NAV_ITEMS.map(({ label, page }) => (
            <li
              key={page}
              className={page === "etiquette" ? "active" : ""}
              onClick={() => navigate(page)}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>

      <div className="e-page">
        <div className="e-header">
          <h1 className="e-title">콘서트 에티켓</h1>
          <p className="e-subtitle">우아한 콘서트 관객이 되는 법을 마스터하세요</p>
        </div>

        <div className="e-list">
          {ETIQUETTE_ITEMS.map(item => {
            const isOpen = openId === item.id;
            const isBm = bookmarks.includes(item.id);
            return (
              <div
                key={item.id}
                className={`e-item${isOpen ? " open" : ""}`}
              >
                <div className="e-item-header" onClick={() => toggleOpen(item.id)}>
                  <div className="e-emoji">{item.emoji}</div>
                  <div className="e-text">
                    <div className="e-item-title">{item.title}</div>
                    <div className="e-item-sub">{item.subtitle}</div>
                  </div>
                  <div className="e-actions">
                    <button
                      className={`e-bm${isBm ? " on" : ""}`}
                      onClick={e => toggleBookmark(item.id, e)}
                      title={isBm ? "즐겨찾기 해제" : "즐겨찾기"}
                    >
                      <div className="e-bm-shape" />
                    </button>
                    <div className={`e-chevron${isOpen ? " open" : ""}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div className="e-body">
                    <p className="e-body-text">{item.content}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer>
        <div className="footer-logo">My Classic</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}
