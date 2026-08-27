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
      return `{ ${keys.length} key${keys.length !== 1 ? "s" : ""} }`;
    }
    if (valueType === "array") {
      return `[ ${value.length} item${value.length !== 1 ? "s" : ""} ]`;
    }
    return String(value);
  };

  return (
    <div className="select-none text-[13px] font-mono leading-relaxed">
      <div 
        onClick={() => isExpandable && setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group ${
          isExpandable ? "text-purple-300" : "text-foreground/80"
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isExpandable ? (
          isOpen ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <span className="h-3.5 w-3.5 flex items-center justify-center text-muted-foreground/30">•</span>
        )}

        <span className="text-purple-400 font-semibold">{name}</span>
        <span className="text-muted-foreground/60">:</span>

        {isExpandable ? (
          <span className="text-muted-foreground text-xs font-semibold bg-white/5 px-2 py-0.5 rounded-full">
            {formatPreview()}
          </span>
        ) : (
          <span className={getStyleClass()}>
            {valueType === "string" ? `"${value}"` : formatPreview()}
          </span>
        )}

        <span className="text-[10px] text-muted-foreground/40 italic ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
          ({valueType})
        </span>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleCopyValue}
          className="h-6 w-6 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/10 text-muted-foreground ml-auto transition-all"
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
