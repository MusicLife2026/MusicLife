import { useState } from "react";
import { composerImages } from "../data/composerImages";

const ERA_PORTRAIT = {
  baroque:   { bg: "linear-gradient(160deg, #3D2B1F 0%, #7A5C2E 55%, #C4A040 100%)", letter: "#F0E4C4" },
  classical: { bg: "linear-gradient(160deg, #1C3A4E 0%, #2A5840 60%, #4A9070 100%)", letter: "#C8EAD8" },
  romantic:  { bg: "linear-gradient(160deg, #2E1535 0%, #6B2D5E 65%, #A05A82 100%)", letter: "#F4D0E8" },
  modern:    { bg: "linear-gradient(160deg, #151E30 0%, #1E3A5F 65%, #2D6090 100%)", letter: "#C8D8F0" },
};

export const COMPOSERS = [
  // ── 바로크 ──
  { id:"gabrieli",    name:"가브리엘리",       nameEn:"Giovanni Gabrieli",             era:"baroque",    eraLabel:"바로크",    years:"1557-1612", nat:"이탈리아",      desc:"베네치아 산마르코 대성당의 오르간 주자이자 작곡가. 두 개의 합창단이 공간적으로 분리되어 교창하는 복합창 양식을 완성했습니다. 성악과 대등하게 기악을 사용한 선구자로, 바로크 기악 음악의 출발점을 열었습니다. 그의 음악을 배운 독일의 하인리히 쉬츠를 통해 바로크 양식이 독일로 전파됩니다.", style:"복합창 양식, 공간적 음향 효과, 성악과 기악의 대등한 사용", works:["사크레 심포니에","소나타 피안 에 포르테","인 에클레시이스"] },
  { id:"peri",        name:"페리",             nameEn:"Jacopo Peri",                   era:"baroque",    eraLabel:"바로크",    years:"1561-1633", nat:"이탈리아",      desc:"현존하는 가장 오래된 오페라 에우리디체(1600)의 작곡가. 피렌체 카메라타의 모노디 원칙을 실현해 오페라라는 장르를 탄생시킨 인물입니다. 음악적으로 완성도는 낮지만 역사적으로 오페라의 출발점이라는 점에서 의미가 큽니다.", style:"모노디 원칙, 레치타티보 창시, 가사 중심의 자연스러운 선율", works:["에우리디체 (1600)"] },
  { id:"monteverdi",  name:"몬테베르디",       nameEn:"Claudio Monteverdi",            era:"baroque",    eraLabel:"바로크",    years:"1567-1643", nat:"이탈리아",      desc:"바로크 음악을 실질적으로 연 인물. 르네상스 폴리포니와 바로크 모노디를 동시에 구사하며 프리마 프락티카(구양식)와 세콘다 프락티카(신양식)를 개척했습니다. 오페라 오르페오(1607)는 초기 오페라 최고 걸작으로, 극적 표현과 오케스트라 사용이 당시로서는 혁명적이었습니다. 말년작 포페아의 대관식은 오페라 역사상 최초로 신화가 아닌 역사적 인물을 소재로 삼았습니다. 현악 트레몰로를 처음 사용해 분노와 긴장을 음악으로 표현하는 방식을 개척하기도 했습니다.", style:"르네상스와 바로크의 가교, 현악 트레몰로 개척, 극적 표현의 혁신", works:["오르페오","포페아의 대관식","마드리갈 전집"] },
  { id:"frescobaldi", name:"프레스코발디",     nameEn:"Girolamo Frescobaldi",          era:"baroque",    eraLabel:"바로크",    years:"1583-1643", nat:"이탈리아",      desc:"바로크 초기 최고의 건반악기 작곡가. 로마 성 베드로 대성당의 오르가니스트로 재직하며 토카타·판타지아·리체르카레 등 건반악기 장르를 발전시켰습니다. 연주자의 자유로운 감정 표현과 즉흥성을 중시한 선구자로, 이후 100여 년간 이탈리아에서 그와 견줄 건반악기 작곡가가 없었다는 평가를 받습니다. 바흐를 비롯한 후대 건반 작곡가 전체에 직접적 영향을 미쳤습니다.", style:"토카타·판타지아·리체르카레, 즉흥성과 자유로운 감정 표현", works:["피오리 무지칼리","토카타와 파르티타집","칸초니 알라 프란체제"] },
  { id:"schutz",      name:"쉬츠",             nameEn:"Heinrich Schütz",               era:"baroque",    eraLabel:"바로크",    years:"1585-1672", nat:"독일",          desc:"독일 바로크 음악의 아버지. 이탈리아 베네치아에서 조반니 가브리엘리에게 직접 사사하고 후에 몬테베르디와도 교류하며, 이탈리아 바로크 양식을 독일에 이식한 핵심 인물입니다. 수난곡·오라토리오·독일어 종교 음악에서 뛰어난 작품을 남겼고, 독일 최초의 오페라 다프네(1627)도 그의 작품입니다. 바흐로 이어지는 독일 프로테스탄트 음악 전통의 직접적 선조입니다.", style:"이탈리아 모노디와 독일 프로테스탄트 전통의 결합, 수난곡·오라토리오", works:["마태 수난곡","이스라엘의 시편","힐링 오라토리오"] },
  { id:"lully",       name:"륄리",             nameEn:"Jean-Baptiste Lully",           era:"baroque",    eraLabel:"바로크",    years:"1632-1687", nat:"프랑스",        desc:"루이 14세의 전속 작곡가로 프랑스 오페라와 발레의 기초를 세운 인물. 이탈리아 출신이지만 프랑스 음악의 정체성을 만들어냈습니다. 현악 중심의 오케스트라 편성을 확립하고, 느림-빠름-느림 구조의 프랑스풍 서곡 형식을 창안했습니다. 최초의 지휘자 중 한 명으로, 긴 지팡이로 박자를 치다가 자신의 발을 찍어 그 부상으로 사망한 일화가 유명합니다. 그의 오케스트라 편성은 현대 교향악단의 원형이 되었습니다.", style:"프랑스풍 서곡 형식 창안, 현악 중심 오케스트라, 웅장한 궁정 양식", works:["아르미드","알세스트","왕의 발레"] },
  { id:"carissimi",   name:"카리시미",         nameEn:"Giacomo Carissimi",             era:"baroque",    eraLabel:"바로크",    years:"1605-1674", nat:"이탈리아",      desc:"오라토리오 장르를 확립한 작곡가. 무대 장치 없이 독창·합창·오케스트라로만 종교 이야기를 표현하는 오라토리오 형식을 완성했습니다. 예프타·발타자르 등의 오라토리오가 대표작으로, 이후 헨델의 오라토리오에 직접적 영향을 미쳤습니다.", style:"오라토리오 형식의 완성, 감동적인 합창, 극적 서사", works:["예프타","발타자르","이피제니아"] },
  { id:"biber",       name:"비버",             nameEn:"Heinrich Biber",                era:"baroque",    eraLabel:"바로크",    years:"1644-1704", nat:"오스트리아",    desc:"바로크 바이올린 음악의 혁신가. 스코르다투라(현의 조율을 바꾸는 기법)를 창의적으로 활용한 미스터리 소나타 15곡이 대표작입니다. 바이올린 기법을 전례 없이 확장해 후대 바이올린 음악 발전의 토대를 놓았습니다.", style:"스코르다투라 기법, 바이올린 기법의 혁신적 확장", works:["미스터리 소나타 16곡","파사칼리아 g단조","로자리오 소나타"] },
  { id:"buxtehude",   name:"북스테후데",       nameEn:"Dieterich Buxtehude",           era:"baroque",    eraLabel:"바로크",    years:"1637-1707", nat:"덴마크·독일",   desc:"북독일 오르간 음악의 거장. 뤼베크의 마리아 교회 오르가니스트로 재직하며 코랄 판타지·토카타·프렐루드를 발전시켰습니다. 오르간 음악에 극적 표현을 도입한 선구자로, 젊은 바흐가 그의 연주를 듣기 위해 약 400km를 걸어갔다는 일화가 전합니다. 바흐 오르간 음악의 직접적 선조입니다.", style:"코랄 판타지·토카타·프렐루드, 오르간 음악의 극적 표현", works:["오르간 전주곡 BuxWV 141","샤콘느 e단조","예수 나의 기쁨"] },
  { id:"purcell",     name:"퍼셀",             nameEn:"Henry Purcell",                 era:"baroque",    eraLabel:"바로크",    years:"1659-1695", nat:"영국",          desc:"영국 바로크 최대 작곡가. 오페라 디도와 에네아스는 영국 최초의 진정한 오페라로, 디도의 비가는 오페라 역사상 가장 아름다운 아리아 중 하나로 꼽힙니다. 앤섬·시나가·극 부수 음악 등 다양한 장르에서 영국 음악의 독자적 언어를 만들어냈습니다. 36세라는 젊은 나이에 요절했으며, 이후 헨델이 등장하기 전까지 200년 이상 영국 음악의 기준으로 남아 있었습니다.", style:"영국 음악의 독자적 언어, 극적 표현, 앤섬·오페라·극 부수음악", works:["디도와 에네아스","디도의 비가","요정 여왕","영국 국가 찬가"] },
  { id:"corelli",     name:"코렐리",           nameEn:"Arcangelo Corelli",             era:"baroque",    eraLabel:"바로크",    years:"1653-1713", nat:"이탈리아",      desc:"바로크 기악 음악의 체계를 완성한 인물. 트리오 소나타와 콘체르토 그로소 형식을 정립했습니다. 그의 작품은 균형 잡힌 선율과 명확한 화성 진행으로 유명합니다. 후대 비발디와 헨델, 바흐에게 큰 영향을 주었습니다. 특히 바이올린 연주 기법을 체계화해 현대 바이올린 음악의 기초를 마련했습니다.", style:"균형 잡힌 선율과 명확한 화성 진행, 바이올린 기법 체계화", works:["합주 협주곡 Op.6","크리스마스 협주곡 g단조","바이올린 소나타 Op.5"] },
  { id:"vivaldi",     name:"비발디",           nameEn:"Antonio Vivaldi",               era:"baroque",    eraLabel:"바로크",    years:"1678-1741", nat:"이탈리아",      desc:"'붉은 머리 신부'라는 별명으로 유명한 작곡가. 협주곡 형식을 완성한 인물로 평가받습니다. 500곡이 넘는 협주곡을 작곡했으며, 독주 악기와 오케스트라의 대비를 극적으로 발전시켰습니다. 대표작 사계는 음악사상 최초의 본격적인 표제 음악 가운데 하나입니다. 비발디의 리토르넬로 형식은 바흐를 비롯한 후대 작곡가들에게 큰 영향을 주었습니다.", style:"밝고 생동감 있는 선율, 독주 악기와 오케스트라의 극적 대비, 리토르넬로 형식", works:["사계","두 대의 바이올린을 위한 협주곡","글로리아","화음의 영감"] },
  { id:"couperin",    name:"쿠프랭",           nameEn:"François Couperin",             era:"baroque",    eraLabel:"바로크",    years:"1668-1733", nat:"프랑스",        desc:"프랑스 건반 음악의 대표적 거장. 우아하고 섬세한 프랑스 양식을 완성했습니다. 수많은 클라브생 작품을 남겼으며, 각각의 곡에 독특한 제목을 붙여 음악적 성격을 표현했습니다. 프랑스 음악과 이탈리아 음악의 장점을 결합하려고 노력했던 인물이기도 합니다.", style:"우아하고 섬세한 클라브생 양식, 이탈리아와 프랑스 양식의 융합", works:["클라브생 작품집 전4권","취미의 결합","왕실의 연주회"] },
  { id:"rameau",      name:"라모",             nameEn:"Jean-Philippe Rameau",          era:"baroque",    eraLabel:"바로크",    years:"1683-1764", nat:"프랑스",        desc:"작곡가이자 음악 이론가. 화성학의 기초를 과학적으로 정리한 인물입니다. 그의 저서 화성론은 현대 화성학의 출발점으로 평가됩니다. 오페라와 발레 음악에서도 뛰어난 업적을 남겼으며, 프랑스 바로크 음악의 절정을 이룩했습니다. 바로크 말기부터 고전주의 초기에 걸쳐 활동하며, 그가 정립한 기능화성 이론은 이후 고전주의 음악의 이론적 토대가 되었습니다.", style:"풍부한 오케스트라 색채, 프랑스 바로크의 절정, 기능화성 이론 정립", works:["히폴리트와 아리시","카스토르와 폴리데우케스","클라브생 소품집"] },
  { id:"telemann",    name:"텔레만",           nameEn:"Georg Philipp Telemann",        era:"baroque",    eraLabel:"바로크",    years:"1681-1767", nat:"독일",          desc:"당대 유럽에서 가장 유명했던 작곡가 중 한 명. 3000곡이 넘는 작품을 남긴 다작가였습니다. 교회 음악, 협주곡, 실내악, 오페라 등 거의 모든 장르를 작곡했습니다. 생전에는 바흐보다 더 높은 명성을 누렸으며, 독일과 프랑스 양식을 절묘하게 결합했습니다.", style:"독일과 프랑스 양식의 결합, 모든 장르 섭렵, 명료하고 친근한 음악", works:["식탁 음악","플루트를 위한 12개의 판타지아","오르페우스"] },
  { id:"handel",      name:"헨델",             nameEn:"Georg Friedrich Händel",        era:"baroque",    eraLabel:"바로크",    years:"1685-1759", nat:"독일·영국",     desc:"독일에서 태어나 영국에서 활동한 국제적 작곡가. 오페라와 오라토리오 분야의 거장입니다. 대표작 메시아는 서양 음악 역사상 가장 유명한 오라토리오입니다. 특히 할렐루야 합창은 오늘날까지도 널리 연주됩니다. 왕궁의 불꽃놀이 음악, 수상 음악 등도 유명합니다. 웅장한 합창과 극적인 표현이 특징이며, 영국 음악사에서 가장 중요한 인물 중 하나로 평가됩니다.", style:"웅장하고 극적인 표현, 풍부한 화성, 감동적인 합창, 화려한 오케스트레이션", works:["메시아","수상 음악","왕궁의 불꽃놀이","사울"] },
  { id:"bach",        name:"바흐",             nameEn:"Johann Sebastian Bach",         era:"baroque",    eraLabel:"바로크",    years:"1685-1750", nat:"독일",          desc:"바로크 음악의 절정이자 서양 음악사 전체에서 가장 위대한 작곡가 가운데 한 사람. 대위법과 화성법을 완벽한 수준으로 통합했습니다. 평균율 클라비어곡집은 모든 조성을 체계적으로 탐구한 건반 음악의 걸작입니다. 브란덴부르크 협주곡은 협주곡 장르의 정점을 보여줍니다. 마태수난곡과 B단조 미사는 종교 음악의 최고 걸작으로 평가받습니다. 푸가의 기법은 대위법 연구의 집대성입니다. 그의 음악은 고전주의·낭만주의·현대 음악에 이르기까지 모든 시대의 작곡가들에게 영향을 주었습니다. 1750년 바흐의 사망은 일반적으로 바로크 시대의 종말로 간주됩니다.", style:"복잡하고 정교한 대위법, 깊은 종교적 성찰, 수학적 완벽함", works:["마태 수난곡","골드베르크 변주곡","브란덴부르크 협주곡","푸가의 기법"] },
  // ── 고전주의 ──
  { id:"d_scarlatti",    name:"도메니코 스카를라티", nameEn:"Domenico Scarlatti",          era:"classical", eraLabel:"고전주의", years:"1685-1757", nat:"이탈리아",    desc:"바흐·헨델과 같은 해에 태어났지만 전혀 다른 방향으로 발전한 작곡가입니다. 555곡의 건반 소나타를 남겼으며, 스페인 민속 음악과 기타 연주 기법을 건반악기에 도입했습니다. 한 악장 형식의 짧은 소나타들은 고전주의 피아노 소나타의 선구로 평가됩니다. 빠른 손 교차와 화려한 기교, 독창적인 화성 사용이 특징입니다.", style:"빠른 손 교차와 화려한 기교, 독창적 화성, 스페인 민속 음악의 영향", works:["건반 소나타 K.9","건반 소나타 K.141","건반 소나타 K.466"] },
  { id:"pergolesi",      name:"페르골레시",         nameEn:"Giovanni Battista Pergolesi", era:"classical", eraLabel:"고전주의", years:"1710-1736", nat:"이탈리아",    desc:"26세에 요절했지만 고전주의 오페라 발전에 큰 영향을 미쳤습니다. 희가극 시녀 마님은 오페라 부파의 대표작입니다. 단순하고 자연스러운 선율은 바로크의 복잡한 양식에서 고전주의의 명료한 양식으로 넘어가는 전환점을 보여줍니다.", style:"단순하고 자연스러운 선율, 오페라 부파의 완성, 바로크에서 고전주의로의 전환", works:["시녀 마님","스타바트 마테르","올림피아데"] },
  { id:"cpe_bach",       name:"C.P.E. 바흐",        nameEn:"Carl Philipp Emanuel Bach",  era:"classical", eraLabel:"고전주의", years:"1714-1788", nat:"독일",         desc:"요한 제바스티안 바흐의 둘째 아들. 감정과다 양식(Empfindsamer Stil)의 대표 작곡가입니다. 예측할 수 없는 전조와 강한 감정 표현을 사용해 낭만주의의 선구적 모습을 보여주었습니다. 하이든·모차르트·베토벤 모두 그에게 큰 영향을 받았습니다.", style:"감정 과다양식, 예측 불가한 전조, 강한 감정 표현, 낭만주의의 선구", works:["프로이센 소나타집","뷔르텐베르크 소나타집","건반악기의 진정한 연주법"] },
  { id:"stamitz",        name:"슈타미츠",           nameEn:"Johann Stamitz",             era:"classical", eraLabel:"고전주의", years:"1717-1757", nat:"보헤미아·독일", desc:"만하임 악파의 중심 인물. 현대 교향악단의 기본 구조를 정립했습니다. 만하임 크레셴도, 만하임 로켓 같은 새로운 오케스트라 기법을 개발했습니다. 교향곡을 독립된 예술 장르로 발전시키는 데 결정적 역할을 했습니다.", style:"만하임 크레셴도, 4악장 교향곡 구조 확립, 오케스트라 기법 혁신", works:["교향곡 D장조 Op.3","클라리넷 협주곡 Bb장조"] },
  { id:"jc_bach",        name:"J.C. 바흐",          nameEn:"Johann Christian Bach",       era:"classical", eraLabel:"고전주의", years:"1735-1782", nat:"독일",         desc:"요한 제바스티안 바흐의 막내아들. '런던의 바흐'로 불리며 갈랑 양식의 대표 작곡가였습니다. 우아하고 단순한 선율을 통해 고전주의 협주곡과 교향곡 발전에 영향을 주었습니다. 어린 모차르트가 직접 만나 배우기도 했습니다.", style:"우아하고 단순한 선율, 갈랑 양식, 고전주의 협주곡·교향곡 발전에 기여", works:["피아노 협주곡 Eb장조","교향곡 Op.3","오페라 아마디스"] },
  { id:"dittersdorf",    name:"디터스도르프",       nameEn:"Carl Ditters von Dittersdorf",era:"classical", eraLabel:"고전주의", years:"1739-1799", nat:"오스트리아",   desc:"고전주의 초기 교향곡 발전에 기여한 작곡가입니다. 100곡이 넘는 교향곡을 남겼으며, 당시에는 하이든과 함께 널리 알려졌습니다.", style:"고전주의 교향곡 발전, 명료하고 경쾌한 양식, 오비디우스 변신 이야기 교향곡", works:["오비디우스 변신 이야기 교향곡","더블베이스 협주곡 E장조"] },
  { id:"leopold_mozart", name:"레오폴트 모차르트",  nameEn:"Leopold Mozart",              era:"classical", eraLabel:"고전주의", years:"1719-1787", nat:"독일·오스트리아", desc:"볼프강 아마데우스 모차르트의 아버지. 바이올린 교본 저술로 유명하며, 고전주의 초기 음악 교육에 큰 영향을 주었습니다.", style:"고전주의 초기 교향곡, 음악 교육의 체계화, 갈랑 양식", works:["바이올린 주법 논문","장난감 교향곡","트럼펫 협주곡 D장조"] },
  { id:"haydn",          name:"하이든",             nameEn:"Joseph Haydn",               era:"classical", eraLabel:"고전주의", years:"1732-1809", nat:"오스트리아",   desc:"'교향곡의 아버지', '현악 사중주의 아버지'로 불립니다. 100곡이 넘는 교향곡과 수많은 현악 사중주를 통해 고전주의 형식을 완성했습니다. 교향곡 제94번 놀람, 제101번 시계, 제104번 런던 등이 대표작입니다. 오랜 기간 에스테르하지 가문의 궁정악장으로 활동하며 독자적인 음악 세계를 구축했습니다. 베토벤의 스승이기도 했습니다.", style:"유머와 위트, 형식적 완성도, 놀라운 전개, 밝고 균형 잡힌 구조", works:["교향곡 94번 놀람","교향곡 101번 시계","천지창조","현악 사중주 황제"] },
  { id:"boccherini",     name:"보케리니",           nameEn:"Luigi Boccherini",           era:"classical", eraLabel:"고전주의", years:"1743-1805", nat:"이탈리아",    desc:"첼리스트이자 작곡가. 현악 오중주 발전에 중요한 역할을 했습니다. 우아하고 세련된 실내악 작품으로 유명합니다.", style:"우아하고 세련된 실내악, 이탈리아적 서정성, 현악 오중주의 발전", works:["기타 오중주 E장조","첼로 협주곡 B장조","미뉴에트"] },
  { id:"clementi",       name:"클레멘티",           nameEn:"Muzio Clementi",             era:"classical", eraLabel:"고전주의", years:"1752-1832", nat:"이탈리아",    desc:"'피아노의 아버지'로 불리는 작곡가. 피아노 연주 기법 발전에 큰 영향을 미쳤습니다. 소나티네 작품들은 오늘날까지 피아노 교육용 교재로 널리 사용됩니다. 고전주의 피아노 음악 발전의 핵심 인물입니다.", style:"피아노 기교의 체계화, 명료한 고전주의 양식, 교육용 작품 발전", works:["소나티나 Op.36","피아노 소나타 Op.25","그라두스 아드 파르나숨"] },
  { id:"mozart",         name:"모차르트",           nameEn:"Wolfgang Amadeus Mozart",    era:"classical", eraLabel:"고전주의", years:"1756-1791", nat:"오스트리아",   desc:"음악사상 가장 천재적인 작곡가 가운데 한 사람. 35세의 짧은 생애 동안 600곡이 넘는 작품을 남겼습니다. 교향곡 40번, 41번 주피터, 피가로의 결혼, 돈 조반니, 마술피리, 레퀴엠 등이 대표작입니다. 오페라·교향곡·협주곡·실내악 등 모든 장르에서 최고 수준의 작품을 남겼습니다. 완벽한 균형과 아름다운 선율로 고전주의의 이상을 가장 완전하게 구현했습니다.", style:"우아한 선율의 아름다움, 완벽한 형식 균형, 표면 뒤에 숨겨진 깊은 감정", works:["레퀴엠","마술피리","교향곡 40번","피아노 협주곡 21번"] },
  { id:"beethoven",      name:"베토벤",             nameEn:"Ludwig van Beethoven",       era:"classical", eraLabel:"고전주의", years:"1770-1827", nat:"독일",         desc:"고전주의와 낭만주의를 연결한 음악사 최대의 전환점. 초기에는 하이든과 모차르트의 전통을 계승했지만, 점차 개인적 감정과 영웅적 정신을 음악에 담아 고전주의의 경계를 넘어섰습니다. 교향곡 제3번 영웅, 제5번 운명, 제6번 전원, 제9번 합창이 대표작입니다. 청력을 잃어가는 상황 속에서도 창작을 멈추지 않았으며, 음악을 인간 정신과 의지의 표현 수단으로 승화시켰습니다. 그의 후기 작품들은 낭만주의뿐 아니라 20세기 음악에도 영향을 주었습니다. 1827년 그의 사망과 함께 고전주의 시대는 사실상 막을 내립니다.", style:"강렬한 감정 표현, 혁신적 형식 실험, 인간 의지와 영웅적 정신", works:["교향곡 9번 합창","운명 교향곡","월광 소나타","영웅 교향곡"] },
  { id:"hummel",         name:"훔멜",               nameEn:"Johann Nepomuk Hummel",      era:"classical", eraLabel:"고전주의", years:"1778-1837", nat:"헝가리·오스트리아", desc:"모차르트의 직계 제자이자 고전주의 말기를 대표하는 피아니스트·작곡가. 어린 시절 빈에서 모차르트와 함께 살며 2년간 직접 가르침을 받았습니다. 당대 베토벤과 함께 유럽 최고의 피아니스트로 명성을 떨쳤으며, 고전주의 화성 위에 초기 낭만주의 감성을 더한 피아노 협주곡과 실내악으로 유명합니다. 쇼팽을 비롯한 낭만주의 피아니스트들의 기교 발전에 큰 영향을 주었습니다.", style:"모차르트 전통의 계승, 고전주의와 낭만주의의 가교, 화려한 피아노 기교", works:["피아노 협주곡 a단조 Op.85","피아노 협주곡 b단조 Op.89","피아노 소나타 f#단조 Op.81"] },
  // ── 낭만주의 ──
  { id:"schubert",      name:"슈베르트",          nameEn:"Franz Schubert",             era:"romantic", eraLabel:"낭만주의", years:"1797-1828", nat:"오스트리아",   desc:"낭만주의 음악의 실질적 출발점. 600곡이 넘는 가곡을 작곡해 예술 가곡 장르를 완성했습니다. 마왕, 보리수, 아름다운 물방앗간 아가씨, 겨울 나그네 등이 대표작입니다. 교향곡 제8번 미완성, 제9번 그레이트도 유명합니다. 고전주의 형식을 유지하면서도 낭만주의 특유의 서정성과 감성을 담아냈습니다. 31세의 젊은 나이에 요절했지만 낭만주의 음악의 방향을 결정했습니다.", style:"서정적인 선율, 풍부한 화성 색채, 자연과 방랑의 감성", works:["마왕","아름다운 물방앗간 아가씨","겨울 나그네","교향곡 8번 미완성"] },
  { id:"weber",         name:"베버",              nameEn:"Carl Maria von Weber",        era:"romantic", eraLabel:"낭만주의", years:"1786-1826", nat:"독일",         desc:"독일 낭만주의 오페라의 창시자. 대표작 마탄의 사수는 독일 민속 전설과 초자연적 요소를 결합한 최초의 본격 낭만주의 오페라입니다. 이후 바그너 오페라의 직접적 선조가 됩니다.", style:"독일 민속 전설과 초자연적 요소, 낭만주의 오페라의 선구", works:["마탄의 사수","오베론","초대"] },
  { id:"mendelssohn",   name:"멘델스존",          nameEn:"Felix Mendelssohn",          era:"romantic", eraLabel:"낭만주의", years:"1809-1847", nat:"독일",         desc:"낭만주의 작곡가이면서도 고전주의적 균형감을 유지한 인물. 한여름 밤의 꿈 서곡과 결혼행진곡이 가장 유명합니다. 교향곡 제3번 스코틀랜드, 제4번 이탈리아도 대표작입니다. 1829년 바흐의 마태수난곡을 부활 공연해 바흐 재평가의 계기를 만들었습니다.", style:"서정적이고 우아한 선율, 고전적 균형, 자연 묘사", works:["한여름 밤의 꿈","교향곡 4번 이탈리아","바이올린 협주곡 e단조","결혼행진곡"] },
  { id:"schumann",      name:"슈만",              nameEn:"Robert Schumann",            era:"romantic", eraLabel:"낭만주의", years:"1810-1856", nat:"독일",         desc:"낭만주의 정신을 가장 잘 보여주는 작곡가 중 한 명. 문학과 음악의 결합을 추구했습니다. 어린이 정경, 카니발, 시인의 사랑 등이 대표작입니다. 음악 평론가로도 활동하며 쇼팽과 브람스의 재능을 세상에 알렸습니다. 정신 질환으로 말년을 보냈으며 낭만주의 예술가상의 전형으로 여겨집니다.", style:"시적이고 문학적인 음악, 피아노 소품의 명수, 내면의 복잡한 감정", works:["어린이 정경","카니발","시인의 사랑","피아노 협주곡 a단조"] },
  { id:"chopin",        name:"쇼팽",              nameEn:"Frédéric Chopin",            era:"romantic", eraLabel:"낭만주의", years:"1810-1849", nat:"폴란드",       desc:"피아노 음악의 시인. 거의 모든 작품을 피아노를 위해 작곡했습니다. 녹턴, 왈츠, 마주르카, 폴로네즈, 발라드 등 다양한 피아노 장르를 발전시켰습니다. 섬세한 감성과 아름다운 선율, 혁신적 화성으로 낭만주의 피아노 음악의 정점을 이뤘습니다. 폴란드 민족주의 정신을 음악에 담아낸 대표적 작곡가이기도 합니다.", style:"서정적 칸타빌레, 폴란드 민족음악, 정교한 페달 기법, 섬세한 감성", works:["즉흥 환상곡","발라드 1번","야상곡 Op.9 No.2","혁명 에튀드"] },
  { id:"liszt",         name:"리스트",            nameEn:"Franz Liszt",                era:"romantic", eraLabel:"낭만주의", years:"1811-1886", nat:"헝가리",       desc:"역사상 최초의 피아노 슈퍼스타. 압도적인 연주 기교로 유럽 전역을 열광시켰습니다. 교향시라는 새로운 장르를 창안했습니다. 헝가리 광시곡, 단테 교향곡, 파우스트 교향곡 등이 대표작입니다. 후기에는 종교 음악과 실험적 작품을 남기며 현대 음악의 선구적 역할도 했습니다.", style:"화려한 피아노 기교, 교향시 창안, 헝가리 민족음악, 오케스트라적 피아니즘", works:["헝가리 광시곡","파우스트 교향곡","피아노 소나타 b단조","메피스토 왈츠"] },
  { id:"berlioz",       name:"베를리오즈",        nameEn:"Hector Berlioz",             era:"romantic", eraLabel:"낭만주의", years:"1803-1869", nat:"프랑스",       desc:"표제 음악의 개척자. 환상 교향곡은 낭만주의 관현악 음악의 대표작입니다. 대규모 오케스트라 편성과 독창적인 관현악법을 발전시켰습니다. 현대 오케스트레이션의 아버지로 불립니다.", style:"대규모 오케스트라, 독창적인 관현악법, 표제음악 개척", works:["환상 교향곡","레퀴엠","로미오와 줄리엣","트로이 사람들"] },
  { id:"wagner",        name:"바그너",            nameEn:"Richard Wagner",             era:"romantic", eraLabel:"낭만주의", years:"1813-1883", nat:"독일",         desc:"오페라 역사를 완전히 바꾼 혁신가. 그는 자신의 작품을 오페라가 아닌 악극(Musikdrama)이라 불렀습니다. 음악과 문학, 무대 예술을 하나로 통합한 총체 예술 작품(Gesamtkunstwerk)을 추구했습니다. 니벨룽의 반지 4부작, 트리스탄과 이졸데, 파르지팔 등이 대표작입니다. 라이트모티프(특정 인물이나 사물을 상징하는 음악 동기)를 체계적으로 사용했습니다. 트리스탄 화음은 전통 조성 체계의 한계를 밀어붙인 화성으로 평가받습니다. 그의 음악은 말러, 리하르트 슈트라우스, 쇤베르크 등 후대 음악가들에게 결정적 영향을 주었습니다.", style:"라이트모티프 체계, 반음계적 화성, 총체 예술(Gesamtkunstwerk)", works:["니벨룽의 반지","트리스탄과 이졸데","파르지팔","로엔그린"] },
  { id:"verdi",         name:"베르디",            nameEn:"Giuseppe Verdi",             era:"romantic", eraLabel:"낭만주의", years:"1813-1901", nat:"이탈리아",     desc:"이탈리아 오페라의 최고 거장. 초기에는 나부코, 리골레토, 일 트로바토레, 라 트라비아타로 성공을 거두었습니다. 후기에는 아이다, 오텔로, 팔스타프로 더욱 깊은 음악 세계를 보여주었습니다. 인간 심리와 극적 전개를 음악으로 표현하는 능력이 뛰어났습니다. 이탈리아 통일 운동의 상징적 인물로도 여겨졌습니다. 오늘날에도 그의 오페라는 세계에서 가장 자주 공연되는 작품들 가운데 속합니다.", style:"강렬한 인간 심리 묘사, 아름다운 성악 선율, 극적인 감정 표현", works:["리골레토","라 트라비아타","아이다","오텔로"] },
  { id:"brahms",        name:"브람스",            nameEn:"Johannes Brahms",            era:"romantic", eraLabel:"낭만주의", years:"1833-1897", nat:"독일",         desc:"절대 음악 진영의 대표 작곡가. 바그너와 리스트가 표제 음악을 발전시키는 동안, 그는 베토벤의 전통을 계승해 교향곡과 실내악을 발전시켰습니다. 교향곡 4곡, 독일 레퀴엠, 헝가리 무곡 등이 대표작입니다. 풍부한 낭만주의 감성을 담으면서도 고전주의 형식을 유지했습니다. 음악사에서는 흔히 '베토벤의 후계자'로 불립니다.", style:"두텁고 풍부한 화성, 복잡한 리듬, 고전적 형식과 낭만적 감성의 조화", works:["교향곡 1번","독일 레퀴엠","피아노 협주곡 2번","헝가리 무곡"] },
  { id:"bruckner",      name:"브루크너",          nameEn:"Anton Bruckner",             era:"romantic", eraLabel:"낭만주의", years:"1824-1896", nat:"오스트리아",   desc:"거대한 규모의 교향곡으로 유명한 작곡가. 독실한 가톨릭 신앙을 바탕으로 종교적이고 장엄한 음악 세계를 구축했습니다. 교향곡 7번, 8번, 9번이 특히 유명합니다. 대성당 건축을 연상시키는 거대한 구조와 금관악기의 웅장한 사용이 특징입니다. 말러에게 큰 영향을 주었습니다.", style:"거대한 구조, 금관악기의 웅장한 사용, 깊은 종교적 감성", works:["교향곡 7번","교향곡 8번","교향곡 9번","테 데움"] },
  { id:"saint_saens",   name:"생상스",            nameEn:"Camille Saint-Saëns",        era:"romantic", eraLabel:"낭만주의", years:"1835-1921", nat:"프랑스",       desc:"프랑스 낭만주의 음악의 중심 인물. 동물의 사육제, 교향곡 제3번 오르간, 서주와 론도 카프리치오소 등이 대표작입니다. 고전적 균형감과 프랑스 특유의 우아함을 결합했습니다.", style:"고전적 균형과 프랑스적 우아함, 명료한 형식, 뛰어난 오케스트레이션", works:["동물의 사육제","교향곡 3번 오르간","서주와 론도 카프리치오소","삼손과 델릴라"] },
  { id:"bizet",         name:"비제",              nameEn:"Georges Bizet",              era:"romantic", eraLabel:"낭만주의", years:"1838-1875", nat:"프랑스",       desc:"오페라 카르멘의 작곡가. 카르멘은 초연 당시 비난받았지만 이후 세계에서 가장 유명한 오페라 중 하나가 되었습니다. 사실적인 인물 묘사와 강렬한 스페인적 색채가 특징입니다. 36세에 요절했지만 오페라 역사에 거대한 족적을 남겼습니다.", style:"사실적 인물 묘사, 강렬한 스페인적 색채, 극적인 리얼리즘", works:["카르멘","진주 잡이","아를의 여인 모음곡","교향곡 C장조"] },
  { id:"smetana",       name:"스메타나",          nameEn:"Bedřich Smetana",            era:"romantic", eraLabel:"낭만주의", years:"1824-1884", nat:"체코",         desc:"체코 민족주의 음악의 아버지. 교향시 연작 나의 조국이 대표작입니다. 그중 몰다우는 체코의 강과 자연을 묘사한 작품으로 유명합니다. 체코 민족 정체성을 음악으로 표현했습니다.", style:"체코 민족 정체성, 자연 묘사, 민족주의 교향시", works:["나의 조국","몰다우","팔려간 신부","리부셰"] },
  { id:"balakirev",     name:"발라키레프",        nameEn:"Mily Balakirev",             era:"romantic", eraLabel:"낭만주의", years:"1837-1910", nat:"러시아",       desc:"러시아 민족주의 음악 집단 '러시아 5인조'의 실질적 지도자. 무소르그스키·보로딘·림스키코르사코프·큐이를 이끌며 서유럽 음악 교육보다 러시아 민요와 동양적 색채를 음악 언어의 근간으로 삼을 것을 주창했습니다. 피아노 환상곡 이슬라메이는 당시 가장 어려운 피아노 독주 작품으로 꼽혔으며, 교향시 타마라는 러시아 민족주의 관현악의 정수를 보여줍니다.", style:"러시아 민족주의, 동양적 색채, 민속 음악의 예술적 승화", works:["이슬라메이","교향시 타마라","교향곡 1번"] },
  { id:"mussorgsky",    name:"무소르그스키",      nameEn:"Modest Mussorgsky",          era:"romantic", eraLabel:"낭만주의", years:"1839-1881", nat:"러시아",       desc:"러시아 5인조 중 가장 독창적인 작곡가. 체계적인 서유럽 음악 교육 없이 독자적인 화성과 리듬을 자유롭게 사용해 강렬하고 개성 넘치는 음악을 만들었습니다. 피아노 모음곡 전람회의 그림은 라벨의 관현악 편곡으로 더욱 유명해졌으며, 오페라 보리스 고두노프는 러시아 오페라의 걸작으로 평가받습니다.", style:"대담한 화성과 독창적 리듬, 러시아 민중의 삶을 담은 사실주의적 음악", works:["전람회의 그림","민둥산의 하룻밤","보리스 고두노프","가곡집 죽음의 노래와 춤"] },
  { id:"tchaikovsky",   name:"차이콥스키",        nameEn:"Pyotr Ilyich Tchaikovsky",   era:"romantic", eraLabel:"낭만주의", years:"1840-1893", nat:"러시아",       desc:"러시아 음악을 세계적 수준으로 끌어올린 작곡가. 교향곡 제4·5·6번 비창, 피아노 협주곡 제1번, 바이올린 협주곡이 대표작입니다. 백조의 호수, 잠자는 숲속의 미녀, 호두까기 인형은 발레 음악의 걸작으로 평가받습니다. 서유럽 음악 기법과 러시아적 감성을 성공적으로 결합했습니다. 풍부한 선율과 강렬한 감정 표현으로 오늘날 가장 사랑받는 작곡가 중 한 명입니다.", style:"러시아적 서정성, 극적인 대비, 풍부한 오케스트라 색채", works:["백조의 호수","호두까기 인형","피아노 협주곡 1번","교향곡 6번 비창"] },
  { id:"dvorak",        name:"드보르자크",        nameEn:"Antonín Dvořák",             era:"romantic", eraLabel:"낭만주의", years:"1841-1904", nat:"체코",         desc:"체코 민족주의 음악의 대표 인물. 교향곡 제9번 신세계로부터가 가장 유명합니다. 슬라브 무곡, 첼로 협주곡도 대표작입니다. 민속 선율과 고전적 형식을 자연스럽게 결합했습니다. 미국 음악 발전에도 영향을 주었습니다.", style:"민속 선율과 고전적 형식의 자연스러운 결합, 풍부한 서정성", works:["교향곡 9번 신세계로부터","첼로 협주곡 b단조","슬라브 무곡","현악 사중주 아메리카"] },
  { id:"faure",         name:"포레",              nameEn:"Gabriel Fauré",              era:"romantic", eraLabel:"낭만주의", years:"1845-1924", nat:"프랑스",       desc:"프랑스 후기 낭만주의를 대표하는 작곡가이자 드뷔시의 스승. 전통적 화성을 미묘하게 변형하고 부드럽게 흘러가는 선율로 고요하고 신비로운 음악 세계를 구축했습니다. 레퀴엠은 죽음을 공포가 아닌 평화롭고 따뜻한 안식으로 표현한 독특한 종교 음악으로 오늘날 가장 사랑받는 합창 작품 중 하나입니다. 파리 음악원 원장으로서 라벨을 비롯한 다음 세대 음악가들을 길러낸 교육자이기도 했습니다.", style:"미묘한 화성의 변형, 고요하고 서정적인 분위기, 프랑스적 세련미와 절제", works:["레퀴엠","파반느","피아노 5중주 2번","가곡집 좋은 노래"] },
  { id:"mahler",        name:"말러",              nameEn:"Gustav Mahler",              era:"romantic", eraLabel:"낭만주의", years:"1860-1911", nat:"오스트리아",   desc:"후기 낭만주의 교향곡의 정점에 선 작곡가. 교향곡은 하나의 세계를 담아야 한다고 주장했습니다. 교향곡 제2번 부활, 제5번, 제8번 천인 교향곡, 대지의 노래 등이 대표작입니다. 오케스트라 규모를 극한까지 확장했고, 삶과 죽음, 자연과 우주, 인간 존재에 대한 철학적 질문을 음악으로 표현했습니다. 그의 교향곡은 후기 낭만주의의 종착점이자 20세기 음악의 출발점으로 평가받습니다. 생전에는 지휘자로 더 유명했으나 현재는 가장 위대한 교향곡 작곡가 중 한 명으로 인정받고 있습니다.", style:"철학적 질문, 거대한 오케스트라 규모, 삶과 죽음의 탐구", works:["교향곡 2번 부활","교향곡 5번","교향곡 8번 천인","대지의 노래"] },
  { id:"r_strauss",     name:"리하르트 슈트라우스",nameEn:"Richard Strauss",            era:"romantic", eraLabel:"낭만주의", years:"1864-1949", nat:"독일",         desc:"교향시 장르를 완성한 작곡가. 차라투스트라는 이렇게 말했다, 돈 후안, 영웅의 생애 등이 대표작입니다. 오케스트라를 이용한 심리 묘사와 음향 표현에서 독보적인 능력을 보였습니다. 오페라 살로메와 엘렉트라는 극단적 화성과 강렬한 표현으로 현대 음악의 문을 열었습니다. 후기에는 장미의 기사와 같은 보다 전통적인 작품도 남겼습니다.", style:"오케스트라적 음향 표현의 극한, 교향시의 완성, 풍부한 화성 언어", works:["차라투스트라는 이렇게 말했다","돈 후안","영웅의 생애","장미의 기사"] },
  { id:"puccini",       name:"푸치니",            nameEn:"Giacomo Puccini",            era:"romantic", eraLabel:"낭만주의", years:"1858-1924", nat:"이탈리아",     desc:"이탈리아 오페라의 마지막 거장. 라 보엠, 토스카, 나비 부인, 투란도트 등이 대표작입니다. 베리즈모 오페라의 사실성과 낭만주의적 아름다운 선율을 결합했습니다. 인간 감정 표현에 탁월했으며, 오늘날 세계에서 가장 인기 있는 오페라 작곡가 중 한 명입니다.", style:"베리즈모 리얼리즘, 아름다운 낭만적 선율, 탁월한 인간 감정 표현", works:["라 보엠","토스카","나비 부인","투란도트"] },
  { id:"mascagni",      name:"마스카니",          nameEn:"Pietro Mascagni",            era:"romantic", eraLabel:"낭만주의", years:"1863-1945", nat:"이탈리아",     desc:"베리즈모 오페라의 기수. 단막 오페라 카발레리아 루스티카나는 1890년 초연에서 폭발적인 반응을 얻으며 하룻밤 사이에 작곡가를 유명하게 만들었습니다. 신화나 역사 대신 민중의 일상 속 비극적 감정을 강렬하게 표현하는 베리즈모 운동을 이끌었습니다. 유명한 간주곡은 오늘날 영화와 공연에서 독립된 관현악 소품으로 자주 연주됩니다.", style:"베리즈모 사실주의, 강렬한 감정과 드라마, 이탈리아 민중의 삶", works:["카발레리아 루스티카나","간주곡","이리스","친구 프리츠"] },
  { id:"debussy",       name:"드뷔시",            nameEn:"Claude Debussy",             era:"romantic", eraLabel:"낭만주의", years:"1862-1918", nat:"프랑스",       desc:"인상주의 음악의 창시자. 목신의 오후에의 전주곡, 바다, 베르가마스크 모음곡, 달빛 등이 대표작입니다. 전통적인 장조·단조 체계에서 벗어나 새로운 음계와 화성 언어를 사용했습니다. 빛과 색채, 분위기를 음악으로 표현하려 했습니다. 20세기 음악의 실질적 출발점으로 평가받습니다.", style:"인상주의적 색채, 전음음계 사용, 모호한 화성과 분위기", works:["달빛","목신의 오후 전주곡","바다","베르가마스크 모음곡"] },
  { id:"ravel",         name:"라벨",              nameEn:"Maurice Ravel",              era:"romantic", eraLabel:"낭만주의", years:"1875-1937", nat:"프랑스",       desc:"드뷔시와 함께 프랑스 인상주의를 대표하는 작곡가. 볼레로, 다프니스와 클로에, 거울, 죽은 왕녀를 위한 파반느 등이 대표작입니다. 정교한 오케스트레이션과 세련된 음향 감각으로 유명합니다. 인상주의를 바탕으로 하면서도 보다 명확하고 구조적인 음악을 추구했습니다.", style:"정교한 오케스트레이션, 세련된 음향 감각, 인상주의 + 구조적 명확성", works:["볼레로","다프니스와 클로에","죽은 왕녀를 위한 파반느","라 발스"] },
  { id:"sibelius",      name:"시벨리우스",        nameEn:"Jean Sibelius",              era:"romantic", eraLabel:"낭만주의", years:"1865-1957", nat:"핀란드",       desc:"핀란드 민족주의 음악의 상징. 교향시 핀란디아가 가장 유명합니다. 교향곡 7곡을 통해 독자적인 음악 언어를 구축했습니다. 핀란드의 자연과 신화를 음악에 담았습니다. 국가적 독립 의식 형성에도 큰 영향을 주었습니다.", style:"핀란드 자연의 웅장함, 독자적 음악 언어, 민족 정체성", works:["핀란디아","바이올린 협주곡 d단조","교향곡 2번","투오넬라의 백조"] },
  { id:"scriabin",      name:"스크랴빈",          nameEn:"Alexander Scriabin",         era:"romantic", eraLabel:"낭만주의", years:"1872-1915", nat:"러시아",       desc:"신비주의적 세계관을 음악에 담은 독창적 작곡가. 초기에는 쇼팽의 영향을 받았지만 후기에는 완전히 독자적인 화성 체계를 개발했습니다. 법열의 시, 프로메테우스 등이 대표작입니다. 후기 작품들은 조성 해체와 현대 음악의 출발을 예고했습니다.", style:"신비 화음, 신비주의적 세계관, 조성 해체의 선구", works:["법열의 시","프로메테우스","피아노 소나타 5번","피아노 소나타 9번 검은 미사"] },
  { id:"rachmaninoff",  name:"라흐마니노프",      nameEn:"Sergei Rachmaninoff",        era:"romantic", eraLabel:"낭만주의", years:"1873-1943", nat:"러시아",       desc:"후기 낭만주의의 마지막 거장. 피아노 협주곡 제2번, 제3번, 교향곡 제2번, 파가니니 주제에 의한 광시곡이 대표작입니다. 풍부한 선율과 화려한 피아노 기교가 특징입니다. 20세기에 활동했지만 음악적으로는 낭만주의 전통을 끝까지 유지했습니다.", style:"풍부한 서정적 선율, 화려한 피아노 기교, 낭만주의 전통의 수호", works:["피아노 협주곡 2번","피아노 협주곡 3번","파가니니 주제에 의한 광시곡","교향곡 2번"] },
  // ── 현대 ──
  { id:"schoenberg",   name:"쇤베르크",         nameEn:"Arnold Schoenberg",   era:"modern", eraLabel:"현대", years:"1874-1951", nat:"오스트리아", desc:"무조 음악과 12음 기법의 창시자. 정화된 밤, 달에 홀린 피에로 등이 대표작입니다. 1000년 이상 지속된 조성 체계를 해체하고 새로운 작곡 원리를 제시했습니다. 제2 빈악파의 중심 인물입니다. 20세기 현대 음악의 가장 중요한 혁신가 중 한 명으로 평가됩니다.", style:"무조음악, 12음 기법, 표현주의, 제2 빈악파의 중심", works:["정화된 밤","달에 홀린 피에로","바르샤바의 생존자","피아노 모음곡 Op.25"] },
  { id:"berg",         name:"베르크",           nameEn:"Alban Berg",           era:"modern", eraLabel:"현대", years:"1885-1935", nat:"오스트리아", desc:"쇤베르크의 제자. 12음 기법을 사용하면서도 감정적 표현을 유지했습니다. 오페라 보체크와 룰루가 대표작입니다. 현대 음악과 낭만주의 감성의 연결고리 역할을 했습니다.", style:"12음 기법 + 낭만주의 감성, 현대 음악의 접근성, 표현주의 오페라", works:["보체크","룰루","바이올린 협주곡","서정 모음곡"] },
  { id:"webern",       name:"베베른",           nameEn:"Anton Webern",         era:"modern", eraLabel:"현대", years:"1883-1945", nat:"오스트리아", desc:"제2 빈악파의 세 번째 인물. 극도로 짧고 응축된 작품을 남겼습니다. 점묘주의적 음악 양식으로 전후 총렬주의에 큰 영향을 주었습니다.", style:"극도의 간결함, 점묘주의, 응축된 표현, 총렬주의의 선구", works:["현악 사중주를 위한 다섯 악장 Op.5","교향곡 Op.21","피아노를 위한 변주곡 Op.27"] },
  { id:"stravinsky",   name:"스트라빈스키",     nameEn:"Igor Stravinsky",      era:"modern", eraLabel:"현대", years:"1882-1971", nat:"러시아",    desc:"20세기 음악의 혁명가. 불새, 페트루슈카, 봄의 제전이 대표작입니다. 특히 봄의 제전은 리듬 혁명을 일으킨 작품으로 평가받습니다. 이후 신고전주의 음악의 중심 인물이 되었습니다. 음악사에서 가장 영향력 있는 작곡가 중 한 명입니다.", style:"복잡한 리듬과 박자 변화, 신고전주의적 명료함, 다양한 양식의 탐구", works:["봄의 제전","불새","페트루슈카","병사 이야기"] },
  { id:"bartok",       name:"바르토크",         nameEn:"Béla Bartók",          era:"modern", eraLabel:"현대", years:"1881-1945", nat:"헝가리",    desc:"20세기 음악과 민속 음악 연구를 결합한 작곡가. 헝가리·루마니아·슬로바키아 등지의 민요를 직접 수집하고 연구했습니다. 관현악을 위한 협주곡, 현악 사중주 전곡, 미크로코스모스 등이 대표작입니다. 민속 음악의 리듬과 음계를 현대 음악 언어와 결합했습니다. 20세기 가장 독창적인 작곡가 가운데 한 명으로 평가됩니다.", style:"민속 음악 원리와 현대 음악의 결합, 독자적 화성 언어, 강렬한 리듬", works:["관현악을 위한 협주곡","현악 사중주 전집","미크로코스모스","피아노 협주곡 3번"] },
  { id:"prokofiev",    name:"프로코피예프",     nameEn:"Sergei Prokofiev",     era:"modern", eraLabel:"현대", years:"1891-1953", nat:"러시아",    desc:"강렬한 리듬과 현대적 감각이 특징인 작곡가. 피아노 협주곡 제3번, 로미오와 줄리엣, 피터와 늑대 등이 대표작입니다. 날카롭고 기계적인 음악 언어와 서정성을 동시에 지녔습니다. 20세기 러시아 음악의 핵심 인물입니다.", style:"날카로운 리듬, 현대적 불협화음, 서정성과 기계적 음악의 공존", works:["로미오와 줄리엣","피터와 늑대","피아노 협주곡 3번","교향곡 1번 고전"] },
  { id:"shostakovich", name:"쇼스타코비치",     nameEn:"Dmitri Shostakovich",  era:"modern", eraLabel:"현대", years:"1906-1975", nat:"러시아",    desc:"소련 시대를 대표하는 작곡가. 교향곡 제5번, 제7번 레닌그라드, 제10번, 현악 사중주 전곡 등이 대표작입니다. 스탈린 체제의 압박 속에서 작품 활동을 이어갔습니다. 표면적으로는 체제에 순응하면서도 음악 속에 풍자와 저항을 숨겨 놓았다는 해석이 많습니다. 20세기 최고의 교향곡 작곡가 중 한 명으로 평가됩니다.", style:"풍자와 저항, 긴장과 해소, 강렬한 표현력, 개인과 역사의 갈등", works:["교향곡 5번","교향곡 7번 레닌그라드","교향곡 10번","현악 사중주 8번"] },
  { id:"britten",      name:"브리튼",           nameEn:"Benjamin Britten",     era:"modern", eraLabel:"현대", years:"1913-1976", nat:"영국",      desc:"20세기 영국 음악의 부흥을 이끈 인물. 오페라 피터 그라임스, 전쟁 레퀴엠이 대표작입니다. 명확한 선율과 뛰어난 극적 감각으로 현대 오페라를 발전시켰습니다. 퍼셀 이후 가장 중요한 영국 작곡가로 평가받습니다.", style:"명확한 선율, 뛰어난 극적 감각, 현대 오페라의 발전", works:["피터 그라임스","전쟁 레퀴엠","청소년 관현악 입문","피아노 협주곡"] },
  { id:"messiaen",     name:"메시앙",           nameEn:"Olivier Messiaen",     era:"modern", eraLabel:"현대", years:"1908-1992", nat:"프랑스",    desc:"독실한 가톨릭 신앙과 새소리 연구로 유명한 작곡가. 시간의 종말을 위한 사중주, 투랑갈릴라 교향곡 등이 대표작입니다. 독창적인 리듬 체계와 음계 사용으로 현대 음악에 큰 영향을 주었습니다. 불레즈와 슈톡하우젠의 스승이기도 했습니다.", style:"종교적 신비주의, 새소리 음악, 독자적 음계와 리듬 체계", works:["시간의 종말을 위한 사중주","투랑갈릴라 교향곡","새의 목록","그리스도의 승천"] },
  { id:"cage",         name:"케이지",           nameEn:"John Cage",            era:"modern", eraLabel:"현대", years:"1912-1992", nat:"미국",      desc:"우연성 음악의 대표 인물. 대표작 4분 33초는 연주자가 아무 소리도 내지 않는 작품으로 유명합니다. 음악이란 무엇인가에 대한 근본적 질문을 던졌습니다. 동양 철학과 선불교의 영향을 받아 음악의 개념 자체를 확장했습니다. 20세기 가장 논쟁적인 작곡가 중 한 명입니다.", style:"우연성 음악, 음악 개념의 확장, 선불교 영향, 비결정성", works:["4분 33초","준비된 피아노를 위한 소나타와 인터류드","뮤직 오브 체인지"] },
  { id:"boulez",       name:"불레즈",           nameEn:"Pierre Boulez",        era:"modern", eraLabel:"현대", years:"1925-2016", nat:"프랑스",    desc:"전후 전위 음악의 핵심 인물. 총렬주의를 발전시켰으며 현대 음악 이론과 지휘 분야에서도 큰 영향을 주었습니다. IRCAM 설립을 주도하며 전자 음악 연구를 이끌었습니다.", style:"총렬주의, 전자 음악, 현대 음악 이론의 발전", works:["르 마르토 상 메트르","피아노 소나타 2번","플리 슬롱 플리"] },
];

