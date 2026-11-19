import Footer from "@/components/Footer/Footer";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import NotFoundView from "@/components/UI/NotFoundView";

export default function NotFound() {
  return (
    <main>
      <BackgroundParticles />
      <div className="relative max-w-1920 mx-auto">
        <NotFoundView />
        <Footer />
      </div>
    </main>
  );
}
