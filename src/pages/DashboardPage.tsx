import { motion } from "framer-motion";
import { BookOpen, Heart, MessageCircle, Award, Bookmark, Clock, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: "Notes Uploaded", value: 0, icon: BookOpen, color: "from-violet-500 to-purple-600" },
    { label: "Discussions", value: 0, icon: MessageCircle, color: "from-blue-500 to-cyan-500" },
    { label: "Likes Received", value: 0, icon: Heart, color: "from-pink-500 to-rose-500" },
    { label: "Impact Points", value: 0, icon: Zap, color: "from-emerald-500 to-teal-500" },
  ]);

  useEffect(() => {
    if (!user) return;

    // Fetch Notes Count
    const qNotes = query(collection(db, "notes"), where("author", "==", user.displayName || "Anonymous"));
    const unsubscribeNotes = onSnapshot(qNotes, (snapshot) => {
      const count = snapshot.size;
      const totalLikes = snapshot.docs.reduce((acc, doc) => acc + (doc.data().likes || 0), 0);
      
      setStats(prev => prev.map(s => {
        if (s.label === "Notes Uploaded") return { ...s, value: count };
        if (s.label === "Likes Received") return { ...s, value: totalLikes };
        if (s.label === "Impact Points") return { ...s, value: (count * 10) + (totalLikes * 5) };
        return s;
      }));
    });

    // Fetch Discussions Count
    const qDisc = query(collection(db, "discussions"), where("author", "==", user.displayName || "Anonymous"));
    const unsubscribeDisc = onSnapshot(qDisc, (snapshot) => {
      const count = snapshot.size;
      setStats(prev => prev.map(s => {
        if (s.label === "Discussions") return { ...s, value: count };
        return s;
      }));
    });

    return () => {
      unsubscribeNotes();
      unsubscribeDisc();
    };
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-display font-bold mb-2 tracking-tight">Welcome back, <span className="gradient-text">{user?.displayName?.split(' ')[0] || "Scholar"}</span>!</h1>
        <p className="text-muted-foreground text-lg">Here's your academic impact on EduShare today.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-[2rem] p-6 relative overflow-hidden group cursor-default"
          >
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 glow-sm group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="text-4xl font-display font-bold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold">Your Academic Journey</h2>
            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-xl">
              View All Activity <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="grid gap-4">
            {[
              { title: "Note Master", desc: "Uploaded 5+ high-quality notes", progress: 80, icon: "📝" },
              { title: "Discussion Guru", desc: "Started 10+ helpful threads", progress: 40, icon: "💬" },
              { title: "Community Star", desc: "Received 50+ likes on your content", progress: 100, icon: "⭐" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-[1.5rem] p-6 flex items-center gap-6 group hover:bg-primary/[0.02] transition-colors">
                <div className="h-14 w-14 rounded-2xl glass flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <span className="text-sm font-bold text-primary">{item.progress}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all duration-1000" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges Sidebar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl font-display font-bold mb-6">EduShare Badges</h2>
          <div className="glass-card rounded-[2rem] p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "First Note", emoji: "📜", earned: true },
                { name: "Top Helper", emoji: "🤝", earned: true },
                { name: "Fast Learner", emoji: "⚡", earned: true },
                { name: "Verified", emoji: "✅", earned: false },
                { name: "Gold Contributor", emoji: "🏆", earned: false },
                { name: "Note King", emoji: "👑", earned: false },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all ${
                    badge.earned ? "glass shadow-md scale-100" : "opacity-30 scale-95 grayscale"
                  }`}
                >
                  <span className="text-4xl">{badge.emoji}</span>
                  <span className="text-[10px] uppercase font-bold text-center tracking-widest">{badge.name}</span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-10 rounded-xl glass hover:bg-primary/10 text-primary font-bold">
              Explore More Badges
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

import { Button } from "@/components/ui/button";

export default DashboardPage;
