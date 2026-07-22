import type { Destination, LotteryHistoryEntry } from '../types';
import { formatDate, formatDateTime } from '../utils/format';
import { PinIcon, TrashIcon } from './Icons';

interface LotteryHistoryProps {
  entries: LotteryHistoryEntry[];
  findDestination: (id: string) => Destination | undefined;
  onOpen: (destination: Destination) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export function LotteryHistory({ entries, findDestination, onOpen, onDelete, onClear }: LotteryHistoryProps) {
  return (
    <section id="history" className="archive-section section-pad">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div><span className="section-kicker">MY LOTTERY LOG</span><h2>지난 결과</h2><p>봉인 커버를 열어 확인한 복권만 최대 30개까지 남습니다.</p></div>
          {entries.length > 0 && <button type="button" className="text-button danger-text" onClick={onClear}><TrashIcon /> 전체 기록 삭제</button>}
        </div>
        {entries.length === 0 ? (
          <div className="empty-state"><span>✦</span><strong>아직 공개한 복권이 없어요</strong><p>첫 여행 복권의 커버를 열면 이곳에 기록됩니다.</p></div>
        ) : (
          <div className="history-list">
            {entries.map((entry, index) => {
              const destination = findDestination(entry.destinationId);
              return (
                <article className="history-item" key={entry.id}>
                  <button type="button" className="history-main" onClick={() => destination && onOpen(destination)} disabled={!destination}>
                    <span className="history-index">{String(index + 1).padStart(2, '0')}</span>
                    <span><small>{entry.serial}</small><strong>{entry.province} {entry.destinationName}</strong><em><PinIcon /> 공개 {formatDateTime(entry.revealedAt)}</em><small>발급 {formatDate(entry.issuedAt)}</small></span>
                    <span className="history-mission">MISSION · {entry.mission}</span>
                    {entry.saved && <b className="saved-mark">저장됨</b>}
                  </button>
                  <button type="button" className="icon-button history-delete" onClick={() => onDelete(entry.id)} aria-label={`${entry.province} ${entry.destinationName} 기록 삭제`}><TrashIcon /></button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
