export type VisualType = 'sea' | 'mountain' | 'city' | 'history' | 'island';

export interface DestinationCoordinates {
  latitude: number;
  longitude: number;
}

export interface Destination {
  id: string;
  name: string;
  province: string;
  municipality: string;
  administrativeAreaCode?: string;
  coordinates?: DestinationCoordinates;
  shortDescription: string;
  description: string;
  keywords: string[];
  recommendedDuration: string;
  recommendedSeasons: string[];
  attractions: string[];
  foods: string[];
  course: string[];
  itinerary: { title: string; activities: string[] }[];
  tips: string[];
  missions: string[];
  imageUrl?: string;
  gradient: string;
  visualType: VisualType;
}

export interface LotteryHistoryEntry {
  id: string;
  destinationId: string;
  destinationName: string;
  province: string;
  issuedAt: string;
  revealedAt: string;
  serial: string;
  mission: string;
  saved: boolean;
}

export interface SavedDestinationEntry {
  destinationId: string;
  savedAt: string;
  mission: string;
}

export type LotteryPhase = 'idle' | 'choosing' | 'issuing' | 'opening' | 'revealed' | 'resetting';

export interface LotteryTicket {
  destination: Destination;
  serial: string;
  issuedAt: string;
  mission: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  tone?: 'default' | 'success' | 'error';
}
