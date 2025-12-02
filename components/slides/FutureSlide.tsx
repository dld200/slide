import React from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps } from "../../types";
import {
  BrainCircuit,
  Code,
  Globe,
  Smartphone,
  ArrowDown,
  Zap,
  Bot,
} from "lucide-react";

export const FutureSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <SlideLayout
      isActive={isActive}
      title="The Future: AI Tester"
      subtitle="Autonomous Generation"
    >
      <div className="h-full flex flex-col items-center justify-between relative pb-20">
        {/* Level 1: Inputs */}
        <div className="flex w-full justify-around items-start z-10">
          {/* API Platform */}
          <div className="flex flex-col items-center group w-28 relative">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 group-hover:border-blue-500 transition-all shadow-lg group-hover:scale-110">
              <Globe size={24} className="text-blue-500" />
            </div>
            <h3 className="mt-2 text-xs font-bold text-slate-300">API</h3>
          </div>

          {/* UI Framework */}
          <div className="flex flex-col items-center group w-28 relative">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 group-hover:border-purple-500 transition-all shadow-lg group-hover:scale-110">
              <Smartphone size={24} className="text-purple-500" />
            </div>
            <h3 className="mt-2 text-xs font-bold text-slate-300">UI</h3>
          </div>
        </div>

        {/* Level 2: AI Synthesis */}
        <div className="flex flex-col items-center group w-40 text-center relative z-10">
          <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center border-4 border-presentation-accent shadow-[0_0_30px_rgba(56,189,248,0.3)] z-10 relative transition-transform group-hover:scale-105">
            <BrainCircuit
              size={40}
              className="text-presentation-accent animate-pulse"
            />
            <div className="absolute -inset-2 bg-presentation-accent/20 rounded-full blur animate-pulse-slow"></div>
          </div>
          <h3 className="mt-1 text-sm font-bold text-presentation-accent">
            AI Agent
          </h3>
          <p className="text-[10px] text-slate-400 mt-1 px-1 leading-tight">
            Understand Intent & navigate the UI
          </p>
        </div>

        <div className="h-4 flex items-center">
          <ArrowDown size={16} className="text-slate-600" />
        </div>

        {/* Level 3: Input Logic */}
        <div className="flex flex-col items-center group w-40 text-center relative z-10">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 group-hover:border-blue-400 transition-all z-10 group-hover:scale-110">
            <Code size={30} className="text-blue-400" />
          </div>
          <h3 className="mt-1 text-sm font-bold text-white">AI Knowledge</h3>
          <p className="text-[10px] text-slate-400 mt-1 px-1 leading-tight">
            Understand Business Logic
          </p>
        </div>

        <div className="h-4 flex items-center">
          <ArrowDown size={16} className="text-slate-600" />
        </div>

        {/* Level 4: AI Tester */}
        <div className="flex flex-col items-center group w-48 text-center relative z-10 mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-900 to-slate-900 rounded-full flex items-center justify-center border-4 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)] z-10 transition-transform group-hover:scale-105">
            <Bot size={40} className="text-green-400" />
          </div>
          <h3 className="mt-1 text-lg font-bold text-green-400">AI Tester</h3>
          <p className="text-[10px] text-slate-400 mt-1 px-2 leading-tight">
            Understand business & proactively designs tests
          </p>
        </div>
      </div>
    </SlideLayout>
  );
};
