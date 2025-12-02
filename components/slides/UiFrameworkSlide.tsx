import React from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps } from "../../types";
import { Layers, Zap, Smartphone, Eye, ArrowDown } from "lucide-react";

export const UiFrameworkSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <SlideLayout
      isActive={isActive}
      title="AI-ready UI framework"
      subtitle="Direct Control & AI Augmentation"
    >
      <div className="flex flex-col h-full gap-2 overflow-y-auto">
        {/* Section 1: Core Tech */}
        <div className="space-y-3 shrink-0">
          <div className="bg-slate-800 p-2 rounded-xl border-l-4 border-blue-500 shadow-lg">
            <div className="flex items-center gap-3 mb-1 text-blue-400">
              <Smartphone size={20} />
              <h3 className="text-lg font-bold">WebDriverAgent</h3>
            </div>
            <p className="text-slate-400 text-xs">
              Direct WDA communication. No Appium middleware.
            </p>
          </div>

          <div className="bg-slate-800 p-2 rounded-xl border-l-4 border-purple-500 shadow-lg">
            <div className="flex items-center gap-3 mb-1 text-purple-400">
              <Zap size={20} />
              <h3 className="text-lg font-bold">Embedded Proxy</h3>
            </div>
            <p className="text-slate-400 text-xs">
              Captures HTTP traffic for network validation.
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center shrink-0">
          <ArrowDown size={24} className="text-slate-600" />
        </div>

        {/* Section 2: Optimization Layer */}
        <div className="shrink-0">
          <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-2 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
            <h3 className="text-sm font-bold text-center mb-4 uppercase tracking-widest text-slate-300">
              Optimization Engine
            </h3>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded">
                <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                  <Layers size={14} />
                </div>
                <span className="text-xs">
                  Source Pruning & Vertical Projection
                </span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded">
                <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                  <Eye size={14} />
                </div>
                <span className="text-xs">Invisible Element Scroll</span>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-1 rounded">
                <div className="bg-green-500/20 p-1.5 rounded-full text-green-400">
                  <Zap size={14} />
                </div>
                <span className="text-xs">Auto-wait For Response</span>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center shrink-0">
          <ArrowDown size={24} className="text-slate-600" />
        </div>

        {/* Section 3: The Result */}
        <div className="flex flex-col justify-center items-center text-center pb-4 shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-presentation-accent/20 blur-xl rounded-full"></div>
            <div className="w-20 h-20 bg-slate-900 border-2 border-presentation-accent rounded-full flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <span className="text-2xl font-black text-white">AI</span>
            </div>
          </div>
          {/* <h3 className="mt-3 text-lg font-bold text-presentation-accent">
            Context Aware
          </h3> */}
          <p className="text-slate-400 text-xs mt-1 max-w-[200px]">
            Handles everything else; AI only decides the path.
          </p>
        </div>
      </div>
    </SlideLayout>
  );
};
