import {
  Wallet,
  History,
  UserRound,
  GalleryVerticalEnd,
  Sparkles,
  ArrowRightLeft,
} from "lucide-react";

type TabName = "wallet" | "ai" | "transactions" | "gallery" | "profile";
type TabKey = (key: TabName) => void;

export function AppTabs({ onTabChange }: { onTabChange: TabKey }) {
  return (
    <>
      <button onClick={() => onTabChange("wallet")}>
        <Wallet />
      </button>
      <button>
        <Sparkles />
      </button>
      <button>
        <ArrowRightLeft />
      </button>
      <button>
        <GalleryVerticalEnd />
      </button>
      <button>
        <UserRound />
      </button>
    </>
  );
}
