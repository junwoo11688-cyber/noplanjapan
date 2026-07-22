import type { Destination } from '../types';
import { PinIcon } from './Icons';

interface DestinationResultProps {
  destination: Destination;
}

export function DestinationResult({ destination }: DestinationResultProps) {
  const fullName = `${destination.province} ${destination.name}`;
  const sizeClass = fullName.length > 12 ? 'name-long' : fullName.length > 8 ? 'name-medium' : '';
  return (
    <div className="destination-result">
      <span className="result-overline">당신의 여행지는</span>
      <h2 className={sizeClass}>{fullName}</h2>
      <p>{destination.shortDescription}</p>
      <div className="result-facts">
        <span><PinIcon /> {destination.province}</span>
        <span>{destination.recommendedDuration}</span>
        <span>{destination.recommendedSeasons.join(' · ')}</span>
      </div>
      <div className="keyword-row">
        {destination.keywords.map((keyword) => <span key={keyword}>#{keyword}</span>)}
      </div>
    </div>
  );
}
