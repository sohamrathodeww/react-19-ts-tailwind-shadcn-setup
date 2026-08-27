import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, GitCompare } from "lucide-react";
import { motion } from "motion/react";

export default function MainLayout() {
    const location = useLocation();

    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/30 selection:text-white">
            
            {/* Background Grid Pattern Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-100 -z-10" />

            {/* Ambient atmospheric background glows */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="animate-glow-1 absolute -top-80 -left-60 h-[900px] w-[900px] rounded-full bg-primary/20 blur-[140px]" />
                <div className="animate-glow-2 absolute top-1/3 -right-60 h-[800px] w-[800px] rounded-full bg-indigo-500/18 blur-[130px]" />
                <div className="animate-glow-1 absolute bottom-[-200px] left-1/4 h-[700px] w-[700px] rounded-full bg-fuchsia-600/12 blur-[150px]" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Floating Glass Navigation Header */}
            <header className="sticky top-4 z-40 mx-auto w-full max-w-[92%] px-4">
                <nav className="glass-lvl1 flex items-center justify-between rounded-2xl px-6 py-3.5">
                    
                    {/* Innovative Rotating SVG Logo and status pill */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <div className="relative flex items-center justify-center">
                            <svg className="h-8 w-8 animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="orbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#c084fc" />
                                        <stop offset="50%" stopColor="#818cf8" />
                                        <stop offset="100%" stopColor="#38bdf8" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="40" stroke="url(#orbGrad)" strokeWidth="6" strokeDasharray="30 20" />
                                <circle cx="50" cy="50" r="24" fill="url(#orbGrad)" fillOpacity="0.25" stroke="url(#orbGrad)" strokeWidth="2" />
                                <circle cx="50" cy="50" r="8" fill="#fff" className="animate-pulse" />
                            </svg>
                            {/* Glass overlay layer for tactile depth */}
                            <div className="absolute inset-0 rounded-full border border-white/20 bg-white/5 backdrop-blur-[1px] group-hover:border-white/40 transition-colors" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-black tracking-widest text-primary-foreground uppercase shadow-inner">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            <span>DevTool</span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <span className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                location.pathname === "/" 
                                ? "text-white bg-white/10" 
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                            }`}>
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </span>
                        </Link>
                        <Link to="/tools/code-compare">
                            <span className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                location.pathname === "/tools/code-compare" 
                                ? "text-white bg-white/10" 
                                : "text-muted-foreground hover:text-white hover:bg-white/5"
                            }`}>
                                <GitCompare className="h-4 w-4" />
                                Code Compare
                            </span>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 pt-8 pb-16 max-w-[92%]">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    )
}