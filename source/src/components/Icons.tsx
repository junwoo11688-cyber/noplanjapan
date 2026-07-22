import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const PinIcon = (props: IconProps) => <BaseIcon {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></BaseIcon>;
export const TicketIcon = (props: IconProps) => <BaseIcon {...props}><path d="M3 7a2 2 0 0 0 2-2h14v5a2 2 0 0 0 0 4v5H5a2 2 0 0 0-2-2V7Z"/><path d="M9 5v14"/></BaseIcon>;
export const SparkIcon = (props: IconProps) => <BaseIcon {...props}><path d="m12 2 1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/></BaseIcon>;
export const SuitcaseIcon = (props: IconProps) => <BaseIcon {...props}><path d="M5 7h14a2 2 0 0 1 2 2v10H3V9a2 2 0 0 1 2-2Z"/><path d="M9 7V4h6v3M8 11v4m8-4v4M3 13h18"/></BaseIcon>;
export const SoundIcon = ({ muted = false, ...props }: IconProps & { muted?: boolean }) => <BaseIcon {...props}><path d="M11 5 6 9H3v6h3l5 4V5Z"/>{muted ? <path d="m16 10 5 5m0-5-5 5"/> : <><path d="M15 9a4 4 0 0 1 0 6"/><path d="M18 6a8 8 0 0 1 0 12"/></>}</BaseIcon>;
export const MenuIcon = (props: IconProps) => <BaseIcon {...props}><path d="M4 7h16M4 12h16M4 17h16"/></BaseIcon>;
export const CloseIcon = (props: IconProps) => <BaseIcon {...props}><path d="m5 5 14 14M19 5 5 19"/></BaseIcon>;
export const BookmarkIcon = ({ filled = false, ...props }: IconProps & { filled?: boolean }) => <BaseIcon fill={filled ? 'currentColor' : 'none'} {...props}><path d="M6 3h12v18l-6-4-6 4V3Z"/></BaseIcon>;
export const ShareIcon = (props: IconProps) => <BaseIcon {...props}><circle cx="18" cy="5" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="18" cy="19" r="2"/><path d="m8 11 8-5m-8 7 8 5"/></BaseIcon>;
export const CalendarIcon = (props: IconProps) => <BaseIcon {...props}><path d="M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"/><path d="M8 2v4m8-4v4M3 9h18"/></BaseIcon>;
export const TrashIcon = (props: IconProps) => <BaseIcon {...props}><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6"/></BaseIcon>;
export const RouteIcon = (props: IconProps) => <BaseIcon {...props}><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3"/></BaseIcon>;
