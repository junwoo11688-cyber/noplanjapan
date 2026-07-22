import type { Destination, SavedDestinationEntry } from '../types';
import { formatDate } from '../utils/format';
import { BookmarkIcon, TrashIcon } from './Icons';

interface SavedDestinationsProps {
  entries: SavedDestinationEntry[];
  findDestination: (id: string) => Destination | undefined;
  onOpen: (destination: Destination) => void;
  onDelete: (destinationId: string) => void;
}

export function SavedDestinations({ entries, findDestination, onOpen, onDelete }: SavedDestinationsProps) {
  const resolved = entries.map((entry) => ({ entry, destination: findDestination(entry.destinationId) })).filter((item): item is { entry: SavedDestinationEntry; destination: Destination } => Boolean(item.destination));
  return (
    <section id="saved" className="saved-section section-pad">
      <div className="container">
        <div className="section-heading"><span className="section-kicker">SAVED STOPS</span><h2>저장한 여행지</h2><p>언젠가 정말 떠나고 싶은 결과를 모아두세요.</p></div>
        {resolved.length === 0 ? (
          <div className="empty-state empty-light"><BookmarkIcon /><strong>저장한 여행지가 비어 있어요</strong><p>복권 결과가 공개되면 저장 버튼을 사용할 수 있습니다.</p></div>
        ) : (
          <div className="saved-grid">
            {resolved.map(({ entry, destination }) => (
              <article className="saved-card" key={destination.id}>
                <div className={`saved-visual artwork-${destination.visualType}`} style={{ background: destination.gradient }} aria-hidden="true"><span>{destination.province}</span></div>
                <div className="saved-card-body">
                  <small>저장 {formatDate(entry.savedAt)}</small>
                  <h3>{destination.province} {destination.name}</h3>
                  <p>{destination.shortDescription}</p>
                  <div className="keyword-row">{destination.keywords.map((keyword) => <span key={keyword}>#{keyword}</span>)}</div>
                  <div className="card-actions">
                    <button type="button" className="small-button" onClick={() => onOpen(destination)}>상세 보기</button>
                    <button type="button" className="icon-button" onClick={() => onDelete(destination.id)} aria-label={`${destination.province} ${destination.name} 저장 삭제`}><TrashIcon /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
