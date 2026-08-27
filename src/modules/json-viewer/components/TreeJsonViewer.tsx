import React, { useState } from "react";
import { ChevronRight, ChevronDown, Copy, Check } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";

interface TreeItemProps {
  name: string;
  value: any;
  depth: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ name, value, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2); // Auto-expand first few levels
  const [copied, setCopied] = useState(false);

  const valueType = value === null ? "null" : Array.isArray(value) ? "array" : typeof value;
  const isExpandable = valueType === "object" || valueType === "array";

  const handleCopyValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(value, null, 2));
    setCopied(true);
    toast.success("Value copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeStyle = () => {
    switch (valueType) {
      case "object":
        return "text-[10px] font-semibold bg-purple-500/10 border border-purple-500/25 text-purple-300 px-2 py-0.5 rounded-md";
      case "array":
        return "text-[10px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 px-2 py-0.5 rounded-md";
      case "string":
        return "text-[10px] font-semibold bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 px-2 py-0.5 rounded-md";
      case "number":
        return "text-[10px] font-semibold bg-amber-500/10 border border-amber-500/25 text-amber-300 px-2 py-0.5 rounded-md";
      case "boolean":
        return "text-[10px] font-semibold bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 px-2 py-0.5 rounded-md";
      case "null":
        return "text-[10px] font-semibold bg-rose-500/10 border border-rose-500/25 text-rose-300 px-2 py-0.5 rounded-md";
      default:
        return "text-[10px] font-semibold bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-md";
    }
  };

  const getStyleClass = () => {
    switch (valueType) {
      case "string":
        return "text-emerald-400 font-medium break-all";
      case "number":
        return "text-amber-400 font-bold";
      case "boolean":
        return "text-cyan-400 font-bold";
      case "null":
        return "text-rose-400 font-bold italic";
      default:
        return "text-foreground/90";
    }
  };

  const formatPreview = () => {
    if (valueType === "object") {
      const keys = Object.keys(value);
      return `Object (${keys.length} key${keys.length !== 1 ? "s" : ""})`;
    }
    if (valueType === "array") {
      return `Array (${value.length} item${value.length !== 1 ? "s" : ""})`;
    }
    return String(value);
  };

  return (
    <div className="select-none text-[13px] font-mono leading-relaxed">
      <div 
        onClick={() => isExpandable && setIsOpen(!isOpen)}
        className={`flex flex-wrap items-center gap-2 py-1.5 px-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group ${
          isExpandable ? "text-purple-300" : "text-foreground/80"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isExpandable ? (
          isOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground/80" /> : <ChevronRight className="h-4 w-4 text-muted-foreground/80" />
        ) : (
          <span className="h-4 w-4 flex items-center justify-center text-muted-foreground/30">•</span>
        )}

        <span className="text-purple-400 font-semibold">{name}</span>
        <span className="text-muted-foreground/50">:</span>

        <span className={getBadgeStyle()}>
          {valueType === "object" ? `Object (${Object.keys(value).length} keys)` : valueType === "array" ? `Array (${value.length} items)` : valueType}
        </span>

        {!isExpandable && (
          <span className={getStyleClass()}>
            {valueType === "string" ? `"${value}"` : String(value)}
          </span>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopyValue}
          className="h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/10 text-muted-foreground ml-auto transition-all cursor-pointer"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>

      {isExpandable && isOpen && (
        <div className="space-y-0.5">
          {valueType === "array" 
            ? (value as any[]).map((val, idx) => (
                <TreeItem key={idx} name={String(idx)} value={val} depth={depth + 1} />
              ))
            : Object.entries(value).map(([key, val]) => (
                <TreeItem key={key} name={key} value={val} depth={depth + 1} />
              ))
          }
        </div>
      )}
    </div>
  );
};

interface TreeJsonViewerProps {
  data: any;
}

export const TreeJsonViewer: React.FC<TreeJsonViewerProps> = ({ data }) => {
  return (
    <div className="overflow-auto max-h-[600px] p-4 rounded-2xl bg-black/20 border border-white/5">
      {data === null || typeof data !== "object" ? (
        <div className="text-center text-muted-foreground p-8">
          Invalid Object for Tree Visualization
        </div>
      ) : Array.isArray(data) ? (
        data.map((item, idx) => (
          <TreeItem key={idx} name={String(idx)} value={item} depth={0} />
        ))
      ) : (
        Object.entries(data).map(([key, value]) => (
          <TreeItem key={key} name={key} value={value} depth={0} />
        ))
      )}
    </div>
  );
};
