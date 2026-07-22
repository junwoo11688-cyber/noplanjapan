import { SparkIcon } from './Icons';

interface DrawLotteryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function DrawLotteryButton({ onClick, disabled = false, label = '여행 복권 뽑기' }: DrawLotteryButtonProps) {
  return (
    <button className="draw-button" type="button" onClick={onClick} disabled={disabled}>
      <SparkIcon />
      <span>{disabled ? '복권을 발급하고 있어요…' : label}</span>
    </button>
  );
}
