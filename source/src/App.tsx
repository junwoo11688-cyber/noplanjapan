import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { destinations, destinationsById } from './data/destinations';
import type { Destination, LotteryHistoryEntry, LotteryPhase, LotteryTicket, SavedDestinationEntry, ToastMessage } from './types';
import { createId, createSerial, pickRandom } from './utils/random';
import { pickDestination } from './utils/destinationLottery';
import { loadHistory, loadSavedDestinations, saveHistory, saveSavedDestinations, updateHistoryMission, updateHistorySaved } from './utils/storage';
import { shareDestination } from './utils/share';
import { playSound } from './utils/sound';
import { BookmarkIcon, CalendarIcon, ShareIcon, TicketIcon } from './components/Icons';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TicketIssueAnimation } from './components/TicketIssueAnimation';
import { ScratchTicket } from './components/ScratchTicket';
import { DestinationDetails } from './components/DestinationDetails';
import { TravelMission } from './components/TravelMission';
import { TravelItineraryModal } from './components/TravelItineraryModal';
import { LotteryHistory } from './components/LotteryHistory';
import { SavedDestinations } from './components/SavedDestinations';
import { HowToUse } from './components/HowToUse';
import { Modal } from './components/Modal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { LotteryDrum } from './components/LotteryDrum';

type OpenModal = { type: 'itinerary' | 'details'; destination: Destination } | null;

