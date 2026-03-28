import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, MessageCircle, Clock, Send, Plus, Search, User, ArrowUp, ArrowDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  replies: number;
  votes: number;
  time?: string;
  solved?: boolean;
}

const categories = ["All", "Exam Prep", "Placement", "Project Idea", "Doubt", "General"];

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" });

  useEffect(() => {
    const q = query(collection(db, "discussions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const discussionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Discussion[];
      setDiscussions(discussionsData);
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("Please login to post a discussion!");
      return;
    }
    
    try {
      await addDoc(collection(db, "discussions"), {
        ...newPost,
        author: auth.currentUser.displayName || "Anonymous",
        replies: 0,
        votes: 0,
        solved: false,
        createdAt: serverTimestamp(),
      });
      toast.success("Discussion posted successfully!");
      setIsPosting(false);
      setNewPost({ title: "", content: "", category: "General" });
    } catch (error) {
      toast.error("Failed to post discussion.");
      console.error(error);
    }
  };

  const filtered = discussions.filter((d) => {
    if (selectedCategory !== "All" && d.category !== selectedCategory) return false;
    if (searchQuery && !d.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Q&A <span className="gradient-text">Center</span></h1>
            <p className="text-muted-foreground mt-2 text-lg">Connect with the community and solve doubts together.</p>
          </div>
          
          <Dialog open={isPosting} onOpenChange={setIsPosting}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl h-12 px-8 gradient-primary font-bold shadow-lg shadow-primary/20 hover:glow transition-all active:scale-95">
                <Plus className="h-5 w-5 mr-2" />
                New Thread
              </Button>
            </DialogTrigger>
            <DialogContent className="glass rounded-[2rem] border-primary/20 p-8 sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Start a Discussion</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePost} className="space-y-5 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Title</label>
                  <input
                    required
                    value={newPost.title}
                    onChange={e => setNewPost({...newPost, title: e.target.value})}
                    placeholder="What's on your mind?"
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Category</label>
                  <select 
                    value={newPost.category}
                    onChange={e => setNewPost({...newPost, category: e.target.value})}
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  >
                    {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Content</label>
                  <textarea
                    required
                    rows={4}
                    value={newPost.content}
                    onChange={e => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Provide context or ask your question in detail..."
                    className="w-full p-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl gradient-primary font-bold text-lg mt-2">
                  Post to Community
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search discussions, solutions, or threads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl glass text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/80 transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === c
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {filtered.length > 0 ? filtered.map((discussion, i) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <div className="glass-card rounded-[1.5rem] p-6 flex flex-col sm:flex-row sm:items-center gap-6 cursor-pointer">
              <div className="flex flex-col items-center gap-1 min-w-[48px] border-r border-border/50 pr-4 hidden sm:flex">
                <button className="text-muted-foreground hover:text-primary transition-colors p-1">
                  <ArrowUp className="h-5 w-5" />
                </button>
                <span className="text-lg font-bold">{discussion.votes}</span>
                <button className="text-muted-foreground hover:text-destructive transition-colors p-1">
                  <ArrowDown className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] tracking-widest font-bold text-primary uppercase">{discussion.category}</span>
                  <div className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {discussion.time || "Just now"}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  {discussion.solved && <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />}
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors line-clamp-1 leading-tight">{discussion.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{discussion.content}</p>
                
                <div className="flex items-center gap-4 mt-4 sm:hidden">
                   <div className="flex items-center gap-2">
                    <ArrowUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold">{discussion.votes}</span>
                    <ArrowDown className="h-4 w-4 text-destructive" />
                  </div>
                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{discussion.replies} replies</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 sm:border-l border-border/50 sm:pl-6 shrink-0 hidden sm:flex">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg font-bold">{discussion.replies}</span>
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Replies</span>
                </div>
                <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold glow-sm shadow-md overflow-hidden">
                  {discussion.author.charAt(0)}
                </div>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="text-center py-24 glass rounded-[2.5rem] border-dashed border-2">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/20 mb-3" />
            <h3 className="text-lg font-bold text-muted-foreground">No discussions found</h3>
            <p className="text-sm text-muted-foreground/70">Start a new thread to get help from the community.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscussionsPage;
