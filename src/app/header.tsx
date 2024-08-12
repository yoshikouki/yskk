import { url } from "@/lib/url";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-no-padding.webp";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-xl items-center justify-between p-4">
        <Link
          href={url.root}
          className="flex items-center justify-center gap-2"
        >
          <Image src={Logo} loading="eager" alt="service logo" height={48} />
          <h1 className="font-black text-6xl">HonoN</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};
