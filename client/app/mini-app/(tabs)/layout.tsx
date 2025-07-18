"use client";
import { AppTabs } from "../../components/miniapp";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex items-center mx-auto h-screen px-4">
      <div className="max-h-[1024px] h-full max-w-md w-full flex flex-col mx-auto pt-5">
        <main>{children}</main>
        <footer className="w-full mt-auto">
          <AppTabs />
        </footer>
      </div>
    </div>
  );
}