const FILTERS = [
  { id: "all",       label: "전체 시대" },
  { id: "baroque",   label: "바로크" },
  { id: "classical", label: "고전주의" },
  { id: "romantic",  label: "낭만주의" },
  { id: "modern",    label: "현대" },
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
  .c-page { max-width: 1120px; margin: 0 auto; padding: 48px 24px 80px; }
  .c-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--charcoal); margin-bottom: 28px; letter-spacing: -0.01em; }

  /* FILTER BAR */
  .c-filters { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
  .c-funnel { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; flex-shrink: 0; }
  .c-funnel-icon { width: 16px; height: 16px; background: var(--brown-mid); clip-path: polygon(0 0, 100% 0, 62% 52%, 62% 100%, 38% 86%, 38% 52%); }
  .c-filter-btn { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 20px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--brown-mid); cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; white-space: nowrap; }
  .c-filter-btn:hover { border-color: var(--gold-light); color: var(--charcoal); }
  .c-filter-btn.active { background: var(--gold); border-color: var(--gold); color: #fff; font-weight: 500; }
  .c-count { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--brown-light); margin-left: 4px; letter-spacing: 0.05em; }
  .c-search { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 18px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--charcoal); outline: none; transition: border-color 0.2s; letter-spacing: 0.02em; min-width: 160px; }
  .c-search:focus { border-color: var(--gold-light); }
  .c-search::placeholder { color: var(--brown-light); }
  .c-fav-only { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 18px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--brown-mid); cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; white-space: nowrap; }
  .c-fav-only:hover { border-color: var(--gold-light); color: var(--charcoal); }
  .c-fav-only.active { background: var(--gold-pale); border-color: var(--gold); color: var(--charcoal); font-weight: 500; }
  .c-empty { grid-column: 1 / -1; text-align: center; padding: 60px 0; font-size: 14px; font-weight: 300; color: var(--brown-light); }

  /* GRID */
  .c-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

  /* CARD */
  .c-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s; cursor: pointer; }
  .c-card:hover { border-color: var(--gold-light); box-shadow: 0 8px 28px var(--shadow); transform: translateY(-3px); }
  .c-card.open { border-color: var(--gold-light); box-shadow: 0 6px 24px var(--shadow); }

  /* PORTRAIT AREA */
  .c-portrait { height: 190px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .c-portrait-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
  .c-portrait-letter { font-family: 'Cormorant Garamond', serif; font-size: 88px; font-weight: 300; line-height: 1; opacity: 0.75; user-select: none; text-shadow: 0 4px 20px rgba(0,0,0,0.3); }
  .c-portrait-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18) 100%); }

  /* CARD INFO */
  .c-info { padding: 14px 16px 4px; }
  .c-name-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .c-name { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 600; color: var(--charcoal); line-height: 1.35; flex: 1; }
  .c-bm { background: none; border: none; cursor: pointer; padding: 2px 0; flex-shrink: 0; transition: transform 0.15s; }
  .c-bm:hover { transform: scale(1.15); }
  .c-bm-shape { width: 14px; height: 20px; background: var(--border); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%); transition: background 0.2s; }
  .c-bm.on .c-bm-shape { background: var(--gold); }
  .c-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .c-tag { background: var(--tag-bg); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: var(--brown-mid); font-weight: 400; letter-spacing: 0.02em; white-space: nowrap; }
  .c-years { font-size: 12px; color: var(--gold); font-weight: 400; letter-spacing: 0.04em; padding-bottom: 12px; }

  /* EXPAND TOGGLE */
  .c-toggle { width: 100%; background: none; border: none; border-top: 1px solid var(--border); padding: 8px 0; font-size: 11px; color: var(--brown-light); cursor: pointer; letter-spacing: 0.08em; transition: color 0.2s, background 0.2s; }
  .c-toggle:hover { background: var(--gold-pale); color: var(--charcoal); }

  /* DETAIL SECTION */
  .c-detail { border-top: 1px solid var(--border); padding: 14px 16px; }
  .c-detail-label { font-family: 'Cormorant Garamond', serif; font-size: 10px; letter-spacing: 0.22em; color: var(--gold); text-transform: uppercase; margin-bottom: 7px; }
  .c-detail-text { font-size: 12px; font-weight: 300; color: var(--brown-mid); line-height: 1.75; margin-bottom: 14px; }
  .c-works { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .c-works li { font-size: 12px; font-weight: 300; color: var(--brown-mid); padding-left: 12px; position: relative; }
  .c-works li::before { content: '▸'; position: absolute; left: 0; color: var(--gold-light); font-size: 9px; top: 2px; }

  /* FOOTER */
  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 1024px) { .c-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 18px; }
    .c-page { padding: 32px 16px 60px; }
    .c-title { font-size: 28px; }
    .c-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
  @media (max-width: 480px) { .c-grid { grid-template-columns: 1fr; } }
