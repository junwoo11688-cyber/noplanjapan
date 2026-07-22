export function RevealAnimation() {
  return (
    <div className="reveal-effects" aria-hidden="true">
      <span className="reveal-ring" />
      {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--confetti-index': index } as React.CSSProperties} />)}
    </div>
  );
}
