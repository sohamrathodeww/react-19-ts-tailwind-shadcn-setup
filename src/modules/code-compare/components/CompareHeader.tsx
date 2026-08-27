import { GitCompare } from "lucide-react";

export default function CompareHeader() {
  return (
    <div className="mb-8 rounded-3xl glass-lvl1 p-8 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between relative z-10">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-3.5 shadow-inner">
            <GitCompare className="h-7 w-7 text-primary animate-pulse" />
          </div>

          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Code Compare
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Compare two code snippets side-by-side with intelligent difference detection, whitespace handling, and visual diff highlighting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}