`;

export default function ComposersScreen({ onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fav_composers") || "[]"); }
    catch { return []; }
  });

  const toggleFav = (id, e) => {
    e.stopPropagation();
    const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("fav_composers", JSON.stringify(next));
  };

  const q = query.trim();
  const visible = COMPOSERS
    .filter(c => filter === "all" || c.era === filter)
    .filter(c => !favOnly || favorites.includes(c.id))
    .filter(c => !q || c.name.includes(q) || c.nameEn.toLowerCase().includes(q.toLowerCase()));

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

      <div className="c-page">
        <h1 className="c-title">작곡가</h1>

        <div className="c-filters">
          <div className="c-funnel"><div className="c-funnel-icon" /></div>
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`c-filter-btn${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
          <button
            className={`c-fav-only${favOnly ? " active" : ""}`}
            onClick={() => setFavOnly(v => !v)}
          >
            ♥ 즐겨찾기
          </button>
          <input
            className="c-search"
            type="text"
            placeholder="작곡가 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="c-count">{visible.length}명</span>
        </div>

        <div className="c-grid">
          {visible.length === 0 && (
            <div className="c-empty">
              {favOnly && !q ? "즐겨찾기한 작곡가가 없습니다" : "검색 결과가 없습니다"}
            </div>
          )}
          {visible.map(c => {
            const isFav = favorites.includes(c.id);
            const portrait = ERA_PORTRAIT[c.era] || ERA_PORTRAIT.baroque;
            return (
              <div key={c.id} className="c-card" onClick={() => navigate('composer-detail', c)}>
                <div className="c-portrait" style={{ background: portrait.bg }}>
                  {composerImages[c.id] ? (
                    <img
                      src={composerImages[c.id]}
                      alt={c.name}
                      className="c-portrait-img"
                    />
                  ) : (
                    <span className="c-portrait-letter" style={{ color: portrait.letter }}>
                      {c.name[0]}
                    </span>
                  )}
                  <div className="c-portrait-overlay" />
                </div>

                <div className="c-info">
                  <div className="c-name-row">
                    <span className="c-name">{c.name}</span>
                    <button className={`c-bm${isFav ? " on" : ""}`} onClick={e => toggleFav(c.id, e)}>
                      <div className="c-bm-shape" />
                    </button>
                  </div>
                  <div className="c-tags">
                    <span className="c-tag">{c.eraLabel}</span>
                    <span className="c-tag">{c.nat}</span>
                  </div>
                  <div className="c-years">{c.years}</div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      <footer>
        <div className="footer-logo">Music Life</div>
        <div className="footer-text">클래식 음악의 아름다움을 함께 탐구합니다</div>
      </footer>
    </>
  );
}