import type { Destination, VisualType } from '../types';

interface DestinationSeed {
  id: string;
  province: string;
  name: string;
  shortDescription: string;
  keywords: [string, string, string];
  duration: string;
  seasons: string[];
  attractions: [string, string, string];
  foods: [string, string, string];
  visualType: VisualType;
  coordinates: { latitude: number; longitude: number };
}

const visualHue: Record<VisualType, number> = { sea: 198, mountain: 148, city: 224, history: 20, island: 174 };

function destinationGradient(type: VisualType, index: number): string {
  const base = visualHue[type];
  const hueShift = ((index * 29) % 25) - 12;
  const saturation = 54 + (index % 5) * 4;
  const startLightness = 27 + (index % 4) * 3;
  const endLightness = 58 + (index % 6) * 3;
  return `linear-gradient(135deg,hsl(${base + hueShift} ${saturation}% ${startLightness}%),hsl(${base + 24 + hueShift} ${Math.min(84, saturation + 9)}% ${endLightness}%))`;
}

const commonMissions = [
  '현지 시장에서 처음 보는 음식 하나 먹어보기',
  '여행지 이름이 적힌 표지판 앞에서 사진 찍기',
  '지역 카페나 킷사텐 한 곳 방문하기',
  '지도 없이 20분 걷기',
  '현지인에게 추천 메뉴 하나 물어보기',
  '여행지에서 나에게 엽서 한 장 보내기',
  '일몰 또는 야경 사진 찍기',
  '편의점에서 지역 한정 제품 찾아보기',
  '가장 마음에 드는 풍경을 10초 영상으로 촬영하기',
  '지역 특산품 하나 사기',
];

