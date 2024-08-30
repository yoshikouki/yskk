import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "./footer";
import { Header } from "./header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex w-screen flex-wrap items-center gap-4 px-4 py-10">
        <Button asChild>
          <Link href="/hakoniwa">Hakoniwa</Link>
        </Button>
        <Button asChild>
          <Link href="/hakoniwa-box">Hakoniwa Box</Link>
        </Button>
        <Button asChild>
          <Link href="/hakoniwa-snow">Hakoniwa Snow</Link>
        </Button>
        <Button asChild>
          <Link href="/phaser-particles">Phaser Particles</Link>
        </Button>
        <Button asChild>
          <Link href="/thousounds-particles">Thousand Sounds Particles</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
