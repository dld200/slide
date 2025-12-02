import React, { useState } from "react";
import { SlideLayout } from "../SlideLayout";
import { SlideProps } from "../../types";
import { Folder, FileCode, Play, Database, Globe, Box } from "lucide-react";

export const ApiPlatformSlide: React.FC<SlideProps> = ({ isActive }) => {
  const [activeTab, setActiveTab] = useState("groovy");

  return (
    <SlideLayout
      isActive={isActive}
      title="Unified API Platform"
      subtitle="API Test & Quick Tools"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Top Panel: Tree View */}
        <div className="h-1/3 bg-presentation-card rounded-xl border border-slate-700/50 p-3 shadow-xl flex flex-col">
          <h3 className="text-xs font-semibold text-presentation-secondary mb-2 uppercase tracking-wider flex items-center gap-2">
            <Folder size={12} /> Project Explorer
          </h3>
          <div className="space-y-1 font-mono text-xs overflow-y-auto flex-1">
            <div className="flex items-center gap-2 text-presentation-accent cursor-pointer hover:bg-slate-700/30 p-1 rounded">
              <Folder size={14} />
              <span>Payment Service</span>
            </div>
            <div className="pl-4 space-y-1">
              <div className="flex items-center gap-2 text-slate-300 hover:bg-slate-700/30 p-1 rounded cursor-pointer">
                <Box size={12} className="text-orange-400" />
                <span>Utils: TokenGen (MCP)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 hover:bg-slate-700/30 p-1 rounded cursor-pointer">
                <FileCode size={12} className="text-blue-400" />
                <span>TC_01_Checkout_Flow</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 hover:bg-slate-700/30 p-1 rounded cursor-pointer">
                <FileCode size={12} className="text-green-400" />
                <span>TC_02_Refund_Logic</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-400 mt-2 p-1">
              <Folder size={14} />
              <span>Regression Test</span>
            </div>
          </div>
        </div>

        {/* Bottom Panel: Editor Area */}
        <div className="flex-1 bg-presentation-card rounded-xl border border-slate-700/50 flex flex-col shadow-xl overflow-hidden min-h-0">
          {/* Tabs */}
          <div className="flex bg-slate-900/50 border-b border-slate-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab("http")}
              className={`px-3 py-2 text-xs flex-shrink-0 flex items-center gap-2 ${
                activeTab === "http"
                  ? "bg-presentation-card border-t-2 border-t-presentation-accent text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Globe size={12} /> HTTP
            </button>
            <button
              onClick={() => setActiveTab("sql")}
              className={`px-3 py-2 text-xs flex-shrink-0 flex items-center gap-2 ${
                activeTab === "sql"
                  ? "bg-presentation-card border-t-2 border-t-presentation-accent text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Database size={12} /> SQL
            </button>
            <button
              onClick={() => setActiveTab("groovy")}
              className={`px-3 py-2 text-xs flex-shrink-0 flex items-center gap-2 ${
                activeTab === "groovy"
                  ? "bg-presentation-card border-t-2 border-t-presentation-accent text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <FileCode size={12} /> Groovy
            </button>
          </div>

          {/* Code Area */}
          <div className="flex-1 p-4 font-mono text-xs relative overflow-y-auto">
            <div className="absolute bottom-4 right-4 z-10">
              <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-full shadow-lg transition-all">
                <Play size={16} fill="currentColor" />
              </button>
            </div>

            {activeTab === "groovy" && (
              <div className="text-slate-300 leading-relaxed">
                <span className="text-purple-400">import</span>{" "}
                com.internal.utils.Signer
                <br />
                <br />
                <span className="text-slate-500">
                  // Dynamic assertion logic
                </span>
                <br />
                <span className="text-blue-400">def</span> response =
                ctx.getPrevResponse()
                <br />
                <span className="text-blue-400">def</span> signature =
                Signer.verify(response.body)
                <br />
                <br />
                <span className="text-purple-400">if</span> (!signature.isValid)
                &#123;
                <br />
                &nbsp;&nbsp;ctx.fail(
                <span className="text-green-300">"Invalid Signature"</span>)
                <br />
                &#125; <span className="text-purple-400">else</span> &#123;
                <br />
                &nbsp;&nbsp;ctx.log(
                <span className="text-green-300">"Security check passed"</span>)
                <br />
                &#125;
              </div>
            )}

            {activeTab === "http" && (
              <div className="text-slate-300 leading-relaxed">
                <span className="text-orange-400">POST</span>{" "}
                <span className="text-green-300">/api/v2/orders/create</span>
                <br />
                <br />
                <span className="text-slate-500">Headers:</span>
                <br />
                Authorization: Bearer{" "}
                <span className="text-blue-400">&#36;&#123;token&#125;</span>
                <br />
                Content-Type: application/json
                <br />
                <br />
                <span className="text-slate-500">Body:</span>
                <br />
                &#123;
                <br />
                &nbsp;&nbsp;"itemId":{" "}
                <span className="text-orange-400">10234</span>,<br />
                &nbsp;&nbsp;"qty": <span className="text-orange-400">1</span>
                <br />
                &#125;
              </div>
            )}

            {activeTab === "sql" && (
              <div className="text-slate-300 leading-relaxed">
                <span className="text-purple-400">SELECT</span> status, amount{" "}
                <br />
                <span className="text-purple-400">FROM</span> orders <br />
                <span className="text-purple-400">WHERE</span> order_id ={" "}
                <span className="text-blue-400">?</span>
                <br />
                <span className="text-purple-400">AND</span> created_at &lt;
                NOW() - INTERVAL 5 MINUTE;
              </div>
            )}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
