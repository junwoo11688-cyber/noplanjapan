import { useEffect, useRef, useState } from 'react';
import { secureShuffle } from '../utils/random';
import { SparkIcon, TicketIcon } from './Icons';

interface LotteryDrumProps {
  onPick: () => void;
}

const ticketNumbers = Array.from({ length: 15 }, (_, index) => index + 1);

export function LotteryDrum({ onPick }: LotteryDrumProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [ticketOrder, setTicketOrder] = useState(() => [...ticketNumbers]);
  const [isMixing, setIsMixing] = useState(false);
  const selectionTimerRef = useRef<number | null>(null);
  const mixingTimerRef = useRef<number | null>(null);
  const mixingRef = useRef(false);

  useEffect(() => () => {
    if (selectionTimerRef.current !== null) window.clearTimeout(selectionTimerRef.current);
    if (mixingTimerRef.current !== null) window.clearTimeout(mixingTimerRef.current);
  }, []);

  const selectTicket = (number: number) => {
    if (selected !== null || mixingRef.current) return;
    setSelected(number);
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 720;
    selectionTimerRef.current = window.setTimeout(onPick, delay);
  };

  const shuffleTickets = () => {
    if (selected !== null || mixingRef.current) return;
    mixingRef.current = true;
    setIsMixing(true);
    setTicketOrder((current) => secureShuffle(current));
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 680;
    mixingTimerRef.current = window.setTimeout(() => {
      mixingRef.current = false;
      setIsMixing(false);
    }, delay);
  };

  return (
    <div className={`drum-selection ${selected !== null ? 'has-selection' : ''} ${isMixing ? 'is-mixing' : ''}`}>
      <div className="lottery-drum" aria-label="여행 복권이 담긴 추첨 통">
        <div className="drum-handle" aria-hidden="true"><span /></div>
        <div className="drum-top" aria-hidden="true"><SparkIcon /><span>어디든 일본 복권함</span><SparkIcon /></div>
        <div className="drum-window">
          <div id="drum-ticket-list" className="drum-tickets" role="group" aria-label="통 안의 복권 중 하나를 선택하세요">
            {ticketOrder.map((number) => (
              <button
                key={number}
                type="button"
                className={`drum-ticket drum-ticket-${number} ${selected === number ? 'is-selected' : ''}`}
                onClick={() => selectTicket(number)}
                disabled={selected !== null || isMixing}
                aria-label={`통 안의 복권 ${number}번 고르기`}
              >
                <TicketIcon />
                <span>?</span>
              </button>
            ))}
          </div>
        </div>
        <div className="drum-base" aria-hidden="true"><span>100% RANDOM</span></div>
      </div>
      <button
        type="button"
        className="drum-shuffle-button"
        onClick={shuffleTickets}
        disabled={selected !== null || isMixing}
        aria-controls="drum-ticket-list"
        aria-describedby="drum-instruction-copy"
      >
        <SparkIcon />
        {isMixing ? '복권 섞는 중…' : '복권 섞기'}
      </button>
      <div className="drum-instruction" aria-live="polite">
        <strong>{selected !== null ? '고른 복권을 꺼내고 있어요…' : isMixing ? '복권함을 힘차게 섞고 있어요…' : '마음이 가는 복권 하나를 골라주세요'}</strong>
        <p id="drum-instruction-copy">{selected !== null ? '이제 선택을 바꿀 수 없습니다.' : isMixing ? '섞기가 끝나면 다시 하나를 고를 수 있습니다.' : '모든 복권은 같은 확률이며, 겉모양에는 어떤 힌트도 없습니다.'}</p>
      </div>
    </div>
  );
}
