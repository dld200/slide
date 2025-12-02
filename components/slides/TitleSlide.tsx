import React from "react";
import { Sparkles, Cpu, Activity } from "lucide-react";
import { SlideProps } from "../../types";

export const TitleSlide: React.FC<SlideProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="h-full w-full flex flex-col items-center justify-center text-center p-2 bg-gradient-to-br from-presentation-bg via-slate-900 to-slate-800">
      <div className="mb-8 relative mt-10">
        <div className="absolute -inset-4 bg-presentation-accent/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <Cpu
          size={80}
          className="text-presentation-accent relative z-10 animate-float"
        />
      </div>

      <h1 className="text-5xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-presentation-secondary leading-tight">
        AI-native
        <br />
        Test Automation
      </h1>

      <p className="text-xl text-presentation-secondary max-w-xs mx-auto font-light leading-relaxed">
        A team where humans collaborate with AI
      </p>

      <div className="mt-16 flex flex-col gap-2 text-sm text-slate-500 font-mono">
        <div className="flex items-center justify-center gap-2">
          <Sparkles size={16} />
          <span>Now: AI enhances tools.</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Cpu size={16} />
          <span>Future: AI uses tools.</span>
        </div>
      </div>
    </div>
  );
};
