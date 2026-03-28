import { Home, BookOpen, MessageCircleQuestion, Users, BarChart3 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const items = [
  { icon: Home, label: "Home", to: "/" },
  { icon: BookOpen, label: "Notes", to: "/notes" },
  { icon: MessageCircleQuestion, label: "Discuss", to: "/discussions" },
  { icon: Users, label: "Groups", to: "/groups" },
  { icon: BarChart3, label: "Dashboard", to: "/dashboard" },
];

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground transition-all"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
