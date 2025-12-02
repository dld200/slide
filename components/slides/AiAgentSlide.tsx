import React, { useState } from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps, GeneratedStep } from "../../types";
import { generateTestSteps } from "../../services/geminiService";
import {
  Bot,
  Play,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export const AiAgentSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [intent, setIntent] = useState(
    "Login with user 'admin' and password '1234', then verify the dashboard loads."
  );
  const [steps, setSteps] = useState<GeneratedStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [executedIndex, setExecutedIndex] = useState(-1);

  const handleGenerate = async () => {
    setLoading(true);
    setSteps([]);
    setExecutedIndex(-1);
    const result = await generateTestSteps(intent);
    setSteps(result);
    setLoading(false);
  };

  const simulateExecution = () => {
    if (steps.length === 0) return;
    setExecutedIndex(-1);
    let i = 0;
    const interval = setInterval(() => {
      setExecutedIndex(i);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 800);
  };

  return (
    <SlideLayout
      isActive={isActive}
      title="The AI Agent"
      subtitle="Intent-to-Action: Self-Exploring and Self-Healing Action Chains"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Top: Input & Control */}
        <div className="shrink-0 flex flex-col gap-3">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg">
            <label className="block text-xs font-medium text-slate-400 mb-2">
              Human Intent
            </label>
            <textarea
              className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-3"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="Describe what to test..."
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm transition-all ${
                loading
                  ? "bg-slate-700 cursor-not-allowed text-slate-400"
                  : "bg-presentation-accent hover:bg-sky-500 text-slate-900"
              }`}
            >
              {loading ? (
                <RefreshCw className="animate-spin" size={16} />
              ) : (
                <Bot size={16} />
              )}
              {loading ? "Thinking..." : "Generate Steps"}
            </button>
          </div>
        </div>

        {/* Bottom: Generated Steps Visualization */}
        <div className="flex-1 bg-slate-900 rounded-xl border border-slate-700 p-4 overflow-hidden flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-2 shrink-0">
            <h3 className="font-mono text-presentation-accent text-sm">
              Action Chain
            </h3>
            {steps.length > 0 && executedIndex < steps.length - 1 && (
              <button
                onClick={simulateExecution}
                className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <Play size={10} /> Run
              </button>
            )}
          </div>

          <div className="overflow-y-auto flex-1 space-y-2 pr-1">
            {steps.length === 0 && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 italic text-xs">
                <ChevronDown size={24} className="mb-2 opacity-50" />
                Enter intent above to generate
              </div>
            )}

            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  executedIndex >= idx
                    ? "bg-green-900/20 border-green-500/50 translate-x-1"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 ${
                      executedIndex >= idx ? "text-green-400" : "text-slate-500"
                    }`}
                  >
                    {executedIndex >= idx ? (
                      <CheckCircle size={14} />
                    ) : (
                      <div className="w-[14px] text-center text-[10px] font-mono">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white uppercase text-[10px] bg-slate-700 px-1.5 py-0.5 rounded">
                        {step.action}
                      </span>
                      <span className="font-mono text-presentation-accent text-xs break-all">
                        {step.target}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 italic leading-tight">
                      {step.reason}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
