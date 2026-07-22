import { useId } from 'react';
import type { Destination } from '../types';
import { CalendarIcon, PinIcon, RouteIcon, SparkIcon } from './Icons';
import { DestinationMap } from './DestinationMap';

interface DestinationDetailsProps {
  destination: Destination;
  compact?: boolean;
}

function DestinationArtwork({ destination }: { destination: Destination }) {
  return (
    <div className={`destination-artwork artwork-${destination.visualType}`} style={{ background: destination.gradient }} role="img" aria-label={`${destination.province} ${destination.name}의 분위기를 표현한 그래픽`}>
      <div className="art-sun" />
      <div className="art-shape art-shape-back" />
      <div className="art-shape art-shape-front" />
      <div className="art-caption">
        <PinIcon />
        <span>{destination.province}</span>
        <strong>{destination.name}</strong>
      </div>
    </div>
  );
}

export function DestinationDetails({ destination, compact = false }: DestinationDetailsProps) {
  const headingId = useId();
  return (
    <section className={`destination-details ${compact ? 'is-compact' : ''}`} aria-labelledby={headingId}>
      <div className="details-heading">
        <div>
          <span className="section-kicker">YOUR NEXT DESTINATION</span>
          <h2 id={headingId}>{destination.province} {destination.name}</h2>
          <p>{destination.description}</p>
        </div>
        <div className="details-meta">
          <span><CalendarIcon /> 추천 {destination.recommendedDuration}</span>
          <span><SparkIcon /> {destination.recommendedSeasons.join(' · ')}</span>
        </div>
      </div>

      <div className="details-layout">
        <DestinationArtwork destination={destination} />
        <div className="info-card attractions-card">
          <span className="card-label">PLACE</span>
          <h3>대표 관광지</h3>
          <ol>
            {destination.attractions.map((place, index) => <li key={place}><b>{String(index + 1).padStart(2, '0')}</b><span>{place}</span></li>)}
          </ol>
        </div>
        <div className="info-card food-card">
          <span className="card-label">LOCAL FOOD</span>
          <h3>이곳에서 꼭 한입</h3>
          <div className="food-tags">
            {destination.foods.map((food) => <span key={food}>{food}</span>)}
          </div>
        </div>
        <div className="info-card route-card">
          <span className="card-label">ROUTE</span>
          <h3><RouteIcon /> 추천 여행 코스</h3>
          <div className="route-line">
            {destination.course.map((place, index) => (
              <span key={place}>{place}{index < destination.course.length - 1 && <i aria-hidden="true">→</i>}</span>
            ))}
          </div>
        </div>
        <div className="info-card tips-card">
          <span className="card-label">TRAVEL TIPS</span>
          <h3>떠나기 전 메모</h3>
          <ul>{destination.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
        </div>
      </div>
      <DestinationMap destination={destination} />
    </section>
  );
}
