import Portfolio3D from "@/components/Portfolio3D";
import { defaultFont } from "@/public/fonts";

export default function Home() {
  return (
    <main className={`${defaultFont.variable} font-default h-screen w-full overflow-hidden`}>
      <Portfolio3D />
    </main>
  );
}