export default function App() {
  const [phase, setPhase] = useState<LotteryPhase>('idle');
  const [ticket, setTicket] = useState<LotteryTicket | null>(null);
  const [history, setHistory] = useState<LotteryHistoryEntry[]>([]);
  const [saved, setSaved] = useState<SavedDestinationEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [modal, setModal] = useState<OpenModal>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const timersRef = useRef<number[]>([]);
  const storageLoadedRef = useRef(false);

  const addToast = useCallback((message: string, tone: ToastMessage['tone'] = 'default') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((items) => [...items, { id, message, tone }]);
    const timer = window.setTimeout(() => setToasts((items) => items.filter((item) => item.id !== id)), 3200);
    timersRef.current.push(timer);
  }, []);

  useEffect(() => {
    if (storageLoadedRef.current) return;
    storageLoadedRef.current = true;
    try {
      const loadedHistory = loadHistory();
      const cityHistory = loadedHistory.filter((entry) => destinationsById.has(entry.destinationId));
      setHistory(cityHistory);
      if (cityHistory.length !== loadedHistory.length) saveHistory(cityHistory);
    } catch {
      addToast('지난 결과 데이터가 손상되어 안전하게 초기화했습니다.', 'error');
    }
    try {
      const loadedSaved = loadSavedDestinations();
      const citySaved = loadedSaved.filter((entry) => destinationsById.has(entry.destinationId));
      setSaved(citySaved);
      if (citySaved.length !== loadedSaved.length) saveSavedDestinations(citySaved);
    } catch {
      addToast('저장한 여행지 데이터가 손상되어 안전하게 초기화했습니다.', 'error');
    }
  }, [addToast]);

  useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

  const persistHistory = useCallback((entries: LotteryHistoryEntry[]) => {
    try {
      const limited = saveHistory(entries);
      setHistory(limited);
    } catch {
      setHistory(entries.slice(0, 30));
      addToast('지난 결과를 브라우저에 저장하지 못했습니다.', 'error');
    }
  }, [addToast]);

  const persistSaved = useCallback((entries: SavedDestinationEntry[]) => {
    setSaved(entries);
    try {
      saveSavedDestinations(entries);
    } catch {
      addToast('저장 목록을 브라우저에 저장하지 못했습니다.', 'error');
    }
  }, [addToast]);

  const showLotteryDrum = useCallback(() => {
    setLiveAnnouncement('');
    setTicket(null);
    setPhase('choosing');
    const scrollTimer = window.setTimeout(() => {
      document.querySelector('#lottery')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }, 80);
    timersRef.current.push(scrollTimer);
  }, []);

  const beginIssue = useCallback(() => {
    const destination = pickDestination(destinations);
    const now = new Date();
    const nextTicket: LotteryTicket = {
      destination,
      serial: createSerial(now),
      issuedAt: now.toISOString(),
      mission: pickRandom(destination.missions),
    };
    setLiveAnnouncement('');
    setTicket(nextTicket);
    setPhase('issuing');
    playSound('issue', soundEnabled);
    const timer = window.setTimeout(() => {
      setPhase((current) => current === 'issuing' ? 'opening' : current);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 1650);
    timersRef.current.push(timer);
  }, [soundEnabled]);

  const handleDraw = useCallback(() => {
    if (phase === 'choosing' || phase === 'issuing' || phase === 'opening' || phase === 'resetting') return;
    if (ticket && phase === 'revealed') {
      setPhase('resetting');
      const timer = window.setTimeout(showLotteryDrum, 420);
      timersRef.current.push(timer);
      return;
    }
    showLotteryDrum();
  }, [phase, showLotteryDrum, ticket]);

  const handleReveal = useCallback(() => {
    if (!ticket || phase !== 'opening') return;
    const revealedAt = new Date().toISOString();
    const isSaved = saved.some((entry) => entry.destinationId === ticket.destination.id);
    const entry: LotteryHistoryEntry = {
      id: createId(),
      destinationId: ticket.destination.id,
      destinationName: ticket.destination.name,
      province: ticket.destination.province,
      issuedAt: ticket.issuedAt,
      revealedAt,
      serial: ticket.serial,
      mission: ticket.mission,
      saved: isSaved,
    };
    setPhase('revealed');
    persistHistory([entry, ...history]);
    playSound('reveal', soundEnabled);
    setLiveAnnouncement(`여행지가 공개되었습니다! 당신의 여행지는 ${ticket.destination.province} ${ticket.destination.name}입니다.`);
  }, [history, persistHistory, phase, saved, soundEnabled, ticket]);

  const isCurrentSaved = useMemo(() => Boolean(ticket && saved.some((entry) => entry.destinationId === ticket.destination.id)), [saved, ticket]);

  const toggleSaved = useCallback(() => {
    if (!ticket || phase !== 'revealed') return;
    const exists = saved.some((entry) => entry.destinationId === ticket.destination.id);
    const nextSaved = exists
      ? saved.filter((entry) => entry.destinationId !== ticket.destination.id)
      : [{ destinationId: ticket.destination.id, savedAt: new Date().toISOString(), mission: ticket.mission }, ...saved];
    persistSaved(nextSaved);
    persistHistory(updateHistorySaved(history, ticket.destination.id, !exists));
    addToast(exists ? '저장을 취소했습니다.' : '여행지를 저장했습니다.', 'success');
  }, [addToast, history, persistHistory, persistSaved, phase, saved, ticket]);

  const rerollMission = useCallback(() => {
    if (!ticket || phase !== 'revealed') return;
    const nextMission = pickRandom(ticket.destination.missions);
    setTicket({ ...ticket, mission: nextMission });
    persistHistory(updateHistoryMission(history, ticket.serial, nextMission));
    if (isCurrentSaved) {
      persistSaved(saved.map((entry) => entry.destinationId === ticket.destination.id ? { ...entry, mission: nextMission } : entry));
    }
    addToast('새로운 여행 미션을 뽑았습니다.', 'success');
  }, [addToast, history, isCurrentSaved, persistHistory, persistSaved, phase, saved, ticket]);

  const handleShare = useCallback(async () => {
    if (!ticket || phase !== 'revealed') return;
    try {
      const result = await shareDestination(ticket.destination);
      addToast(result === 'copied' ? '공유 문구를 클립보드에 복사했습니다.' : '공유창을 열었습니다.', 'success');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      addToast('결과를 공유하지 못했습니다.', 'error');
    }
  }, [addToast, phase, ticket]);

  const deleteHistory = (id: string) => {
    persistHistory(history.filter((entry) => entry.id !== id));
    addToast('지난 결과 한 건을 삭제했습니다.');
  };

  const clearHistory = () => {
    if (!window.confirm('지난 결과를 모두 삭제할까요? 이 작업은 되돌릴 수 없습니다.')) return;
    persistHistory([]);
    addToast('지난 결과를 모두 삭제했습니다.');
  };

  const deleteSaved = (destinationId: string) => {
    persistSaved(saved.filter((entry) => entry.destinationId !== destinationId));
    persistHistory(updateHistorySaved(history, destinationId, false));
    addToast('저장 목록에서 삭제했습니다.');
  };

  const findDestination = useCallback((id: string) => destinationsById.get(id), []);
  const drawDisabled = phase === 'choosing' || phase === 'issuing' || phase === 'opening' || phase === 'resetting';

  return (
    <>
      <Header onDraw={handleDraw} drawDisabled={drawDisabled} soundEnabled={soundEnabled} onToggleSound={() => {
        setSoundEnabled((value) => !value);
        addToast(soundEnabled ? '효과음을 껐습니다.' : '효과음을 켰습니다.');
      }} />
      <main id="main-content">
        <HeroSection onDraw={handleDraw} disabled={drawDisabled} compact={phase !== 'idle'} />

        {phase !== 'idle' && (
          <section id="lottery" className="lottery-stage section-pad" aria-labelledby="lottery-stage-title">
            <div className="container lottery-container">
              <div className="stage-heading">
                <span className="section-kicker">YOUR ONE-WAY CHANCE</span>
                <h2 id="lottery-stage-title">{phase === 'choosing' ? '통에서 복권 하나를 골라주세요' : phase === 'issuing' ? '고른 여행 복권을 밀봉하고 있어요' : phase === 'revealed' ? '여행지가 공개되었습니다!' : phase === 'resetting' ? '새 복권 통을 준비하고 있어요' : '봉인 커버를 떼어 여행지를 확인하세요'}</h2>
                <p>{phase === 'choosing' ? '어느 것을 고르든 확률은 같습니다. 이번만큼은 직감을 믿어보세요.' : phase === 'revealed' ? '우연이 골라준 일본 여행을 저장하거나 친구에게 공유해보세요.' : phase === 'resetting' ? '잠시 후 다시 마음이 가는 복권을 고를 수 있습니다.' : '오른쪽 탭을 잡고 왼쪽으로 끝까지 당겨주세요.'}</p>
              </div>
              {phase === 'choosing' && <LotteryDrum onPick={beginIssue} />}
              {ticket && (
                <TicketIssueAnimation issuing={phase === 'issuing'} resetting={phase === 'resetting'}>
                  <ScratchTicket destination={ticket.destination} serial={ticket.serial} issuedAt={ticket.issuedAt} phase={phase} onReveal={handleReveal} onPeel={() => playSound('peel', soundEnabled)} />
                </TicketIssueAnimation>
              )}

              {phase === 'revealed' && ticket && (
                <div className="revealed-content">
                  <div className="result-actions" aria-label="결과 작업">
                    <button type="button" className="primary-button" onClick={handleDraw}><TicketIcon /> 다시 뽑기</button>
                    <button type="button" className={`secondary-button ${isCurrentSaved ? 'is-saved' : ''}`} onClick={toggleSaved}><BookmarkIcon filled={isCurrentSaved} /> {isCurrentSaved ? '저장된 여행지' : '여행지 저장하기'}</button>
                    <button type="button" className="secondary-button" onClick={handleShare}><ShareIcon /> 결과 공유하기</button>
                    <button type="button" className="secondary-button" onClick={() => setModal({ type: 'itinerary', destination: ticket.destination })}><CalendarIcon /> 여행 일정 보기</button>
                  </div>
                  <TravelMission mission={ticket.mission} onReroll={rerollMission} />
                  <DestinationDetails destination={ticket.destination} />
                </div>
              )}
            </div>
          </section>
        )}

        <div className="sr-only" aria-live="assertive">{liveAnnouncement}</div>
        <HowToUse />
        <LotteryHistory entries={history} findDestination={findDestination} onOpen={(destination) => setModal({ type: 'details', destination })} onDelete={deleteHistory} onClear={clearHistory} />
        <SavedDestinations entries={saved} findDestination={findDestination} onOpen={(destination) => setModal({ type: 'details', destination })} onDelete={deleteSaved} />
      </main>
      <Footer />
      {modal?.type === 'itinerary' && <TravelItineraryModal destination={modal.destination} onClose={() => setModal(null)} />}
      {modal?.type === 'details' && <Modal title={`${modal.destination.province} ${modal.destination.name} 상세 정보`} onClose={() => setModal(null)} wide><DestinationDetails destination={modal.destination} compact /></Modal>}
      <Toast messages={toasts} />
    </>
  );
}
