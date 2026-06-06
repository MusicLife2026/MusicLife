import { useState } from "react";
import { peopleImages } from "../data/peopleImages";

const CAT_PORTRAIT = {
  player:    { bg: "linear-gradient(160deg, #1A2A4A 0%, #2E4A7A 60%, #4A6A9A 100%)", letter: "#C8D8F0" },
  conductor: { bg: "linear-gradient(160deg, #3A1A0A 0%, #6A3A1A 60%, #9A5A2A 100%)", letter: "#F0D8C0" },
  korea:     { bg: "linear-gradient(160deg, #0A2A1A 0%, #1A4A2A 60%, #2A6A3A 100%)", letter: "#C0F0D0" },
};

export const PEOPLE = [
  // ── 연주자 ──
  { id:"rubinstein",    name:"루빈스타인",    nameEn:"Arthur Rubinstein",        cat:"player",    catLabel:"연주자",      years:"1887~1982", nat:"폴란드·미국",    role:"피아노", recordings:["쇼팽 마주르카 전집 (RCA, 1965-66)","브람스 피아노 협주곡 1번 — 줄리니/시카고 (RCA)","쇼팽 발라드와 스케르초 (RCA)","그리그 피아노 협주곡 — 오만디 (RCA)"], desc:"20세기 최고의 쇼팽 연주자. 폴란드 우치 출신으로 베를린에서 공부하고 유럽·남미·미국을 무대로 활동한 진정한 세계인이었습니다. 쇼팽 해석에서 독보적인 권위를 인정받았는데, 기교 과시보다 음악의 자연스러운 노래와 생동감을 우선시하는 방식이 특징이었습니다. 90세를 넘긴 노년에도 연주 활동을 이어가며 삶에 대한 긍정적 에너지가 음악에 그대로 담긴다는 평가를 받았습니다. 브람스·베토벤·그리그 협주곡도 중요한 레퍼토리였으며, 95세까지 활동한 20세기 최장수 활동 피아니스트 중 한 명입니다." },
  { id:"horowitz",      name:"호로비츠",      nameEn:"Vladimir Horowitz",         cat:"player",    catLabel:"연주자",      years:"1903~1989", nat:"소련·미국",      role:"피아노", recordings:["라흐마니노프 피아노 협주곡 3번 — 바르비롤리 (1951)","스카를라티 소나타집 (DG)","호로비츠 인 모스크바 실황 (DG, 1986)","쇼팽 야상곡집 (Sony)"], desc:"20세기 피아노의 황제. 우크라이나 키예프 출신으로 1925년 서방으로 탈출해 미국에 정착했습니다. 압도적인 기교와 독특한 음색, 강렬한 개성으로 청중을 압도하는 연주를 보여주었으며 특히 스카를라티·쇼팽·스크랴빈·라흐마니노프 해석에서 타의 추종을 불허했습니다. 극도로 예민한 신경과 무대 공포증으로 12년간 공식 연주회를 중단하는 등 은둔과 복귀를 반복했습니다. 1986년 소련 방문 연주는 냉전 시대의 문화 외교 사건으로 기록됩니다." },
  { id:"cliburn",       name:"반 클라이번",   nameEn:"Van Cliburn",               cat:"player",    catLabel:"연주자",      years:"1934~2013", nat:"미국",           role:"피아노", recordings:["차이콥스키 피아노 협주곡 1번 — 콘드라신 (RCA, 1958)","라흐마니노프 피아노 협주곡 2번 — 라이너 (RCA)","쇼팽 야상곡 및 왈츠 선집 (RCA)"], desc:"냉전 시대 음악 외교의 상징. 텍사스 출신으로 1958년 모스크바 차이콥스키 콩쿠르에서 미국인 최초로 우승했습니다. 당시 소련·미국 간 긴장이 극에 달한 시기에 소련 청중이 미국 청년에게 열광했고, 흐루쇼프가 직접 시상을 허락하는 이례적인 상황이 벌어졌습니다. 자신의 이름을 딴 반 클라이번 국제 피아노 콩쿠르를 텍사스 포트워스에 창설해 임윤찬을 비롯한 수많은 차세대 피아니스트를 발굴하는 무대를 만들었습니다." },
  { id:"richter",       name:"리흐테르",      nameEn:"Sviatoslav Richter",        cat:"player",    catLabel:"연주자",      years:"1915~1997", nat:"소련",           role:"피아노", recordings:["슈베르트 피아노 소나타 B장조 D.960 (Philips)","프로코피예프 피아노 협주곡 5번 — 작곡가 지휘 (DG)","바흐 평균율 클라비어곡집 (Olympia)","베토벤 피아노 소나타 전집 (Philips)"], desc:"20세기 피아노의 거인. 우크라이나 지토미르 출신으로 오페라 반주자로 일하다 22세에 처음 정식 피아노 교육을 받은 이례적인 이력의 소유자입니다. 베토벤 피아노 소나타 전곡·슈베르트·프로코피예프·바흐·쇼팽 등 방대한 레퍼토리를 모두 최고 수준으로 소화했으며, 특히 프로코피예프 피아노 협주곡 5번은 작곡가가 직접 초연을 위해 리흐테르를 선택한 것으로 유명합니다. 냉전 시대 소련 내에 갇혀 있다가 1960년 처음 서방 순회 연주를 하자 청중과 비평가 모두 충격을 받았습니다." },
  { id:"pollini",       name:"폴리니",        nameEn:"Maurizio Pollini",          cat:"player",    catLabel:"연주자",      years:"1942~2024", nat:"이탈리아",       role:"피아노", recordings:["쇼팽 에튀드 전집 Op.10·25 (DG)","베토벤 피아노 소나타 후기 3곡 (DG)","쇤베르크·베베른 피아노 작품집 (DG)","슈베르트 피아노 소나타 D.960 (DG)"], desc:"20세기 후반 가장 지성적인 피아니스트. 밀라노 출신으로 1960년 쇼팽 콩쿠르에서 심사위원장 루빈스타인이 '심사위원 중 누가 그보다 잘 칠 수 있는가'라고 물었다는 일화가 전해질 만큼 압도적인 우승을 거뒀습니다. 쇼팽·베토벤·슈베르트를 비롯해 쇤베르크·베베른·노노·불레즈 등 현대 음악까지 모두 최고 수준으로 소화하는 드문 피아니스트였습니다. 연주의 정확성과 투명한 음색, 악보에 충실한 해석이 특징으로 낭만적 감정 과잉을 배제하는 지적이고 절제된 스타일로 일관했습니다." },
  { id:"ashkenazy",     name:"아쉬케나지",    nameEn:"Vladimir Ashkenazy",        cat:"player",    catLabel:"연주자",      years:"1937~",     nat:"소련·아이슬란드", role:"피아노·지휘", recordings:["라흐마니노프 피아노 협주곡 전집 — 프레빈 (Decca)","쇼팽 야상곡 전집 (Decca)","스크랴빈 피아노 소나타 전집 (Decca)","쇼팽 에튀드 전집 (Decca)"], desc:"피아니스트와 지휘자를 모두 최고 수준으로 겸한 인물. 1962년 차이콥스키 콩쿠르에서 공동 1위를 차지하고 1963년 소련을 탈출해 아이슬란드에 귀화했습니다. 라흐마니노프·쇼팽·스크랴빈 해석에서 특히 권위를 인정받았으며, 라흐마니노프 피아노 협주곡과 독주 작품 전집은 현재도 기준 음반으로 자주 언급됩니다. 50대 이후 지휘에 비중을 높여 체코 필하모닉·NHK 교향악단 등을 이끌었습니다." },
  { id:"argerich",      name:"아르헤리치",    nameEn:"Martha Argerich",           cat:"player",    catLabel:"연주자",      years:"1941~",     nat:"아르헨티나",     role:"피아노", recordings:["쇼팽 피아노 협주곡 1번 — 아바도 (DG)","라벨 가스파르 드 라 뉘 (DG)","프로코피예프 피아노 협주곡 3번 — 아바도 (DG)","슈만 피아노 협주곡 — 아바도 (DG)"], desc:"20세기 후반 최고의 여성 피아니스트이자 살아있는 전설. 부에노스아이레스 출신으로 어린 시절 굴다·미켈란젤리 등 당대 최고의 피아니스트들에게 사사받았습니다. 1965년 쇼팽 콩쿠르 우승으로 세계 무대에 데뷔했으며 이후 반세기 넘게 최정상 자리를 지키고 있습니다. 쇼팽·슈만·프로코피예프·라벨·바흐에서 불같은 에너지와 리듬적 생동감, 독창적 해석으로 독보적 위치를 점합니다." },
  { id:"zimerman",      name:"지메르만",        nameEn:"Krystian Zimerman",         cat:"player",    catLabel:"연주자",      years:"1956~",     nat:"폴란드",         role:"피아노", recordings:["쇼팽 피아노 협주곡 전집 — 자신이 지휘 (DG)","브람스 피아노 협주곡 전집 — 번스타인 (DG)","슈베르트 피아노 소나타 D.960 (DG)","쇼팽 발라드 전집 (DG)"], desc:"완벽주의의 상징. 카토비체 출신으로 1975년 쇼팽 콩쿠르 우승 후 데뷔했으며 극도로 엄격한 자기 기준으로 연간 연주 횟수를 스스로 제한하는 것으로 유명합니다. 자신의 스타인웨이 피아노를 직접 조율하고 관리하며 공연장까지 운반하는 것으로 알려져 있습니다. 쇼팽 해석에서 가장 권위 있는 연주자 중 한 명으로, 피아노 협주곡 전집을 직접 지휘하며 녹음한 것이 기준 음반으로 꼽힙니다." },
  { id:"kissin",        name:"키신",          nameEn:"Yevgeny Kissin",            cat:"player",    catLabel:"연주자",      years:"1971~",     nat:"러시아·영국",    role:"피아노", recordings:["쇼팽 피아노 협주곡 1·2번 — 카라얀/BPO (Sony, 1990)","카네기홀 데뷔 실황 (Sony, 1990)","리스트 피아노 협주곡 1·2번 (EMI)","슈베르트 방랑자 환상곡 (Sony)"], desc:"천재 신동에서 시대의 거장으로 성장한 피아니스트. 모스크바 출신으로 11세에 모스크바 필하모닉과 협연해 세상을 놀라게 했습니다. 1990년 카네기홀 데뷔 독주회는 10대 연주자의 공연으로는 전례 없는 열광을 불러일으켰으며 공연 실황 녹음이 그대로 음반으로 발매되었습니다. 쇼팽·리스트의 기교적 작품에서 특히 강점을 보이며 라흐마니노프·스크랴빈·프로코피예프도 주요 레퍼토리입니다." },
  { id:"yuja_wang",     name:"유자 왕",       nameEn:"Yuja Wang",                 cat:"player",    catLabel:"연주자",      years:"1987~",     nat:"중국",           role:"피아노", recordings:["라흐마니노프 피아노 협주곡 전집 — 두다멜 (DG, 2024)","프로코피예프 피아노 협주곡 2번 — 아바도 (DG)","리스트 피아노 협주곡 — 아바도 (DG)","황제들의 피아노 — 독주 앨범 (DG)"], desc:"현재 세계에서 가장 주목받는 피아니스트. 베이징 출신으로 중앙음악원에서 공부하고 커티스 음악원에서 완성했습니다. 화려한 기교와 음악적 지성을 겸비한 연주, 무대 위의 강렬한 존재감과 독창적 의상 선택으로 클래식 음악의 이미지 자체를 바꾸었다는 평가를 받습니다. 라흐마니노프·프로코피예프·스크랴빈·리스트에서 특히 강점을 보이며 현대 음악에도 적극적으로 참여합니다." },
  { id:"lang_lang",     name:"랑랑",          nameEn:"Lang Lang",                 cat:"player",    catLabel:"연주자",      years:"1982~",     nat:"중국",           role:"피아노", recordings:["골드베르크 변주곡 (DG, 2020)","차이콥스키 피아노 협주곡 1번 — 게르기예프 (DG)","리스트 피아노 협주곡 1·2번 — 바렌보임 (DG)","랑랑 인 베를린 — 실황 (Sony)"], desc:"현재 세계에서 가장 대중적으로 알려진 클래식 피아니스트. 선양 출신으로 베이징 중앙음악원과 커티스 음악원에서 공부했습니다. 1999년 시카고 라비니아 페스티벌에서 대타로 게르기예프 지휘 차이콥스키 협주곡을 연주해 하룻밤 사이에 국제적 명성을 얻었습니다. 중국을 비롯한 아시아 청소년들이 클래식 음악에 입문하는 데 결정적 기여를 했다는 점에서 음악 문화사적 의미가 큽니다." },
  { id:"trifonov",      name:"트리포노프",    nameEn:"Daniil Trifonov",           cat:"player",    catLabel:"연주자",      years:"1991~",     nat:"러시아",         role:"피아노", recordings:["라흐마니노프 피아노 협주곡 전집 — 네메 예르비 (DG)","쇼팽 에튀드 전집 (DG)","무소륵스키 전람회의 그림 (DG)","슈만 피아노 작품집 (DG)"], desc:"현재 가장 다재다능한 젊은 피아니스트. 니즈니노브고로드 출신으로 모스크바 음악원과 커티스 음악원을 거쳤습니다. 2010년 쇼팽 콩쿠르 3위, 2011년 차이콥스키 콩쿠르 1위를 차지해 단번에 세계적 주목을 받았습니다. 바흐부터 현대 음악까지 방대한 레퍼토리를 소화하며 작곡가로서의 역량도 갖춘 보기 드문 음악가입니다." },
  { id:"sherman",       name:"러셀 셔먼",     nameEn:"Russell Sherman",           cat:"player",    catLabel:"연주자",      years:"1930~2023", nat:"미국",           role:"피아노", recordings:["라흐마니노프 피아노 소나타 2번 (GM)","베토벤 후기 피아노 소나타 (GM)","리스트 피아노 소나타 b단조 (GM)"], desc:"미국 피아노 교육의 거장. 줄리아드 스쿨과 뉴잉글랜드 음악원에서 수십 년간 후학을 양성하며 임윤찬의 스승 손민수를 비롯한 수많은 연주자를 길러냈습니다. 연주보다 사유를 중시하는 독특한 교육 철학과 음악과 문학·철학을 결합하는 깊이 있는 해석으로 알려졌습니다. 저서 『Piano Pieces』에 음악에 대한 그의 철학이 집약되어 있습니다." },
  { id:"perlman",       name:"펄만",          nameEn:"Itzhak Perlman",            cat:"player",    catLabel:"연주자",      years:"1945~",     nat:"이스라엘·미국",  role:"바이올린", recordings:["베토벤 바이올린 협주곡 — 줄리니 (EMI)","브람스 바이올린 협주곡 — 줄리니 (EMI)","시벨리우스 바이올린 협주곡 — 프레빈 (EMI)","쉰들러 리스트 사운드트랙 (MCA)"], desc:"20세기 후반 가장 위대한 바이올리니스트. 텔아비브 출신으로 4세에 소아마비를 앓아 하반신이 마비된 채 평생 목발을 짚고 의자에 앉아 연주했습니다. 베토벤·브람스·멘델스존·차이콥스키·시벨리우스 바이올린 협주곡 해석에서 기준 음반으로 꼽히는 녹음들을 남겼습니다. 따뜻하고 풍부한 음색과 인간적 표현이 특징으로, 영화 《쉰들러 리스트》의 메인 테마 바이올린 독주를 직접 연주했습니다." },
  { id:"heifetz",       name:"하이페츠",      nameEn:"Jascha Heifetz",            cat:"player",    catLabel:"연주자",      years:"1901~1987", nat:"러시아·미국",    role:"바이올린", recordings:["베토벤 바이올린 협주곡 — 뭉크 (RCA)","브람스 바이올린 협주곡 — 라이너 (RCA)","차이콥스키 바이올린 협주곡 — 라이너 (RCA)","파가니니 바이올린 협주곡 1번 (RCA)"], desc:"기술적 완벽성의 기준으로 불리는 바이올리니스트. 빌뉴스 출신으로 페테르부르크 음악원에서 레오폴드 아우어에게 사사받았습니다. 1917년 카네기홀 데뷔로 전 세계 음악계를 충격에 빠뜨렸으며 이후 수십 년 동안 바이올린 연주의 절대적 기준으로 군림했습니다. 그의 음반은 지금도 기교와 정확성 측면에서 넘기 어려운 기준으로 평가됩니다." },
  { id:"du_pre",        name:"프레",       nameEn:"Jacqueline du Pré",         cat:"player",    catLabel:"연주자",      years:"1945~1987", nat:"영국",           role:"첼로", recordings:["엘가 첼로 협주곡 — 바르비롤리 (EMI, 1965)","드보르자크 첼로 협주곡 — 줄리니 (Sony)","하이든 첼로 협주곡 C장조 (EMI)","슈만 첼로 협주곡 — 바렌보임 (EMI)"], desc:"20세기 최고의 첼리스트 가운데 한 명. 불꽃 같은 에너지와 깊은 감성으로 전 세계 청중을 사로잡았습니다. 특히 엘가 첼로 협주곡 연주는 수십 년간 잊혀 가던 이 작품을 다시 세계적 명곡의 반열에 올려놓았습니다. 28세에 다발성 경화증 진단을 받아 연주 활동을 중단해야 했으며, 42세에 세상을 떠났습니다. 짧은 생애에도 불구하고 첼로 역사에 지울 수 없는 흔적을 남겼습니다." },
  { id:"rostropovich",  name:"로스트로포비치", nameEn:"Mstislav Rostropovich",    cat:"player",    catLabel:"연주자",      years:"1927~2007", nat:"소련·러시아",    role:"첼로", recordings:["드보르자크 첼로 협주곡 — 카라얀 (DG)","슈베르트 아르페지오네 소나타 — 브리튼 (Decca)","바흐 첼로 모음곡 전집 (EMI)","베를린 장벽 실황 — 바흐 첼로 모음곡 (Teldec, 1989)"], desc:"20세기 최고의 첼리스트이자 지휘자. 쇼스타코비치·프로코피예프·브리튼 등 당대 최고 작곡가들과 직접 교류하며 수십 곡의 첼로 작품을 위촉하고 초연했습니다. 인권 탄압에 반대하다가 소련 정부와 갈등을 겪었고 결국 국외로 추방되었습니다. 1989년 베를린 장벽 붕괴 당시 현장을 찾아 장벽 앞에서 바흐 첼로 모음곡을 연주한 장면은 냉전 종식의 상징적 순간으로 남아 있습니다." },
  { id:"cortot",        name:"코르토",        nameEn:"Alfred Cortot",             cat:"player",    catLabel:"연주자",      years:"1877~1962", nat:"프랑스·스위스",  role:"피아노", recordings:["쇼팽 에튀드 전집 (EMI, 1934)","슈만 어린이 정경 (EMI)","쇼팽 발라드 전집 (EMI)","쇼팽 피아노 협주곡 2번 (EMI)"], desc:"20세기 전반 가장 위대한 낭만주의 피아니스트 가운데 한 명. 스위스 니용 출신으로 파리 음악원에서 수학하며 젊은 시절에는 지휘자로도 활동했습니다. 기술적 완벽함보다 음악의 시적 표현을 극도로 중시하는 연주 철학으로 유명하며, '코르토가 치는 틀린 음은 다른 연주자의 맞는 음보다 낫다'는 평가가 전해집니다. 쇼팽·슈만·포레 해석에서 독보적인 권위를 인정받았으며, 티보·카살스와 함께 삼중주단을 결성하고 파리 에콜 노르말 드 뮤지크를 설립해 교육에도 큰 족적을 남겼습니다." },
  { id:"samson_francois", name:"프랑수아", nameEn:"Samson François",            cat:"player",    catLabel:"연주자",      years:"1924~1970", nat:"프랑스",         role:"피아노", recordings:["쇼팽 야상곡 전집 (EMI)","쇼팽 에튀드 전집 (EMI)","쇼팽 피아노 협주곡 1·2번 (EMI)","드뷔시 피아노 작품집 (EMI)"], desc:"20세기 프랑스 피아노의 시인. 파리 음악원에서 알프레드 코르토에게 사사받았습니다. 정통적 해석보다 극도로 개인적이고 자유로운 연주 철학으로 유명하며, 특히 쇼팽 해석에서 형식보다 감성을 우선시하는 독창적 세계를 구축했습니다. 46세에 심장마비로 요절했지만 EMI에 남긴 쇼팽 음반들은 반세기가 지난 지금도 최고의 명반으로 손꼽힙니다. '천재이자 무법자'라는 평가와 함께 클래식 음악에서 가장 독보적인 개성을 가진 연주자 중 한 명으로 기억됩니다." },
  { id:"godowsky",        name:"고도프스키",    nameEn:"Leopold Godowsky",          cat:"player",    catLabel:"연주자",      years:"1870~1938", nat:"폴란드·미국",    role:"피아노", recordings:["쇼팽 에튀드 53개 편곡 (Naxos)","자바 모음곡 (Marston)","르네상스 소품집 (Marston)"], desc:"기술적 난이도 면에서 역사상 최고의 피아노 작품들을 쓴 피아니스트·작곡가. 쇼팽 에튀드 24곡을 기초로 한층 더 복잡하게 편곡한 53개의 에튀드는 '피아니스트의 에베레스트'로 불립니다. 왼손 독주용 편곡 작품들도 유명합니다. 호로비츠·코르토 등 당대 최고의 피아니스트들이 그의 경이로운 대위법과 기교에 감탄했으며, 조용하고 절제된 연주 스타일로도 유명했습니다." },
  // ── 지휘자 ──
  { id:"abbado",        name:"아바도",        nameEn:"Claudio Abbado",             cat:"conductor", catLabel:"지휘자",      years:"1933~2014", nat:"이탈리아",       role:"지휘", recordings:["말러 교향곡 전집 — 베를린 필 (DG)","베토벤 교향곡 전집 — 베를린 필 (DG)","슈베르트 교향곡 전집 — 유럽 챔버 (DG)","로시니 서곡집 — 런던 심포니 (DG)"], desc:"20세기 후반 가장 위대한 지휘자 가운데 한 명. 밀라노 출신으로 1989년부터 2002년까지 베를린 필하모닉 수석 지휘자를 역임하며 카라얀의 뒤를 이었습니다. 라 스칼라 음악감독, 빈 국립오페라 감독도 역임했습니다. 말러·베토벤·슈베르트 교향곡 해석에서 정확하면서도 시적인 음악 만들기로 유명했습니다. 암 투병 후에도 루체른 페스티벌 오케스트라를 이끌며 생애 마지막까지 음악에 헌신했습니다." },
  { id:"bohm",          name:"뵘",            nameEn:"Karl Böhm",                  cat:"conductor", catLabel:"지휘자",      years:"1894~1981", nat:"오스트리아",     role:"지휘", recordings:["모차르트 돈 조반니 — 빈 필 (DG)","모차르트 마술피리 — 빈 필 (DG)","베토벤 교향곡 전집 — 빈 필 (DG)","브람스 교향곡 전집 — 빈 필 (DG)"], desc:"20세기 최고의 모차르트와 리하르트 슈트라우스 해석자. 그라츠 출신으로 빈 국립오페라와 빈 필하모닉의 오랜 협력을 통해 독일·오스트리아 고전 레퍼토리의 권위자로 자리 잡았습니다. 리하르트 슈트라우스와 직접 교류하며 그의 오페라 세계 초연을 다수 맡았습니다. 80세 이후에도 현역으로 활발히 지휘했으며 '베를린 필의 명예 지휘자' 칭호를 받았습니다. 모차르트 오페라와 베토벤 교향곡에서 지금도 기준 음반으로 꼽히는 녹음을 남겼습니다." },
  { id:"karajan",       name:"카라얀",        nameEn:"Herbert von Karajan",       cat:"conductor", catLabel:"지휘자",      years:"1908~1989", nat:"오스트리아",     role:"지휘", recordings:["베토벤 교향곡 전집 — 베를린 필 (DG, 1963)","브람스 교향곡 전집 — 베를린 필 (DG)","말러 교향곡 9번 — 베를린 필 (DG, 1982)","비발디 사계 — 베를린 필 (DG)"], desc:"20세기 클래식 음악 산업의 제왕. 잘츠부르크 출신으로 베를린 필하모닉 수석 지휘자를 35년간 역임하며 음반 시장·방송·음악 축제까지 장악한 전례 없는 음악 권력을 구축했습니다. 베토벤·브람스·말러·리하르트 슈트라우스 교향곡과 바그너·베르디 오페라에서 폴리폰하고 압도적인 음향의 연주를 남겼습니다. 나치 당원이었던 전력으로 전후 논란이 있었지만 음악적 성취로 이를 압도했습니다. 사진과 영상 이미지 관리에도 극도로 공을 들인 최초의 미디어 시대 지휘자이기도 합니다." },
  { id:"bernstein",     name:"번스타인",      nameEn:"Leonard Bernstein",         cat:"conductor", catLabel:"지휘자",      years:"1918~1990", nat:"미국",           role:"지휘·작곡", recordings:["말러 교향곡 전집 — 뉴욕 필 (Sony)","베토벤 교향곡 9번 — 1989 베를린 (DG)","웨스트 사이드 스토리 — 번스타인 지휘 (DG)","쇼스타코비치 교향곡 7번 — 시카고 심포니 (DG)"], desc:"20세기를 대표하는 미국 지휘자이자 작곡가. 뉴욕 필하모닉 음악 감독으로 활동하며 말러 교향곡 부흥 운동을 이끌었습니다. 젊은 이들을 위한 음악회(Young People's Concerts)를 통해 클래식 음악 교육과 대중화에 큰 공헌을 했습니다. 작곡가로는 웨스트 사이드 스토리로 유명하며, 지휘자와 작곡가 양 분야에서 모두 역사적 업적을 남겼습니다." },
  { id:"barenboim",     name:"바렌보임",      nameEn:"Daniel Barenboim",          cat:"conductor", catLabel:"지휘자",      years:"1942~",     nat:"아르헨티나·이스라엘", role:"피아노·지휘", recordings:["베토벤 피아노 협주곡 전집 — 자신이 지휘 (DG)","바그너 링 사이클 — 바이로이트 (Teldec)","베토벤 피아노 소나타 전집 (DG)","말러 교향곡 전집 — 시카고 심포니 (Teldec)"], desc:"피아니스트와 지휘자로 모두 최고 수준에 도달한 거장. 부에노스아이레스 출신으로 베를린 슈타츠카펠레와 시카고 심포니 음악 감독을 역임했습니다. 베토벤·브람스·바그너 해석에서 세계적 권위를 인정받습니다. 첼리스트 재클린 뒤 프레의 배우자였으며, 이스라엘·팔레스타인 화해를 위한 웨스트-이스턴 디반 오케스트라를 에드워드 사이드와 함께 창설해 문화 외교에도 헌신했습니다." },
  { id:"dudamel",       name:"두다멜",        nameEn:"Gustavo Dudamel",           cat:"conductor", catLabel:"지휘자",      years:"1981~",     nat:"베네수엘라",     role:"지휘", recordings:["말러 교향곡 5번 — 시몬 볼리바르 (DG)","베토벤 교향곡 전집 — LA 필 (DG)","차이콥스키 교향곡 5번 — 베를린 필 (DG)","엘가 수수께끼 변주곡 — LA 필 (DG)"], desc:"엘 시스테마가 낳은 기적. 바리나스 출신으로 베네수엘라의 청소년 음악 교육 프로그램인 엘 시스테마를 통해 성장했습니다. 2004년 구스타프 말러 지휘 콩쿠르 우승으로 세계 무대에 등장했습니다. LA 필하모닉 음악 감독을 역임하며 세계적 명성을 얻었습니다. 폭발적인 에너지와 카리스마 넘치는 지휘 스타일로 젊은 세대에게 클래식 음악을 널리 알린 공로가 큽니다." },
  { id:"makkela",       name:"메켈레",        nameEn:"Klaus Mäkkelä",             cat:"conductor", catLabel:"지휘자",      years:"2002~",     nat:"핀란드",         role:"지휘", recordings:["시벨리우스 교향곡 전집 — 오슬로 필 (Decca)","닐센 교향곡 4·5번 — 파리 오케스트라 (Decca)","드보르자크 교향곡 9번 — 오슬로 필 (Decca)"], desc:"현재 클래식 음악계 최대의 화제 인물. 헬싱키 출신으로 20대 초반에 오슬로 필하모닉과 파리 오케스트르 드 파리의 수석 지휘자를 동시에 맡으며 세계의 주목을 받았습니다. 2027년부터 시카고 심포니 오케스트라 음악 감독직이 확정된 초고속 성장세의 지휘자입니다. 시벨리우스·닐센 등 북유럽 레퍼토리뿐 아니라 베토벤·브람스 교향곡에서도 뛰어난 해석을 보여주고 있습니다." },
  { id:"shaham",        name:"샤니",          nameEn:"Rikhav Shaham",             cat:"conductor", catLabel:"지휘자",      years:"1990~",     nat:"이스라엘",       role:"지휘", recordings:["말러 교향곡 5번 — 필라델피아 오케스트라 (Sony)","차이콥스키 교향곡 4번 — 필라델피아 (Sony)","브람스 교향곡 1번 — 오슬로 필 (Ondine)"], desc:"현재 가장 주목받는 젊은 지휘자 중 한 명. 텔아비브 출신으로 피아니스트로도 전문 교육을 받았습니다. 빈 필하모닉·베를린 필하모닉 등 세계 최정상 오케스트라와 협연하며 빠르게 명성을 쌓았습니다. 현재 필라델피아 오케스트라 음악 감독으로 재직 중이며, 30대 초반에 세계 최고 수준의 오케스트라를 이끄는 차세대 지휘계의 핵심 인물로 평가받고 있습니다." },
  { id:"altinoglu",     name:"알타노프",      nameEn:"Alain Altinoglu",           cat:"conductor", catLabel:"지휘자",      years:"1975~",     nat:"프랑스",         role:"지휘", recordings:["베를리오즈 환상 교향곡 — 라 모네 (Mirare)","바그너 로엔그린 — 라 모네 (Bru Zane)","포레 레퀴엠 — 파리 오케스트라 (Mirare)"], desc:"파리 출신의 프랑스 지휘자. 오페라와 교향악 양 분야에서 활발히 활동하고 있습니다. 브뤼셀 라 모네 오페라 음악 감독 등을 역임하며 유럽 오페라계에서 높은 평가를 받고 있습니다. 정교한 음악 해석과 균형 잡힌 오케스트라 운영 능력으로 주목받고 있으며, 프랑스 지휘계의 중심 세대를 대표하는 인물 가운데 한 명으로 평가됩니다." },
  // ── 한국 음악가 ──
  { id:"kyungwha_chung", name:"정경화",       nameEn:"Kyung-Wha Chung",          cat:"korea",     catLabel:"한국 음악가", years:"1948~",     nat:"한국",           role:"바이올린", recordings:["차이콥스키 바이올린 협주곡 — 프레빈 (Decca, 1970)","브람스 바이올린 협주곡 — 텐슈테트 (EMI)","시벨리우스 바이올린 협주곡 — 프레빈 (Decca)","멘델스존 바이올린 협주곡 — 라틀 (EMI)"], desc:"한국 클래식 음악을 세계 무대에 처음으로 본격적으로 알린 바이올리니스트. 1970년 런던에서 차이콥스키 바이올린 협주곡을 연주하며 유럽 무대에 데뷔했고, 이 공연의 성공으로 세계 음악계의 주목을 받았습니다. 이후 세계적인 음반사 데카(Decca)와 전속 계약을 체결하여 한국인 연주자로서는 매우 이례적인 성과를 이루었습니다. 특유의 강렬한 표현력과 폭발적인 에너지, 깊은 음악성으로 세계 최고의 바이올리니스트 중 한 명으로 평가받습니다." },
  { id:"myungwhun_chung", name:"정명훈",      nameEn:"Myung-Whun Chung",         cat:"korea",     catLabel:"한국 음악가", years:"1953~",     nat:"한국",           role:"피아노·지휘", recordings:["베를리오즈 환상 교향곡 — 바스티유 오페라 (DG)","말러 교향곡 2번 부활 — 서울시향 (DG)","차이콥스키 교향곡 5번 — 필하모니아 (DG)","베르디 레퀴엠 — 바스티유 (DG)"], desc:"세계적인 지휘자이자 피아니스트로, 한국 클래식 음악을 국제 무대에서 대표하는 인물. 1974년 차이콥스키 국제 콩쿠르 피아노 부문에서 2위를 차지하며 국제적인 주목을 받았습니다. 파리 바스티유 오페라 음악감독, 산타 체칠리아 국립아카데미 오케스트라 수석지휘자 등을 역임했습니다. 파리 바스티유 오페라의 음악감독으로 선임된 최초의 한국인이라는 점은 한국 음악사에서 중요한 의미를 가집니다." },
  { id:"kunwoo_paik",    name:"백건우",       nameEn:"Kun-Woo Paik",             cat:"korea",     catLabel:"한국 음악가", years:"1946~",     nat:"한국",           role:"피아노", recordings:["리스트 피아노 소나타 b단조 (Decca)","프로코피예프 피아노 소나타 전집 (Decca)","베토벤 피아노 소나타 선집 (Decca)","라흐마니노프 피아노 협주곡 2번 (Decca)"], desc:"한국을 대표하는 세계적 피아니스트로, 깊이 있는 해석과 완벽한 연주력으로 국제 음악계에서 존경받는 인물. 화려한 기교를 과시하기보다 작품의 본질을 깊이 탐구하는 연주자로 유명합니다. 특히 리스트와 프로코피예프 작품 해석에서 독보적인 위치를 차지하고 있습니다. 한국 피아노계의 수준을 세계에 알리는 데 크게 기여했으며 단순한 공연 활동을 넘어 클래식 음악의 깊이를 대중에게 전달하는 역할을 해왔습니다." },
  { id:"isang_yun",      name:"윤이상",       nameEn:"Isang Yun",                cat:"korea",     catLabel:"한국 음악가", years:"1917~1995", nat:"한국",           role:"작곡", recordings:["예악 — 아방가르드 관현악 (DG)","오페라 심청 — 도이칠란트방송 (DG)","현악 4중주 전집 (Koch)","관악 오중주 전집 (Koch)"], desc:"한국이 낳은 세계적인 현대음악 작곡가로, 동양과 서양의 음악을 창조적으로 융합한 인물. 경상남도 통영에서 태어나 일본과 독일에서 음악을 공부하였으며, 한국 전통음악의 정신을 서양 현대음악 기법과 결합하는 독창적인 음악세계를 구축했습니다. 1972년 뮌헨 올림픽 문화행사의 일환으로 제작된 오페라 「심청」은 큰 성공을 거두며 그를 세계적인 작곡가 반열에 올려놓았습니다. 종종 '동서양 음악의 가교'로 불립니다." },
  { id:"hanna_chang",    name:"장한나",       nameEn:"Han-Na Chang",             cat:"korea",     catLabel:"한국 음악가", years:"1982~",     nat:"한국",           role:"첼로·지휘", recordings:["쇼스타코비치 첼로 협주곡 1번 — 에사-페카 살로넨 (EMI)","엘가 첼로 협주곡 — 라틀 (EMI)","드보르자크 첼로 협주곡 — 라틀 (EMI)","차이콥스키 로코코 변주곡 (EMI)"], desc:"대한민국을 대표하는 첼리스트이자 지휘자. 1994년 11세의 나이로 로스트로포비치 국제 첼로 콩쿠르에서 최연소 우승을 차지하며 세계 음악계의 주목을 받았습니다. 전설적인 첼리스트 로스트로포비치의 지원과 지도를 받으며 성장했습니다. 이후 지휘자로 전향하여 카타르 필하모닉 오케스트라와 노르웨이 트론헤임 심포니 오케스트라를 이끌며 세계적인 여성 지휘자로 자리 잡았습니다." },
  { id:"yeoleum_son",    name:"손열음",       nameEn:"Yeol-Eum Son",             cat:"korea",     catLabel:"한국 음악가", years:"1986~",     nat:"한국",           role:"피아노", recordings:["모차르트 피아노 협주곡 20·21번 (Virgin)","라흐마니노프 피아노 협주곡 2번 — 차이콥스키 콩쿠르 실황","리스트 피아노 작품집 (Virgin)","Modern Times — 독주 앨범 (Virgin)"], desc:"뛰어난 테크닉과 섬세한 음악성으로 세계 무대에서 인정받는 피아니스트. 2011년 차이콥스키 국제 콩쿠르 피아노 부문에서 2위를 차지하며 세계적인 명성을 얻었습니다. 빠르고 정확한 기교뿐 아니라 악곡 구조를 명확하게 표현하는 해석 능력으로 유명합니다. 특히 모차르트 해석은 세계적으로 높은 평가를 받고 있으며, 음악 칼럼 집필과 음악제 기획에도 참여하며 클래식 음악의 대중화에 힘쓰고 있습니다." },
  { id:"sunuk_kim",      name:"김선욱",       nameEn:"Sunwoo Kim",               cat:"korea",     catLabel:"한국 음악가", years:"1988~",     nat:"한국",           role:"피아노", recordings:["베토벤 피아노 소나타 전집 (Linn)","브람스 피아노 협주곡 1번 — 얀손스 (Linn)","슈만 피아노 협주곡 — 두다멜 (Linn)","베토벤 피아노 협주곡 전집 (Linn)"], desc:"대한민국 최초로 리즈 국제 피아노 콩쿠르에서 우승한 세계적인 피아니스트. 2006년 18세의 나이로 영국의 권위 있는 리즈 국제 피아노 콩쿠르에서 우승하면서 세계 음악계의 주목을 받았습니다. 이는 동양인 최초이자 대회 역사상 최연소 우승 기록 중 하나로 평가받습니다. 베토벤과 브람스, 슈만 작품 해석에 강점을 보이며 깊이 있는 음악적 사고와 성숙한 표현력으로 높은 평가를 받고 있습니다." },
  { id:"yekwon_sunwoo",  name:"선우예권",     nameEn:"Yekwon Sunwoo",            cat:"korea",     catLabel:"한국 음악가", years:"1989~",     nat:"한국",           role:"피아노", recordings:["Cliburn Gold — 반 클라이번 우승 실황 (Cliburn)","슈만 피아노 소나타 1번·환상소곡집 (Warner)","라흐마니노프 피아노 소나타 2번 (Warner)","브람스 피아노 소나타 전집 (Warner)"], desc:"2017년 반 클라이번 국제 피아노 콩쿠르에서 한국인 최초로 우승한 피아니스트. 유학 시절 경제적으로 어려운 환경 속에서도 꾸준히 실력을 쌓아 세계 정상급 연주자로 성장했습니다. 뉴욕 카네기홀, 워싱턴 케네디센터 등 세계 주요 공연장에서 연주하며 국제적인 명성을 얻었습니다. 화려한 기교보다 진정성 있는 표현과 따뜻한 음색을 중시하는 것이 특징입니다." },
  { id:"unsuk_chin",     name:"진은숙",       nameEn:"Unsuk Chin",               cat:"korea",     catLabel:"한국 음악가", years:"1961~",     nat:"한국",           role:"작곡", recordings:["바이올린 협주곡 — 비비아네 하그너/라틀 (DG)","피아노 협주곡 — 우에무라/살로넨 (DG)","오페라 이상한 나라의 앨리스 — 바이에른 국립오페라 (DG)","Graffiti — 관현악 작품집 (DG)"], desc:"현대음악 분야에서 세계 최고의 작곡가 중 한 명으로 평가받는 작곡가. 서울대학교 작곡과를 졸업한 후 독일로 유학하여 리게티 죄르지에게 사사했습니다. 베를린 필하모닉, 뉴욕 필하모닉, 런던 심포니 오케스트라 등 세계 정상급 단체들에 의해 작품이 연주되었습니다. 현대음악 분야 최고 권위의 상인 그라베마이어상을 수상하기도 했으며, 오페라 《Alice in Wonderland》 등이 대표작입니다." },
  { id:"seongjin_cho",   name:"조성진 ♡",       nameEn:"Seong-Jin Cho",            cat:"korea",     catLabel:"한국 음악가", years:"1994~",     nat:"한국",           role:"피아노", recordings:["쇼팽 피아노 협주곡 1번 — 쇼팽 콩쿠르 실황 (DG, 2015)","드뷔시 피아노 작품집 (DG)","헨델 건반 모음곡집 (DG)","쇼팽 녹턴 선집 (DG)"], desc:"2015년 쇼팽 국제 피아노 콩쿠르에서 한국인 최초로 우승한 세계적인 피아니스트. 섬세한 음색과 정교한 테크닉, 과장되지 않은 깊이 있는 해석으로 높은 평가를 받았습니다. 베를린 필하모닉, 런던 심포니 오케스트라, 빈 심포니 등 세계 정상급 오케스트라와 협연하며 국제 무대에서 활약하고 있습니다. 세계적 음반사 도이치 그라모폰의 전속 아티스트로 활동 중이며, 한국 클래식 음악이 세계 정상급 수준에 도달했음을 상징하는 인물로 평가받습니다. 미스터치가 거의 없으며 바로크 시대부터 현대곡까지 엄청난 래퍼토리를 가진 피아니스트이다. 앨범에 녹음된 음원보다는 실황 연주가 훨씬 개성이 강하고 잘친다는 평론가들의 평이 대부분이다. 간혹 조성진의 연주는 너무 정석적이라고 하지만, 이는 실황연주를 들어보지 못한 사람들의 착각이고, 조성진은 매 연주마다 루바토, 내성 진행, 종지 표현들을 다르게 함으로써 전공생들에게 벽을 느끼게 만드는 피아니스트이다. 특히 전공생들 사이에서는 인간의 테크닉이 아니라고 평가받는다. 브람스 피아노 협주곡 2번, 라흐마니노프 피아노 협주곡 3번, 프로코피예프 피아노 협주곡 2번, 스카르보같은 엄청난 테크닉을 가진 곡도 미스 없이 거의 춤을 추며 연주한다. 근거가 있는 루바토와 가벼운 소리부터 무겁고 장엄한 소리까지 음색조절을 완벽하게 하는 연주가이다. 물론 연주자도 인간이다 보니 가끔은 미스터치가 나올 때가 있지만 또 어떻게 보면 그것이 공연의 묘미이기도 하고, 조성진의 실황 녹음된 연주를 들어봐도 미스터치가 거의 없다. 미스를 적게 내는 것 자체도 대단하지만, 그러면서도 음악에 몸을 맡기며 연주한다. 충실한 기본기를 갖추었으면서도 놀라운 개성을 가진 연주자이다. 보통 피아니스트들은 독주회는 좀 쓸쓸해서 협주를 좋아하나 자신은 독주회가 더 좋다고 한다. 다수와 함께 있는 것이 불편하여 파티도 별로 안 좋아한다고 혼자가 편하다고 한다. 연주회 프로그램은 어렸을 때부터 본인이 직접 선곡한다. 다만 앙코르는 보통 2곡정도, 최대 5곡까지로 정해두고 있는데 한국에서 앙코르로 전람회의 그림 전곡(30분)을 앙코르로 연주한 적이 있다. 그의 표현을 빌려 설명하자면 앙코르는 디저트와 같아서, 단 것을 너무 많이 먹으면 (관객들에게) 좋지 않으므로 너무 테크닉적인 것만 고집하지 않고 진중한 곡도 관객들에게 선사한다. 관객들에게 하나 바라는 점이 있다면 손수건으로 가려서 기침 소리를 좀 죽여달라 한다. 보통 관객들이 안들리겠지?하고 음악이 격해질때 기침을 하는데 오히려 더 크게 잘 들린다고. 쇼팽 콩쿠르 우승자라서 그런지, 많은 팬들에게 쇼팽과 연관되어 기억되고 있다. 그의 별명 중 하나도 '쵸팽'(성씨인 Cho(조씨의 영어 표기)와 쇼팽을 섞은)일 정도. 그러나 자신은 쇼팽 스페셜리스트로만 남기보다, 레퍼토리를 넓히길 원하는 듯. 그래서 드뷔시 타계 100주기인 2018년에 음반과 연주회에 드뷔시 관련 연주를 늘렸고, 30대에는 브람스 연주에도 도전하겠다는 뜻을 밝히고 있다. 클래식 음악계의 대중화 흐름에 대해서는 '대중의 클래식화가 이루어지는 것을 더 바란다'는 견해를 나타냈다. 클래식 음악이 대중들의 취향에 맞추기 위해 스스로를 무리하게 변질시키는 것보다, 클래식 음악을 있는 그대로 받아들이고 좋아하는 일반 음악팬들이 보다 많아지기를 원한다는 뜻. 프랑스 기자의 표현에 따르면 유연한 상앗빛 손과 긴 손가락을 가진 수수한 모습에 고양이 같은 미소, 좋은 머릿결 등 곱상한 외모에 진중한 성격과 실력까지 겸비하여 국내는 물론 해외(특히 일본 등지)에서도 꽤나 인기가 좋다. 캐릭터 농담곰, 담곰이를 닮았다는 소리를 많이 듣는다. (카네기홀 리사이틀 사인회 중 농담곰 인형을 받았다고...) 크고 예쁜 손을 가져 손을 특히 좋아하는 팬들이 많다. 또 인터뷰 영상들을 보면 외모와는 달리 목소리가 제법 낮고 부드러운데, 쇼팽 콩쿠르 우승 후 프랑스 라디오 공개방송에 출연하여 연주 후 프랑스어를 능숙하게 구사하는 인터뷰는 팬들에게 또다른 매력을 선사했다. 다만 영어는 프랑스어만큼 능숙하지 않은 듯 하다는 게 팬들의 평 (과거. 현재는 영어로 인터뷰 하는 모습을 보면 많은 능숙함을 넘어 아주 잘한다는 것을 알 수 있다.) 사진에선 귀엽게만 나오는데 사진보다 실물이 훨씬 낫다. 실내에서 주로 생활하다보니 피부도 하얗고 귀공자같이 잘 생기고 귀엽다. 그리고 웃을 땐 정말 환하게 웃는다. 또 사인받을 때 일일이 팬들의 눈을 맞춰주는 다정함을 보여준다. 팬들 중에는 조성진과 함께 전국, 전 세계를 도는 경우도 종종 있다. 공연 종료 후에는 사인을 받기 위해 공연장이 인산인해를 이룬다. 여행을 좋아하는 편인데, 여행 중 정처 없이 떠돌다가 좀 무서운 곳인 것 같으면 뒷걸음질치고, 맘에 드는 곳이 있으면 그곳에 머무르는 즉흥적인 스타일이라고 한다. 남극에 가보고 싶다고 한 적이 있다. 장시간 연습에 매진하는 스타일은 아니며 하루 4-5시간을 연습 시간으로 정해놓고 집중 연습한다고 한다. 여가 시간에는 축구나 야구를 보기도 한단다. 수영으로 체력을 기르고 책, 공연, 전시, 영화관람 등 문화 생활을 많이 하러 다니지만 잠도 많이 자는 게으른 편이라고. 주로 낮엔 피아노 연습을 하고 밤엔 사람을 만나거나 여가를 즐긴다고 한다. 기상 시간은 보통 점심 때쯤. 아침을 싫어한다고 밝힌 바 있다. 취미는 목욕(반신욕), 음악 감상, 드라마 시청, 그리고 인터넷으로 각종 베이커리, 디저트 가게나 맛집을 조사한 뒤 찾아가 맛을 보는 것. 인터뷰 전문 번역본 좋아하는 음식은 이탈리아 요리(특히 파스타), 프랑스 요리, 일본 요리, 각종 디저트(특히 티라미수 케이크) 등. 자신의 가장 한국인스러운 부분은 매운 음식을 잘 먹는 점이라고 말했다. 김치는 신 맛 때문에 별로 좋아하지 않는다고 한다. 또 와인, 된장, 사골같은 오래 정성들인 음식을 좋아하며 맥주도 즐기는 편. 유럽에 있는 미슐랭 스타 레스토랑을 다 가보는 것이 그의 꿈이란다. 하지만 혼자 있을 땐 라면으로 끼니를 때우는 등 본인이 직접 요리를 하는 것보단 남이 해주는 것을 좋아한다고 한다. 또한 2015년 쇼팽 콩쿨 이후로 머그컵을 수집하고 있고 스타벅스 시티컵도 모으고 있다. 두 개씩 사모아 하나는 실사용하고, 하나는 전시한다고 한다. 역사와 미술에도 관심이 있다고 한다." },
  { id:"yunchan_lim",    name:"임윤찬 ♡",       nameEn:"Yunchan Lim",              cat:"korea",     catLabel:"한국 음악가", years:"2004~",     nat:"한국",           role:"피아노", recordings:["리스트 초절기교 연습곡 전집 (DG, 2024)","라흐마니노프 피아노 협주곡 3번 — 반 클라이번 우승 실황 (Cliburn, 2022)","쇼팽 에튀드 전집 Op.10·25 (DG)","베토벤 피아노 소나타 — 함머클라비어 (DG)"], desc:"임윤찬 그는 누구인가... 2022년 반 클라이번 국제 피아노 콩쿠르에서 역대 최연소 우승을 차지하며 세계 음악계에 강렬한 인상을 남긴 피아니스트. 결선에서 연주한 라흐마니노프 피아노 협주곡 3번은 전 세계적으로 화제가 되었으며 수백만 회 이상의 조회수를 기록했습니다.(현재 : 1927만호 돌파!!) 뛰어난 기교뿐 아니라 깊은 음악적 통찰과 압도적인 몰입감으로 평가받습니다. 많은 평론가들은 그를 21세기 클래식 음악계를 이끌 차세대 거장으로 평가하고 있습니다. 반 클라이번 국제 피아노 콩쿠르 결승에 앞서 임윤찬은 '저는 음악이 세상에서 몇 안 되는 진짜라고 생각하기 때문에, 인간에게 음악이 필요하다고 생각합니다.' 라고 말해 화제가 되었으며 '오직 음악만을 위해 살아갈 것' 이라고 덧붙였다. 클래식계 최고 권위의 그라모폰에서 최근 50년 간의 위대한 피아니스트들을 선정한 2026 컬렉터스 스페셜 에디션 <그라모폰 선정: 위대한 피아노 거장들 - 최고의 피아니스트, 그드르이 음악과 명반>에서 임윤찬은 이 시대를 대표하는 피아니스트로 표지를 장식했다. 임윤찬은 한국 최초로 클래식 부문 빌보드차트 연간 1위를 기록했다. 특히 2024 빌보드 연간차트에서는 2관왕을 차지했고, 이 또한 한국 최초의 기록이다. (2024 빌보드 정통 클래식차트 연간 1위 & 2024 빌보드 정통 클래식 아티스트 연간 1위). 애플뮤직에서도 2024 클래식 부문 연간 1위를 기록했다. 애플뮤직 연간 1위 또한 한국 최초이다.데뷔앨범 <쇼팽:에튀드>로 클래식의 오스카상으로 불리는 그라모폰 어워드에서 피아노 부문과 영 아티스트 부문 2관왕을 수상했다. 한국 피아니스트가 그라모폰 어워드를 수상한 것은 처음이다(역대 한국인 수상자는 바이올리니스트 정경화, 첼리스트 장한나, 피아니스트 임윤찬이다). 임윤찬은 그라모폰 어워드 역사상 초유의 기록 또한 세웠는데, 임윤찬의 앨범 두 개가 한 부문에 수상 후보로 함께 노미네이트되었다. (심사위원들의 치열한 투표 끝에 임윤찬의 <쇼팽: 에튀드>가 단 한 표 차로 임윤찬의 <리스트: 초절기교 연습곡>를 앞서 피아노 상을 수상했다.) 2024년 데뷔앨범 <쇼팽:에튀드>로 프랑스의 권위있는 클래식 상인 올해의 디아파종 황금상에서 '올해의 젊은 인재상'을 수상했다. BBC 뮤직매거진 어워즈에서는 시상식 역사상 최초로 3관왕(올해의 음반, 기악상, 신인상)을 기록했다. 신인상 수상자가 올해의 음반으로 선정된 것 또한 시상식 역사상 최초의 일!!!! 뉴욕타임즈에서는 2년 연속 '올해 최고의 음반'에 임윤찬의 앨범들을 선정했고, 2022년부터 2025년까지 뉴욕타임즈의 '올해 최고의 공연'에 세 차례 선정되었다. 특히 뉴욕타임즈는 3년 모두 특정 공연이 아니라 임윤찬을 '올해 최고의 공연'으로 선정했다. 2022 '올해 최고의 공연'에는 '임윤찬(의 반 클라이번 피아노 콩쿠르 연주들)'이 선정되었는데, 콩쿠르 연주가 올해 최고의 공연에 선정된 것은 뉴욕타임즈 사상 최초의 일이다. 2024년에는 뉴욕타임즈 '올해 최고의 음반(<쇼팽:에튀드>)'과 '올해 최고의 공연(임윤찬)' 모두에 동시 선정되었다.2026년 2월 발매된 임윤찬의 <바흐:골드베르크 협주곡> 카네기 실황 음반은 현재 글로벌 애플뮤직 클래식 차트에서 15주 1위로 클래식 차트의 신기록을 세우는 중이다. 2024년 10월 3일, 임윤찬은 그라모폰 어워드 역사상 최초의 기록을 세우며 2관왕이 되었다. '베스트 피아노 레코딩', 즉 피아노 상과 신인상에 해당하는 '올해의 젊은 예술가상'을 수상했다. 2024 그라모폰 어워드 피아노 상 최종 후보에 오른 세 앨범 중 두 개는 임윤찬의 <쇼팽:에튀드>와 <리스트:초절기교 연습곡>이었고, 단 한 표 차이로 <쇼팽:에튀드>가 피아노 상을 수상, 1위와 2위를 모두 임윤찬의 앨범이 차지하는 기록을 세웠다. [22] 그라모폰 어워드에 따르면 임윤찬은 '같은 해에 두 장의 앨범이 최종 후보에 오른 최초의 피아니스트이다.' 디아파종 황금상은 그라모폰상과 함께 클래식계에서 권위있는 상이다. 프랑스의 클래식 전문지 디아파종은 매달 뛰어난 음반에 '디아파종 황금상(디아파종 도르)'을 선정하고, 임윤찬은 2024년 6월에 <쇼팽:에튀드>로 '디아파종 황금상'을 받았다. 일 년 동안 디아파종 황금상을 받은 모든 앨범들 중 부문 별로 '올해의 디아파종 황금상(디아파종 도르 드 라네)'를 시상한다. 디아파종 도르 드 라네의 신인상은 전체 클래식 분야에서 한 음반에만 수여되며, 시상하지 않는 해도 있다. 임윤찬의 <쇼팽:에튀드>는 2024년 11월 13일 떼아뜨르 데 샹젤리제에서 열린 디아파종 도르 드 라네 시상식에서 2019년 이후 5년 만에 신인상을 수상했다. 영국 BBC 뮤직 매거진에서 선정하는 상이다. 이 상은 편집팀 및 전문가 위원회에서 선정한 최종 후보들 중 투표로 결정된다. 기악 상은 피아노, 바이올린 등 모든 악기를 통틀어 하나의 앨범에 수여되며 뉴커머 어워드(Newcomer award) 즉 신인상 역시 전체 클래식 분야에서 하나의 앨범에 수여된다. 올해의 음반상(Recording of the Year)은 전문가 위원회에서 결정해서 발표한다. 이 상은 일년 간 발표된 모든 클래식 음반 중 단 하나의 음반에게 수여되기 때문에 한 해를 대표하는 음반이다. 임윤찬의 <쇼팽:에튀드>는 2025년 4월 24일 런던 킹즈 플레이스에서 개최된 BBC 뮤직 매거진 어워즈 시상식에서 신인상, 기악상, 올해의 음반상 3관왕에 올랐다. '그의 뛰어난 업적은 단일 앨범이 BBC 뮤직매거진 어워드를 세 번이나 수상한 최초의 사례일 뿐 아니라, 신인상 수상자가 '올해의 음반상' 을 수상한 최초의 사례이기도 하다' - BBC 뮤직 매거진 Pianote '올해의 클래식 피아니스트상' 수상 2025년 2월 21일 캐나다의 피아노트에서 수여하는 '올해의 클래식 피아니스트상'을 수상했다. 올리비에 베르그루엔상 수상 2025년 7월 29일 스위스 그슈타트에서 유망한 클래식 피아니스트에게 12,000 스위스프랑의 상금(약 USD 1만 5천불)과 함께 현대미술가가 이 상을 위해 한정판으로 디자인하고 제작한 트로피를 수여하는 '올리비에 베르그루엔상'을 수상했다." },
  { id:"inmo_yang",      name:"양인모",       nameEn:"Inmo Yang",                cat:"korea",     catLabel:"한국 음악가", years:"1995~",     nat:"한국",           role:"바이올린", recordings:["파가니니 바이올린 협주곡 1번 — 파가니니 콩쿠르 실황","시벨리우스 바이올린 협주곡 — 시벨리우스 콩쿠르 실황 (2022)","브람스 바이올린 협주곡 (Warner)","차이콥스키 바이올린 협주곡 (Warner)"], desc:"세계 정상급 바이올리니스트로 성장한 대한민국 대표 현악 연주자. 2015년 이탈리아 파가니니 국제 바이올린 콩쿠르에서 한국인 최초로 우승했으며, 2022년 시벨리우스 국제 바이올린 콩쿠르에서도 우승하며 세계 최정상급 연주자로 자리매김했습니다. 뛰어난 테크닉과 함께 섬세한 음악적 표현력으로 높은 평가를 받고 있으며 특히 시벨리우스, 브람스, 차이콥스키 협주곡 해석에서 깊이 있는 음악성을 보여주고 있습니다." },
  { id:"bomsoree_kim",   name:"김봄소리",     nameEn:"Bom-Soree Kim",            cat:"korea",     catLabel:"한국 음악가", years:"1989~",     nat:"한국",           role:"바이올린", recordings:["브루흐 바이올린 협주곡 1번 (DG)","차이콥스키 바이올린 협주곡 (DG)","브람스 바이올린 소나타 전집 (DG)","베토벤 바이올린 소나타집 (DG)"], desc:"대한민국을 대표하는 여성 바이올리니스트. 차이콥스키 국제 콩쿠르, 퀸 엘리자베스 콩쿠르 등 세계 최고 수준의 경연대회에서 입상하며 국제적 명성을 얻었습니다. 풍부한 음색과 우아한 표현력, 뛰어난 무대 장악력으로 세계 음악계의 주목을 받고 있습니다. 현재 도이치 그라모폰의 아티스트로 활동하고 있으며 한국 여성 바이올리니스트를 대표하는 인물로 자리 잡고 있습니다." },
  { id:"taeguk_moon",    name:"문태국",       nameEn:"Tae-Guk Moon",             cat:"korea",     catLabel:"한국 음악가", years:"1994~",     nat:"한국",           role:"첼로", recordings:["드보르자크 첼로 협주곡 (Warner)","쇼스타코비치 첼로 협주곡 1번 (Warner)","바흐 첼로 모음곡 전집 (Warner)","보케리니 첼로 협주곡 (Warner)"], desc:"대한민국을 대표하는 첼리스트. 2014년 파블로 카잘스 국제 첼로 콩쿠르에서 우승하며 국제 음악계의 주목을 받았습니다. 깊고 따뜻한 음색과 섬세한 표현력으로 높이 평가받고 있으며 바흐와 드보르자크, 쇼스타코비치 작품 해석에서 뛰어난 역량을 보여주고 있습니다. 세계 유수의 오케스트라와 협연하고 있으며 한국 첼로계를 대표하는 차세대 거장으로 평가받습니다." },
  { id:"minsu_son",      name:"손민수",       nameEn:"Min-Su Son",               cat:"korea",     catLabel:"한국 음악가", years:"1976~",     nat:"한국",           role:"피아노·교육", recordings:["라흐마니노프 피아노 소나타 2번 (GM)","리스트 피아노 소나타 b단조 (GM)","베토벤 피아노 소나타 후기 작품집 (GM)"], desc:"세계적으로 인정받는 피아니스트이자 교육자. 미국 뉴잉글랜드 음악원 교수로 재직하며 세계 각국의 젊은 음악가들을 지도해 왔습니다. 깊이 있는 음악 해석과 학구적인 접근 방식으로 국제 음악계에서 높은 평가를 받고 있습니다. 특히 임윤찬의 스승으로 널리 알려져 있으며, 그의 음악적 성장에 결정적인 영향을 준 인물로 평가받습니다." },
  { id:"jaemin_han",     name:"한재민",       nameEn:"Jae-Min Han",              cat:"korea",     catLabel:"한국 음악가", years:"2006~",     nat:"한국",           role:"첼로", recordings:["드보르자크 첼로 협주곡 — 에네스쿠 콩쿠르 실황 (2021)","엘가 첼로 협주곡 (Warner)","하이든 첼로 협주곡 C장조 (Warner)"], desc:"현재 세계 클래식 음악계가 주목하는 첼리스트. 2021년 조지 에네스쿠 국제 콩쿠르 첼로 부문 최연소 우승을 차지하며 국제 음악계의 주목을 받았습니다. 이후 세계적인 첼리스트 미샤 마이스키와 함께 무대에 서는 등 빠르게 국제 경력을 쌓고 있습니다. 깊고 성숙한 음색과 나이를 뛰어넘는 음악적 해석 능력이 강점으로 평가됩니다." },
  { id:"sehyun_kim",     name:"김세현",       nameEn:"Se-Hyun Kim",              cat:"korea",     catLabel:"한국 음악가", years:"2007~",     nat:"한국",           role:"바이올린", recordings:["파가니니 바이올린 협주곡 1번 (콩쿠르 실황)","시벨리우스 바이올린 협주곡 (콩쿠르 실황)"], desc:"대한민국의 차세대 바이올리니스트로 국제 음악계에서 빠르게 주목받고 있는 인물. 어린 나이에 여러 국제 콩쿠르에서 입상하며 뛰어난 재능을 인정받았습니다. 정확한 기교와 안정적인 음정, 음악적 표현력이 강점으로 평가됩니다. 한국 바이올린계의 새로운 세대로서 국제 무대에서 활약할 가능성이 매우 높은 연주자로 평가받고 있습니다." },
  { id:"songhyun_kim",   name:"김송현",       nameEn:"Song-Hyun Kim",            cat:"korea",     catLabel:"한국 음악가", years:"2002~",     nat:"한국",           role:"피아노", recordings:["쇼팽 피아노 협주곡 (콩쿠르 실황)","모차르트 피아노 소나타집 (콩쿠르 실황)"], desc:"어린 나이부터 뛰어난 음악성을 보여주며 주목받고 있는 차세대 피아니스트. 다양한 국내외 콩쿠르에서 우수한 성적을 거두며 가능성을 인정받았습니다. 섬세한 표현력과 안정적인 테크닉을 바탕으로 빠르게 성장하고 있습니다. 젊은 세대 특유의 감각과 성숙한 음악 해석을 동시에 보여준다는 평가를 받고 있습니다." },
  { id:"dongmin_lim",    name:"임동민",       nameEn:"Dong-Min Lim",             cat:"korea",     catLabel:"한국 음악가", years:"1981~",     nat:"한국",           role:"피아노", recordings:["쇼팽 피아노 협주곡 1번 — 쇼팽 콩쿠르 실황 (2000)","리스트 피아노 소나타 b단조 (Sony)","쇼팽 스케르초 전집 (Sony)","브람스 피아노 작품집 (Sony)"], desc:"동생 임동혁과 함께 한국 피아노계를 대표하는 연주자. 2000년 제14회 쇼팽 국제 피아노 콩쿠르에서 입상하며 국제 무대에 데뷔했습니다. 기교와 깊이를 겸비한 연주로 유럽과 아시아를 무대로 활발히 활동하고 있습니다. 쇼팽과 리스트에서 특히 강점을 보이며 독주회와 실내악 연주에도 적극적으로 참여하고 있습니다. 임동혁과 함께하는 형제 피아노 듀오 공연은 항상 큰 화제를 모읍니다." },
  { id:"donghyek_lim",   name:"임동혁",       nameEn:"Dong-Hyek Lim",            cat:"korea",     catLabel:"한국 음악가", years:"1984~",     nat:"한국",           role:"피아노", recordings:["쇼팽 에튀드 전집 (EMI)","쇼팽 야상곡 선집 (Sony)","슈만 피아노 협주곡 (콩쿠르 실황)","드뷔시 피아노 작품집 (Sony)"], desc:"섬세하고 시적인 음악성으로 세계 무대에서 주목받는 피아니스트. 2000년 제14회 쇼팽 국제 피아노 콩쿠르에서 16세의 나이로 입상하며 국제 음악계의 주목을 받았습니다. 형 임동민과 함께 쇼팽 콩쿠르에 나란히 입상해 화제가 되었습니다. 파리를 거점으로 유럽에서 활발히 활동하며 쇼팽·슈만·드뷔시 해석에서 특유의 시적 감성으로 높은 평가를 받고 있습니다." },
  { id:"byungdong_paik", name:"백병동",       nameEn:"Byung-Dong Paik",          cat:"korea",     catLabel:"한국 음악가", years:"1936~2022", nat:"한국",           role:"작곡", recordings:["관현악 작품집 — 서울 필하모닉 (서울음반)","피아노 작품집 (서울음반)","실내악 작품집 (서울음반)"], desc:"한국 현대음악의 개척자. 서울 출신으로 서울대학교 음악대학을 졸업하고 독일 프라이부르크에서 유학했습니다. 귀국 후 서울대학교 음악대학 교수로 수십 년간 재직하며 한국 작곡계를 이끌었습니다. 서양 현대음악 기법을 바탕으로 한국 전통음악의 정서를 결합한 독자적 음악 세계를 구축했으며, 관현악·실내악·가곡 등 다양한 장르에서 200곡 이상의 작품을 남겼습니다. 한국 현대음악 발전에 결정적 기여를 한 인물로 평가받습니다." },
  { id:"clara_jumi_kang", name:"클라라 주미 강", nameEn:"Clara-Jumi Kang",        cat:"korea",     catLabel:"한국 음악가", years:"1987~",     nat:"한국·독일",      role:"바이올린", recordings:["파가니니 바이올린 협주곡 1번 (Sony)","비에니아프스키 바이올린 협주곡 2번 (Sony)","브람스 바이올린 소나타 전집 (Sony)","모차르트 바이올린 협주곡 3번 (Sony)"], desc:"섬세한 음색과 탁월한 음악성으로 세계 무대에서 활약하는 바이올리니스트. 독일에서 태어나 한국과 독일을 오가며 성장했습니다. 2010년 파가니니 국제 바이올린 콩쿠르에서 우승하며 세계 음악계의 주목을 받았습니다. 풍부한 음색과 깊이 있는 음악 해석으로 세계 주요 오케스트라와 활발히 협연하고 있으며, 소니 클래시컬 전속 아티스트로 활동 중입니다." },
  { id:"sujung_shin",    name:"신수정",       nameEn:"Su-Jung Shin",             cat:"korea",     catLabel:"한국 음악가", years:"1975~",     nat:"한국",           role:"피아노", recordings:["리스트 피아노 소나타 b단조","쇼팽 발라드 전집","슈만 피아노 작품집"], desc:"섬세한 터치와 깊이 있는 음악성으로 국내외에서 활동하는 피아니스트. 독일 유학 후 다수의 국제 콩쿠르에서 입상하며 경력을 쌓았습니다. 연주 활동과 함께 후학 양성에도 힘쓰고 있습니다." },
  { id:"eha_nuri",       name:"이하느리",     nameEn:"Eha Nuri",                 cat:"korea",     catLabel:"한국 음악가", years:"2006~",         nat:"한국",           role:"바이올린", recordings:[], desc:"한국의 바이올리니스트. 현재는 작곡 중심으로 활동중이다." },
];

