import React, { useState } from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps } from "../../types";
import { Network, Activity, Target, Database, Code, Zap } from "lucide-react";

interface ASTNodeData {
  id: string;
  x: number; // percentage
  y: number; // percentage
  label: string;

  // ASTNode Class Fields
  pageId: string;
  actionType: string;
  targetId: string;
  description: string;
  businessIntent: string;
  constraints: Record<string, string | number>;
  testIntentTags: string[];
  alternativeActions: string[];
  successRate: number;
  totalAttempts: number;
  totalSuccess: number;
  vector: string;
}

const NODES: ASTNodeData[] = [
  {
    id: "n1",
    x: 20,
    y: 15,
    label: "Input: Phone",
    pageId: "Pg_Login_01",
    actionType: "INPUT_TEXT",
    targetId: "txt_phone_number",
    description: "Login phone number input field",
    businessIntent: "Input User Mobile",
    constraints: { length: 11, type: "numeric", format: "CN_MOBILE" },
    testIntentTags: ["boundary", "invalidPhone", "sqlInjection"],
    alternativeActions: ["Paste from clipboard", "Select from history"],
    successRate: 0.98,
    totalAttempts: 1540,
    totalSuccess: 1509,
    vector: "[0.12, 0.85, 0.33, ...]",
  },
  {
    id: "n2",
    x: 60,
    y: 25,
    label: "Input: OTP",
    pageId: "Pg_Login_01",
    actionType: "INPUT_TEXT",
    targetId: "txt_otp_code",
    description: "One-time password field",
    businessIntent: "Verify User Identity",
    constraints: { length: 6, type: "numeric" },
    testIntentTags: ["expired", "wrongCode", "empty"],
    alternativeActions: ["Resend Code"],
    successRate: 0.92,
    totalAttempts: 1200,
    totalSuccess: 1104,
    vector: "[0.45, 0.11, 0.99, ...]",
  },
  {
    id: "n3",
    x: 50,
    y: 50,
    label: "Btn: Login",
    pageId: "Pg_Login_01",
    actionType: "CLICK",
    targetId: "btn_submit_login",
    description: "Primary login submission",
    businessIntent: "Submit Credentials",
    constraints: { enabled: "if_valid" },
    testIntentTags: ["doubleClick", "networkDelay"],
    alternativeActions: ["Press Enter"],
    successRate: 0.88,
    totalAttempts: 2000,
    totalSuccess: 1760,
    vector: "[0.78, 0.22, 0.45, ...]",
  },
  {
    id: "n4",
    x: 20,
    y: 70,
    label: "Tab: Home",
    pageId: "Pg_Home_02",
    actionType: "WAIT_VISIBLE",
    targetId: "tab_home_active",
    description: "Home screen landing verification",
    businessIntent: "Verify Login Success",
    constraints: { timeout: 5000 },
    testIntentTags: ["sanity", "smoke"],
    alternativeActions: [],
    successRate: 0.99,
    totalAttempts: 1760,
    totalSuccess: 1742,
    vector: "[0.99, 0.99, 0.12, ...]",
  },
  {
    id: "n5",
    x: 80,
    y: 65,
    label: "Alert: Error",
    pageId: "Pg_Login_01",
    actionType: "ASSERT_VISIBLE",
    targetId: "toast_error_msg",
    description: "Error toast message",
    businessIntent: "Feedback Invalid Login",
    constraints: { text_contains: "Error" },
    testIntentTags: ["negative_flow"],
    alternativeActions: ["Retry"],
    successRate: 1.0,
    totalAttempts: 240,
    totalSuccess: 240,
    vector: "[0.11, 0.15, 0.88, ...]",
  },
  {
    id: "n6",
    x: 80,
    y: 10,
    label: "Link: Forgot",
    pageId: "Pg_Login_01",
    actionType: "CLICK",
    targetId: "lnk_forgot_pwd",
    description: "Forgot password flow trigger",
    businessIntent: "Recover Account",
    constraints: {},
    testIntentTags: ["navigation"],
    alternativeActions: [],
    successRate: 0.95,
    totalAttempts: 50,
    totalSuccess: 47,
    vector: "[0.33, 0.44, 0.55, ...]",
  },
];

const EDGES = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n1", to: "n6" },
  { from: "n6", to: "n1" },
  { from: "n3", to: "n4", type: "success" },
  { from: "n3", to: "n5", type: "error" },
];

