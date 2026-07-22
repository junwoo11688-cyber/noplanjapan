import type { ReactNode } from 'react';

interface TicketIssueAnimationProps {
  issuing: boolean;
  resetting: boolean;
  children: ReactNode;
}

export function TicketIssueAnimation({ issuing, resetting, children }: TicketIssueAnimationProps) {
  return (
    <div className={`ticket-machine ${issuing ? 'is-issuing' : ''} ${resetting ? 'is-resetting' : ''}`}>
      {issuing && (
        <div className="printer" aria-live="polite">
          <div className="printer-light" />
          <span>행선지를 밀봉하는 중</span>
          <div className="printer-slot" />
        </div>
      )}
      <div className="issued-ticket-wrap">{children}</div>
    </div>
  );
}
