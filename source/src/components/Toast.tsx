import type { ToastMessage } from '../types';

interface ToastProps { messages: ToastMessage[] }

export function Toast({ messages }: ToastProps) {
  return (
    <div className="toast-region" aria-live="polite" aria-atomic="false">
      {messages.map((toast) => <div className={`toast toast-${toast.tone ?? 'default'}`} key={toast.id}><span>{toast.tone === 'error' ? '!' : '✓'}</span>{toast.message}</div>)}
    </div>
  );
}
