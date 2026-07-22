import { PinIcon, TicketIcon } from './Icons';

export function LotteryIntro() {
  const today = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(new Date());
  return (
    <div className="ticket-preview" aria-label="발급 전 일본 여행 복권 미리보기">
      <div className="ticket-preview-top">
        <div>
          <span className="eyebrow">TRAVEL LOTTERY</span>
          <strong>일본 여행 랜덤 티켓</strong>
        </div>
        <span className="ticket-roundel"><TicketIcon /></span>
      </div>
      <div className="ticket-map" aria-hidden="true">
        <div className="japan-shape">
          <span className="island-dot" />
        </div>
        <span className="map-pin"><PinIcon /></span>
        <div className="preview-seal">
          <span>아직 발급되지 않았습니다</span>
          <small>DRAW A TICKET FIRST</small>
        </div>
      </div>
      <div className="ticket-preview-meta">
        <span><small>SERIAL</small> JP-••••-••••••</span>
        <span><small>ISSUED</small> {today}</span>
        <b>1회 여행지 추첨권</b>
      </div>
    </div>
  );
}
