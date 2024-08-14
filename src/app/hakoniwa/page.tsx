import { SnowGarden } from "./snow-garden";

export default function HakoniwaPage() {
  return (
    <main className="h-svh w-screen max-w-xl space-y-4 px-4 py-10">
      <div className="aspect-square rounded border">
        <SnowGarden />
      </div>
    </main>
  );
}
