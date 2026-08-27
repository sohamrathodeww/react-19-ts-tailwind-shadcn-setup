import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { motion } from "motion/react";
import { GitCompare, Database, FileCode, ArrowRight } from "lucide-react";

type ToolCardProps = {
  title: string;
  description: string;
  path: string;
  /* enabled?: boolean; */
};

export const ToolCard = ({title, description, path}: ToolCardProps) => {
    const getIcon = () => {
        if (path.includes("code-compare")) return <GitCompare className="h-6 w-6 text-primary" />;
        if (path.includes("json-viewer")) return <Database className="h-6 w-6 text-emerald-400" />;
        return <FileCode className="h-6 w-6 text-sky-400" />;
    };

    return (
        <Link to={path} className="group block h-full">
            <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="h-full"
            >
                <Card className="relative h-full flex flex-col justify-between overflow-hidden border border-white/5 bg-white/3 hover:border-white/15 hover:bg-white/5 transition-all duration-300">
                    <div>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/20">
                            {getIcon()}
                        </div>
                        <h3 className="text-lg font-bold tracking-tight mb-2 text-white">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-primary/80 group-hover:text-primary transition-all">
                        <span>Launch Tool</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}