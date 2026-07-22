import type { Destination } from '../types';
import { CalendarIcon, PinIcon } from './Icons';
import { Modal } from './Modal';

interface TravelItineraryModalProps {
  destination: Destination;
  onClose: () => void;
}

export function TravelItineraryModal({ destination, onClose }: TravelItineraryModalProps) {
  return (
    <Modal title={`${destination.province} ${destination.name} 1박 2일 일정`} onClose={onClose}>
      <div className="itinerary-intro"><CalendarIcon /><p>처음 떠나는 랜덤 일본 여행에도 무리 없도록 핵심 장소와 음식을 묶었습니다.</p></div>
      <ol className="itinerary-list">
        {destination.itinerary.map((item, index) => (
          <li key={item.title}>
            <span className="timeline-dot">{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <ul>{item.activities.map((activity) => <li key={activity}><PinIcon />{activity}</li>)}</ul>
            </div>
          </li>
        ))}
      </ol>
    </Modal>
  );
}
