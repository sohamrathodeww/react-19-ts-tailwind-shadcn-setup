import React, { useState, useMemo } from "react";
import { Search, Copy, Check } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

interface KeyValueItem {
  path: string;
  value: any;
  type: string;
}

const flattenJson = (data: any, prefix = ""): KeyValueItem[] => {
  if (data === null) {
    return [{ path: prefix || "root", value: null, type: "null" }];
  }
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return [{ path: prefix || "root", value: "[]", type: "array" }];
    }
    return data.flatMap((val, idx) => flattenJson(val, prefix ? `${prefix}[${idx}]` : `[${idx}]`));
  }
  if (typeof data === "object") {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return [{ path: prefix || "root", value: "{}", type: "object" }];
    }
    return entries.flatMap(([key, val]) => flattenJson(val, prefix ? `${prefix}.${key}` : key));
  }
  return [{ path: prefix || "root", value: data, type: typeof data }];
};

interface KeyValueViewerProps {
  data: any;
}

export const KeyValueViewer: React.FC<KeyValueViewerProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const flatList = useMemo(() => {
    try {
      return flattenJson(data);
    } catch (e) {
      return [];
    }
  }, [data]);

  const filteredList = useMemo(() => {
    if (!search.trim()) return flatList;
    const lower = search.toLowerCase();
    return flatList.filter(
      (item) =>
        item.path.toLowerCase().includes(lower) ||
        String(item.value).toLowerCase().includes(lower)
    );
  }, [flatList, search]);

  const handleCopy = (text: string, path: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(path);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
        <input
          type="text"
          placeholder="Filter paths or values..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-white/10 bg-white/5 outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
        />
      </div>

      <div className="overflow-auto max-h-[500px] rounded-2xl bg-black/20 border border-white/5">
        <table className="w-full text-[13px] font-mono text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Path</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredList.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-muted-foreground">
                  No matching elements found
                </td>
              </tr>
            ) : (
              filteredList.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/3 transition-colors group">
                  <td className="py-3 px-4 text-purple-400 font-semibold break-all max-w-[240px]">
                    {item.path}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground/60 text-xs">
                    <span className="bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 break-all max-w-[300px]">
                    {item.value === null ? (
                      <span className="text-rose-400 italic font-bold">null</span>
                    ) : item.type === "string" ? (
                      <span className="text-emerald-400">"{String(item.value)}"</span>
                    ) : item.type === "number" ? (
                      <span className="text-amber-400 font-bold">{String(item.value)}</span>
                    ) : item.type === "boolean" ? (
                      <span className="text-cyan-400 font-bold">{String(item.value)}</span>
                    ) : (
                      <span className="text-foreground/90">{String(item.value)}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleCopy(item.path, `${item.path}-p`)}
                        className="h-7 px-2 text-xs hover:bg-white/10 text-muted-foreground flex items-center gap-1"
                        title="Copy path"
                      >
                        {copiedPath === `${item.path}-p` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          "Path"
                        )}
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => handleCopy(JSON.stringify(item.value), `${item.path}-v`)}
                        className="h-7 px-2 text-xs hover:bg-white/10 text-muted-foreground flex items-center gap-1"
                        title="Copy value"
                      >
                        {copiedPath === `${item.path}-v` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          "Val"
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
