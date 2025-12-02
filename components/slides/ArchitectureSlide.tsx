import React from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps } from "../../types";
import {
  Globe,
  Smartphone,
  Bot,
  Network,
  FileText,
  User,
  Zap,
  Plus,
  ArrowDown,
} from "lucide-react";

export const ArchitectureSlide: React.FC<SlideProps> = ({ isActive }) => {
  return (
    <SlideLayout
      isActive={isActive}
      title="The Big Picture"
      subtitle="From isolated tools to a collaborative AI Workforce."
    >
      <div className="h-full flex flex-col items-center justify-center relative p-4">
        {/* Background Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          style={{ zIndex: 0 }}
        >
          {/* API to Agent */}
          <path
            d="M 30% 20% C 30% 40%, 50% 30%, 50% 45%"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
          {/* UI to Agent */}
          <path
            d="M 70% 20% C 70% 40%, 50% 30%, 50% 45%"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
          />
          {/* Agent to Memory */}
          <line
            x1="50%"
            y1="55%"
            x2="50%"
            y2="65%"
            stroke="#38bdf8"
            strokeWidth="4"
          />
        </svg>

        {/* Level 1: Testing Domains */}
        <div className="w-full flex justify-around items-start z-10 mb-8">
          {/* API Platform */}
          <div className="w-64 bg-slate-800/80 p-4 rounded-xl border border-slate-600 shadow-lg text-center backdrop-blur-sm">
            <div className="inline-flex rounded-full bg-blue-900/50 text-blue-400 mb-3">
              <Globe size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">API Platform</h3>
            <ul className="text-xs text-slate-400 space-y-1 text-left pl-4 list-disc">
              <li>Case Tree & Editor</li>
              <li>MCP Interfaces</li>
              <li>Orchestration</li>
            </ul>
          </div>

          {/* UI Framework */}
          <div className="w-64 bg-slate-800/80 p-4 rounded-xl border border-slate-600 shadow-lg text-center backdrop-blur-sm">
            <div className="inline-flex rounded-full bg-purple-900/50 text-purple-400 mb-3">
              <Smartphone size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">UI Framework</h3>
            <ul className="text-xs text-slate-400 space-y-1 text-left pl-4 list-disc">
              <li>WDA / No-Appium</li>
              <li>Smart Proxy</li>
              <li>Auto-Healing</li>
            </ul>
          </div>
        </div>

        {/* Level 2: AI Agent (The Engine) */}
        <div className="z-10 mb-6 animate-float">
          <div className="w-80 bg-gradient-to-r from-slate-800 to-slate-900 p-1 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.2)]">
            <div className="bg-slate-900 rounded-xl p-4 flex items-center gap-4">
              <div className="p-4 bg-presentation-accent text-slate-900 rounded-lg">
                <Bot size={32} />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-xl text-white">AI Agent</h3>
                <p className="text-xs text-slate-400">
                  Intent Execution & Self-Healing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Level 3: The Foundation (Memory) */}
        <div className="z-10 mb-12 relative group cursor-default">
          <div className="absolute -inset-4 bg-green-500/10 rounded-xl blur-xl group-hover:bg-green-500/20 transition-all"></div>
          <div className="w-96 bg-slate-950 border border-green-500/30 p-4 rounded-xl text-center relative">
            <div className="flex items-center justify-center gap-2 text-green-400 font-mono mb-2">
              <Network size={20} />
              <span className="font-bold">Memory Graph (AST)</span>
            </div>
            <p className="text-xs text-slate-500">
              Elements, Semantic Data, Embeddings, Success Rates
            </p>
          </div>
        </div>

        {/* Level 4: Evolution (The Goal) */}
        <div className="w-full max-w-4xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-2 flex items-center justify-between z-10 shadow-2xl relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-presentation-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1 font-mono">
                Memory
              </div>
              <Network className="mx-auto text-green-400" />
            </div>
            <Plus className="text-slate-600" />
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1 font-mono">
                Business Logic
              </div>
              <FileText className="mx-auto text-yellow-400" />
            </div>
            <div className="text-slate-600 mx-2">=</div>
            <div className="text-center">
              <div className="text-sm text-white font-bold mb-1 font-mono">
                AI Tester
              </div>
              <div className="p-2 bg-white/10 rounded-lg border border-white/20">
                <Zap className="mx-auto text-yellow-300 fill-yellow-300" />
              </div>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-slate-700 mx-8"></div>

          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-1">
              Human-AI Collaboration
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Humans define the{" "}
              <span className="text-yellow-400">Business Logic</span>. <br />
              The <span className="text-presentation-accent">
                AI Tester
              </span>{" "}
              handles generation, execution, and maintenance.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-700">
            <User size={20} className="text-blue-400" />
            <span className="text-slate-500">+</span>
            <Bot size={20} className="text-presentation-accent" />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