const seeds: DestinationSeed[] = [
  { id:'hokkaido-sapporo', province:'홋카이도', name:'삿포로', shortDescription:'붉은 벽돌 거리와 북쪽의 미식을 함께 즐기는 산뜻한 도시 여행', keywords:['야경','시장','레트로'], duration:'1박 2일', seasons:['봄','여름','겨울'], attractions:['오도리공원','삿포로시 시계탑','모이와산'], foods:['수프카레','미소라멘','해산물덮밥'], visualType:'city', coordinates:{latitude:43.0618,longitude:141.3545} },
  { id:'aomori-hirosaki', province:'아오모리현', name:'히로사키', shortDescription:'성곽과 서양식 건물, 사과 향기를 천천히 따라가는 여행', keywords:['성곽','사과','서양건축'], duration:'1박 2일', seasons:['봄','가을'], attractions:['히로사키공원','후지타기념정원','나카초 무사저택거리'], foods:['케노지루','이가멘치','사과파이'], visualType:'history', coordinates:{latitude:40.6031,longitude:140.4639} },
  { id:'iwate-hiraizumi', province:'이와테현', name:'히라이즈미', shortDescription:'황금 문화의 기억과 고요한 전원 풍경에 마음을 놓는 시간 여행', keywords:['세계유산','사찰','전원'], duration:'1박 2일', seasons:['봄','가을'], attractions:['주손지','모쓰지','닷코쿠노이와야'], foods:['완코소바','마에사와규','즌다모치'], visualType:'history', coordinates:{latitude:38.9866,longitude:141.1137} },
  { id:'miyagi-matsushima', province:'미야기현', name:'마쓰시마', shortDescription:'수많은 섬과 고찰을 유람선으로 잇는 바닷가 휴일', keywords:['일본삼경','유람선','사찰'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['마쓰시마만','즈이간지','고다이도'], foods:['굴요리','규탄','즌다셰이크'], visualType:'sea', coordinates:{latitude:38.3736,longitude:141.0610} },
  { id:'akita-kakunodate', province:'아키타현', name:'가쿠노다테', shortDescription:'무사저택의 검은 담장과 수양벚꽃이 이어지는 도호쿠의 작은 교토', keywords:['무사저택','벚꽃','공예'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['무사저택 거리','히노키나이강 둑길','가바세공 전승관'], foods:['기리탄포나베','이나니와우동','바바헤라 아이스크림'], visualType:'history', coordinates:{latitude:39.5960,longitude:140.5610} },
  { id:'yamagata-ginzan', province:'야마가타현', name:'긴잔 온천', shortDescription:'가스등이 켜지는 목조 료칸 거리에서 보내는 낭만적인 밤', keywords:['온천','설경','레트로'], duration:'1박 2일', seasons:['가을','겨울'], attractions:['긴잔 온천거리','시로가네 폭포','노베사와 은광 유적'], foods:['이타소바','이모니','카레빵'], visualType:'mountain', coordinates:{latitude:38.5720,longitude:140.5310} },
  { id:'fukushima-aizu', province:'후쿠시마현', name:'아이즈와카마쓰', shortDescription:'백호대의 역사와 붉은 기와 성을 만나는 단정한 성하마을', keywords:['성곽','역사','칠기'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['쓰루가성','이모리산','나누카마치 거리'], foods:['소스가쓰동','고즈유','말고기회'], visualType:'history', coordinates:{latitude:37.4940,longitude:139.9300} },
  { id:'ibaraki-oarai', province:'이바라키현', name:'오아라이', shortDescription:'바다 위 도리이와 수족관, 어시장의 활기를 만나는 태평양 여행', keywords:['바다','도리이','시장'], duration:'당일 또는 1박 2일', seasons:['봄','여름','겨울'], attractions:['오아라이 이소사키 신사','아쿠아월드 오아라이 수족관','나카미나토 어시장'], foods:['아귀전골','생멸치덮밥','말린 고구마'], visualType:'sea', coordinates:{latitude:36.3130,longitude:140.5740} },
  { id:'tochigi-nikko', province:'도치기현', name:'닛코', shortDescription:'삼나무 숲 너머 화려한 사원과 호수를 만나는 정석 산 여행', keywords:['세계유산','사찰','호수'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['닛코 도쇼구','게곤 폭포','주젠지호'], foods:['유바요리','천연빙수','다마리즈케'], visualType:'history', coordinates:{latitude:36.7190,longitude:139.6980} },
  { id:'gunma-kusatsu', province:'군마현', name:'구사쓰 온천', shortDescription:'김 오르는 온천마을과 산 공기 속에서 아무것도 하지 않는 호사', keywords:['온천','유바타케','고원'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['유바타케','사이노카와라공원','네쓰노유'], foods:['온천만주','히모카와우동','마이타케튀김'], visualType:'mountain', coordinates:{latitude:36.6220,longitude:138.5960} },
  { id:'saitama-kawagoe', province:'사이타마현', name:'가와고에', shortDescription:'창고 거리와 과자 골목을 기모노 차림으로 걷는 작은 에도 산책', keywords:['고에도','창고거리','먹거리'], duration:'당일', seasons:['봄','가을'], attractions:['구라즈쿠리 거리','도키노카네','가와고에 히카와신사'], foods:['장어요리','고구마 디저트','굵은 면 야키소바'], visualType:'history', coordinates:{latitude:35.9250,longitude:139.4850} },
  { id:'chiba-tateyama', province:'지바현', name:'다테야마', shortDescription:'꽃밭과 해안선을 자전거로 잇는 미나미보소의 휴일', keywords:['해안','꽃','자전거'], duration:'1박 2일', seasons:['봄','여름'], attractions:['오키노시마','시로야마공원','스노사키등대'], foods:['나메로','해산물덮밥','보슈 비파'], visualType:'sea', coordinates:{latitude:34.9960,longitude:139.8700} },
  { id:'tokyo-yanaka', province:'도쿄도', name:'야나카', shortDescription:'절과 상점가, 골목의 고양이를 만나는 도쿄의 느린 여행', keywords:['시타마치','골목','킷사텐'], duration:'당일', seasons:['봄','가을'], attractions:['야나카긴자 상점가','네즈신사','아사쿠라조소관'], foods:['야나카멘치','다이야키','킷사텐 푸딩'], visualType:'city', coordinates:{latitude:35.7270,longitude:139.7660} },
  { id:'kanagawa-kamakura', province:'가나가와현', name:'가마쿠라', shortDescription:'고찰의 초록과 에노덴 창밖의 바다를 함께 즐기는 하루', keywords:['고도','에노덴','바다'], duration:'당일 또는 1박 2일', seasons:['봄','초여름','가을'], attractions:['쓰루가오카 하치만구','하세데라','유이가하마'], foods:['시라스동','가마쿠라 채소','하토사블레'], visualType:'history', coordinates:{latitude:35.3190,longitude:139.5460} },
  { id:'niigata-sado', province:'니가타현', name:'사도섬', shortDescription:'금광의 역사와 거친 해안, 계단식 논을 돌아보는 섬 여행', keywords:['섬','금광','다랑논'], duration:'2박 3일', seasons:['봄','여름','가을'], attractions:['사도금광','센카쿠만','슈쿠네기'], foods:['부리카쓰동','사도스시','오케사감'], visualType:'island', coordinates:{latitude:38.0180,longitude:138.3680} },
  { id:'toyama-tateyama', province:'도야마현', name:'다테야마', shortDescription:'설벽과 고산호를 케이블카로 넘는 구름 위의 여행', keywords:['알펜루트','설벽','절경'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['다테야마 구로베 알펜루트','무로도다이라','미쿠리가이케'], foods:['마스즈시','시로에비','도야마 블랙라멘'], visualType:'mountain', coordinates:{latitude:36.5750,longitude:137.4450} },
  { id:'ishikawa-kanazawa', province:'이시카와현', name:'가나자와', shortDescription:'차야 거리와 현대미술, 제철 해산물을 한 번에 즐기는 성하마을', keywords:['차야거리','정원','공예'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['겐로쿠엔','히가시차야가이','가나자와 21세기미술관'], foods:['해산물덮밥','가나자와오뎅','금박소프트'], visualType:'history', coordinates:{latitude:36.5610,longitude:136.6560} },
  { id:'fukui-echizen', province:'후쿠이현', name:'에치젠', shortDescription:'동해의 절벽과 장인의 마을을 잇는 조용한 공예 여행', keywords:['해안','공예','선종'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['도진보','에치젠 와시노사토','에이헤이지'], foods:['에치젠게','오로시소바','소스가쓰동'], visualType:'sea', coordinates:{latitude:35.9030,longitude:136.1680} },
  { id:'yamanashi-kawaguchiko', province:'야마나시현', name:'가와구치호', shortDescription:'호수에 비친 후지산과 숲속 카페를 돌아보는 절경 여행', keywords:['후지산','호수','카페'], duration:'1박 2일', seasons:['봄','여름','가을','겨울'], attractions:['가와구치호','오이시공원','후지산 파노라마 로프웨이'], foods:['호토','요시다우동','신겐모치'], visualType:'mountain', coordinates:{latitude:35.4980,longitude:138.7680} },
  { id:'nagano-matsumoto', province:'나가노현', name:'마쓰모토', shortDescription:'북알프스를 배경으로 검은 천수각과 공예 거리를 걷는 여행', keywords:['성곽','공예','산'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['마쓰모토성','나카마치거리','마쓰모토시미술관'], foods:['신슈소바','산조쿠야키','오야키'], visualType:'history', coordinates:{latitude:36.2380,longitude:137.9720} },
  { id:'gifu-takayama', province:'기후현', name:'히다 다카야마', shortDescription:'오래된 거리와 아침시장, 나무 향기 가득한 산골 여행', keywords:['옛거리','아침시장','산촌'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['산마치거리','미야가와 아침시장','다카야마진야'], foods:['히다규','다카야마라멘','미타라시당고'], visualType:'history', coordinates:{latitude:36.1460,longitude:137.2520} },
  { id:'shizuoka-izu', province:'시즈오카현', name:'이즈', shortDescription:'푸른 만과 온천, 문학의 흔적을 따라가는 반도 드라이브', keywords:['바다','온천','드라이브'], duration:'1박 2일', seasons:['봄','여름','겨울'], attractions:['조가사키해안','슈젠지온천','오무로산'], foods:['긴메다이','와사비동','사쿠라에비'], visualType:'sea', coordinates:{latitude:34.9710,longitude:138.9460} },
  { id:'aichi-inuyama', province:'아이치현', name:'이누야마', shortDescription:'현존 천수각과 성하마을 먹거리를 즐기는 기소강 작은 여행', keywords:['국보','성하마을','강'], duration:'당일 또는 1박 2일', seasons:['봄','가을'], attractions:['이누야마성','산코이나리신사','메이지무라'], foods:['미소덴가쿠','덴가쿠꼬치','오구라토스트'], visualType:'history', coordinates:{latitude:35.3880,longitude:136.9390} },
  { id:'mie-iseshima', province:'미에현', name:'이세시마', shortDescription:'이세 참배와 진주의 바다를 잇는 맑고 경건한 여행', keywords:['신궁','바다','참배길'], duration:'1박 2일', seasons:['봄','가을'], attractions:['이세신궁','오하라이마치','요코야마전망대'], foods:['이세우동','데코네즈시','아카후쿠'], visualType:'history', coordinates:{latitude:34.4870,longitude:136.7090} },
  { id:'shiga-omihachiman', province:'시가현', name:'오미하치만', shortDescription:'수향과 하치만보리, 상인의 마을을 배로 즐기는 비와호 여행', keywords:['수향','상인마을','호수'], duration:'당일 또는 1박 2일', seasons:['봄','가을'], attractions:['하치만보리','라 코리나 오미하치만','아즈치성터'], foods:['오미규','아카곤냐쿠','후나즈시'], visualType:'history', coordinates:{latitude:35.1280,longitude:136.0980} },
  { id:'kyoto-uji', province:'교토부', name:'우지', shortDescription:'뵤도인의 붉은빛과 차밭의 초록을 한 모금씩 즐기는 고도의 여백', keywords:['말차','세계유산','강'], duration:'당일', seasons:['봄','초여름','가을'], attractions:['뵤도인','우지가미신사','우지강'], foods:['말차파르페','차소바','우지킨토키'], visualType:'history', coordinates:{latitude:34.8840,longitude:135.8000} },
  { id:'osaka-nakazaki', province:'오사카부', name:'나카자키초', shortDescription:'나가야 카페와 빈티지숍이 미로처럼 이어지는 오사카 골목 여행', keywords:['나가야','카페','빈티지'], duration:'당일', seasons:['봄','가을'], attractions:['나카자키초 나가야거리','덴진바시스지 상점가','오사카 주거박물관'], foods:['다코야키','오코노미야키','믹스주스'], visualType:'city', coordinates:{latitude:34.7080,longitude:135.5050} },
  { id:'hyogo-kobe', province:'효고현', name:'고베', shortDescription:'항구의 야경과 이진칸, 롯코산 바람을 즐기는 언덕 도시', keywords:['항구','이진칸','야경'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['기타노 이진칸거리','메리켄파크','롯코산'], foods:['고베규','아카시야키','양과자'], visualType:'city', coordinates:{latitude:34.6900,longitude:135.1950} },
  { id:'nara-naramachi', province:'나라현', name:'나라마치', shortDescription:'격자문 마치야와 고찰을 사슴 발소리와 함께 걷는 고도 산책', keywords:['마치야','고찰','사슴'], duration:'당일 또는 1박 2일', seasons:['봄','가을'], attractions:['나라공원','간고지','나라마치 격자의집'], foods:['가키노하즈시','미와소면','야마토차'], visualType:'history', coordinates:{latitude:34.6790,longitude:135.8320} },
  { id:'wakayama-kumano', province:'와카야마현', name:'구마노 고도', shortDescription:'돌길과 삼나무 숲을 지나 오래된 순례길을 두 발로 걷는 여행', keywords:['세계유산','순례길','숲'], duration:'2박 3일', seasons:['봄','가을'], attractions:['구마노 혼구타이샤','다이몬자카','나치폭포'], foods:['메하리즈시','구마노규','미캉'], visualType:'mountain', coordinates:{latitude:33.8900,longitude:135.7760} },
  { id:'tottori-dunes', province:'돗토리현', name:'돗토리 사구', shortDescription:'바람이 그린 모래결과 투명한 동해가 만드는 비일상의 수평선', keywords:['사구','동해','석양'], duration:'1박 2일', seasons:['봄','가을'], attractions:['돗토리사구','모래미술관','우라도메해안'], foods:['마쓰바가니','우골라멘','이십세기배'], visualType:'sea', coordinates:{latitude:35.5400,longitude:134.2300} },
  { id:'shimane-izumo', province:'시마네현', name:'이즈모', shortDescription:'신화의 신사와 석양의 해변에서 좋은 인연을 바라는 여행', keywords:['신화','신사','석양'], duration:'1박 2일', seasons:['봄','가을'], attractions:['이즈모타이샤','이나사노하마','고대이즈모 역사박물관'], foods:['이즈모소바','시지미국','젠자이'], visualType:'history', coordinates:{latitude:35.3960,longitude:132.6850} },
  { id:'okayama-kurashiki', province:'오카야마현', name:'구라시키', shortDescription:'흰 벽의 마치야와 버드나무, 데님의 푸른빛을 즐기는 미관지구', keywords:['흰벽','운하','데님'], duration:'1박 2일', seasons:['봄','가을'], attractions:['구라시키 미관지구','오하라미술관','아치신사'], foods:['마마카리즈시','데미카쓰동','기비당고'], visualType:'history', coordinates:{latitude:34.5850,longitude:133.7720} },
  { id:'hiroshima-onomichi', province:'히로시마현', name:'오노미치', shortDescription:'언덕길과 고양이, 섬으로 이어지는 다리를 바라보는 영화 같은 마을', keywords:['언덕길','고양이','세토우치'], duration:'1박 2일', seasons:['봄','가을'], attractions:['센코지','고양이 골목','시마나미카이도'], foods:['오노미치라멘','아나고메시','레몬 디저트'], visualType:'sea', coordinates:{latitude:34.4090,longitude:133.2050} },
  { id:'yamaguchi-hagi', province:'야마구치현', name:'하기', shortDescription:'흰 벽과 여름귤 향기에 막부 말기의 흔적을 겹쳐보는 성하마을', keywords:['성하마을','막부말기','도자기'], duration:'1박 2일', seasons:['봄','가을'], attractions:['하기 성하마을','쇼카손주쿠','하기 반사로'], foods:['겐란규','가와라소바','여름귤 과자'], visualType:'history', coordinates:{latitude:34.4090,longitude:131.3990} },
  { id:'tokushima-iya', province:'도쿠시마현', name:'이야', shortDescription:'깊은 계곡과 덩굴다리를 건너 비경의 고요함을 만나는 여행', keywords:['비경','계곡','덩굴다리'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['이야노 가즈라바시','오보케협곡','오치아이마을'], foods:['이야소바','데코마와시','한다소면'], visualType:'mountain', coordinates:{latitude:33.8770,longitude:133.8360} },
  { id:'kagawa-takamatsu', province:'가가와현', name:'다카마쓰', shortDescription:'명원과 섬 여행, 우동집 순례를 가볍게 즐기는 세토우치 관문', keywords:['정원','섬','우동'], duration:'1박 2일', seasons:['봄','가을'], attractions:['리쓰린공원','야시마','오기지마'], foods:['사누키우동','호네쓰키도리','와산본'], visualType:'sea', coordinates:{latitude:34.3420,longitude:134.0470} },
  { id:'ehime-matsuyama', province:'에히메현', name:'마쓰야마', shortDescription:'오래된 온천과 현존 천수각을 레트로 노면전차로 잇는 여행', keywords:['온천','성곽','노면전차'], duration:'1박 2일', seasons:['봄','가을','겨울'], attractions:['도고온천','마쓰야마성','언덕 위의 구름 뮤지엄'], foods:['도미밥','자코텐','귤주스'], visualType:'history', coordinates:{latitude:33.8390,longitude:132.7650} },
  { id:'kochi-shimanto', province:'고치현', name:'시만토', shortDescription:'침하교와 맑은 강을 자전거로 따라가는 남국의 강 여행', keywords:['청류','침하교','자전거'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['사다 침하교','시만토강','이와마 침하교'], foods:['가쓰오타타키','민물새우','나베야키라멘'], visualType:'mountain', coordinates:{latitude:32.9910,longitude:132.9340} },
  { id:'fukuoka-itoshima', province:'후쿠오카현', name:'이토시마', shortDescription:'해변 카페와 하얀 도리이를 찾아가는 자유로운 석양 드라이브', keywords:['바다카페','석양','드라이브'], duration:'당일 또는 1박 2일', seasons:['봄','여름','가을'], attractions:['사쿠라이 후타미가우라','게야노오토','시라이토폭포'], foods:['이토시마 굴','명란젓','아마오 딸기 디저트'], visualType:'sea', coordinates:{latitude:33.5570,longitude:130.1950} },
  { id:'saga-arita', province:'사가현', name:'아리타', shortDescription:'가마의 굴뚝과 그릇 가게를 돌아보며 나만의 한 점을 찾는 여행', keywords:['도자기','가마','마을산책'], duration:'당일 또는 1박 2일', seasons:['봄','가을'], attractions:['아리타 우치야마지구','규슈도자문화관','도잔신사'], foods:['사가규','고도후','시실리안라이스'], visualType:'history', coordinates:{latitude:33.2100,longitude:129.8490} },
  { id:'nagasaki-goto', province:'나가사키현', name:'고토 열도', shortDescription:'푸른 바다와 기도의 성당을 배로 잇는 서쪽 끝의 섬 여행', keywords:['섬','성당','바다'], duration:'2박 3일', seasons:['봄','여름','가을'], attractions:['도자키성당','다카하마해수욕장','오세자키등대'], foods:['고토우동','기비나고','간코로모치'], visualType:'island', coordinates:{latitude:32.6950,longitude:128.8410} },
  { id:'kumamoto-aso', province:'구마모토현', name:'아소', shortDescription:'초원과 분화구가 펼쳐지는 대지 위를 달리는 대형 고원 드라이브', keywords:['화산','초원','절경'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['구사센리가하마','다이칸보','아소신사'], foods:['아카규동','다카나메시','다고지루'], visualType:'mountain', coordinates:{latitude:32.8840,longitude:131.1040} },
  { id:'oita-beppu', province:'오이타현', name:'벳푸', shortDescription:'온천 연기 가득한 마을에서 지옥과 온천을 마음껏 즐기는 여행', keywords:['온천','지옥순례','유케무리'], duration:'1박 2일', seasons:['가을','겨울','봄'], attractions:['벳푸 지옥순례','다케가와라온천','유케무리전망대'], foods:['지옥찜','도리텐','단고지루'], visualType:'mountain', coordinates:{latitude:33.2840,longitude:131.4920} },
  { id:'miyazaki-takachiho', province:'미야자키현', name:'다카치호', shortDescription:'신화의 협곡과 밤 가구라를 만나는 깊은 숲의 영적인 여행', keywords:['신화','협곡','가구라'], duration:'1박 2일', seasons:['봄','여름','가을'], attractions:['다카치호협곡','아마노이와토신사','다카치호신사'], foods:['치킨난반','다카치호규','히야지루'], visualType:'mountain', coordinates:{latitude:32.7110,longitude:131.3070} },
  { id:'kagoshima-yakushima', province:'가고시마현', name:'야쿠시마', shortDescription:'이끼 숲과 거목의 시간 속에 머무는 비의 섬 모험', keywords:['세계유산','원시림','트레킹'], duration:'2박 3일', seasons:['봄','여름','가을'], attractions:['조몬스기','시라타니운스이쿄','오코폭포'], foods:['날치요리','구비오레사바','탄칸'], visualType:'island', coordinates:{latitude:30.3580,longitude:130.5280} },
  { id:'okinawa-ishigaki', province:'오키나와현', name:'이시가키섬', shortDescription:'산호 바다와 별빛, 섬 노래에 감싸이는 남쪽의 휴일', keywords:['산호초','별빛','섬시간'], duration:'2박 3일', seasons:['봄','여름','가을'], attractions:['가비라만','히라쿠보자키등대','이시가키섬 천문대'], foods:['야에야마소바','이시가키규','사타안다기'], visualType:'island', coordinates:{latitude:24.3440,longitude:124.1570} },
];

function buildDestination(seed: DestinationSeed, index: number): Destination {
  const [first, second, third] = seed.attractions;
  const [foodOne, foodTwo, foodThree] = seed.foods;
  return {
    id: seed.id,
    name: seed.name,
    province: seed.province,
    municipality: seed.name,
    coordinates: seed.coordinates,
    shortDescription: seed.shortDescription,
    description: `${seed.shortDescription}. ${first}에서 ${second}, ${third}까지 둘러보고 ${foodOne}와 ${foodTwo}도 맛보며 이 지역만의 리듬을 즐깁니다.`,
    keywords: seed.keywords,
    recommendedDuration: seed.duration,
    recommendedSeasons: seed.seasons,
    attractions: seed.attractions,
    foods: seed.foods,
    course: seed.attractions,
    itinerary: [
      { title: '1일 차 오전', activities: [`${seed.name} 도착`, `${first} 천천히 둘러보기`] },
      { title: '1일 차 오후', activities: [`${second} 방문하기`, `${foodOne} 맛보기`] },
      { title: '1일 차 저녁', activities: [`${third} 주변 산책하기`, `${foodTwo}를 즐기고 숙소로 이동하기`] },
      { title: '2일 차 오전', activities: [`${seed.name}의 시장이나 골목 걷기`, `${seed.keywords[0]}을 주제로 여행 기록 남기기`] },
      { title: '2일 차 오후', activities: [`${foodThree} 맛보기`, '작은 기념품을 고르고 귀가하기'] },
    ],
    tips: [
      `${first}의 운영 시간과 휴무일은 출발 전에 확인하세요.`,
      `${first}에서 ${second}까지의 이동 방법을 먼저 정하면 편합니다.`,
      `${seed.duration} 일정에는 편한 신발과 작은 가방이 잘 맞습니다.`,
    ],
    missions: [`${first}에서 오늘을 대표하는 사진 한 장 남기기`, ...commonMissions],
    gradient: destinationGradient(seed.visualType, index),
    visualType: seed.visualType,
  };
}

export const destinations: Destination[] = seeds.map(buildDestination);

const uniqueIds = new Set(destinations.map((destination) => destination.id));
if (uniqueIds.size !== destinations.length) throw new Error('여행지 데이터에 중복 id가 있습니다.');
if (destinations.length !== 47) throw new Error(`일본 47개 도도부현 여행지가 모두 들어 있지 않습니다: ${destinations.length}개`);

export const destinationsById = new Map(destinations.map((destination) => [destination.id, destination]));
