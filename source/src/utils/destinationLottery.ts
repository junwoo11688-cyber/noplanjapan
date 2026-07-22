import type { Destination } from '../types';
import { pickRandom } from './random';

export function pickDestination(destinations: readonly Destination[]): Destination {
  return pickRandom(destinations);
}
