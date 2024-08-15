import { HakoNiwa } from "./hakoniwa";

export default function HakoniwaPage() {
  return (
    <main className="flex w-full justify-center px-4 py-10">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <div className="aspect-square w-full max-w-xl rounded border">
          <HakoNiwa />
        </div>
      </div>
    </main>
  );
}