const FILTERS = [
  { id: "all",       label: "전체" },
  { id: "player",    label: "연주자" },
  { id: "conductor", label: "지휘자" },
  { id: "korea",     label: "한국 음악가" },
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

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(247,243,237,0.94); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 48px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.06em; color: var(--charcoal); cursor: pointer; }
  .nav-menu { display: flex; gap: 36px; list-style: none; }
  .nav-menu li { font-size: 14px; letter-spacing: 0.04em; color: var(--brown-mid); cursor: pointer; position: relative; padding-bottom: 2px; transition: color 0.2s; }
  .nav-menu li::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: var(--gold); transition: width 0.3s; }
  .nav-menu li:hover { color: var(--charcoal); }
  .nav-menu li:hover::after { width: 100%; }
  .nav-menu li.active { color: var(--gold); font-weight: 600; }
  .nav-menu li.active::after { width: 100%; }

  .p-page { max-width: 1120px; margin: 0 auto; padding: 48px 24px 80px; }
  .p-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--charcoal); margin-bottom: 28px; letter-spacing: -0.01em; }

  .p-filters { display: flex; align-items: center; gap: 10px; margin-bottom: 36px; flex-wrap: wrap; }
  .p-filter-btn { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 20px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--brown-mid); cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; }
  .p-filter-btn:hover { border-color: var(--gold-light); color: var(--charcoal); }
  .p-filter-btn.active { background: var(--gold); border-color: var(--gold); color: #fff; font-weight: 500; }
  .p-count { font-family: 'Cormorant Garamond', serif; font-size: 14px; color: var(--brown-light); margin-left: 4px; letter-spacing: 0.05em; }
  .p-search { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 18px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--charcoal); outline: none; transition: border-color 0.2s; letter-spacing: 0.02em; min-width: 160px; }
  .p-search:focus { border-color: var(--gold-light); }
  .p-search::placeholder { color: var(--brown-light); }
  .p-fav-only { background: var(--warm-white); border: 1.5px solid var(--border); border-radius: 100px; padding: 8px 18px; font-family: 'Noto Serif KR', serif; font-size: 13px; color: var(--brown-mid); cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em; white-space: nowrap; }
  .p-fav-only:hover { border-color: var(--gold-light); color: var(--charcoal); }
  .p-fav-only.active { background: var(--gold-pale); border-color: var(--gold); color: var(--charcoal); font-weight: 500; }
  .p-empty { grid-column: 1 / -1; text-align: center; padding: 60px 0; font-size: 14px; font-weight: 300; color: var(--brown-light); }

  .p-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

  .p-card { background: var(--warm-white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s; cursor: pointer; }
  .p-card:hover { border-color: var(--gold-light); box-shadow: 0 8px 28px var(--shadow); transform: translateY(-3px); }
  .p-card.open { border-color: var(--gold-light); box-shadow: 0 6px 24px var(--shadow); }

  .p-portrait { height: 190px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .p-portrait-img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; }
  .p-portrait-letter { font-family: 'Cormorant Garamond', serif; font-size: 80px; font-weight: 300; line-height: 1; opacity: 0.75; user-select: none; text-shadow: 0 4px 20px rgba(0,0,0,0.3); }
  .p-portrait-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18) 100%); }

  .p-info { padding: 14px 16px 4px; }
  .p-name-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
  .p-name { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 600; color: var(--charcoal); line-height: 1.35; flex: 1; }
  .p-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
  .p-tag { background: var(--tag-bg); border-radius: 100px; padding: 3px 10px; font-size: 11px; color: var(--brown-mid); font-weight: 400; letter-spacing: 0.02em; white-space: nowrap; }
  .p-years { font-size: 12px; color: var(--gold); font-weight: 400; letter-spacing: 0.04em; padding-bottom: 12px; }

  .p-bm { background: none; border: none; cursor: pointer; padding: 2px 0; flex-shrink: 0; transition: transform 0.15s; }
  .p-bm:hover { transform: scale(1.15); }
  .p-bm-shape { width: 14px; height: 20px; background: var(--border); clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%); transition: background 0.2s; }
  .p-bm.on .p-bm-shape { background: var(--gold); }

  .p-toggle { width: 100%; background: none; border: none; border-top: 1px solid var(--border); padding: 8px 0; font-size: 11px; color: var(--brown-light); cursor: pointer; letter-spacing: 0.08em; transition: color 0.2s, background 0.2s; }
  .p-toggle:hover { background: var(--gold-pale); color: var(--charcoal); }

  .p-detail { border-top: 1px solid var(--border); padding: 14px 16px; }
  .p-detail-text { font-size: 12px; font-weight: 300; color: var(--brown-mid); line-height: 1.8; }

  footer { border-top: 1px solid var(--border); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: var(--brown-light); letter-spacing: 0.05em; }
  .footer-text { font-size: 12px; color: var(--brown-light); font-weight: 300; letter-spacing: 0.03em; }

  @media (max-width: 1024px) { .p-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 768px) {
    .nav { padding: 0 20px; } .nav-menu { gap: 14px; }
    .p-page { padding: 32px 16px 60px; }
    .p-title { font-size: 28px; }
    .p-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
    footer { flex-direction: column; gap: 12px; text-align: center; padding: 24px 20px; }
  }
  @media (max-width: 480px) { .p-grid { grid-template-columns: 1fr; } }
