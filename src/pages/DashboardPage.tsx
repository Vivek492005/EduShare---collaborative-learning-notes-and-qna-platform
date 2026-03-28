import { motion } from "framer-motion";
import { BookOpen, Heart, MessageCircle, Award, Bookmark, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Notes Saved", value: 24, icon: Bookmark, color: "from-violet-500 to-purple-600" },
  { label: "Discussions", value: 12, icon: MessageCircle, color: "from-blue-500 to-cyan-500" },
  { label: "Likes Received", value: 89, icon: Heart, color: "from-pink-500 to-rose-500" },
  { label: "Contributions", value: 7, icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
];

const recentActivity = [
  { action: "Saved", item: "DBMS Complete Notes", time: "2h ago", icon: Bookmark },
  { action: "Answered", item: "How does virtual memory work?", time: "5h ago", icon: MessageCircle },
  { action: "Uploaded", item: "OS Process Scheduling Notes", time: "1d ago", icon: BookOpen },
  { action: "Earned badge", item: "Active Helper", time: "2d ago", icon: Award },
];

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Your learning activity at a glance</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5"
          >
            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-xl font-display font-bold mb-4">Recent Activity</h2>
          <div className="glass rounded-2xl divide-y divide-border/50">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.action}: {item.item}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-display font-bold mb-4">Your Badges</h2>
          <div className="glass rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Active Helper", emoji: "🤝", earned: true },
                { name: "Top Contributor", emoji: "🏆", earned: false },
                { name: "Note Master", emoji: "📝", earned: true },
                { name: "Quick Solver", emoji: "⚡", earned: false },
                { name: "Community Star", emoji: "⭐", earned: false },
                { name: "Verified", emoji: "✅", earned: true },
              ].map((badge) => (
                <div
                  key={badge.name}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                    badge.earned ? "glass" : "opacity-40"
                  }`}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-[10px] font-medium text-center">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
