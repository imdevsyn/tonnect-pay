import {
  Wallet,
  History,
  UserRound,
  GalleryVerticalEnd,
  Sparkles,
  ArrowRightLeft,
} from "lucide-react";
import Link from "next/link";

type TabName = "wallet" | "ai" | "transactions" | "gallery" | "profile";
type TabKey = (key: TabName) => void;

export function AppTabs() {
  return (
    <div className="flex justify-between items-center mb-4 px-4">
      <Link href="/mini-app/wallet">
        <Wallet />
      </Link>
      <Link href="/mini-app/ai">
        <Sparkles />
      </Link>
      <Link href="/mini-app/swap">
        <ArrowRightLeft />
      </Link>
      <Link href="/mini-app/history">
        <GalleryVerticalEnd />
      </Link>
      <Link href="/mini-app/profile">
        <UserRound />
      </Link>
    </div>
  );
}
