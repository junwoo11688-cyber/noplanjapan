import { SparkIcon } from './Icons';

interface TravelMissionProps {
  mission: string;
  onReroll: () => void;
}

export function TravelMission({ mission, onReroll }: TravelMissionProps) {
  return (
    <section className="mission-card" aria-labelledby="mission-title">
      <div className="mission-icon"><SparkIcon /></div>
      <div>
        <span className="section-kicker">RANDOM MISSION</span>
        <h3 id="mission-title">이번 여행의 작은 미션</h3>
        <p>“{mission}”</p>
      </div>
      <button type="button" className="text-button" onClick={onReroll}>미션 다시 뽑기</button>
    </section>
  );
}
