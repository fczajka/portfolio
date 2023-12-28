import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { ButtonsProps } from "@/public/types";

export default function Buttons({
  currentIndex,
  setCurrentIndex,
}: ButtonsProps) {
  return (
    <div className="absolute flex w-full top-1/2 -translate-y-1/2 justify-between text-xl sm:text-3xl p-4">
      <button
        className="rounded-full"
        aria-label="Press to change to the next"
        onClick={() => setCurrentIndex(currentIndex - 1)}
      >
        {
          <BsArrowLeftShort className="bg-zinc-900 text-slate-50 rounded-full transition-all hover:bg-zinc-800 motion-reduce:transition-none" />
        }
      </button>
      <button
        className="rounded-full"
        aria-label="Press to change to the next"
        onClick={() => setCurrentIndex(currentIndex + 1)}
      >
        {
          <BsArrowRightShort className="bg-zinc-900 text-slate-50 rounded-full transition-all hover:bg-zinc-800 motion-reduce:transition-none" />
        }
      </button>
    </div>
  );
}
