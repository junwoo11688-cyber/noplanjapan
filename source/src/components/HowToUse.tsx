import { PinIcon, SparkIcon, SuitcaseIcon, TicketIcon } from './Icons';

const steps = [
  { number: '01', title: '복권 통 열기', description: '조건을 고르지 말고 여행 복권 뽑기 버튼을 눌러 무작위 복권 통을 여세요.', icon: <TicketIcon /> },
  { number: '02', title: '하나 직접 고르기', description: '겉모양이 같은 복권 중 마음이 가는 하나를 고르세요. 선택 순간 행선지가 정해집니다.', icon: <PinIcon /> },
  { number: '03', title: '봉인 커버 뜯기', description: '오른쪽 탭을 잡고 왼쪽으로 당기세요. 커버가 충분히 열리면 여행지가 공개됩니다.', icon: <SparkIcon /> },
  { number: '04', title: '나온 곳으로 떠나기', description: '추천 코스와 미션을 챙기고, 우연이 골라준 일본 어딘가로 출발하세요.', icon: <SuitcaseIcon /> },
];

export function HowToUse() {
  return (
    <section id="how-to" className="how-section section-pad">
      <div className="container">
        <div className="section-heading centered"><span className="section-kicker">HOW IT WORKS</span><h2>고민 없는 여행, 네 번의 설렘</h2></div>
        <div className="steps-grid">
          {steps.map((step) => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><div className="step-icon">{step.icon}</div><h3>{step.title}</h3><p>{step.description}</p></article>)}
        </div>
        <div className="random-notice"><PinIcon /><div><strong>일본 47개 도도부현을 여행지로 담았습니다.</strong><p>47개 여행지 중 한 곳이 별도의 조건이나 필터 없이 완전 무작위로 정해집니다.</p></div></div>
      </div>
    </section>
  );
}
