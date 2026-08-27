import React, { useMemo } from "react";
import { Database, HelpCircle, Layers, CheckCircle } from "lucide-react";

interface RootNodeViewerProps {
  data: any;
  rawString: string;
}

const computeStats = (obj: any): { depth: number; totalKeys: number } => {
  let maxDepth = 0;
  let keyCount = 0;

  const traverse = (val: any, currentDepth: number) => {
    if (val === null || typeof val !== "object") {
      maxDepth = Math.max(maxDepth, currentDepth);
      return;
    }
    keyCount++;
    maxDepth = Math.max(maxDepth, currentDepth);

    if (Array.isArray(val)) {
      val.forEach((item) => traverse(item, currentDepth + 1));
    } else {
      Object.values(val).forEach((item) => traverse(item, currentDepth + 1));
    }
  };

  traverse(obj, 1);
  return { depth: maxDepth, totalKeys: keyCount };
};

export const RootNodeViewer: React.FC<RootNodeViewerProps> = ({ data, rawString }) => {
  const rootKeys = useMemo(() => {
    if (data === null || typeof data !== "object") return [];
    return Object.entries(data).map(([key, val]) => ({
      key,
      type: val === null ? "null" : Array.isArray(val) ? "array" : typeof val,
      size: val === null || typeof val !== "object" ? 1 : Array.isArray(val) ? val.length : Object.keys(val).length,
    }));
  }, [data]);

  const stats = useMemo(() => computeStats(data), [data]);

  return (
    <div className="space-y-6">
      {/* Metrics Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-2xl border border-white/5 bg-white/2 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Payload Size</p>
            <p className="text-lg font-black text-white">{(rawString.length / 1024).toFixed(2)} KB</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/5 bg-white/2 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Max Depth</p>
            <p className="text-lg font-black text-white">{stats.depth} levels</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/5 bg-white/2 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Structural Nodes</p>
            <p className="text-lg font-black text-white">{stats.totalKeys} keys</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/5 bg-white/2 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-semibold">Root Properties</p>
            <p className="text-lg font-black text-white">{rootKeys.length} properties</p>
          </div>
        </div>
      </div>

      {/* Root Keys Table */}
      <div className="rounded-2xl border border-white/5 bg-black/20 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/5 font-semibold text-sm">
          Root Object Keys Detail
        </div>
        <div className="overflow-auto max-h-[320px]">
          <table className="w-full text-sm font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Root Property</th>
                <th className="py-2.5 px-4">Type</th>
                <th className="py-2.5 px-4">Dimensions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rootKeys.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-6 text-center text-muted-foreground">
                    Empty payload
                  </td>
                </tr>
              ) : (
                rootKeys.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/3 transition-colors">
                    <td className="py-2.5 px-4 text-purple-400 font-semibold">
                      {item.key}
                    </td>
                    <td className="py-2.5 px-4 text-muted-foreground text-xs">
                      <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-foreground/80">
                      {item.type === "object"
                        ? `${item.size} nested keys`
                        : item.type === "array"
                        ? `${item.size} items`
                        : "Primitive field"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
