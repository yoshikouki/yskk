import { Cube } from "@/features/canvaze/objects/cube";
import Canvaze from "../features/canvaze";

export default function HomePage() {
  return (
    <main className="h-svh w-screen space-y-4 px-4 py-10">
      <div className="aspect-square rounded border bg-card">
        <Canvaze>
          <Cube />
        </Canvaze>
      </div>
    </main>
  );
}
