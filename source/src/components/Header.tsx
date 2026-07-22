import { useEffect, useState } from 'react';
import { MenuIcon, SoundIcon, TicketIcon } from './Icons';

interface HeaderProps {
  onDraw: () => void;
  drawDisabled: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

const links = [
  ['#lottery', '복권 뽑기'],
  ['#history', '지난 결과'],
  ['#saved', '저장한 여행지'],
  ['#how-to', '이용 방법'],
] as const;

export function Header({ onDraw, drawDisabled, soundEnabled, onToggleSound }: HeaderProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('resize', close);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      window.removeEventListener('resize', close);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="어디든 복권 일본판 홈">
          <span className="brand-mark"><TicketIcon /></span>
          <span>어디든 복권 <small className="brand-edition">일본판</small></span>
        </a>
        <nav id="primary-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="주요 메뉴">
          {links.map(([href, label], index) => (
            <a key={href} href={href} onClick={(event) => {
              setOpen(false);
              if (index === 0) {
                event.preventDefault();
                onDraw();
              }
            }} aria-disabled={index === 0 && drawDisabled}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button sound-button" type="button" onClick={onToggleSound} aria-label={`효과음 ${soundEnabled ? '끄기' : '켜기'}`} aria-pressed={soundEnabled}>
            <SoundIcon muted={!soundEnabled} />
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label={`메뉴 ${open ? '닫기' : '열기'}`} aria-controls="primary-navigation" aria-expanded={open}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
