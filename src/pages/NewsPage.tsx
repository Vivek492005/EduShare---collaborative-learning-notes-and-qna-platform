import { motion } from "framer-motion";
import { ExternalLink, Clock, Search } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Exams", "Scholarships", "Internships", "Global Education"];

const allNews = [
  { title: "GATE 2026 Registration Opens Next Month", category: "Exams", time: "2h ago", image: "📋", desc: "The registration window for GATE 2026 will open from April 1. Candidates can apply online through the official website." },
  { title: "Google Summer of Code 2026 Announced", category: "Internships", time: "5h ago", image: "🌐", desc: "Google has announced GSoC 2026 with over 200 participating organizations. Students can start applying from March." },
  { title: "New AI Scholarship for Engineering Students", category: "Scholarships", time: "1d ago", image: "🎓", desc: "A $10,000 scholarship program for students pursuing AI/ML research has been announced by the AI Foundation." },
  { title: "MIT OpenCourseWare Adds 500 New Courses", category: "Global Education", time: "1d ago", image: "📚", desc: "MIT OCW has expanded its free course catalog, covering quantum computing, biotech, and more." },
  { title: "JEE Advanced 2026 Date Announced", category: "Exams", time: "2d ago", image: "📝", desc: "JEE Advanced 2026 will be held on June 1. Registration begins in April for qualified JEE Main candidates." },
  { title: "Microsoft Internship Program 2026", category: "Internships", time: "3d ago", image: "💻", desc: "Microsoft's summer internship program is now accepting applications for SDE, PM, and Design roles." },
];

const NewsPage = () => {
  const [activeCat, setActiveCat] = useState("All");

  const filtered = activeCat === "All" ? allNews : allNews.filter((n) => n.category === activeCat);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Education News</h1>
        <p className="text-muted-foreground mb-6">Stay updated with the latest in education</p>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCat === c ? "gradient-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="glass rounded-2xl p-6 cursor-pointer group flex items-start gap-5"
          >
            <div className="text-4xl shrink-0">{item.image}</div>
            <div className="flex-1">
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-accent/15 text-accent font-medium">{item.category}</span>
              <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.desc}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{item.time}</span>
                <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
