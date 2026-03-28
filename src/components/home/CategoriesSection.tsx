import { motion } from "framer-motion";
import {
  Database, Cpu, Globe, Brain, Code, Shield, BarChart, Atom,
} from "lucide-react";

const categories = [
  { name: "DBMS", icon: Database, color: "from-violet-500 to-purple-600" },
  { name: "OS", icon: Cpu, color: "from-blue-500 to-cyan-500" },
  { name: "CN", icon: Globe, color: "from-teal-500 to-emerald-500" },
  { name: "AI/ML", icon: Brain, color: "from-pink-500 to-rose-500" },
  { name: "DSA", icon: Code, color: "from-amber-500 to-orange-500" },
  { name: "Cyber Sec", icon: Shield, color: "from-red-500 to-pink-500" },
  { name: "Data Science", icon: BarChart, color: "from-indigo-500 to-violet-500" },
  { name: "Physics", icon: Atom, color: "from-cyan-500 to-blue-500" },
];

export function CategoriesSection() {
  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-display font-bold mb-2">Browse by Subject</h2>
      <p className="text-sm text-muted-foreground mb-8">Find notes and discussions by topic</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl glass hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <cat.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xs font-medium">{cat.name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
