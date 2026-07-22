export function secureRandomIndex(length: number): number {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('무작위 선택 대상이 비어 있습니다.');
  }

  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const max = 0x1_0000_0000;
    const limit = max - (max % length);
    const value = new Uint32Array(1);
    do {
      crypto.getRandomValues(value);
    } while (value[0] >= limit);
    return value[0] % length;
  }

  return Math.floor(Math.random() * length);
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[secureRandomIndex(items.length)];
}

export function pickWeightedRandom<T>(items: readonly T[], getWeight: (item: T) => number): T {
  if (items.length === 0) throw new Error('무작위 선택 대상이 비어 있습니다.');
  const weights = items.map(getWeight);
  if (weights.some((weight) => !Number.isSafeInteger(weight) || weight <= 0)) {
    throw new Error('추첨 설정값은 0보다 큰 안전한 정수여야 합니다.');
  }
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (!Number.isSafeInteger(totalWeight)) throw new Error('전체 추첨 설정값이 안전한 정수 범위를 벗어났습니다.');

  const draw = secureRandomIndex(totalWeight);
  let cumulativeWeight = 0;
  for (let index = 0; index < items.length; index += 1) {
    cumulativeWeight += weights[index];
    if (draw < cumulativeWeight) return items[index];
  }
  return items[items.length - 1];
}

export function secureShuffle<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = secureRandomIndex(index + 1);
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export function createSerial(date = new Date()): string {
  const random = new Uint32Array(1);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(random);
  } else {
    random[0] = Math.floor(Math.random() * 1_000_000);
  }
  const digits = String(random[0] % 1_000_000).padStart(6, '0');
  return `JP-${date.getFullYear()}-${digits}`;
}

export function createId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${createSerial()}`;
}
