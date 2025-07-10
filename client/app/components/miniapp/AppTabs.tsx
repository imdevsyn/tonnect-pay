import {
  Wallet,
  History,
  UserRound,
  GalleryVerticalEnd,
  Sparkles,
  ArrowRightLeft,
} from "lucide-react";

export function AppTabs() {
  return (
    <>
      <button>
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
