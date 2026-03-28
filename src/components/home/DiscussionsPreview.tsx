import { motion } from "framer-motion";
import { MessageCircle, ArrowUp, ArrowDown, CheckCircle2, Clock } from "lucide-react";

const discussions = [
  { title: "How does virtual memory work in OS?", author: "Amit P.", answers: 12, votes: 34, solved: true, time: "2h ago", tags: ["OS", "Memory"] },
  { title: "Difference between TCP and UDP?", author: "Sara K.", answers: 8, votes: 21, solved: true, time: "4h ago", tags: ["CN", "Protocols"] },
  { title: "Best approach for Dijkstra's algorithm?", author: "Vikram R.", answers: 5, votes: 15, solved: false, time: "6h ago", tags: ["DSA", "Graphs"] },
  { title: "Explain normalization in DBMS", author: "Neha G.", answers: 18, votes: 42, solved: true, time: "1d ago", tags: ["DBMS", "SQL"] },
];

export function DiscussionsPreview() {
  return (
    <section className="px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Active Discussions</h2>
          <p className="text-sm text-muted-foreground">Join the conversation</p>
        </div>
      </div>

      <div className="space-y-3">
        {discussions.map((d, i) => (
          <motion.div
            key={d.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="glass rounded-2xl p-5 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[48px]">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <span className="text-sm font-bold">{d.votes}</span>
                <button className="text-muted-foreground hover:text-destructive transition-colors">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {d.solved && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                  <h3 className="font-semibold group-hover:text-primary transition-colors truncate">{d.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span>{d.author}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{d.time}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{d.answers} answers</span>
                </div>
                <div className="flex gap-2">
                  {d.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