`;

export default function PeopleScreen({ onNavigate }) {
  const navigate = onNavigate || (() => {});
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fav_people") || "[]"); }
    catch { return []; }
  });

  const toggleFav = (id, e) => {
    e.stopPropagation();
    const next = favorites.includes(id)
      ? favorites.filter(x => x !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("fav_people", JSON.stringify(next));
  };

  const q = query.trim();
  const visible = PEOPLE
    .filter(p => filter === "all" || p.cat === filter)
    .filter(p => !favOnly || favorites.includes(p.id))
    .filter(p => !q || p.name.includes(q) || p.nameEn.toLowerCase().includes(q.toLowerCase()));

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

      <div className="p-page">
        <h1 className="p-title">역대 인물</h1>

        <div className="p-filters">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`p-filter-btn${filter === f.id ? " active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
          <button
            className={`p-fav-only${favOnly ? " active" : ""}`}
            onClick={() => setFavOnly(v => !v)}
          >
            ♥ 즐겨찾기
          </button>
          <input
            className="p-search"
            type="text"
            placeholder="인물 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="p-count">{visible.length}명</span>
        </div>

        <div className="p-grid">
          {visible.length === 0 && (
            <div className="p-empty">
              {favOnly && !q ? "즐겨찾기한 인물이 없습니다" : "검색 결과가 없습니다"}
            </div>
          )}
          {visible.map(p => {
            const portrait = CAT_PORTRAIT[p.cat];
            const img = peopleImages[p.id];
            const isFav = favorites.includes(p.id);
            return (
              <div key={p.id} className="p-card" onClick={() => navigate("people-detail", p)}>
                <div className="p-portrait" style={{ background: portrait.bg }}>
                  {img ? (
                    <img src={img} alt={p.name} className="p-portrait-img" />
                  ) : (
                    <span className="p-portrait-letter" style={{ color: portrait.letter }}>
                      {p.name[0]}
                    </span>
                  )}
                  <div className="p-portrait-overlay" />
                </div>

                <div className="p-info">
                  <div className="p-name-row">
                    <span className="p-name">
                      {p.name.replace(' ♡', '')}
                      {p.name.includes('♡') && <span style={{color:'#e0517a', marginLeft:'4px', fontFamily:'serif'}}>♡</span>}
                    </span>
                    <button className={`p-bm${isFav ? " on" : ""}`} onClick={e => toggleFav(p.id, e)}>
                      <div className="p-bm-shape" />
                    </button>
                  </div>
                  <div className="p-tags">
                    <span className="p-tag">{p.catLabel}</span>
                    <span className="p-tag">{p.role}</span>
                    <span className="p-tag">{p.nat}</span>
                  </div>
                  <div className="p-years">{p.years}</div>
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
