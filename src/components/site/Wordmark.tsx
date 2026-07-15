import { Link } from "@tanstack/react-router";

export function Wordmark() {
  return (
    <Link to="/" className="flex flex-col group">
      <div className="flex items-baseline">
        <span className="font-sora text-[22px] font-[500] text-off tracking-[0.04em] uppercase">MO</span>
        <span className="font-sora text-[22px] font-[500] text-cobre tracking-[0.04em] uppercase">O</span>
        <span className="font-sora text-[22px] font-[500] text-off tracking-[0.04em] uppercase">VIA</span>
      </div>
      <span className="font-urbanist text-[11px] font-[300] text-mut-2 tracking-[0.32em] uppercase -mt-0.5">Portugal</span>
    </Link>
  );
}
