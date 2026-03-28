import { motion } from "framer-motion";
import { Search, Filter, BookOpen, Eye, Heart, Download, Star, Bookmark, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const subjects = ["All", "DBMS", "OS", "CN", "AI/ML", "DSA", "Cyber Sec", "Data Science", "Physics"];
const semesters = ["All", "Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

const notes = [
  { id: 1, title: "Complete DBMS Notes - Normalization to Transactions", subject: "DBMS", semester: "Sem 4", author: "Arjun M.", avatar: "A", rating: 4.8, views: 2340, likes: 189, downloads: 567, tags: ["SQL", "Normalization", "ER Model"] },
  { id: 2, title: "Operating Systems - Process Scheduling Algorithms", subject: "OS", semester: "Sem 4", author: "Priya K.", avatar: "P", rating: 4.6, views: 1890, likes: 145, downloads: 432, tags: ["Scheduling", "Deadlock", "Memory"] },
  { id: 3, title: "Computer Networks - TCP/IP Model Explained", subject: "CN", semester: "Sem 5", author: "Rahul S.", avatar: "R", rating: 4.9, views: 1560, likes: 112, downloads: 345, tags: ["TCP", "UDP", "OSI"] },
  { id: 4, title: "Neural Networks & Deep Learning Fundamentals", subject: "AI/ML", semester: "Sem 6", author: "Sneha R.", avatar: "S", rating: 4.7, views: 3120, likes: 278, downloads: 890, tags: ["CNN", "RNN", "Backprop"] },
  { id: 5, title: "Data Structures - Trees & Graph Algorithms", subject: "DSA", semester: "Sem 3", author: "Vikram R.", avatar: "V", rating: 4.5, views: 2100, likes: 167, downloads: 512, tags: ["Trees", "BFS", "DFS"] },
  { id: 6, title: "Cryptography & Network Security Basics", subject: "Cyber Sec", semester: "Sem 6", author: "Neha G.", avatar: "N", rating: 4.4, views: 980, likes: 89, downloads: 234, tags: ["RSA", "AES", "Hash"] },
];

const NotesPage = () => {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = notes.filter((n) => {
    if (selectedSubject !== "All" && n.subject !== selectedSubject) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Notes Library</h1>
            <p className="text-muted-foreground mt-1">Browse, share, and discover study materials</p>
          </div>
          <Button variant="hero" className="rounded-2xl">
            <Upload className="h-4 w-4" />
            Upload Notes
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes by title, subject, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-4 rounded-2xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Subject filters */}
        <div className="flex gap-2 flex-wrap">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedSubject === s
                  ? "gradient-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass rounded-2xl p-5 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary font-medium">{note.subject}</span>
              <span className="text-xs text-muted-foreground">{note.semester}</span>
            </div>

            <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">{note.title}</h3>

            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg gradient-primary flex items-center justify-center text-xs text-primary-foreground font-semibold">
                {note.avatar}
              </div>
              <span className="text-sm text-muted-foreground">{note.author}</span>
              <div className="ml-auto flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm font-medium">{note.rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {note.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{tag}</span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{note.views}</span>
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{note.likes}</span>
                <span className="flex items-center gap-1"><Download className="h-3 w-3" />{note.downloads}</span>
              </div>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
