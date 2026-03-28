import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MessageCircleQuestion, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="relative grid lg:grid-cols-2 gap-12 items-center px-6 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Your learning community awaits</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight">
            Learn. Share.{" "}
            <span className="gradient-text">Grow Together.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            The all-in-one platform for students to share notes, discuss doubts,
            collaborate in study groups, and stay ahead in their academic journey.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/notes">
              <Button variant="hero" size="lg" className="rounded-2xl px-8 h-12 text-base">
                <BookOpen className="h-5 w-5" />
                Explore Notes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/discussions">
              <Button variant="glass" size="lg" className="rounded-2xl px-8 h-12 text-base">
                <MessageCircleQuestion className="h-5 w-5" />
                Ask a Doubt
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 pt-4">
            {[
              { label: "Active Students", value: "12K+" },
              { label: "Notes Shared", value: "45K+" },
              { label: "Questions Solved", value: "28K+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-display font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-3xl blur-2xl opacity-20 animate-pulse-glow" />
            <img
              src={heroImage}
              alt="Students collaborating in a futuristic digital environment"
              className="relative rounded-3xl soft-shadow w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
