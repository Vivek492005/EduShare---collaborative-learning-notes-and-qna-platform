import { motion } from "framer-motion";
import { Search, Filter, BookOpen, Eye, Heart, Download, Star, Bookmark, Upload, Plus, X } from "lucide-react";
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

interface Note {
  id: string;
  title: string;
  subject: string;
  semester: string;
  author: string;
  avatar: string;
  rating: number;
  views: number;
  likes: number;
  downloads: number;
  tags: string[];
}

const subjects = ["All", "DBMS", "OS", "CN", "AI/ML", "DSA", "Cyber Sec", "Data Science", "Physics"];

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", subject: "DBMS", semester: "Sem 4", tags: "" });

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      setNotes(notesData);
    });
    return () => unsubscribe();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) {
      toast.error("Please login to upload notes!");
      return;
    }
    
    try {
      await addDoc(collection(db, "notes"), {
        ...newNote,
        tags: newNote.tags.split(",").map(t => t.trim()),
        author: auth.currentUser.displayName || "Anonymous",
        avatar: auth.currentUser.displayName?.charAt(0) || "A",
        rating: 5.0,
        views: 0,
        likes: 0,
        downloads: 0,
        createdAt: serverTimestamp(),
      });
      toast.success("Note uploaded successfully!");
      setIsUploading(false);
      setNewNote({ title: "", subject: "DBMS", semester: "Sem 4", tags: "" });
    } catch (error) {
      toast.error("Failed to upload note.");
      console.error(error);
    }
  };

  const filtered = notes.filter((n) => {
    if (selectedSubject !== "All" && n.subject !== selectedSubject) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tight">Notes <span className="gradient-text">Library</span></h1>
            <p className="text-muted-foreground mt-2 text-lg">Premium study materials curated by the EduShare community.</p>
          </div>
          
          <Dialog open={isUploading} onOpenChange={setIsUploading}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl h-12 px-8 gradient-primary font-bold shadow-lg shadow-primary/20 hover:glow transition-all active:scale-95">
                <Plus className="h-5 w-5 mr-2" />
                Upload Notes
              </Button>
            </DialogTrigger>
            <DialogContent className="glass rounded-[2rem] border-primary/20 p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold">Share Your Knowledge</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-6 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Note Title</label>
                  <input
                    required
                    value={newNote.title}
                    onChange={e => setNewNote({...newNote, title: e.target.value})}
                    placeholder="e.g., DBMS Normalization Guide"
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Subject</label>
                    <select 
                      value={newNote.subject}
                      onChange={e => setNewNote({...newNote, subject: e.target.value})}
                      className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    >
                      {subjects.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Semester</label>
                    <input
                      required
                      value={newNote.semester}
                      onChange={e => setNewNote({...newNote, semester: e.target.value})}
                      placeholder="e.g., Sem 4"
                      className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1">Tags (comma separated)</label>
                  <input
                    value={newNote.tags}
                    onChange={e => setNewNote({...newNote, tags: e.target.value})}
                    placeholder="SQL, Normalization, ER Model"
                    className="w-full h-12 px-4 rounded-xl bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                </div>
                <Button type="submit" className="w-full h-14 rounded-2xl gradient-primary font-bold text-lg mt-4">
                  Publish to EduShare
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filters */}
        <div className="space-y-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search across 5,000+ premium notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-[1.25rem] glass text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background/80 transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="flex gap-2.5 flex-wrap">
            {subjects.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedSubject === s
                    ? "gradient-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? filtered.map((note, i) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group"
          >
            <div className="glass-card rounded-[2rem] p-6 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 gradient-primary opacity-[0.03] blur-2xl -mr-12 -mt-12 group-hover:opacity-10 transition-opacity" />
              
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-primary/10 text-primary font-bold border border-primary/5">
                  {note.subject}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground/70">{note.semester}</span>
              </div>

              <h3 className="text-xl font-display font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {note.title}
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center text-xs text-primary-foreground font-bold shadow-md">
                  {note.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">{note.author}</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`h-2.5 w-2.5 ${star <= Math.floor(note.rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground/20"}`} />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1 font-medium">{note.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {note.tags?.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-lg bg-muted/50 text-muted-foreground font-medium border border-border/20">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-border/30 mt-auto">
                <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground/60">
                  <span className="flex items-center gap-1.5 group-hover:text-foreground transition-colors"><Eye className="h-3.5 w-3.5" />{note.views}</span>
                  <span className="flex items-center gap-1.5 group-hover:text-rose-500 transition-colors"><Heart className="h-3.5 w-3.5" />{note.likes}</span>
                  <span className="flex items-center gap-1.5 group-hover:text-primary transition-colors"><Download className="h-3.5 w-3.5" />{note.downloads}</span>
                </div>
                <button className="h-9 w-9 rounded-xl glass flex items-center justify-center hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all active:scale-90">
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full text-center py-32 glass rounded-[2.5rem] border-dashed border-2">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No notes found yet</h3>
            <p className="text-muted-foreground/70 mt-1">Be the first to share your knowledge with the EduShare community!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesPage; 
