import React, { useMemo, useState } from "react";
import { Folder, List, Hash, ShieldAlert } from "lucide-react";

interface StructuredItem {
  key: string;
  type: string;
  preview: string;
  raw: any;
}

const parseStructure = (data: any, prefix = ""): StructuredItem[] => {
  if (data === null || typeof data !== "object") return [];

  return Object.entries(data).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const type = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;

    let preview = "";
    if (type === "object") {
      preview = `{ ${Object.keys(value).length} keys }`;
    } else if (type === "array") {
      preview = `[ ${value.length} items ]`;
    } else {
      preview = String(value);
    }

    const current: StructuredItem = { key: path, type, preview, raw: value };
    const nested = (type === "object" || type === "array") ? parseStructure(value, path) : [];
    return [current, ...nested];
  });
};

interface TypeStructuredViewerProps {
  data: any;
}

export const TypeStructuredViewer: React.FC<TypeStructuredViewerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"objects" | "arrays" | "primitives">("objects");

  const items = useMemo(() => parseStructure(data), [data]);

  const objects = useMemo(() => items.filter((i) => i.type === "object"), [items]);
  const arrays = useMemo(() => items.filter((i) => i.type === "array"), [items]);
  const primitives = useMemo(() => items.filter((i) => i.type !== "object" && i.type !== "array"), [items]);

  const currentList = activeTab === "objects" ? objects : activeTab === "arrays" ? arrays : primitives;

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-black/30 border border-white/5">
        <button
          onClick={() => setActiveTab("objects")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "objects"
              ? "bg-white/10 text-white shadow-inner"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          <Folder className="h-3.5 w-3.5 text-purple-400" />
          Objects ({objects.length})
        </button>
        <button
          onClick={() => setActiveTab("arrays")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "arrays"
              ? "bg-white/10 text-white shadow-inner"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          <List className="h-3.5 w-3.5 text-emerald-400" />
          Arrays ({arrays.length})
        </button>
        <button
          onClick={() => setActiveTab("primitives")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === "primitives"
              ? "bg-white/10 text-white shadow-inner"
              : "text-muted-foreground hover:text-white"
          }`}
        >
          <Hash className="h-3.5 w-3.5 text-amber-400" />
          Primitives ({primitives.length})
        </button>
      </div>

      {/* Item List */}
      <div className="overflow-auto max-h-[480px] p-2 rounded-2xl bg-black/20 border border-white/5 space-y-1.5">
        {currentList.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground flex flex-col items-center gap-2">
            <ShieldAlert className="h-8 w-8 opacity-40 text-muted-foreground" />
            <span>No nested {activeTab} found in the payload</span>
          </div>
        ) : (
          currentList.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/6 transition-colors">
              <div className="font-mono text-sm">
                <span className="text-purple-400 font-semibold">{item.key}</span>
                <span className="text-muted-foreground/60 text-xs ml-2">({item.type})</span>
              </div>
              <div className="font-mono text-xs text-muted-foreground/90 bg-black/20 py-1 px-3 rounded-lg border border-white/5 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {item.preview}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
