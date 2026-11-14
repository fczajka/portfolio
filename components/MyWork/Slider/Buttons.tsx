import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import type { ButtonsProps } from "@/types";

export default function Buttons({ onPrev, onNext }: ButtonsProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 z-10 flex top-1/2 -translate-y-1/2 justify-between text-2xl sm:text-3xl">
      <button
        type="button"
        className="pointer-events-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        aria-label="Previous screenshot"
        onClick={onPrev}
      >
        <BsArrowLeftShort
          aria-hidden="true"
          className="bg-zinc-900 text-zinc-50 rounded-full transition-colors hover:bg-zinc-700 motion-reduce:transition-none"
        />
      </button>
      <button
        type="button"
        className="pointer-events-auto rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        aria-label="Next screenshot"
        onClick={onNext}
      >
        <BsArrowRightShort
          aria-hidden="true"
          className="bg-zinc-900 text-zinc-50 rounded-full transition-colors hover:bg-zinc-700 motion-reduce:transition-none"
        />
      </button>
    </div>
  );
}
