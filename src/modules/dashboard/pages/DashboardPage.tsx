import { TOOLS } from "../../../shared/constants/tools";
import { ToolCard } from "../../../shared/components/ToolCard";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
} as const;

export default function DashboardPage() {
  return (
    <div className="py-8">
      {/* Hero Banner */}
      <div className="relative mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3.5 py-1 text-xs font-semibold text-primary mb-4">
          <Sparkles className="h-3 w-3 animate-pulse" />
          <span>Visual Reimagined Suite v2.0</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent mb-4">
          Developer Workspace
        </h1>
        <p className="max-w-xl text-base text-muted-foreground leading-relaxed">
          Access local client-side developer utilities designed with speed, privacy, and fluidity. No cookies, no trackers, just raw utility.
        </p>
      </div>

      {/* Grid List */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {TOOLS.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <ToolCard title={item.title} description={item.description} path={item.path} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}