export const MemoryMapSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [selectedNode, setSelectedNode] = useState<ASTNodeData>(NODES[0]);

  return (
    <SlideLayout
      isActive={isActive}
      title="UI Knowledge Graph"
      subtitle="Memory & Speed Up"
    >
      <div className="flex flex-col h-full gap-4 relative">
        {/* Top Panel: The Graph */}
        <div className="flex-1 relative bg-slate-900 rounded-xl border border-slate-800 shadow-inner overflow-hidden group min-h-[40dvh]">
          {/* Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #334155 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              opacity: 0.3,
            }}
          ></div>

          <div className="absolute top-2 left-2 z-10 bg-slate-800/80 backdrop-blur px-2 py-0.5 rounded border border-slate-600 text-[10px] font-mono text-slate-400">
            DIRECTED_CYCLIC
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker
                id="arrow-default"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
              </marker>
              <marker
                id="arrow-success"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
              </marker>
              <marker
                id="arrow-error"
                markerWidth="10"
                markerHeight="7"
                refX="22"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
              </marker>
            </defs>
            {EDGES.map((edge, idx) => {
              const start = NODES.find((n) => n.id === edge.from)!;
              const end = NODES.find((n) => n.id === edge.to)!;
              let stroke = "#475569";
              let marker = "url(#arrow-default)";

              if (edge.type === "success") {
                stroke = "#22c55e";
                marker = "url(#arrow-success)";
              }
              if (edge.type === "error") {
                stroke = "#ef4444";
                marker = "url(#arrow-error)";
              }

              return (
                <line
                  key={idx}
                  x1={`${start.x}%`}
                  y1={`${start.y + 10}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y + 10}%`}
                  stroke={stroke}
                  strokeWidth="2"
                  markerEnd={marker}
                  className="opacity-60"
                />
              );
            })}
          </svg>

          {NODES.map((node) => (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full cursor-pointer transition-all duration-300 z-10 border-2 ${
                selectedNode.id === node.id
                  ? "bg-presentation-accent border-white scale-150 shadow-[0_0_15px_rgba(56,189,248,0.6)]"
                  : "bg-slate-800 border-slate-500 hover:border-presentation-accent hover:scale-125"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y + 10}%` }}
            >
              <div
                className={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono px-1.5 py-0.5 rounded ${
                  selectedNode.id === node.id
                    ? "bg-presentation-accent text-slate-900 font-bold"
                    : "bg-slate-800/80 text-slate-400"
                }`}
              >
                {node.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Panel: AST Inspector */}
        <div className="h-[60dvh] w-full bg-slate-800 rounded-xl border border-slate-700 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-900 px-3 py-2 border-b border-slate-700 flex items-center justify-between shrink-0">
            <h3 className="font-mono text-xs text-green-400 flex items-center gap-2">
              <Code size={14} /> ASTNode
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">
              {selectedNode.id}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-0 font-mono text-[10px]">
            {/* Header Info */}
            <div className="p-3 bg-slate-800/50 border-b border-slate-700/50">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-slate-500 text-[8px] uppercase">
                    Page ID
                  </span>
                  <span className="text-slate-200">{selectedNode.pageId}</span>
                </div>
                <div>
                  <span className="block text-slate-500 text-[8px] uppercase">
                    Target ID
                  </span>
                  <span className="text-slate-200">
                    {selectedNode.targetId}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Logic Section */}
            <div className="p-3 border-b border-slate-700/50">
              <h4 className="text-slate-500 uppercase text-[8px] font-bold mb-1 flex items-center gap-1">
                <Target size={10} /> Business Semantic
              </h4>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-purple-400">intent:</span>
                  <span className="text-green-300">
                    "{selectedNode.businessIntent}"
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-purple-400">constraints:</span>
                  <span className="text-orange-300 break-all">
                    {JSON.stringify(selectedNode.constraints)}
                  </span>
                </div>
              </div>
            </div>

            {/* Metrics Section */}
            <div className="p-3 border-b border-slate-700/50 bg-slate-900/30">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="block text-slate-500 mb-0.5 text-[8px] uppercase">
                    Success
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${selectedNode.successRate * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-green-400">
                      {(selectedNode.successRate * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div>
                  <span className="block text-slate-500 mb-0.5 text-[8px] uppercase">
                    Attempts
                  </span>
                  <span className="text-white">
                    {selectedNode.totalAttempts}
                  </span>
                </div>
              </div>
            </div>

            {/* Vector Data */}
            <div className="p-3">
              <h4 className="text-slate-500 uppercase text-[8px] font-bold mb-1 flex items-center gap-1">
                <Database size={10} /> Vector
              </h4>
              <div className="text-[8px] text-slate-600 break-all leading-tight bg-slate-900 p-1.5 rounded border border-slate-800">
                {selectedNode.vector}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
