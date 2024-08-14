import { HakoNiwa } from "../../features/hako-niwa";

export default function HakoniwaPage() {
  return (
    <main className="h-svh w-screen max-w-xl space-y-4 px-4 py-10">
      <div className="aspect-square rounded border">
        <HakoNiwa />
      </div>
    </main>
  );
}
