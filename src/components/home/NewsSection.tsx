import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";

const newsItems = [
  { title: "GATE 2026 Registration Opens Next Month", category: "Exams", time: "2h ago", image: "📋" },
  { title: "Google Summer of Code 2026 Announced", category: "Internships", time: "5h ago", image: "🌐" },
  { title: "New AI Scholarship for Engineering Students", category: "Scholarships", time: "1d ago", image: "🎓" },
  { title: "MIT OpenCourseWare Adds 500 New Courses", category: "Global Education", time: "1d ago", image: "📚" },
];

export function NewsSection() {
  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-display font-bold mb-2">Education News</h2>
      <p className="text-sm text-muted-foreground mb-8">Stay updated with the latest</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {newsItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass rounded-2xl p-5 cursor-pointer group flex items-start gap-4"
          >
            <div className="text-3xl shrink-0">{item.image}</div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/15 text-accent font-medium">{item.category}</span>
              <h3 className="font-semibold mt-2 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
