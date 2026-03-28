import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, MessageCircle, CheckCircle2, Clock, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const discussions = [
  { id: 1, title: "How does virtual memory work in Operating Systems?", body: "I'm confused about page replacement algorithms. Can someone explain FIFO vs LRU?", author: "Amit P.", avatar: "A", answers: 12, votes: 34, solved: true, time: "2h ago", tags: ["OS", "Memory"], views: 456 },
  { id: 2, title: "What's the difference between TCP and UDP protocols?", body: "When should we prefer UDP over TCP? Looking for real-world examples.", author: "Sara K.", avatar: "S", answers: 8, votes: 21, solved: true, time: "4h ago", tags: ["CN", "Protocols"], views: 312 },
  { id: 3, title: "Best approach to implement Dijkstra's shortest path?", body: "Should I use a priority queue or a simple array for the min extraction?", author: "Vikram R.", avatar: "V", answers: 5, votes: 15, solved: false, time: "6h ago", tags: ["DSA", "Graphs"], views: 234 },
  { id: 4, title: "Explain 1NF, 2NF, 3NF, BCNF in database normalization", body: "I keep getting confused between 3NF and BCNF. What's the real difference?", author: "Neha G.", avatar: "N", answers: 18, votes: 42, solved: true, time: "1d ago", tags: ["DBMS", "SQL"], views: 789 },
  { id: 5, title: "How does backpropagation work in neural networks?", body: "I understand forward pass but chain rule in backprop confuses me.", author: "Sneha R.", avatar: "S", answers: 14, votes: 38, solved: true, time: "1d ago", tags: ["AI/ML", "Deep Learning"], views: 567 },
  { id: 6, title: "RSA encryption - how to choose p and q?", body: "What makes RSA secure? How large should the primes be?", author: "Rahul S.", avatar: "R", answers: 6, votes: 19, solved: false, time: "2d ago", tags: ["Cyber Sec", "Cryptography"], views: 198 },
];

const filters = ["Latest", "Most Voted", "Unsolved", "Solved"];

const DiscussionsPage = () => {
  const [activeFilter, setActiveFilter] = useState("Latest");

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Discussions</h1>
            <p className="text-muted-foreground mt-1">Ask doubts, share knowledge, help peers</p>
          </div>
          <Button variant="hero" className="rounded-2xl">
            <Plus className="h-4 w-4" />
            Ask Question
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <div className="flex gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === f
                  ? "gradient-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="space-y-3">
        {discussions.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 4 }}
            className="glass rounded-2xl p-5 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[48px]">
                <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                  <ArrowUp className="h-5 w-5" />
                </button>
                <span className="text-lg font-bold">{d.votes}</span>
                <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {d.solved && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{d.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{d.body}</p>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-semibold">
                      {d.avatar}
                    </div>
                    <span className="text-xs text-muted-foreground">{d.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{d.time}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><MessageCircle className="h-3 w-3" />{d.answers} answers</span>
                  <div className="flex gap-1.5 ml-auto">
                    {d.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DiscussionsPage;
