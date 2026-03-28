import { motion } from "framer-motion";
import { TrendingUp, Eye, Heart, Download } from "lucide-react";

const trendingNotes = [
  { title: "DBMS Complete Notes", subject: "Database Management", views: 2340, likes: 189, downloads: 567, author: "Arjun M." },
  { title: "OS Process Scheduling", subject: "Operating Systems", views: 1890, likes: 145, downloads: 432, author: "Priya K." },
  { title: "CN TCP/IP Model", subject: "Computer Networks", views: 1560, likes: 112, downloads: 345, author: "Rahul S." },
  { title: "AI Neural Networks", subject: "Artificial Intelligence", views: 3120, likes: 278, downloads: 890, author: "Sneha R." },
];

export function TrendingSection() {
  return (
    <section className="px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Trending Now</h2>
          <p className="text-sm text-muted-foreground">Most popular this week</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trendingNotes.map((note, i) => (
          <motion.div
            key={note.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="glass rounded-2xl p-5 cursor-pointer group transition-shadow hover:glow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-medium">
                {note.subject}
              </span>
            </div>
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">by {note.author}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{note.views}</span>
              <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{note.likes}</span>
              <span className="flex items-center gap-1"><Download className="h-3 w-3" />{note.downloads}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
