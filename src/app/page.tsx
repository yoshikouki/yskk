import { HakoNiwa } from "./hako-niwa";
import { RotatingCube } from "./rotating-cube";

export default function HomePage() {
  return (
    <main className="h-svh w-screen space-y-4 px-4 py-10">
      <div className="aspect-square rounded border bg-card">
        <HakoNiwa />
      </div>
      <div className="aspect-square rounded border bg-card">
        <RotatingCube />
      </div>
    </main>
  );
}
