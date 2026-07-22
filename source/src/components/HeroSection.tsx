import { DrawLotteryButton } from './DrawLotteryButton';
import { LotteryIntro } from './LotteryIntro';

interface HeroSectionProps {
  onDraw: () => void;
  disabled: boolean;
  compact: boolean;
}

export function HeroSection({ onDraw, disabled, compact }: HeroSectionProps) {
  return (
    <section id="top" className={`hero ${compact ? 'hero-compact' : ''}`}>
      <div className="hero-orbit orbit-one" aria-hidden="true" />
      <div className="hero-orbit orbit-two" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="section-kicker">NO PLAN · JUST GO</span>
          <h1>이번 여행지는<br /><em>뜯어봐야</em> 알 수 있습니다.</h1>
          <p>아무 조건도, 아무 고민도 없이<br className="mobile-break" /> 일본 어딘가로 떠나보세요.</p>
          <DrawLotteryButton onClick={onDraw} disabled={disabled} />
          <small className="draw-caution">통에서 하나를 고른 뒤에는 커버를 뜯기 전까지 바꿀 수 없습니다.</small>
        </div>
        {!compact && <LotteryIntro />}
      </div>
    </section>
  );
}
