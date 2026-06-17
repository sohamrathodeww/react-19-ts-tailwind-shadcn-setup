import { GitCompare } from "lucide-react";

export default function CompareHeader() {
  return (
    <div className="mb-8 rounded-2xl border bg-card p-8 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="rounded-xl border bg-primary/10 p-3">
            <GitCompare className="h-7 w-7 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Code Compare
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Compare two code snippets side-by-side with
              intelligent difference detection, whitespace handling,
              and visual diff highlighting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}