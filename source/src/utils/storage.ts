import type { LotteryHistoryEntry, SavedDestinationEntry } from '../types';

const HISTORY_KEY = 'dokodemo-tabikuji:history:v1';
const SAVED_KEY = 'dokodemo-tabikuji:saved:v1';
const HISTORY_LIMIT = 30;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isHistoryEntry(value: unknown): value is LotteryHistoryEntry {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.destinationId === 'string'
    && typeof value.destinationName === 'string'
    && typeof value.province === 'string'
    && typeof value.issuedAt === 'string'
    && typeof value.revealedAt === 'string'
    && typeof value.serial === 'string'
    && typeof value.mission === 'string'
    && typeof value.saved === 'boolean';
}

function isSavedEntry(value: unknown): value is SavedDestinationEntry {
  return isRecord(value)
    && typeof value.destinationId === 'string'
    && typeof value.savedAt === 'string'
    && typeof value.mission === 'string';
}

function readArray<T>(key: string, isValid: (value: unknown) => value is T): T[] {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    localStorage.removeItem(key);
    throw error;
  }
  if (!Array.isArray(parsed) || !parsed.every(isValid)) {
    localStorage.removeItem(key);
    throw new Error(`Invalid localStorage data: ${key}`);
  }
  return parsed;
}

export function loadHistory(): LotteryHistoryEntry[] {
  return readArray(HISTORY_KEY, isHistoryEntry).slice(0, HISTORY_LIMIT);
}

export function saveHistory(entries: LotteryHistoryEntry[]): LotteryHistoryEntry[] {
  const limited = entries.slice(0, HISTORY_LIMIT);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
  return limited;
}

export function loadSavedDestinations(): SavedDestinationEntry[] {
  return readArray(SAVED_KEY, isSavedEntry);
}

export function saveSavedDestinations(entries: SavedDestinationEntry[]): void {
  localStorage.setItem(SAVED_KEY, JSON.stringify(entries));
}

export function updateHistoryMission(
  entries: LotteryHistoryEntry[],
  serial: string,
  mission: string,
): LotteryHistoryEntry[] {
  return entries.map((entry) => (entry.serial === serial ? { ...entry, mission } : entry));
}

export function updateHistorySaved(
  entries: LotteryHistoryEntry[],
  destinationId: string,
  saved: boolean,
): LotteryHistoryEntry[] {
  return entries.map((entry) =>
    entry.destinationId === destinationId ? { ...entry, saved } : entry,
  );
}

export const storageKeys = { history: HISTORY_KEY, saved: SAVED_KEY } as const;
