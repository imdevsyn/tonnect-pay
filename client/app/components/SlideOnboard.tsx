"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { slides } from "../constants/onboarding-slides";
import { LinkIcon, ArrowRight, Zap, WalletMinimal } from "lucide-react";
import Image from "next/image";

export function SlideOnboard() {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_seen", "true");
    window.location.href = "/mini-app";
  };

  const Icons = {
    chain: <LinkIcon color="#ffffff" size={25} />,
    zap: <Zap color="#ffffff" size={25} />,
    wallet: <WalletMinimal color="#ffffff" size={25} />,
  };

  return (
    <>
      <div className="h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-cover bg-center flex flex-col justify-between p-6"
            style={{ backgroundImage: `url(${slides[index].image})` }}
          >
            <div className="w-full flex">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white/80">TonnectPay</span>
              </div>
              <button
                className="ml-auto text-base text-black/80 font-bold cursor-pointer bg-white w-[70px] rounded-2xl"
                onClick={handleSkip}
              >
                Pular
              </button>
            </div>
            <div>
              <div className="mb-6 flex flex-col justify-between h-[240px] backdrop-blur-sm border-white/10 border rounded-2xl shadow-2xl p-4">
                <div className=" flex items-center">
                  {Icons[slides[index].icon]}
                  {index < slides.length - 1 ? (
                    <button
                      className="ml-auto bg-white/10 text-white px-4 py-2 rounded-xl cursor-pointer"
                      onClick={next}
                    >
                      <ArrowRight />
                    </button>
                  ) : (
                    <button
                      className="ml-auto bg-white/10 text-white px-4 py-2 rounded-xl cursor-pointer"
                      onClick={handleSkip}
                    >
                      Começar
                    </button>
                  )}
                </div>

                <div className="mt-auto">
                  <h1 className="mt-2 text-5xl font-bold tracking-tighter text-white">
                    {slides[index].title}
                  </h1>
                  <p className=" text-gray-300 font-extralight tracking-tight">
                    {slides[index].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
