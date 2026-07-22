import { TicketIcon } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner"><div className="brand footer-brand"><span className="brand-mark"><TicketIcon /></span><span>어디든 복권 · 일본판</span></div><p>우연이 일본 여행의 이유가 되는 순간. <small>© {new Date().getFullYear()} 어디든 복권</small></p></div>
    </footer>
  );
}
