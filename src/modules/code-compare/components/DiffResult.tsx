import ReactDiffViewer from "react-diff-viewer-continued";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { FileDiff, CheckCircle, Eye } from "lucide-react";

import type {
  CompareResult,
} from "../types/compare.types";

interface Props {
  compareResult: CompareResult;
}

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

export default function DiffResult({
  compareResult,
}: Props) {
  // Custom theme variables for ReactDiffViewer to align with the dark glass atmosphere
  const customDiffStyles = {
    variables: {
      dark: {
        addedBackground: "rgba(16, 185, 129, 0.15)",
        addedColor: "#a7f3d0",
        removedBackground: "rgba(239, 68, 68, 0.15)",
        removedColor: "#fca5a5",
        wordAddedBackground: "rgba(16, 185, 129, 0.3)",
        wordRemovedBackground: "rgba(239, 68, 68, 0.3)",
        gutterBackground: "rgba(255, 255, 255, 0.02)",
        gutterColor: "rgba(255, 255, 255, 0.3)",
        codeFoldBackground: "rgba(255, 255, 255, 0.03)",
        emptyLineBackground: "transparent",
      }
    },
    diffContainer: {
      fontFamily: '"Geist Variable", sans-serif',
      fontSize: "13px",
      background: "transparent",
    },
    line: {
      padding: "6px 12px",
    },
    gutter: {
      borderRight: "1px solid rgba(255,255,255,0.05)",
      padding: "6px 8px",
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Differences Found
                </p>
                <p className="mt-2 text-3xl font-black text-foreground">
                  {compareResult.differenceCount}
                </p>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-3 text-amber-500">
                <FileDiff className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Comparison Status
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-500">
                  Completed
                </p>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500">
                <CheckCircle className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  View Mode
                </p>
                <p className="mt-2 text-lg font-bold text-foreground/90">
                  Side By Side
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Eye className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Diff Viewer Container */}
      <motion.div variants={itemVariants}>
        <Card className="border border-white/5 bg-white/2 overflow-hidden">
          <CardHeader className="border-b border-white/5 py-4 px-6">
            <CardTitle className="text-base font-bold text-white">
              Diff View Result
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-auto max-h-[600px] bg-black/30">
              <ReactDiffViewer
                oldValue={compareResult.originalContent}
                newValue={compareResult.compareContent}
                splitView
                showDiffOnly={false}
                styles={customDiffStyles}
                useDarkTheme
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </motion.div>
  );
}