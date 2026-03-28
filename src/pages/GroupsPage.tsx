import { motion } from "framer-motion";
import { Users, MessageSquare, Globe, Lock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const groups = [
  { name: "DBMS Study Group", members: 128, messages: 1420, topic: "Database Management", isPublic: true, online: 12 },
  { name: "DSA Problem Solving", members: 256, messages: 3200, topic: "Data Structures", isPublic: true, online: 34 },
  { name: "AI/ML Enthusiasts", members: 89, messages: 890, topic: "Artificial Intelligence", isPublic: true, online: 8 },
  { name: "Sem 6 - Section A", members: 62, messages: 540, topic: "General", isPublic: false, online: 15 },
  { name: "Competitive Programming", members: 178, messages: 2100, topic: "CP & Algorithms", isPublic: true, online: 22 },
  { name: "Web Dev Crew", members: 95, messages: 780, topic: "Web Development", isPublic: true, online: 6 },
];

const GroupsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Study Groups</h1>
            <p className="text-muted-foreground mt-1">Join communities and learn together</p>
          </div>
          <Button variant="hero" className="rounded-2xl">
            <Plus className="h-4 w-4" />
            Create Group
          </Button>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group, i) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03, y: -4 }}
            className="glass rounded-2xl p-6 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-2xl gradient-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1">
                {group.isPublic ? (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Lock className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{group.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{group.topic}</p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Users className="h-3 w-3" />{group.members} members</span>
              <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{group.messages}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-emerald-500">{group.online} online</span>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl text-xs h-8">
                Join
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
