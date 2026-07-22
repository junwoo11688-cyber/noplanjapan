import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';

interface PeelCoverProps {
  active: boolean;
  onReveal: () => void;
  onPeel?: () => void;
}

export const PEEL_REVEAL_THRESHOLD = 0.68;

export function PeelCover({ active, onReveal, onPeel }: PeelCoverProps) {
  const coverRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startProgress: number } | null>(null);
  const progressRef = useRef(0);
  const finishTimerRef = useRef<number | null>(null);
  const keyboardTimerRef = useRef<number | null>(null);
  const completeRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [finishing, setFinishing] = useState(false);

  const stopKeyboardPeel = useCallback(() => {
    if (keyboardTimerRef.current !== null) window.clearInterval(keyboardTimerRef.current);
    keyboardTimerRef.current = null;
  }, []);

  const finish = useCallback(() => {
    if (!active || completeRef.current) return;
    completeRef.current = true;
    dragRef.current = null;
    stopKeyboardPeel();
    setProgress(1);
    progressRef.current = 1;
    setFinishing(true);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    finishTimerRef.current = window.setTimeout(onReveal, reducedMotion ? 90 : 380);
  }, [active, onReveal, stopKeyboardPeel]);

  const updateProgress = useCallback((nextValue: number) => {
    if (!active || completeRef.current) return;
    const next = Math.min(1, Math.max(progressRef.current, nextValue));
    if (next === progressRef.current) return;
    progressRef.current = next;
    setProgress(next);
    onPeel?.();
    if (next >= PEEL_REVEAL_THRESHOLD) finish();
  }, [active, finish, onPeel]);

  useEffect(() => {
    if (!active || document.activeElement !== document.body) return;
    const frame = window.requestAnimationFrame(() => coverRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => () => {
    if (finishTimerRef.current !== null) window.clearTimeout(finishTimerRef.current);
    if (keyboardTimerRef.current !== null) window.clearInterval(keyboardTimerRef.current);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!active || completeRef.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startProgress: progressRef.current };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!active || !drag || drag.pointerId !== event.pointerId) return;
    const width = Math.max(1, event.currentTarget.getBoundingClientRect().width);
    updateProgress(drag.startProgress + (drag.startX - event.clientX) / (width * 0.82));
  };

  const stopPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (progressRef.current >= PEEL_REVEAL_THRESHOLD) finish();
  };

  const startKeyboardPeel = () => {
    if (!active || completeRef.current || keyboardTimerRef.current !== null) return;
    keyboardTimerRef.current = window.setInterval(() => updateProgress(progressRef.current + 0.045), 45);
  };

  const style = {
    '--peel-translate': `${progress * -94}%`,
    '--peel-rotate': `${progress * -2.2}deg`,
    '--peel-fold': `${12 + progress * 46}px`,
  } as CSSProperties;

  return (
    <div className="peel-layer">
      <div className="peel-underlay" aria-hidden="true">
        <span>봉인이 열리고 있어요</span>
        <small>끝까지 당기면 여행지가 공개됩니다</small>
        <b>←</b>
      </div>
      <div
        ref={coverRef}
        className={`peel-cover ${finishing ? 'is-finishing' : ''}`}
        style={style}
        tabIndex={active ? 0 : -1}
        role={active ? 'slider' : undefined}
        aria-hidden={!active}
        aria-label={active ? '여행 복권 봉인 커버. 오른쪽 탭을 왼쪽으로 끌어 떼어내세요. 키보드는 Enter 키를 길게 누르세요.' : undefined}
        aria-valuemin={active ? 0 : undefined}
        aria-valuemax={active ? 100 : undefined}
        aria-valuenow={active ? Math.round(progress * 100) : undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopPointer}
        onPointerCancel={stopPointer}
        onLostPointerCapture={(event) => {
          if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            startKeyboardPeel();
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            updateProgress(progressRef.current + 0.12);
          }
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') stopKeyboardPeel();
        }}
        onBlur={stopKeyboardPeel}
      >
        <div className="peel-cover-pattern" aria-hidden="true" />
        <div className="peel-cover-copy">
          <span>SEALED TRAVEL LOTTERY</span>
          <strong>봉인 커버를 떼어주세요</strong>
          <small>오른쪽 탭을 잡고 왼쪽으로 당기세요</small>
        </div>
        <div className="peel-perforation" aria-hidden="true" />
        <div className="peel-tab" aria-hidden="true"><b>PULL</b><span>←</span></div>
      </div>
    </div>
  );
}
