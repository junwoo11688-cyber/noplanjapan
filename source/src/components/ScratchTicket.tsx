import type { Destination, LotteryPhase } from '../types';
import { formatDate } from '../utils/format';
import { DestinationResult } from './DestinationResult';
import { PinIcon } from './Icons';
import { PeelCover } from './PeelCover';
import { RevealAnimation } from './RevealAnimation';

interface ScratchTicketProps {
  destination: Destination;
  serial: string;
  issuedAt: string;
  phase: LotteryPhase;
  onReveal: () => void;
  onPeel?: () => void;
}

export function ScratchTicket({ destination, serial, issuedAt, phase, onReveal, onPeel }: ScratchTicketProps) {
  const revealed = phase === 'revealed' || phase === 'resetting';
  return (
    <article className={`scratch-ticket ${revealed ? 'is-revealed' : ''}`} aria-label="발급된 여행 복권">
      <div className="ticket-edge ticket-edge-left" aria-hidden="true" />
      <div className="ticket-edge ticket-edge-right" aria-hidden="true" />
      <header className="scratch-ticket-header">
        <div>
          <span className="eyebrow">TRAVEL LOTTERY</span>
          <strong>어디든 복권 · 일본판</strong>
          <small>일본 국내 여행 추첨권</small>
        </div>
        <div className="ticket-number">
          <small>SERIAL NO.</small>
          <b>{serial}</b>
          <span>{formatDate(issuedAt)}</span>
        </div>
      </header>
      <div className="reveal-zone">
        {revealed ? <DestinationResult destination={destination} /> : <PeelCover active={phase === 'opening'} onReveal={onReveal} onPeel={onPeel} />}
        {phase === 'revealed' && <RevealAnimation />}
      </div>
      <footer className="scratch-ticket-footer">
        <div>
          <small>본 복권은 실제 금전적 가치가 없습니다.</small>
          <b>당첨 상품: 일본 어딘가로 떠날 명분</b>
        </div>
        <div className="ticket-footer-meta">
          <span className="barcode" aria-hidden="true" />
          <PinIcon />
          <small>VALID 90 DAYS</small>
        </div>
      </footer>
    </article>
  );
}
