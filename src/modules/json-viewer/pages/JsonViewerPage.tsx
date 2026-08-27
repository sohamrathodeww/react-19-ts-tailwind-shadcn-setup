import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Braces, Play, RefreshCw, FileCode, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import AutoFormatTextarea from "../../../shared/components/AutoFormatTextarea";
import { TreeJsonViewer } from "../components/TreeJsonViewer";
import { KeyValueViewer } from "../components/KeyValueViewer";
import { TypeStructuredViewer } from "../components/TypeStructuredViewer";
import { RootNodeViewer } from "../components/RootNodeViewer";
import { toast } from "sonner";

const SAMPLE_JSON = {
  appName: "Visual DevTool",
  version: "2.0.4",
  status: "active",
  features: ["Code Compare", "JSON Tree Viewer", "XML Explorer"],
  serverConfig: {
    port: 5173,
    useHttps: false,
    endpoints: {
      health: "/api/health",
      compare: "/api/compare"
    }
  },
  metrics: {
    requestCount: 1420,
    activeSessions: 3,
    isOperational: true,
    lastRefreshed: null
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as const;

export default function JsonViewerPage() {
  const [jsonText, setJsonText] = useState("");
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"tree" | "paths" | "types" | "metrics">("tree");

  // Load sample json by default
  useEffect(() => {
    const text = JSON.stringify(SAMPLE_JSON, null, 2);
    setJsonText(text);
    setParsedData(SAMPLE_JSON);
  }, []);

  const handleParse = () => {
    if (!jsonText.trim()) {
      setError("Please enter JSON code to visualize");
      setParsedData(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonText);
      setParsedData(parsed);
      setError(null);
      toast.success("JSON parsed successfully");
    } catch (err: any) {
      setError(`JSON Parse Error: ${err.message || "Failed to parse JSON. Please check syntax."}`);
      setParsedData(null);
    }
  };

  const handleClear = () => {
    setJsonText("");
    setParsedData(null);
    setError(null);
  };

  const handleLoadSample = () => {
    const text = JSON.stringify(SAMPLE_JSON, null, 2);
    setJsonText(text);
    setParsedData(SAMPLE_JSON);
    setError(null);
    toast.info("Sample JSON loaded");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Strictly only .json files are allowed to be uploaded");
      setParsedData(null);
      toast.error("Invalid file format. Please upload a .json file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJsonText(text);
      try {
        const parsed = JSON.parse(text);
        setParsedData(parsed);
        setError(null);
        toast.success("JSON file uploaded and parsed successfully");
      } catch (err: any) {
        setError(`JSON Parse Error: ${err.message || "Invalid JSON format in the uploaded file"}`);
        setParsedData(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-none w-full py-6 space-y-6"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div className="mb-8 rounded-3xl glass-lvl1 p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between relative z-10">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3.5 shadow-inner">
                <Braces className="h-7 w-7 text-primary animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  JSON Tree Viewer
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
                  Analyze, browse, and filter structured JSON payloads. Swap between collapsible tree, flat key-value list, key categorization, and statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Editor & Viewer Layout */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Editor (Left Pane) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="overflow-hidden border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300">
            <CardHeader className="border-b border-white/5 py-4 px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-white/95">
                Input JSON Code
              </CardTitle>
              <div className="flex gap-2 items-center">
                <label className="h-8 text-xs hover:bg-white/10 text-muted-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 transition-colors cursor-pointer font-medium">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload .json</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={handleLoadSample}
                  className="h-8 text-xs hover:bg-white/10 text-muted-foreground flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <FileCode className="h-3.5 w-3.5" />
                  Sample
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={handleClear}
                  className="h-8 text-xs hover:bg-white/10 text-muted-foreground flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Clear
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <AutoFormatTextarea
                value={jsonText}
                onChange={setJsonText}
                placeholder="Paste your JSON here..."
              />
            </CardContent>
          </Card>

          <Button
            onClick={handleParse}
            className="w-full h-12 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-primary/20 transition-all rounded-xl"
          >
            <Play className="h-4 w-4" />
            Analyze & Parse JSON
          </Button>

          {error && (
            <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              <div className="text-sm font-mono break-all">{error}</div>
            </div>
          )}
        </div>

        {/* Visualizer (Right Pane) */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden border border-white/5 bg-white/2 hover:border-white/10 transition-all duration-300 min-h-[640px] flex flex-col">
            <CardHeader className="border-b border-white/5 py-4 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-base font-bold text-white/95">
                Visualization Output
              </CardTitle>

              {/* View Switches */}
              <div className="flex gap-1.5 p-1 rounded-xl bg-black/20 border border-white/5 self-start sm:self-auto">
                <button
                  onClick={() => setActiveView("tree")}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeView === "tree" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Tree View
                </button>
                <button
                  onClick={() => setActiveView("paths")}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeView === "paths" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Flat Paths
                </button>
                <button
                  onClick={() => setActiveView("types")}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeView === "types" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Key Types
                </button>
                <button
                  onClick={() => setActiveView("metrics")}
                  className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeView === "metrics" ? "bg-white/15 text-white" : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Root Node
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6 flex-1 flex flex-col justify-start">
              {parsedData === null ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-muted-foreground/60">
                  <Braces className="h-12 w-12 opacity-30 mb-3 text-muted-foreground" />
                  <p className="text-sm">No parsed data available.</p>
                  <p className="text-xs mt-1">Enter valid JSON on the left and click Analyze.</p>
                </div>
              ) : (
                <div className="space-y-4 w-full">
                  {activeView === "tree" && <TreeJsonViewer data={parsedData} />}
                  {activeView === "paths" && <KeyValueViewer data={parsedData} />}
                  {activeView === "types" && <TypeStructuredViewer data={parsedData} />}
                  {activeView === "metrics" && <RootNodeViewer data={parsedData} rawString={jsonText} />}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
