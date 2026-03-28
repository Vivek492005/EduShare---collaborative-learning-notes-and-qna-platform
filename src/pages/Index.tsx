import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Shield, 
  Zap, 
  Sparkles, 
  Globe, 
  MessageCircle,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) navigate("/notes");
    else navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1),transparent_70%)] pointer-events-none blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-primary/20 shadow-lg shadow-primary/5"
        >
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">The Future of Peer Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-6 leading-[0.9]"
        >
          Study smarter, together <br /> with <span className="gradient-text">EduShare</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          The premium collaborative platform for engineering students. Share notes, solve doubts, and ace your exams with the collective intelligence of your peers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="rounded-[1.25rem] h-16 px-10 text-lg font-bold gradient-primary shadow-xl shadow-primary/20 hover:glow transition-all active:scale-95 flex items-center gap-3"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-[1.25rem] h-16 px-10 text-lg font-bold glass border-border/50 hover:bg-primary/5 transition-all text-foreground/80 flex items-center gap-3"
          >
            Watch Demo
            <PlayCircle className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Floating Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
          {[
            { label: "Active Scholars", value: "10k+", icon: Users },
            { label: "Premium Notes", value: "50k+", icon: BookOpen },
            { label: "Doubts Solved", value: "25k+", icon: MessageCircle },
            { label: "University Hubs", value: "200+", icon: Globe },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-2xl glass flex items-center justify-center mb-4 text-primary glow-sm">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-display font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display font-bold mb-4">Why Engineers Love <span className="gradient-text">EduShare</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Built by students, for students. Every feature is designed to make your academic life easier.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Real-time Sync", desc: "Notes and discussions update instantly across all your devices.", icon: Zap },
            { title: "Verified Content", desc: "Only high-quality, peer-reviewed study materials make the cut.", icon: Shield },
            { title: "Smart Search", desc: "Find exactly what you need with our AI-powered searching tool.", icon: Sparkles },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[2.5rem] relative group border-t border-l border-white/10"
            >
              <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mb-8 glow-sm font-bold">
                <feature.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32">
        <div className="max-w-5xl mx-auto glass-card p-12 md:p-24 rounded-[3.5rem] relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] gradient-primary opacity-[0.05] blur-[100px] -mr-64 -mt-64" />
          <div className="relative z-10">
            <h2 className="text-5xl font-display font-bold mb-6 tracking-tight">Ready to boost your CGPA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of students who are already sharing notes and acing their engineering journey with EduShare.
            </p>
            <Button 
               onClick={handleGetStarted}
               size="lg" 
               className="rounded-2xl h-16 px-12 text-lg font-bold gradient-primary glow shadow-2xl shadow-primary/30 active:scale-95"
            >
              Join EduShare for Free
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
