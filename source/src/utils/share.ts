import type { Destination } from '../types';

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // file:// and older browsers can reject the modern clipboard API.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  try {
    if (!document.execCommand('copy')) throw new Error('클립보드 복사를 지원하지 않습니다.');
  } finally {
    textarea.remove();
  }
}

export async function shareDestination(destination: Destination): Promise<'shared' | 'copied'> {
  const text = `여행 복권 커버를 뜯었더니 ‘${destination.province} ${destination.name}’가 나왔습니다. 당신의 일본 여행지도 직접 열어보세요!`;
  if (navigator.share) {
    try {
      await navigator.share({ title: '어디든 복권 일본판 결과', text });
      return 'shared';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') throw error;
    }
  }
  await copyText(text);
  return 'copied';
}
