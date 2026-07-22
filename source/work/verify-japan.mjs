import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
let failed = false;

function report(label, passed) {
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${label}`);
  failed ||= !passed;
}

try {
  const [{ destinations }, { secureShuffle }, { pickDestination }] = await Promise.all([
    server.ssrLoadModule('/src/data/destinations.ts'),
    server.ssrLoadModule('/src/utils/random.ts'),
    server.ssrLoadModule('/src/utils/destinationLottery.ts'),
  ]);

  const originalTickets = Array.from({ length: 15 }, (_, index) => index + 1);
  const shuffledTickets = secureShuffle(originalTickets);
  const draws = Array.from({ length: 200 }, () => pickDestination(destinations));
  const allTextFieldsPresent = destinations.every((item) => [
    item.id, item.name, item.province, item.shortDescription, item.description,
    ...item.keywords, ...item.attractions, ...item.foods, ...item.course, ...item.tips, ...item.missions,
  ].every((value) => typeof value === 'string' && value.trim().length > 0));

  report('일본 47개 도도부현 여행지 수록', destinations.length === 47 && new Set(destinations.map((item) => item.province)).size === 47);
  report('여행지 ID 중복 없음', new Set(destinations.map((item) => item.id)).size === 47);
  report('모든 여행지에 명소·음식·키워드 각 3개', destinations.every((item) => item.attractions.length === 3 && item.foods.length === 3 && item.keywords.length === 3));
  report('모든 여행지에 5구간 일정', destinations.every((item) => item.itinerary.length === 5));
  report('모든 여행지에 11개 미션', destinations.every((item) => item.missions.length === 11));
  report('모든 여행지에 일본 범위 지도 좌표', destinations.every((item) => item.coordinates && item.coordinates.latitude >= 23.5 && item.coordinates.latitude <= 46 && item.coordinates.longitude >= 122.5 && item.coordinates.longitude <= 146));
  report('여행지 데이터 빈 값 없음', allTextFieldsPresent);
  report('복권 15장 안전한 셔플', shuffledTickets.length === 15 && new Set(shuffledTickets).size === 15 && shuffledTickets.every((value) => originalTickets.includes(value)));
  report('무작위 추첨이 항상 유효한 여행지 반환', draws.every((item) => destinations.includes(item)));

  const srcRoot = path.resolve('src');
  const sourceFiles = [];
  const collect = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (/\.(?:ts|tsx|css)$/.test(entry.name)) sourceFiles.push(fullPath);
    }
  };
  collect(srcRoot);
  const allSource = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  report('앱 UI와 여행 정보가 한국어로 제공됨', /[가-힣]/.test(allSource) && !/[ぁ-んァ-ヶ一-龠]/.test(allSource));
  report('복권 선택·봉인·저장·공유·기록 기능 유지', [
    '<LotteryDrum onPick={beginIssue}', '<ScratchTicket', 'toggleSaved', 'handleShare', '<LotteryHistory', '<SavedDestinations',
  ].every((token) => allSource.includes(token)));

  const standalonePath = path.resolve('..', 'index.html');
  const html = fs.readFileSync(standalonePath, 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  report('단일 HTML에 CSS와 JS 포함', scripts.length === 1 && html.includes('<script data-standalone-app>') && html.includes('<style data-standalone-app>'));
  report('외부 에셋 참조 없음', !/(?:src|href)=["'](?:\.\/|\/)?assets\//.test(html));
  report('단일 HTML에 한국어 일본판 제목 포함', html.includes('어디든 복권 일본판') && html.includes('일본 랜덤 여행 티켓'));
  try {
    new Function(scripts[0]?.[1] ?? '');
    report('빌드된 JavaScript 문법 정상', true);
  } catch {
    report('빌드된 JavaScript 문법 정상', false);
  }
  const size = Buffer.byteLength(html);
  report('단일 HTML 파일 크기 정상', size > 250_000 && size < 500_000);
  console.log(`INFO  standalone: ${size.toLocaleString()} bytes`);
} finally {
  await server.close();
}

if (failed) process.exitCode = 1;
