import { Footer } from "./footer";
import { SnowGarden } from "./hakoniwa/snow-garden";
import { Header } from "./header";
import { RotatingCube } from "./rotating-cube";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="h-svh w-screen max-w-xl space-y-4 px-4 py-10">
        <div className="aspect-square rounded border bg-card">
          <SnowGarden />
        </div>
        <div className="aspect-square rounded border bg-card">
          <RotatingCube />
        </div>
      </main>
      <Footer />
    </>
  );
}
